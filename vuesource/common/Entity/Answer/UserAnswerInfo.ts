import { Guid } from '../../Utils/Guid'
import { AnalyseScore } from './AnalyseScore'
import { UserAnswerInfoDetail } from './UserAnswerInfoDetail'

export class UserAnswerInfo {
    guid: Guid = new Guid()
    // 回答人員識別
    public ANS_STF_ID!: string
    // 考试人員
    public EVA_STF_ID!: string
    // 考试番号
    public EVALUATE_NO!: string
    // 回答时间
    public ANS_DATE!: Date
    // 登录时间
    public INSERT_DATE!: Date
    // 登陆用户
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
    // ユーザー回答明細リスト
    public UserAnswerInfoDetailList: UserAnswerInfoDetail[] = []
    // 選項類型情报
    public AnalyseScoreList: AnalyseScore[] = []
}
