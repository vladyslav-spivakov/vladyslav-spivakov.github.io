import { Container } from './container'

export type Language = 'en' | 'cz' | 'ua'

export interface Translator {
  readonly languages: Language[]
  getTranslation: (language: Language, key: string) => string
  getLocaleLabel: (language: Language) => string
}

export interface ContactItem {
  label: string
  value: string
  href?: string
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  summary: string
  skills: string[]
}

export interface Education {
  school: string
  degree: string
  period: string
  location: string
}

export interface Course {
  title: string
  provider: string
  issued: string
  credentialId?: string
  skills: string[]
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface Profile {
  name: string
  role: string
  location: string
  headline: string
  summary: string
  contacts: ContactItem[]
  skills: SkillGroup[]
  experience: Experience[]
  education: Education[]
  courses: Course[]
  image: string
}

export interface ProfileService {
  getProfile: (language: Language) => Profile
}

export const SERVICE_TOKENS = {
  translator: 'translator',
  profile: 'profile',
} as const

export const registerServices = (container: Container): Container => {
  container.register<Translator>(SERVICE_TOKENS.translator, () => {
    const translations: Record<Language, Record<string, string>> = {
      en: {
        title: 'Robotics & Computer Vision Engineer',
        headline: 'C++ / Python engineer delivering robotics, CV, and ML systems to production.',
        contact: 'Contact',
        skills: 'Core Skills',
        website: 'LinkedIn',
        experience: 'Experience',
        education: 'Education',
        courses: 'Courses & Certifications',
        summaryLabel: 'Summary',
      },
      cz: {
        title: 'Inženýr robotiky a počítačového vidění',
        headline: 'Inženýr C++ / Python dodávající systémy robotiky, CV a ML do produkce.',
        contact: 'Kontakt',
        skills: 'Klíčové dovednosti',
        website: 'LinkedIn',
        experience: 'Zkušenosti',
        education: 'Vzdělání',
        courses: 'Kurzy a certifikace',
        summaryLabel: 'Souhrn',
      },
      ua: {
        title: "Інженер робототехніки та комп'ютерного зору",
        headline: 'Інженер C++ / Python, впроваджую рішення з робототехніки, CV та ML у продакшн системи.',
        contact: 'Контакти',
        skills: 'Ключові навички',
        website: 'LinkedIn',
        experience: 'Досвід',
        education: 'Освіта',
        courses: 'Курси та сертифікації',
        summaryLabel: 'Підсумок',
      },
    }

    const locales: Record<Language, string> = {
      en: 'English',
      cz: 'Čeština',
      ua: 'Українська',
    }

    return {
      languages: Object.keys(locales) as Language[],
      getTranslation: (language, key) => translations[language][key] ?? key,
      getLocaleLabel: (language) => locales[language],
    }
  })

  container.register<ProfileService>(SERVICE_TOKENS.profile, () => {
    const contacts: ContactItem[] = [
      {
        label: 'Email',
        value: 'vladyslav.spivakov@gmail.com',
        href: 'mailto:vladyslav.spivakov@gmail.com',
      },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/vladyslav-spivakov',
        href: 'https://www.linkedin.com/in/vladyslav-spivakov',
      },
      {
        label: 'GitHub',
        value: 'github.com/vladyslav-spivakov',
        href: 'https://github.com/vladyslav-spivakov',
      },
      {
        label: 'Languages',
        value: 'English (B2+), Ukrainian (native), Czech (A1), German (A1)',
      },
    ]

    const skills: SkillGroup[] = [
      {
        title: 'Frontend / UI',
        items: ['Qt', 'Android Studio', 'React', 'Angular', 'Redux', 'Styled Components', 'SCSS/SASS', 'HTML5 / CSS3', 'JavaScript / TypeScript', 'Cypress'],
      },
      {
        title: 'Backend / Core',
        items: ['NestJS', 'Django', 'Flask', 'C++', 'Python', 'C# (basics)', 'Java (basics)', 'CMake', 'REST', 'RPC', 'Protobuf', 'gRPC', 'WebSockets', 'HTTP/HTTPS', 'SQL / NoSQL', 'GoogleTest / pytest'],
      },
      {
        title: 'AI / ML / CV',
        items: ['Machine Learning', 'Computer Vision', 'PyTorch', 'TensorFlow', 'YOLO', 'Diffusion Policy', 'NumPy', 'Pandas', 'PySpark', 'Jupyter / Colab', 'Matplotlib / Seaborn', 'OpenCV'],
      },
      {
        title: 'Cloud / Communication',
        items: ['Azure', 'CircleCI', 'Git (GitHub/GitLab/Bitbucket)', 'Datadog', 'YouTrack', 'ZeroMQ', 'IPC / INPROC', 'TCP / UDP'],
      },
      {
        title: 'Architecture & Process',
        items: ['OOP / SOLID', 'Docker', 'Design Patterns', 'Agile / Scrum / Kanban', 'Robotics', 'ROS2', 'Bash (scripts)', 'Linux / Windows'],
      },
    ]

    const courses: Course[] = [
      {
        title: 'Convolutional Neural Networks in TensorFlow',
        provider: 'Coursera',
        issued: 'Jul 2023',
        credentialId: '39DAN8HWVCU8',
        skills: ['Artificial Neural Networks', 'Python', 'CNN', 'Keras', 'TensorFlow', 'Deep Learning', 'Computer Vision'],
      },
      {
        title: 'DeepLearning.AI TensorFlow Developer Specialization',
        provider: 'Coursera',
        issued: 'Jul 2023',
        credentialId: 'UVYJKL5LUUE3',
        skills: ['Artificial Neural Networks', 'Python', 'TensorFlow', 'Deep Learning', 'Computer Vision'],
      },
      {
        title: 'Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization',
        provider: 'Coursera',
        issued: 'Jul 2023',
        credentialId: 'REKRXS9XFZTD',
        skills: ['Artificial Neural Networks', 'NumPy', 'Optimization', 'Python', 'TensorFlow', 'Deep Learning'],
      },
      {
        title: 'Introduction to TensorFlow for AI, ML, and DL',
        provider: 'Coursera',
        issued: 'Jul 2023',
        credentialId: 'MD27TAGY35JR',
        skills: ['Artificial Neural Networks', 'Python', 'CNN', 'TensorFlow', 'Deep Learning', 'Computer Vision'],
      },
      {
        title: 'Business Analysis Fundamentals',
        provider: 'EPAM Systems',
        issued: 'Jun 2023',
        credentialId: 'EPAMBAF23774',
        skills: ['Business Analysis', 'Agile', 'Scrum', 'Requirements Gathering'],
      },
      {
        title: 'Neural Networks and Deep Learning',
        provider: 'Coursera',
        issued: 'May 2023',
        credentialId: '2MF8MHGZHFJZ',
        skills: ['Artificial Neural Networks', 'NumPy', 'Python', 'Deep Learning', 'Machine Learning'],
      },
      {
        title: 'SQL for Data Science',
        provider: 'Coursera',
        issued: 'Sep 2022',
        credentialId: '6BDENSCML5EZ',
        skills: ['SQL', 'SQLite', 'Data Analysis'],
      },
      {
        title: 'Introduction to Java',
        provider: 'Coursera',
        issued: 'Jul 2022',
        credentialId: '9U8TGNH8YFV3',
        skills: ['Java', 'OOP', 'Core Java', 'JDBC'],
      },
      {
        title: 'Introduction to Object-Oriented Programming with Java',
        provider: 'Coursera',
        issued: 'Jul 2022',
        credentialId: 'TA2DDVBQ7V2X',
        skills: ['Java', 'OOP'],
      },
      {
        title: 'Object-Oriented Hierarchies in Java',
        provider: 'Coursera',
        issued: 'Jul 2022',
        credentialId: 'S9CU2KTS7UGG',
        skills: ['OOP', 'Java'],
      },
      {
        title: 'Python Online Marathon',
        provider: 'SoftServe',
        issued: 'Apr 2022',
        credentialId: 'Series XM № 8281/2022',
        skills: ['Python', 'Django', 'REST APIs', 'Scrum'],
      },
    ]

    const profiles: Record<Language, Profile> = {
      en: {
        name: 'Vladyslav Spivakov',
        role: 'C++ / Python Software Engineer',
        location: 'Prague, Czech Republic',
        headline: 'Robotics, ML, and AI engineer with commercial experience delivering production systems.',
        summary:
          'Software Engineer (3+ years) skilled in C++ and Python for robotics, ML, and AI. Build scalable architectures with OOP/SOLID, from data and model training through integration and deployment. Comfortable with CMake, Qt, OpenCV, ROS2, ZMQ, PyTorch/TensorFlow, Docker, CI/CD, and frontend/backend stacks (React, NestJS, Django).',
        contacts,
        skills,
        experience: [
          {
            company: 'SOMATIC',
            role: 'Software Engineer / MLOps',
            period: 'Mar 2025 - Present',
            location: 'Lviv, Ukraine - Hybrid',
            summary:
              'Robotics/CV engineering plus MLOps: data collection and validation, training/evaluating NN architectures, autonomous reporting for metrics, IPC/INPROC/TCP comms, automation scripts, performance analysis, linters/Git hooks, and tech strategy across milestones.',
            skills: ['C++', 'Python', 'CMake', 'Qt', 'OpenCV', 'ZMQ', 'ROS2', 'GoogleTest', 'PyTorch', 'TensorFlow', 'Docker', 'Azure', 'CircleCI', 'YouTrack', 'Git'],
          },
          {
            company: 'SOMATIC',
            role: 'Software Engineer',
            period: 'Jul 2023 - Mar 2025',
            location: 'Lviv, Ukraine - Hybrid',
            summary:
              'Delivered robotics features and CV pipelines using OOP/SOLID, improved communication layers, refactored core components, mentored students, and ran internal lectures.',
            skills: ['Robotics', 'OOP', 'Computer Vision', 'C++', 'Python', 'Git', 'Design Patterns'],
          },
          {
            company: 'Intela',
            role: 'Full-Stack AI/ML Engineer (Freelance)',
            period: 'Mar 2022 - Apr 2023',
            location: 'Remote',
            summary:
              'Full-cycle e-commerce features with ML: React/TypeScript front-end, Django REST back-end, Azure/Stripe integrations, PyTorch models, Dockerized services, CI/CD, and testing (Cypress/Pytest).',
            skills: ['React', 'TypeScript', 'Redux', 'SCSS/SASS', 'Styled Components', 'Cypress', 'Django REST', 'Azure', 'Stripe API', 'PyTorch', 'Docker', 'CI/CD', 'Microservices', 'SQL/NoSQL', 'Pytest'],
          },
        ],
        education: [
          {
            school: 'Lviv Polytechnic National University',
            degree: "Master's, Computer Science (Artificial Intelligence)",
            period: 'Sep 2025 - Jan 2027 (in progress)',
            location: 'Lviv, Ukraine',
          },
          {
            school: 'Lviv Polytechnic National University',
            degree: "Bachelor's, Computer Science (Artificial Intelligence) - Diploma with Honors",
            period: 'Sep 2021 - Jun 2025',
            location: 'Lviv, Ukraine',
          },
          {
            school: 'Lviv Physics and Mathematics Lyceum',
            degree: 'High School',
            period: 'Sep 2017 - Jun 2021',
            location: 'Lviv, Ukraine',
          },
        ],
        courses,
        image: '/profile.jpg',
      },
      cz: {
        name: 'Vladyslav Spivakov',
        role: 'Softwarový inženýr C++ / Python',
        location: 'Praha, Česko (relokace / remote otevřená)',
        headline: 'Inženýr robotiky, ML a AI s komerční zkušeností s dodávkou produkčních systémů.',
        summary:
          'Softwarový inženýr (3+ roky) se znalostí C++ a Pythonu pro robotiku, ML a AI. Stavím škálovatelné architektury s OOP/SOLID, od dat a tréninku modelů přes integraci až po nasazení. Mám praxi s CMake, Qt, OpenCV, ROS2, ZMQ, PyTorch/TensorFlow, Dockerem, CI/CD a frontend/backend stacky (React, NestJS, Django).',
        contacts,
        skills,
        experience: [
          {
            company: 'SOMATIC',
            role: 'Software Engineer / MLOps',
            period: 'Mar 2025 - Present',
            location: 'Lvov, Ukrajina - hybridně',
            summary:
              'Robotika/CV a MLOps: sběr a validace dat, trénink/hodnocení NN architektur, automatizované reporty metrik, IPC/INPROC/TCP komunikace, skripty pro automatizaci, analýza výkonu, lintry/Git hooky a technická strategie napříč milníky.',
            skills: ['C++', 'Python', 'CMake', 'Qt', 'OpenCV', 'ZMQ', 'ROS2', 'GoogleTest', 'PyTorch', 'TensorFlow', 'Docker', 'Azure', 'CircleCI', 'YouTrack', 'Git'],
          },
          {
            company: 'SOMATIC',
            role: 'Software Engineer',
            period: 'Jul 2023 - Mar 2025',
            location: 'Lvov, Ukrajina - hybridně',
            summary:
              'Dodával jsem funkce robotiky a CV pipeline s OOP/SOLID, vylepšil komunikační vrstvy, refaktoroval jádro, mentoroval studenty a vedl interní přednášky.',
            skills: ['Robotics', 'OOP', 'Computer Vision', 'C++', 'Python', 'Git', 'Design Patterns'],
          },
          {
            company: 'Intela',
            role: 'Full-Stack AI/ML Engineer (Freelance)',
            period: 'Mar 2022 - Apr 2023',
            location: 'Remote',
            summary:
              'End-to-end e-commerce funkce s ML: front-end React/TypeScript, back-end Django REST, integrace Azure/Stripe, modely v PyTorch, dockerizované služby, CI/CD a testy (Cypress/Pytest).',
            skills: ['React', 'TypeScript', 'Redux', 'SCSS/SASS', 'Styled Components', 'Cypress', 'Django REST', 'Azure', 'Stripe API', 'PyTorch', 'Docker', 'CI/CD', 'Microservices', 'SQL/NoSQL', 'Pytest'],
          },
        ],
        education: [
          {
            school: 'Lviv Polytechnic National University',
            degree: 'Magisterské studium, Informatika (Umělá inteligence) – probíhá',
            period: 'Sep 2025 - Jan 2027 (probíhá)',
            location: 'Lvov, Ukrajina',
          },
          {
            school: 'Lviv Polytechnic National University',
            degree: 'Bakalářské studium, Informatika (Umělá inteligence) – diplom s vyznamenáním',
            period: 'Sep 2021 - Jun 2025',
            location: 'Lvov, Ukrajina',
          },
          {
            school: 'Lviv Physics and Mathematics Lyceum',
            degree: 'Střední škola',
            period: 'Sep 2017 - Jun 2021',
            location: 'Lvov, Ukrajina',
          },
        ],
        courses,
        image: '/profile.jpg',
      },
      ua: {
        name: 'Vladyslav Spivakov',
        role: 'Інженер-програміст C++ / Python',
        location: 'Прага, Чехія (релокація / відкритий до remote)',
        headline: 'Інженер з робототехніки, ML та AI з комерційним досвідом впровадження рішень у продакшен.',
        summary:
          'Інженер-програміст (3+ роки) з досвідом у C++ та Python для робототехніки, ML та AI. Будую масштабовані архітектури за принципами OOP/SOLID: від даних і навчання моделей до інтеграції та деплою. Працював з CMake, Qt, OpenCV, ROS2, ZMQ, PyTorch/TensorFlow, Docker, CI/CD і фронтенд/бекенд стеками (React, NestJS, Django).',
        contacts,
        skills,
        experience: [
          {
            company: 'SOMATIC',
            role: 'Software Engineer / MLOps',
            period: 'Mar 2025 - Present',
            location: 'Львів, Україна — гібридний формат',
            summary:
              'Роботика/CV плюс MLOps: збір і валідація даних, тренування та оцінка NN-архітектур, автоматичні звіти з метрик, IPC/INPROC/TCP комунікації, скрипти автоматизації, аналіз продуктивності, лінтери/Git-hooks і техстратегія між етапами.',
            skills: ['C++', 'Python', 'CMake', 'Qt', 'OpenCV', 'ZMQ', 'ROS2', 'GoogleTest', 'PyTorch', 'TensorFlow', 'Docker', 'Azure', 'CircleCI', 'YouTrack', 'Git'],
          },
          {
            company: 'SOMATIC',
            role: 'Software Engineer',
            period: 'Jul 2023 - Mar 2025',
            location: 'Львів, Україна — гібридний формат',
            summary:
              'Реалізовував функції робототехніки та CV-пайплайни з OOP/SOLID, покращував комунікаційні шари, рефакторив ядро, менторив студентів і проводив внутрішні лекції.',
            skills: ['Robotics', 'OOP', 'Computer Vision', 'C++', 'Python', 'Git', 'Design Patterns'],
          },
          {
            company: 'Intela',
            role: 'Full-Stack AI/ML Engineer (Freelance)',
            period: 'Mar 2022 - Apr 2023',
            location: 'Remote',
            summary:
              'Повний цикл e-commerce з ML: фронтенд React/TypeScript, бекенд Django REST, інтеграції Azure/Stripe, моделі в PyTorch, docker-сервіси, CI/CD та тести (Cypress/Pytest).',
            skills: ['React', 'TypeScript', 'Redux', 'SCSS/SASS', 'Styled Components', 'Cypress', 'Django REST', 'Azure', 'Stripe API', 'PyTorch', 'Docker', 'CI/CD', 'Microservices', 'SQL/NoSQL', 'Pytest'],
          },
        ],
        education: [
          {
            school: 'Lviv Polytechnic National University',
            degree: "Магістратура, Computer Science (Artificial Intelligence) — в процесі",
            period: 'Sep 2025 - Jan 2027 (триває)',
            location: 'Львів, Україна',
          },
          {
            school: 'Lviv Polytechnic National University',
            degree: "Бакалавр, Computer Science (Artificial Intelligence) — диплом з відзнакою",
            period: 'Sep 2021 - Jun 2025',
            location: 'Львів, Україна',
          },
          {
            school: 'Lviv Physics and Mathematics Lyceum',
            degree: 'Середня освіта',
            period: 'Sep 2017 - Jun 2021',
            location: 'Львів, Україна',
          },
        ],
        courses,
        image: '/profile.jpg',
      },
    }

    return {
      getProfile: (language: Language) => profiles[language],
    }
  })

  return container
}
