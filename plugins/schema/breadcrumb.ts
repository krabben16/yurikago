import type { Plugin } from '@nuxt/types'
import { SchemaBreadcrumb } from '~/interfaces/Schema'
import { createBreadcrumbSchemaObject } from '~/resources/schema/breadcrumb'

function createBreadcrumbSchema(args: SchemaBreadcrumb) {
  const breadcrumbSchemaObject = createBreadcrumbSchemaObject(args)
  return JSON.stringify(breadcrumbSchemaObject)
}

type BreadcrumbSchemaCreator = typeof createBreadcrumbSchema

declare module 'vue/types/vue' {
  interface Vue {
    $createBreadcrumbSchema: BreadcrumbSchemaCreator
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $createBreadcrumbSchema: BreadcrumbSchemaCreator
  }
}

const breadcrumbSchemaPlugin: Plugin = (_context, inject) => {
  inject('createBreadcrumbSchema', createBreadcrumbSchema)
}

export default breadcrumbSchemaPlugin
