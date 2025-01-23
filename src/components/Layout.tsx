import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Outlet } from 'react-router'
import { ThemeSwitcher } from './ThemeSwitcher'

function fallbackRender({ error }: FallbackProps): React.ReactNode {
  return (
    <div>
      <h2>Something went wrong.</h2>
      <p>{error}</p>
    </div>
  )
}

export default function Layout() {
  return (
    <>
      <header>
        <a href="/" className="title">
          <img src="/open-book.svg" alt="Log Viewer" />
          <h1>Log Viewer</h1>
        </a>
        <ThemeSwitcher />
      </header>
      <main>
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <footer>
        By <a href="https://atora.dev">atora.dev</a> -{' '}
        <a href="https://github.com/widgetbot-io/message-renderer">
          Message Renderer
        </a>{' '}
        - Source: <a href="https://github.com/AtoraSuunva/log-viewer">GitHub</a>
      </footer>
    </>
  )
}
