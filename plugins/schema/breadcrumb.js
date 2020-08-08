import Vue from "vue"
import { createBreadcrumbSchemaObject } from "~/resources/js/schema/breadcrumb.js"

Vue.prototype.$getBreadcrumbSchema = breadcrumbItemList => {
  const breadcrumbSchemaObject = createBreadcrumbSchemaObject(breadcrumbItemList)

  return JSON.stringify(breadcrumbSchemaObject)
}
