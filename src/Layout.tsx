type LayoutProps = { children: React.ReactNode };

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="shadow-sm shadow-black sticky top-0 bg-background">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex place-content-between items-center">
          <h1 className="text-2xl font-bold">HTTP Response Viewer</h1>
          <span className="text-md text-white hidden md:inline-block">
            Sergio Ramirez Gonzalez
          </span>
        </div>
      </header>
      <main>
        <div className="mx-4 sm:mx-6 lg:mx-8 my-4 sm:my-6 lg:my-8">
          {children}
        </div>
      </main>
      <footer className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} HTTP Response Viewer</p>
          <p>Sergio Ramirez Gonzalez</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
