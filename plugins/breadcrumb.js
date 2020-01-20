import Vue from 'vue'

Vue.prototype.$getBreadcrumbSchema = (pageName, path) => {
  if (path === '/') {
    return `{
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "${pageName}",
          "item": "https://www.yurikago-blog.com/"
        }
      ]
    }`
  } else {
    return `{
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Yurikago Blog",
          "item": "https://www.yurikago-blog.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "${pageName}",
          "item": "https://www.yurikago-blog.com${path}"
        }
      ]
    }`
  }
}
