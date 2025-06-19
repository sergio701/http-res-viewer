# HTTP Response Viewer

**HTTP Response Viewer** is a simple web app that lets you paste a raw HTTP response text and instantly see its status, headers, and body in a clear, organized way. It supports HTML, JSON, and XML response bodies with special viewers for each type.

---

## Frameworks and Technologies

- **React** – UI library for building interactive interfaces
- **TypeScript** – Static typing for safer code
- **Vite** – Fast development server and build tool
- **Tailwind CSS** – Utility-first CSS framework
- **shadcn/ui** – Accessible and customizable React UI components
- **react-json-view** – JSON viewer component
- **react-xml-viewer** – XML viewer component
- **Vitest** – Unit testing framework
- **React Testing Library** – For React component testing
- **ESLint & Prettier** – Code linting and formatting

---

## Getting Started

### Prerequisites

- Node.js (>= 20.x)
- npm (>= 10.x)

### Installation

```bash
git clone https://github.com/sergio701/http-res-viewer.git
cd http-res-viewer
npm install
```

### Development

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Test

```bash
npm run test
```

### Additional Scripts

- **`npm run test:watch`** – Run tests in watch mode
- **`npm run lint`** – Lint all source files
- **`npm run lint:fix`** – Lint and auto-fix source files
- **`npm run prettier`** – Format all supported files with Prettier
- **`npm run prettier:check`** – Check formatting with Prettier
- **`npm run preview`** – Preview the production build locally

---

## Usage

1. **Paste** a raw HTTP response (see [Assumptions](#assumptions) for format) into the textarea.
2. The app will parse and display:
   - **Status** (code, message, protocol, etc.)
   - **Headers** (as a table)
   - **Body** (rendered as HTML, JSON, XML, or plain text)
3. Use the **Copy** and **Paste** buttons for quick clipboard operations.

---

## Assumptions

- The input should be a **raw HTTP response** as received from a server, including the status line, headers, and (optionally) the body.
- **Format:**
  - The first line must be a valid HTTP status line, e.g.:
    ```
    HTTP/1.1 200 OK
    ```
  - Headers follow, one per line, in the format:
    ```
    Header-Name: value
    ```
  - There must be an **empty line** (at least one blank line) between headers and body.
  - The body (if present) follows the empty line.
- **Supported body types:**  
  - `Content-Type: text/html` → rendered as HTML  
  - `Content-Type: application/json` → rendered as JSON  
  - `Content-Type: application/xml` or `text/xml` → rendered as XML  
  - Other types are shown as plain text.
- **Malformed input** (missing status line, headers, or body separator) will show an error message.
- **Examples:** See the [`samples/`](./samples/) directory for sample HTTP responses

---

## Example Input

```
HTTP/1.1 200 OK
Date: Mon, 27 Jul 2009 12:28:53 GMT
Server: Apache/2.2.14 (Win32)
Last-Modified: Wed, 22 Jul 2009 19:15:56 GMT
Content-Length: 123
Content-Type: application/xml
Connection: Closed

<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>User</to>
  <from>Server</from>
  <heading>Reminder</heading>
  <body>Hello, World!</body>
</note>
```

---

<img width="1399" alt="http-res-viewer" src="https://github.com/user-attachments/assets/a1fd67c8-a3c4-45ad-ab54-bbf88225172a" />
