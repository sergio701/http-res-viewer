import type { HtmlHTMLAttributes } from 'react';
import type { HttpRequest } from '@/types';
import { cn } from '@/lib/utils';

type ResponseStatusProps = Omit<HttpRequest, 'body' | 'headers' | 'error'> &
  HtmlHTMLAttributes<HTMLDivElement>;

function ResponseStatus({
  statusCode,
  statusMessage,
  protocol,
  type,
  size,
  date,
  ok,
  redirect,
  ...props
}: ResponseStatusProps) {
  return (
    <div {...props}>
      <table>
        <tbody>
          <tr>
            <th className="text-left">Status Code:</th>
            <td
              className={cn([
                'pl-4',
                ok && 'text-green-500',
                redirect && 'text-yellow-500',
                !ok && !redirect && 'text-red-500',
              ])}
            >
              {statusCode}
            </td>
          </tr>
          <tr>
            <th className="text-left">Status Message:</th>
            <td
              className={cn([
                'pl-4',
                ok && 'text-green-500',
                redirect && 'text-yellow-500',
                !ok && !redirect && 'text-red-500',
              ])}
            >
              {statusMessage}
            </td>
          </tr>
          <tr>
            <th className="text-left">Protocol:</th>
            <td className="pl-4">{protocol}</td>
          </tr>
          <tr>
            <th className="text-left">Type:</th>
            <td className="pl-4">{type}</td>
          </tr>
          <tr>
            <th className="text-left">Size:</th>
            <td className="pl-4">{size}</td>
          </tr>
          <tr>
            <th className="text-left">Local Date:</th>
            <td className="pl-4">{date?.toLocaleString?.() ?? ''}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ResponseStatus;
