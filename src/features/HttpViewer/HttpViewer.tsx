import { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import debounce from '@/lib/debounce';
import type { HttpRequest } from '@/types';
import { parseHttpRequest } from '@/lib/http-request';
import ResponseViewer from '@/components/ResponseViewer';
import CopyIcon from '@/components/icons/Copy';
import PasteIcon from '@/components/icons/Paste';

function HttpViewer() {
  const [parsedRequest, setParsedRequest] = useState<HttpRequest | null>(null);
  const [inputValue, setInputValue] = useState('');
  const debouncedParseRef = useRef<(value: string) => void>(
    debounce((value: string) => {
      const result = parseHttpRequest(value);
      setParsedRequest(result);
    }, 700),
  );

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inputValue);
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setInputValue(text);
  };

  useEffect(() => {
    if (debouncedParseRef.current) {
      debouncedParseRef.current(inputValue);
    }
  }, [inputValue]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mt-8">
      <section className="lg:col-span-5 xl:col-span-4 min-h-[70dvh] flex flex-col">
        <div className="flex justify-end mb-2 gap-2">
          <Button size="sm" onClick={handleCopy}>
            <CopyIcon className="size-4 fill-[var(--color-ember)]" />
            Copy
          </Button>
          <Button size="sm" onClick={handlePaste}>
            <PasteIcon className="size-4 fill-[var(--color-ember)]" />
            Paste
          </Button>
        </div>
        <Textarea
          name="request"
          placeholder="Enter HTTP request here..."
          className="flex-1 overscroll-auto"
          style={{ maxHeight: 'calc(100dvh - 190px)' }}
          value={inputValue}
          onChange={handleChange}
        />
        {parsedRequest?.error?.length && inputValue.length ? (
          <div className="text-sm text-red-400 mt-2">{parsedRequest.error}</div>
        ) : null}
      </section>
      <section className="lg:col-span-7 xl:col-span-8">
        <h2 className="text-lg font-semibold mb-2">Response</h2>
        {inputValue.length && parsedRequest ? (
          <ResponseViewer request={parsedRequest} />
        ) : null}
      </section>
    </div>
  );
}

export default HttpViewer;
