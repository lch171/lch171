import { Guid } from '../../Utils/Guid'
import { EvaluateQuestion } from './EvaluateQuestion'

export class Evaluate {
  guid: Guid = new Guid()
  // 考试番号
  public EVALUATE_NO!: string
  // 考试名称
  public EVALUATE_NM!: string
  // 问题列表
  public QuestionList: EvaluateQuestion[] = []
  // 登录时间
  public INSERT_DATE!: Date
  // 登录用户
  public INSERT_USER_CARD!: string
  // 登录内容
  public INSERT_CLIENT!: string
  // 更新时间
  public UPDATE_DATE!: Date
  // 更新用户
  public UPDATE_USER_CARD!: string
  // 更新内容
  public UPDATE_CLIENT!: string
  // 更新回数
  public UPDATE_CNT!: number
}
