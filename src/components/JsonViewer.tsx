import ReactJsonViewer from 'react-json-view';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type JsonViewerProps = {
  json: string;
} & HTMLAttributes<HTMLDivElement>;

function JsonViewer({ json, className, ...props }: JsonViewerProps) {
  let jsonObj = {};
  let invalidJson = false;

  try {
    jsonObj = json ? JSON.parse(json) : {};
  } catch {
    invalidJson = true;
  }

  return (
    <div
      className={cn('bg-gray-200 w-full min-h-[300px] rounded p-4', className)}
      {...props}
    >
      {invalidJson ? (
        <pre className="whitespace-pre-wrap break-words text-black">
          <code>Invalid JSON!</code>
        </pre>
      ) : (
        <ReactJsonViewer src={jsonObj} />
      )}
    </div>
  );
}

export default JsonViewer;
