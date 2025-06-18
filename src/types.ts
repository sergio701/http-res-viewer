export type HttpRequest = {
  protocol?: string;
  statusCode?: string;
  statusMessage?: string;
  type?: string;
  size?: string;
  date?: Date;
  ok?: boolean;
  redirect?: boolean;
  headers: Record<string, string>;
  body?: string;
  error?: string;
};
