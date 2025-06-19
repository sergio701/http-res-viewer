import type { HTMLAttributes } from 'react';

type ResponseHeadersProps = {
  headers: Record<string, string>;
} & HTMLAttributes<HTMLDivElement>;

function ResponseHeaders({ headers, ...props }: ResponseHeadersProps) {
  return (
    <div {...props}>
      <table>
        <tbody>
          {Object.entries(headers).map(([key, value]) => (
            <tr key={key}>
              <td className="capitalize">{key}:</td>
              <td className="pl-4">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResponseHeaders;
