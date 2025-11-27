import { StrictMode, useEffect, useMemo, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Container } from './container'
import { SERVICE_TOKENS, registerServices } from './services'
import type { Course, Education, Experience, ProfileService, SkillGroup, Translator, Language } from './services'

const container = registerServices(new Container())

type SectionProps = {
  title: string
  children: ReactNode
  className?: string
}

const Section = ({ title, children, className }: SectionProps) => (
  <section className={['section', className].filter(Boolean).join(' ')}>
    <header className="section__header">
      <h2>{title}</h2>
      <span className="dot" />
    </header>
    {children}
  </section>
)

const Badge = ({ label }: { label: string }) => <span className="badge">{label}</span>

type ItemListProps<T> = {
  items: T[]
  render: (item: T, index: number) => ReactNode
}

const ItemList = <T,>({ items, render }: ItemListProps<T>) => (
  <div className="stack">{items.map((item, index) => render(item, index))}</div>
)

const ExperienceCard = ({ item }: { item: Experience }) => (
  <article className="panel">
    <div className="panel__header">
      <div>
        <p className="muted">{item.company}</p>
        <h3>{item.role}</h3>
        <p className="muted">
          {item.period} | {item.location}
        </p>
      </div>
    </div>
    <p className="panel__summary">{item.summary}</p>
    <div className="chip-row">
      {item.skills.map((skill) => (
        <Badge key={skill} label={skill} />
      ))}
    </div>
  </article>
)

const EducationCard = ({ item }: { item: Education }) => (
  <article className="panel">
    <div className="panel__header">
      <div>
        <p className="muted">{item.school}</p>
        <h3>{item.degree}</h3>
        <p className="muted">
          {item.period} | {item.location}
        </p>
      </div>
    </div>
  </article>
)

const CourseCard = ({ item }: { item: Course }) => (
  <article className="panel panel--compact">
    <div>
      <h4>{item.title}</h4>
      <p className="muted">
        {item.provider} | {item.issued}
      </p>
      {item.credentialId ? <p className="muted small">Credential: {item.credentialId}</p> : null}
    </div>
    <div className="chip-row">
      {item.skills.slice(0, 4).map((skill) => (
        <Badge key={skill} label={skill} />
      ))}
    </div>
  </article>
)

const App = () => {
  const translator = useMemo(() => container.resolve<Translator>(SERVICE_TOKENS.translator), [])
  const profileService = useMemo(() => container.resolve<ProfileService>(SERVICE_TOKENS.profile), [])
  const [language, setLanguage] = useState<Language>('en')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const handleContactClick = (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('mailto:')) {
      event.preventDefault()
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const t = (key: string) => translator.getTranslation(language, key)
  const profile = profileService.getProfile(language)

  return (
    <main className="page">
      <div className="card">
        <div className="card__header">
          <div className="identity">
            <div className="avatar">
              <img src={profile.image} alt={`${profile.name} portrait`} />
            </div>
            <div>
              <p className="eyebrow">{t('title')}</p>
              <h1>{profile.name}</h1>
              <p className="headline">{profile.headline}</p>
              <p className="muted">{profile.location}</p>
            </div>
          </div>
          <div className="controls">
            <div className="lang-switch">
              {translator.languages.map((lng) => (
                <button
                  key={lng}
                  className={lng === language ? 'pill pill--active' : 'pill'}
                  onClick={() => setLanguage(lng)}
                  type="button"
                  aria-label={translator.getLocaleLabel(lng)}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={theme === 'dark' ? 'pill pill--active theme-toggle' : 'pill theme-toggle'}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              <span aria-hidden="true">{theme === 'dark' ? '🌙' : '☀️'}</span>
              <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>

        <div className="content-grid">
          <div className="column column--main">
            <Section title={t('summaryLabel')} className="section--summary">
              <p className="section__lead">{profile.summary}</p>
            </Section>

            <Section title={t('experience')}>
              <ItemList items={profile.experience} render={(item) => <ExperienceCard item={item} />} />
            </Section>

            <Section title={t('education')}>
              <ItemList items={profile.education} render={(item) => <EducationCard item={item} />} />
            </Section>
          </div>

          <div className="column column--side">
            <Section title={t('contact')} className="section--contact">
              <ul className="list list--bordered">
                {profile.contacts.map((item) => (
                  <li key={item.label}>
                    <span className="muted">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => handleContactClick(item.href!, event)}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title={t('skills')} className="section--dense">
              <div className="stack">
                {profile.skills.map((group: SkillGroup) => (
                  <div key={group.title} className="skill-group">
                    <p className="muted">{group.title}</p>
                    <div className="skill-grid">
                      {group.items.map((skill) => (
                        <Badge key={skill} label={skill} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>

        <div className="content-grid content-grid--full">
          <Section title={t('courses')} className="section--dense section--wide">
            <div className="courses-grid">
              {profile.courses.map((course) => (
                <CourseCard key={`${course.title}-${course.issued}`} item={course} />
              ))}
            </div>
          </Section>
        </div>
      </div>
    </main>
  )
}

const root = createRoot(document.getElementById('app')!)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
