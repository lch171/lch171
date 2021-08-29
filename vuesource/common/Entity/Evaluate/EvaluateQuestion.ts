import { Guid } from '../../Utils/Guid'
import { EvaluateOptions } from './EvaluateOptions'

export class EvaluateQuestion {
  guid: Guid = new Guid()
  // 考试番号
  public EVALUATE_NO!: string
  // 问题番号
  public QUESTION_NO!: string
  // 问题名称
  public QUESTION_NM!: string
  // 问题类型
  public QUESTION_TYP!: string
  // 问题类型
  public QUESTION_TYP_NM!: string
  // 选项列表
  public OptionsList: EvaluateOptions[] = []
  // 回答选项
  public AnsSelect!: string
  // 回答选项列表
  public AnsSelectList: string[] = []
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
