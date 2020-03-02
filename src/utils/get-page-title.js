import defaultSettings from '@/settings'

const title = defaultSettings.title || '聚餐无忧系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
