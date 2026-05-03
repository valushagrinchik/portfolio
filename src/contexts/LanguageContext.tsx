import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type Language = 'ru' | 'en'

interface Translations {
  [key: string]: {
    ru: string
    en: string
  }
}

const translations: Translations = {
  // Navigation
  'about': { ru: 'Обо мне', en: 'About' },
  'skills': { ru: 'Навыки', en: 'Skills' },
  'projects': { ru: 'Проекты', en: 'Projects' },
  'contacts': { ru: 'Контакты', en: 'Contacts' },
  
  // Hero
  'fullStackDeveloper': { ru: 'Full Stack Разработчик', en: 'Full Stack Developer' },
  'heroDescription': { 
    ru: 'Создаю современные веб-приложения и чат-ботов с использованием передовых технологий',
    en: 'I create modern web applications and chatbots using cutting-edge technologies'
  },
  'frontendProjects': { ru: 'Frontend проекты', en: 'Frontend Projects' },
  'backendProjects': { ru: 'Backend проекты', en: 'Backend Projects' },
  'allProjects': { ru: 'Все проекты', en: 'All Projects' },
  'downloadResume': { ru: 'Скачать резюме', en: 'Download Resume' },
  
  // About
  'aboutTitle': { ru: 'Обо мне', en: 'About Me' },
  'aboutDescription1': { 
    ru: 'Я Full Stack разработчик с опытом создания современных веб-приложений и интеллектуальных чат-ботов. Специализируюсь на разработке масштабируемых решений с использованием передовых технологий.',
    en: 'I am a Full Stack developer with experience in creating modern web applications and intelligent chatbots. I specialize in developing scalable solutions using cutting-edge technologies.'
  },
  'aboutDescription2': { 
    ru: 'Моя страсть - создавать продукты, которые решают реальные проблемы пользователей и приносят пользу бизнесу. Я постоянно изучаю новые технологии и следую современным практикам разработки.',
    en: 'My passion is creating products that solve real user problems and benefit business. I constantly learn new technologies and follow modern development practices.'
  },
  'yearsExperience': { ru: 'года опыта', en: 'years of experience' },
  'projectsCompleted': { ru: 'проектов', en: 'projects completed' },
  'frontend': { ru: 'Frontend', en: 'Frontend' },
  'backend': { ru: 'Backend', en: 'Backend' },
  'devOps': { ru: 'DevOps', en: 'DevOps' },
  'chatBots': { ru: 'Chat-боты', en: 'Chat-bots' },
  
  // Skills
  'skillsTitle': { ru: 'Навыки', en: 'Skills' },
  
  // Projects
  'projectsTitle': { ru: 'Проекты', en: 'Projects' },
  'keyFeatures': { ru: 'Ключевые функции:', en: 'Key Features:' },
  'technologiesUsed': { ru: 'Технологии:', en: 'Technologies:' },
  'github': { ru: 'GitHub', en: 'GitHub' },
  'demo': { ru: 'Демо', en: 'Demo' },
  'projectPreview': { ru: 'Превью проекта', en: 'Project Preview' },
  
  // Contact
  'contactTitle': { ru: 'Контакты', en: 'Contact' },
  'letsWorkTogether': { ru: 'Давайте работать вместе', en: "Let's Work Together" },
  'contactDescription': { 
    ru: 'Я всегда открыт для обсуждения новых проектов, творческих идей или возможностей стать частью вашей команды.',
    en: "I'm always open to discussing new projects, creative ideas, or opportunities to become part of your team."
  },
  'email': { ru: 'Email', en: 'Email' },
  'phone': { ru: 'Телефон', en: 'Phone' },
  'location': { ru: 'Локация', en: 'Location' },
  'socialNetworks': { ru: 'Социальные сети', en: 'Social Networks' },
  'sendMessage': { ru: 'Отправить сообщение', en: 'Send Message' },
  'name': { ru: 'Имя', en: 'Name' },
  'message': { ru: 'Сообщение', en: 'Message' },
  
  // Footer
  'navigation': { ru: 'Навигация', en: 'Navigation' },
  'allRightsReserved': { ru: 'Все права защищены', en: 'All rights reserved' },
  'backToTop': { ru: 'Наверх', en: 'Back to Top' }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
