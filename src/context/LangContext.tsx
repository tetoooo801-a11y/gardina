import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Lang = 'en' | 'ar'

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  isAr: boolean
  t: (en: string, ar: string) => string
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  isAr: false,
  t: (en) => en,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  const setLang = (l: Lang) => {
    setLangState(l)
    const html = document.documentElement
    html.setAttribute('data-lang', l)
    html.setAttribute('lang', l)
    html.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr')
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', 'en')
    document.documentElement.setAttribute('lang', 'en')
    document.documentElement.setAttribute('dir', 'ltr')
  }, [])

  const t = (en: string, ar: string) => lang === 'ar' ? ar : en

  return (
    <LangContext.Provider value={{ lang, setLang, isAr: lang === 'ar', t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
