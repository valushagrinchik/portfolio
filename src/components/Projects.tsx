import { ExternalLink, Github, Globe, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import projectsData from '../config/projects.json'
import sanMartinImage from '../assets/projects/sanmartin.png'

export default function Projects() {
  const { language, setLanguage, t } = useLanguage()
  const [filter, setFilter] = useState< 'frontend' | 'backend' | 'fullstack'>('fullstack')
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

  useEffect(() => {
    const handleFilterEvent = (event: CustomEvent) => {
      setFilter(event.detail)
    }

    window.addEventListener('setProjectFilter', handleFilterEvent as EventListener)
    
    return () => {
      window.removeEventListener('setProjectFilter', handleFilterEvent as EventListener)
    }
  }, [])

  const projects = projectsData.map(project => ({
    ...project,
    categories: project.categories as ('frontend' | 'backend' | 'fullstack')[],
    image: project.image === "/projects/sanmartin.png" ? sanMartinImage : project.image
  }))

  const filteredProjects = projects.filter(project => 
    project.categories.includes(filter)
  )

  return (
    <section id="projects" className="min-h-screen py-32 bg-gray-50 relative">
      <div className="absolute top-8 right-8">
        <div className="relative">
          <button
            disabled={true}
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Globe size={18} />
            <span className="font-medium">
              {language === 'en' ? 'EN' : 'RU'}
            </span>
            <ChevronDown size={16} className={`transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <button
                onClick={() => {
                  setLanguage('en')
                  setIsLanguageDropdownOpen(false)
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                  language === 'en' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  setLanguage('ru')
                  setIsLanguageDropdownOpen(false)
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                  language === 'ru' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                Russian
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 gradient-text">
          Full Stack Developer
        </h1>
        
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {t('technologies')}
          </p>
          <div className="flex flex-col items-center gap-6 mb-8">
            <div className="grid grid-cols-3 grid-rows-2 gap-4 max-w-4xl mx-auto">
              <div className="col-span-2 row-span-1 text-center flex items-center justify-center bg-blue-100 text-blue-800 rounded-lg font-semibold text-xl">
                  TypeScript
              </div>
              <div className="col-span-1 row-span-2 text-center flex items-center justify-center bg-purple-100 text-purple-800 rounded-lg font-semibold text-xl">
                  PostgreSQL
              </div>
              <div className="col-span-1 row-span-1 text-center">
                <div className="px-6 py-3 bg-green-100 text-green-800 rounded-lg font-semibold text-lg">
                  Node.js
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  <div className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-sm font-medium">
                    Express.js
                  </div>
                  <div className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-sm font-medium">
                    Nest.js
                  </div>
                </div>
              </div>
              <div className="col-span-1 row-span-1 text-center">
                <div className="px-6 py-3 bg-cyan-100 text-cyan-800 rounded-lg font-semibold text-lg">
                  React
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  <div className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-md text-sm font-medium">
                    Next.js
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('fullstack')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'fullstack' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Fullstack
          </button>
          <button
            onClick={() => setFilter('frontend')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'frontend' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('frontend')}
          </button>
          <button
            onClick={() => setFilter('backend')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'backend' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('backend')}
          </button>

        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
              <div className="h-48 relative overflow-hidden">
                {project.image !== "/api/placeholder/600/400" ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onLoad={(e) => {
                      console.log(`Image loaded successfully: ${project.image}`);
                    }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      console.log(`Image failed to load: ${project.image}`);
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center" style={{display: project.image !== "/api/placeholder/600/400" ? 'none' : 'flex'}}>
                  <div className="text-white text-center">
                    <div className="text-6xl mb-2">{'\ud83d\ude80'}</div>
                    <div className="text-sm opacity-75">{t('projectPreview')}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <div className="mt-1">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                        {project.domain?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {project.categories.map((category) => (
                      <span
                        key={category}
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          category === 'frontend' 
                            ? 'bg-blue-100 text-blue-800' 
                            : category === 'backend'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {category === 'frontend' ? 'Frontend' : category === 'backend' ? 'Backend' : 'Fullstack'}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">{t('keyFeatures')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">{t('technologiesUsed')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Github size={18} />
                    {t('github')}
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink size={18} />
                    {t('demo')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
