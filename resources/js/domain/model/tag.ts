import { ITagObject } from "~/resources/js/infra/data/interface/ITagObject.ts"

export class Tag {
  id: number
  name: string

  constructor (obj: ITagObject) {
    this.id = obj.id
    this.name = obj.name
  }
}
