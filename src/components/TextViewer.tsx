import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type TextViewerProps = {
  text: string;
} & HTMLAttributes<HTMLDivElement>;

function TextViewer({ text, className, ...props }: TextViewerProps) {
  return (
    <div
      className={cn('bg-gray-200 w-full min-h-[300px] rounded p-4', className)}
      {...props}
    >
      <pre className="whitespace-pre-wrap break-words">{text}</pre>
    </div>
  );
}

export default TextViewer;
