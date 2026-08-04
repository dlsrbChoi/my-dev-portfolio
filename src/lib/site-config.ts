export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  name: '최인규',
  email: 'awdzx456@naver.com',
  github: 'https://github.com/dlsrbChoi',
  description: '프론트엔드에서 풀스택으로 성장한 개발자 최인규의 포트폴리오',
  phone: '',
  location: '',
  skillCategories: [
    {
      category: '프론트엔드',
      items: ['TypeScript', 'React', 'Vue.js', 'Next.js', 'TailwindCSS'],
    },
    {
      category: '백엔드',
      items: ['Spring Boot', 'Node.js', 'Python', 'MySQL', 'PostgreSQL'],
    },
    {
      category: '도구 & 플랫폼',
      items: ['Git', 'Docker', 'CI/CD', 'AWS', 'Vercel'],
    },
  ],
}
