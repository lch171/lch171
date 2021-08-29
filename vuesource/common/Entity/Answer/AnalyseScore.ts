import { Guid } from '../../Utils/Guid'

export class AnalyseScore {
  guid: Guid = new Guid()
  // 考试人員
  public EVA_STF_ID!: string
  // 考试番号
  public EVALUATE_NO!: string
  // 回答时间
  public ANS_DATE!: Date
  // 選項類型
  public OPTIONS_TYP!: string
  // 選項類型名称
  public OPTIONS_TYP_NM!: string
  // 類型合计分数
  public TypeTotalScore!: number
}
