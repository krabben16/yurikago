require("dotenv").config()
import { createBreadcrumbSchemaObject } from "~/resources/js/schema/breadcrumb.js"

// パンくずの構造化データが正しく作成されているかテストする
test("schema_breadcrumb", () => {
  const breadcrumbItemList = [
    {
      name: "A",
      path: "/aaa"
    },
    {
      name: "B",
      path: "/bbb"
    }
  ]

  const breadcrumbSchemaObject = createBreadcrumbSchemaObject(breadcrumbItemList)
  const a = breadcrumbSchemaObject.itemListElement[0]
  const b = breadcrumbSchemaObject.itemListElement[1]

  expect(a.name).toBe("A")
  expect(a.position).toBe(1)
  expect(a.item).toBe(`${process.env.FRONT_URL}/aaa`)

  expect(b.name).toBe("B")
  expect(b.position).toBe(2)
  expect(b.item).toBe(`${process.env.FRONT_URL}/bbb`)
})
