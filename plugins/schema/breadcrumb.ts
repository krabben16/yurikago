import type { Plugin } from "@nuxt/types"
import { BreadcrumbItem } from "interfaces/BreadcrumbItem"
import { createBreadcrumbSchemaObject } from "~/resources/js/schema/breadcrumb.js"

type BreadcrumbSchemaCreator = (breadcrumbItemList: BreadcrumbItem[]) => string

declare module "vue/types/vue" {
  interface Vue {
    $createBreadcrumbSchema: BreadcrumbSchemaCreator
  }
}

const breadcrumbSchemaCreator: BreadcrumbSchemaCreator = (breadcrumbItemList: BreadcrumbItem[]) => {
  const breadcrumbSchemaObject = createBreadcrumbSchemaObject(breadcrumbItemList)
  return JSON.stringify(breadcrumbSchemaObject)
}

const breadcrumbSchemaPlugin: Plugin = (_context, inject) => {
  inject("createBreadcrumbSchema", breadcrumbSchemaCreator)
}

export default breadcrumbSchemaPlugin
