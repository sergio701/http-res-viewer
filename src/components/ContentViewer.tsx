import type { HTMLAttributes } from 'react';
import HtmlViewer from './HtmlViewer';
import XMLViewer from './XmlViewer';
import JsonViewer from './JsonViewer';
import TextViewer from './TextViewer';

type ContentViewerProps = {
  content: string;
  type?: string;
} & HTMLAttributes<HTMLDivElement>;

function ContentViewer({ content, type, ...props }: ContentViewerProps) {
  return (
    <div {...props}>
      {type === 'html' ? (
        <HtmlViewer html={content} />
      ) : type === 'json' ? (
        <JsonViewer json={content} />
      ) : type === 'xml' ? (
        <XMLViewer xml={content} />
      ) : (
        <TextViewer text={content} />
      )}
    </div>
  );
}

export default ContentViewer;
