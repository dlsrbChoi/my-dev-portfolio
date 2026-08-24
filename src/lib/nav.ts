export interface NavItem {
  // messages의 nav 네임스페이스 키 (예: 'about', 'experience')
  labelKey: string
  href: string
  external?: boolean
}

export const navItems: NavItem[] = [
  { labelKey: 'about', href: '/#about' },
  { labelKey: 'experience', href: '/#experience' },
  { labelKey: 'projects', href: '/#projects' },
  { labelKey: 'sideProjects', href: '/#sideProjects' },
  { labelKey: 'skills', href: '/#skills' },
  { labelKey: 'education', href: '/#education' },
  { labelKey: 'contact', href: '/#contact' },
]
