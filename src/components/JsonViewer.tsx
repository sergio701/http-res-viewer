import ReactJsonViewer from 'react-json-view';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type JsonViewerProps = {
  json: string;
} & HTMLAttributes<HTMLDivElement>;

function JsonViewer({ json, className, ...props }: JsonViewerProps) {
  const jsonObj = json ? JSON.parse(json) : {};
  return (
    <div
      className={cn('bg-gray-200 w-full min-h-[300px] rounded p-4', className)}
      {...props}
    >
      <ReactJsonViewer src={jsonObj} />
    </div>
  );
}

export default JsonViewer;
