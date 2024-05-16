import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header>
        <a href="/" className="title">
          <img src="/open-book.svg" alt="Log Viewer" />
          <h1>Log Viewer</h1>
        </a>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        By <a href="https://atora.dev">atora.dev</a> - Source:{' '}
        <a href="https://github.com/AtoraSuunva/log-viewer">GitHub</a>
      </footer>
    </>
  )
}
