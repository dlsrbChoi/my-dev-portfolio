export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export const navItems: NavItem[] = [
  { label: '소개', href: '/#about' },
  { label: '경력', href: '/#experience' },
  { label: '학력', href: '/#education' },
  { label: '프로젝트', href: '/#projects' },
  { label: '기술', href: '/#skills' },
  { label: 'GitHub', href: 'https://github.com/dlsrbChoi', external: true },
]
