import { ITagObject } from "~/resources/ts/infra/data/interface/ITagObject"

export class Tag {
  id: number
  name: string

  constructor (obj: ITagObject) {
    this.id = obj.id
    this.name = obj.name
  }
}
