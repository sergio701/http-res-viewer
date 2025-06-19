import ReactXmlViewer from 'react-xml-viewer';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type XmlViewerProps = {
  xml: string;
} & HTMLAttributes<HTMLDivElement>;

function XmlViewer({ xml, className, ...props }: XmlViewerProps) {
  return (
    <div
      className={cn('bg-gray-200 w-full min-h-[300px] rounded p-4', className)}
      {...props}
    >
      <ReactXmlViewer xml={xml} />
    </div>
  );
}

export default XmlViewer;
