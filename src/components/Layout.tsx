import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Outlet } from 'react-router'

import { ThemeSwitcher } from './ThemeSwitcher'

function fallbackRender({ error }: FallbackProps): React.ReactNode {
  const errorMessage = error instanceof Error ? error.message : String(error)

  return (
    <div>
      <h2>Something went wrong.</h2>
      <p>{errorMessage}</p>
    </div>
  )
}

export default function Layout() {
  const branch = import.meta.env.WORKERS_CI_BRANCH
  const commitSha = import.meta.env.WORKERS_CI_COMMIT_SHA
  const shortSha = commitSha?.slice(0, 7)
  const commitUrl = commitSha
    ? `https://github.com/AtoraSuunva/log-viewer/commit/${commitSha}`
    : 'https://github.com/AtoraSuunva/log-viewer'

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
        By <a href="https://atora.dev">atora.dev</a> • Source:{' '}
        <a href={commitUrl}>{branch && shortSha ? `${branch}/${shortSha}` : 'GitHub'}</a> •{' '}
        <a href="https://github.com/widgetbot-io/message-renderer">Message Renderer Library</a>
      </footer>
    </>
  )
}
