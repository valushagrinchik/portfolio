import { LanguageProvider } from './contexts/LanguageContext'
import Projects from './components/Projects'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-gray-900">
        <Projects />
      </div>
    </LanguageProvider>
  )
}

export default App