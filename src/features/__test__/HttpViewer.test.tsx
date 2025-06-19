import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HttpViewer from '../HttpViewer';

// Mock dependencies
vi.mock('@/components/ResponseViewer', () => ({
  default: () => <div data-testid="response-viewer">ResponseViewer</div>,
}));
vi.mock('@/components/ui/textarea', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Textarea: (props: any) => <textarea data-testid="textarea" {...props} />,
}));

vi.mock('@/lib/debounce', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (fn: any) => fn,
}));

describe('HttpViewer', () => {
  it('renders textarea and response section', () => {
    render(<HttpViewer />);
    expect(
      screen.getByPlaceholderText(/enter http request/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/response/i)).toBeInTheDocument();
  });

  it('not shows error message for empty input', async () => {
    render(<HttpViewer />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: '' } });
    await waitFor(() =>
      expect(screen.queryByText(/empty request/i)).not.toBeInTheDocument(),
    );
  });

  it('shows error message for whitespace input', async () => {
    render(<HttpViewer />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: '   ' } });
    await waitFor(() =>
      expect(screen.queryByText(/empty request/i)).toBeInTheDocument(),
    );
  });

  it('shows error message for invalid input', async () => {
    render(<HttpViewer />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: 'ERROR' } });
    await waitFor(() =>
      expect(screen.getByText(/invalid/i)).toBeInTheDocument(),
    );
  });

  it('shows "Content not found" error when input has headers but no body separator', async () => {
    render(<HttpViewer />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, {
      target: {
        value: [
          'HTTP/1.1 200 OK',
          'Content-Type: text/html',
          'Content-Length: 10',
          // No empty line here!
          '<html></html>',
        ].join('\n'),
      },
    });
    await waitFor(() =>
      expect(screen.getByText(/content not found/i)).toBeInTheDocument(),
    );
  });

  it('renders ResponseViewer when input is valid', async () => {
    render(<HttpViewer />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: 'HTTP/1.1 200 OK' } });
    await waitFor(() =>
      expect(screen.getByTestId('response-viewer')).toBeInTheDocument(),
    );
  });
});
