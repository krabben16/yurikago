const breadcrumbList: { [key: string]: { path: string; name: string } } = {
  '/': {
    path: '/',
    name: 'トップページ',
  },
}

export function findBreadcrumb(path: string) {
  if (!Object.keys(breadcrumbList).includes(path)) {
    return breadcrumbList['/']
  }

  return breadcrumbList[path]
}
