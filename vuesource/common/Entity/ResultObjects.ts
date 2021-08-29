export class ResultObject<T> {
    Code!: number
    Result!: T
    Results!: T[]
    ResultDataSet: any
    Count!: number
    Message!: string
}
