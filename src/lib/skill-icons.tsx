import { ReactNode } from 'react'
import {
  SiTypescript,
  SiReact,
  SiVuedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiSpringboot,
  SiNodedotjs,
  SiPython,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiVercel,
} from 'react-icons/si'
import { Workflow, Cloud } from 'lucide-react'

// 기술 이름을 아이콘 컴포넌트로 매핑
const skillIconMap: Record<string, () => ReactNode> = {
  'TypeScript': () => <SiTypescript className="h-5 w-5" />,
  'React': () => <SiReact className="h-5 w-5" />,
  'Vue.js': () => <SiVuedotjs className="h-5 w-5" />,
  'Next.js': () => <SiNextdotjs className="h-5 w-5" />,
  'TailwindCSS': () => <SiTailwindcss className="h-5 w-5" />,
  'Spring Boot': () => <SiSpringboot className="h-5 w-5" />,
  'Node.js': () => <SiNodedotjs className="h-5 w-5" />,
  'Python': () => <SiPython className="h-5 w-5" />,
  'MySQL': () => <SiMysql className="h-5 w-5" />,
  'PostgreSQL': () => <SiPostgresql className="h-5 w-5" />,
  'Git': () => <SiGit className="h-5 w-5" />,
  'Docker': () => <SiDocker className="h-5 w-5" />,
  'CI/CD': () => <Workflow className="h-5 w-5" />,
  'AWS': () => <Cloud className="h-5 w-5" />,
  'Vercel': () => <SiVercel className="h-5 w-5" />,
}

// 기술 이름에 해당하는 아이콘 반환, 없으면 undefined 반환
export function getSkillIcon(skillName: string): ReactNode | undefined {
  const iconComponent = skillIconMap[skillName]
  return iconComponent ? iconComponent() : undefined
}
