import { describe, it, expect } from 'vitest';
import { parseHttpRequest } from '../http-request';

const htmlResponse = `
HTTP/1.1 200 OK
Date: Mon, 27 Jul 2009 12:28:53 GMT
Server: Apache/2.2.14 (Win32)
Last-Modified: Wed, 22 Jul 2009 19:15:56 GMT
Content-Length: 88
Content-Type: text/html
Connection: Closed

<html>
<body>
<h1>Hello, World!</h1>
</body>
</html>
`;

const xmlErrorResponse = `
HTTP/1.1 404 Not Found
Date: Mon, 27 Jul 2009 12:28:53 GMT
Server: Apache/2.2.14 (Win32)
Content-Length: 110
Content-Type: application/xml
Connection: Closed

<?xml version="1.0" encoding="UTF-8"?>
<error>
  <code>404</code>
  <message>Resource not found</message>
</error>
`;

const jsonResponse = `
HTTP/1.1 200 OK
Date: Mon, 27 Jul 2009 12:28:53 GMT
Server: Apache/2.2.14 (Win32)
Content-Length: 65
Content-Type: application/json
Connection: Closed

{
  "status": "success",
  "data": {
    "message": "Hello, World!"
  }
}
`;

const noBodyResponse = `
HTTP/1.1 204 No Content
Date: Mon, 27 Jul 2009 12:28:53 GMT
Server: Apache/2.2.14 (Win32)
Content-Length: 0
Content-Type: text/plain
Connection: Closed
`;

describe('parseHttpRequest', () => {
  it('parses a valid HTML response', () => {
    const result = parseHttpRequest(htmlResponse);
    expect(result.statusCode).toBe('200');
    expect(result.statusMessage).toBe('OK');
    expect(result.type).toBe('html');
    expect(result.ok).toBe(true);
    expect(result.redirect).toBe(false);
    expect(result.body).toContain('<html>');
    expect(result.error).toBeUndefined();
  });

  it('parses a valid XML error response', () => {
    const result = parseHttpRequest(xmlErrorResponse);
    expect(result.statusCode).toBe('404');
    expect(result.type).toBe('xml');
    expect(result.ok).toBe(false);
    expect(result.redirect).toBe(false);
    expect(result.body).toContain('<error>');
    expect(result.error).toBeUndefined();
  });

  it('parses a valid JSON response', () => {
    const result = parseHttpRequest(jsonResponse);
    expect(result.statusCode).toBe('200');
    expect(result.type).toBe('json');
    expect(result.ok).toBe(true);
    expect(result.redirect).toBe(false);
    expect(result.body).toContain('"status": "success"');
    expect(result.error).toBeUndefined();
  });

  it('parses a response with no body', () => {
    const result = parseHttpRequest(noBodyResponse);
    expect(result.statusCode).toBe('204');
    expect(result.type).toBe('text');
    expect(result.ok).toBe(true);
    expect(result.redirect).toBe(false);
    expect(result.body).toBeUndefined();
    expect(result.error).toBeDefined();
  });

  it('returns error for empty input', () => {
    const result = parseHttpRequest('');
    expect(result.error).toBe('Empty request');
  });

  it('returns error for invalid status line', () => {
    const result = parseHttpRequest('INVALID STATUS LINE');
    expect(result.error).toBe('Invalid status line');
  });
});
