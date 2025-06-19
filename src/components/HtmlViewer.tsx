import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type HtmlViewerProps = {
  html: string;
} & HTMLAttributes<HTMLIFrameElement>;

function HtmlViewer({ html, className, ...props }: HtmlViewerProps) {
  return (
    <iframe
      srcDoc={html}
      className={cn('bg-gray-200 w-full min-h-[300px] rounded', className)}
      {...props}
    />
  );
}

export default HtmlViewer;
