export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export const navItems: NavItem[] = [
  { label: '소개', href: '/about' },
  { label: '프로젝트', href: '/projects' },
  { label: '이력서', href: '/resume' },
  { label: 'GitHub', href: 'https://github.com/dlsrbChoi', external: true },
]
