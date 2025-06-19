import { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import debounce from '@/lib/debounce';
import type { HttpRequest } from '@/types';
import { parseHttpRequest } from '@/lib/http-request';
import ResponseViewer from '@/components/ResponseViewer';

function HttpViewer() {
  const [parsedRequest, setParsedRequest] = useState<HttpRequest | null>(null);
  const [inputValue, setInputValue] = useState('');
  const debouncedParseRef = useRef<(value: string) => void>(
    debounce((value: string) => {
      const result = parseHttpRequest(value);
      setParsedRequest(result);
    }, 1000),
  );

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    if (debouncedParseRef.current) {
      debouncedParseRef.current(inputValue);
    }
  }, [inputValue]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mt-4">
      <section className="lg:col-span-5 xl:col-span-4 min-h-[70dvh] flex flex-col">
        <Textarea
          name="request"
          placeholder="Enter HTTP request here..."
          className="flex-1"
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
