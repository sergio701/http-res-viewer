import type { HttpRequest } from '@/types';

export const parseHttpRequest = (rawRequest: string): HttpRequest => {
  const result: HttpRequest = {
    headers: {},
  };

  try {
    const trimmedRequest = rawRequest
      .replace(/^\s+|\s+$/g, '') // trim start/end whitespace
      .replace(/^\s*[\r\n]+/, '') // remove empty lines at start
      .replace(/[\r\n]+\s*$/, ''); // remove empty lines at end

    // Split on the first occurrence of two or more newlines
    const match = trimmedRequest.match(/([\s\S]*?)(?:\r?\n){2,}([\s\S]*)/);
    let header = trimmedRequest;
    let body = undefined;
    if (match) {
      header = match[1];
      body = match[2];
    }

    const lines = header
      ?.split(/\r?\n/)
      ?.map(line => line.trim())
      ?.filter(Boolean);

    if (!lines?.length) {
      result.error = 'Empty request';
      return result;
    }

    // Parse status/request line
    const statusLine = lines[0];
    const statusLineMatch = statusLine.match(
      /^(HTTP\/\d\.\d)\s+(\d{3})\s+(.*)$/,
    );

    if (statusLineMatch) {
      result.protocol = statusLineMatch[1];
      result.statusCode = statusLineMatch[2];
      result.statusMessage = statusLineMatch[3];
    } else {
      result.error = 'Invalid status line';
      return result;
    }

    // Parse headers
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const sepIdx = line.indexOf(':');
      if (sepIdx === -1) continue;
      const key = line.slice(0, sepIdx).trim().toLowerCase();
      const value = line.slice(sepIdx + 1).trim();
      if (key && value) {
        result.headers[key] = value;
      }
    }

    // Parse body
    if (body && body.trim().length > 0) {
      result.body = body.trim();
    } else {
      result.error =
        'Content not found. Be sure there is an empty line between the headers and the content.';
    }
    const flags = getStatusFlags(result.statusCode);
    result.type = getTypeFromContentType(result.headers['content-type'] || '');
    result.size = getSizeFromContentLength(
      result.headers['content-length'] || '',
    );
    result.date = getDateFromString(result.headers['date'] || '');
    result.ok = flags.ok;
    result.redirect = flags.redirect;
  } catch {
    result.error = 'Failed to parse HTTP request';
  }

  return result;
};

const getTypeFromContentType = (contentType: string): string => {
  if (!contentType) return 'unknown';
  if (contentType.includes('html')) return 'html';
  else if (contentType.includes('json')) return 'json';
  else if (contentType.includes('xml')) return 'xml';
  else if (contentType.includes('plain')) return 'text';
  else if (contentType.includes('javascript')) return 'javascript';
  else return contentType.split('/')[1]?.split(';')[0]?.trim() || contentType;
};

const getSizeFromContentLength = (contentLength: string): string => {
  if (!contentLength) return '0';
  const bytes = parseInt(contentLength);
  if (!isNaN(bytes)) {
    if (bytes < 1024) return `${bytes} bytes`;
    else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
  return '0';
};

const getDateFromString = (dateHeader: string): Date | undefined => {
  const date = new Date(dateHeader);
  return isNaN(date.getTime()) ? undefined : date;
};

// Returns flags indicating if the status code is successful or a redirect
const getStatusFlags = (
  statusCode?: string,
): { ok: boolean; redirect: boolean } => {
  if (!statusCode) return { ok: false, redirect: false };
  const code = parseInt(statusCode, 10);
  return {
    ok: code >= 200 && code < 300,
    redirect: code >= 300 && code < 400,
  };
};
