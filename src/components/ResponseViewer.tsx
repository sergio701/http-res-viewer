import type { HtmlHTMLAttributes } from 'react';
import ResponseStatus from './ResponseStatus';
import ResponseHeaders from './ResponseHeaders';
import ContentViewer from './ContentViewer';
import type { HttpRequest } from '@/types';
import { cn } from '@/lib/utils';

export type ResponseViewerProps = {
  request: HttpRequest;
} & HtmlHTMLAttributes<HTMLDivElement>;

function ResponseViewer({ request, className, ...props }: ResponseViewerProps) {
  return (
    <>
      <div
        className={cn('grid grid-cols-1 xl:grid-cols-2 gap-2', className)}
        {...props}
      >
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
    </>
  );
}

export default ResponseViewer;
