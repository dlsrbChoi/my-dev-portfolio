// 정적 학력 및 자격/수상 데이터 정의

export interface EducationEntry {
  id: string
  school: string
  major: string
  period: { start: string; end: string }
  gpa: string
  gpaScale: string
  status: string
  courses: {
    basic: string[]
    major: string[]
  }
}

export interface CertificateEntry {
  id: string
  name: string
  organization: string
  date: string
}

export const educationData: EducationEntry[] = [
  {
    id: 'syu-sw',
    school: '삼육대학교',
    major: '컴퓨터메카트로닉스공학부 소프트웨어전공',
    period: { start: '2017.03', end: '2023.02' },
    gpa: '3.5',
    gpaScale: '4.5',
    status: '졸업',
    courses: {
      basic: ['소프트웨어 원리', '메카트로닉스개론'],
      major: [
        '자료구조',
        '객체지향 프로그래밍',
        '웹 프로그래밍',
        '윈도우 프로그래밍',
        '확률통계',
        '컴퓨터구조',
        '모바일 프로그래밍(캡스톤디자인)',
        '운영체제',
        '프로그래밍 언어론',
        '데이터베이스 프로그래밍',
        '소프트웨어 공학',
        '인공지능',
        'SW 프로젝트',
        '리눅스 시스템',
        '소프트웨어 디자인패턴',
        '빅데이터처리',
        '인간과컴퓨터 상호작용',
        '최신정보기술',
      ],
    },
  },
]

// 최신순 정렬된 자격/수상 목록
export const certificatesData: CertificateEntry[] = [
  {
    id: 'sw-contest-award',
    name: 'SW경진대회 우수상',
    organization: 'SW대학사업단',
    date: '2022.09',
  },
  {
    id: 'leadership-instructor-1',
    name: '리더십지도사1급',
    organization: '한국경영교육연구소',
    date: '2022.05',
  },
  {
    id: 'speech-instructor-1',
    name: '스피치지도사1급',
    organization: '한국경영교육연구소',
    date: '2022.04',
  },
  {
    id: 'presentation-planner',
    name: '프레젠테이션플래너',
    organization: '한국경영교육연구소',
    date: '2022.04',
  },
  {
    id: 'dasp',
    name: '데이터아키텍처준전문가(DAsP)',
    organization: '한국데이터베이스진흥센터',
    date: '2022.01',
  },
]
