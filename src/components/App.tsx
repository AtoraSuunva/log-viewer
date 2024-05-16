import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Layout from './Layout'
import LogView from './LogView'
import NotFound from './NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/:channelId/:attachmentId/:fileName"
          element={<LogView />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
