import { createBreadcrumbSchemaObject } from '~/lib/schema/breadcrumb'
import { IBreadcrumbSchema } from '~/interfaces/schema'

describe('lib/schema', () => {
  test('breadcrumb', () => {
    const args: IBreadcrumbSchema = {
      items: [
        {
          name: 'A',
          path: '/a',
        },
        {
          name: 'B',
          path: '/b',
        },
      ],
    }

    const actual = createBreadcrumbSchemaObject(args)
    const expected = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'A',
          'item': process.env.FRONT_URL + '/a',
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'B',
          'item': process.env.FRONT_URL + '/b',
        },
      ],
    }

    expect(actual).toEqual(expected)
  })
})
