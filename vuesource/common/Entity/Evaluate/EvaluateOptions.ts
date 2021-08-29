import { Guid } from '../../Utils/Guid'

export class EvaluateOptions {
  guid: Guid = new Guid()
  // 考试番号
  public EVALUATE_NO!: string
  // 问题番号
  public QUESTION_NO!: string
  // 选项番号
  public OPTIONS_NO!: string
  // 选型名称
  public OPTIONS_NM!: string
  // 回答选项分数
  public AnsOptionScore!: number
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
