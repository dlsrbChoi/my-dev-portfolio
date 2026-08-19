// 경력 기간 계산 및 포맷팅 유틸리티

interface Duration {
  years: number
  months: number
  days: number
}

/**
 * 시작일과 현재/종료일 사이의 기간을 계산합니다.
 * @param startDate - 시작일 (YYYY-MM-DD 형식)
 * @param endDate - 종료일 (선택사항, 기본값: 오늘)
 * @returns {years, months, days} 객체
 */
export function calculateDuration(startDate: string, endDate?: string): Duration {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  // 날짜 조정
  if (days < 0) {
    months--
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
    days += prevMonth.getDate()
  }

  // 월 조정
  if (months < 0) {
    years--
    months += 12
  }

  return { years, months, days }
}

/**
 * 기간을 로케일에 맞게 포맷팅합니다.
 * @param duration - Duration 객체
 * @param locale - 로케일 코드 ('ko' 또는 'en')
 * @returns 포맷팅된 문자열 (예: "2년 3개월", "2y 3m")
 */
export function formatDuration(duration: Duration, locale: string = 'ko'): string {
  const { years, months } = duration

  if (locale === 'en') {
    const parts: string[] = []
    if (years > 0) parts.push(`${years}y`)
    if (months > 0) parts.push(`${months}m`)
    return parts.length > 0 ? parts.join(' ') : 'Less than a month'
  }

  // 한국어 (기본값)
  const parts: string[] = []
  if (years > 0) parts.push(`${years}년`)
  if (months > 0) parts.push(`${months}개월`)
  return parts.length > 0 ? parts.join(' ') : '1개월 미만'
}

/**
 * 전체 경력 기간을 계산합니다.
 * @param experiences - 경력 배열 (period.start 속성 필요)
 * @returns Duration 객체
 */
export function calculateTotalCareerDuration(
  experiences: Array<{ period: { start: string; end?: string } }>
): Duration {
  if (experiences.length === 0) {
    return { years: 0, months: 0, days: 0 }
  }

  // 가장 오래된 경력 시작일을 찾음
  const oldestExperience = experiences.reduce((oldest, current) => {
    const oldestDate = new Date(oldest.period.start).getTime()
    const currentDate = new Date(current.period.start).getTime()
    return currentDate < oldestDate ? current : oldest
  })

  return calculateDuration(oldestExperience.period.start)
}

/**
 * 특정 회사의 근무 기간을 계산합니다.
 * @param startDate - 시작일
 * @param endDate - 종료일 (선택사항)
 * @returns Duration 객체
 */
export function calculateCompanyDuration(startDate: string, endDate?: string): Duration {
  return calculateDuration(startDate, endDate)
}
