import type { HTMLAttributes } from 'react';
import HtmlViewer from './HtmlViewer';
import { cn } from '@/lib/utils';

type ContentViewerProps = {
  content: string;
  type?: string;
} & HTMLAttributes<HTMLDivElement>;

function ContentViewer({
  content,
  type,
  className,
  ...props
}: ContentViewerProps) {
  return (
    <div {...props}>
      {type === 'html' ? (
        <HtmlViewer html={content} />
      ) : (
        <pre
          className={cn(
            'bg-gray-900 text-white rounded shadow overflow-x-auto',
            className,
          )}
        >
          <code>{content}</code>
        </pre>
      )}
    </div>
  );
}

export default ContentViewer;
