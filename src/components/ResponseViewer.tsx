import type { HtmlHTMLAttributes } from 'react';
import ResponseStatus from './ResponseStatus';
import ResponseHeaders from './ResponseHeaders';
import ContentViewer from './ContentViewer';
import type { HttpRequest } from '@/types';

export type ResponseViewerProps = {
  request: HttpRequest;
} & HtmlHTMLAttributes<HTMLDivElement>;

function ResponseViewer({ request, ...props }: ResponseViewerProps) {
  return (
    <div {...props}>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        <ResponseStatus {...request} />
        <div>
          <h5 className="text-md font-semibold my-2">Headers</h5>
          <ResponseHeaders
            headers={request.headers}
            className="rounded shadow"
          />
        </div>
      </div>
      {request.body?.length ? (
        <div className="mt-4">
          <h5 className="text-md font-semibold mb-2">Content</h5>
          <ContentViewer content={request.body} type={request.type} />
        </div>
      ) : null}
    </div>
  );
}

export default ResponseViewer;
