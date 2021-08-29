import { plainToClass, classToClass, classToPlain } from 'class-transformer'
import { ResultObject } from '../Entity/ResultObjects'

export class CommonUtil {
  public ResultObjectToEntity (res: any, entityName: any = null): ResultObject<any> {
    const response = JSON.parse(JSON.stringify(res.Result))
    const o: ResultObject<any> = plainToClass(ResultObject, JSON.parse(JSON.stringify(res)))
    if (entityName) {
      o.Result = plainToClass(entityName, response)
    }
    if (o.Results) {
      o.Results = plainToClass(entityName, res.Results)
    }
    return o
  }

  sortClass<T> (sortData: T[], strGroup: string): Array<T>[] {
    const sorted = this.groupBy(sortData, (item: T) => {
      return item[strGroup]
    })
    return sorted
  }

  private groupBy<T> (array: T[], f: (t: T) => unknown): any {
    const groups: {
      [key: string]: T[],
    } = {}
    array.forEach((item) => {
      const group = JSON.stringify(f(item))
      groups[group] = groups[group] || []
      groups[group].push(item)
    })
    return Object.keys(groups).map((group) => {
      return groups[group]
    })
  }
}
