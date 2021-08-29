import { Guid } from '../../Utils/Guid'

export class Staff {
  guid: Guid = new Guid();
  // 要員識別
  public STF_ID: string = this.guid.newGuid()
  // カード番号
  public STF_CARD!: string
  // 名前（日本語）
  public STF_NAME!: string
  // 中国語名前
  public STF_NAME_CHN!: string
  // 表示名
  public STF_DSP_NAME!: string
  // 誕生日
  public STF_BIRTHDAY = new Date()
  // メールアドレス
  public STF_EMAIL!: string
  // 電話
  public STF_TEL!: string
  // 携帯電話
  public STF_MOBILE!: string
  // 性別
  public STF_SEX!: number
  // 社員区分
  public STF_KBN!: string
  // 所属区分
  public STF_DEPT_KBN!: string
  // 所属部署名／協力会社名
  public STF_DEPT_NM!: string
  // 社員級別
  public STF_LVL!: number
  // 仕事年数
  public STF_WORK_START_YEAR!: Date
  // 説明
  public STF_COMMENT!: string

  public STF_ROL_ID!: number
  // 削除フラグ
  public STF_DELETE_FLAG!: number
  // 入社日
  public STF_START_DATE!: Date
  // 退社日
  public STF_EXIT_DATE!: Date
  // ログイン用ユーザー
  public STF_USER_CODE!: string
  // ログイン用パスワード
  public STF_USER_PASSWORD!: string

  public STF_IMAGE!: string

  public INSERT_DATE!: Date

  public INSERT_USER_CARD!: string

  public INSERT_CLIENT!: string

  public UPDATE_DATE!: Date

  public UPDATE_USER_CARD!: string

  public UPDATE_CLIENT!: string

  public UPDATE_CNT!: number
  public PJ_COLOR!: string
  public PJ_DSP_NAME!: string
  public STF_KBN_NM!: string
  public STF_DEPT_KBN_NM!: string
  public STF_DEPT_NM_NM!: string
  public STF_SEX_NM!: string
}
