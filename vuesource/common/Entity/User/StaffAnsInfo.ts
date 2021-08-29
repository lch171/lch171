import { Guid } from '../../Utils/Guid'

export class StaffAnsInfo {
  guid: Guid = new Guid();
  // 要員識別
  public STF_ID: string = this.guid.newGuid()
  // カード番号
  public STF_CARD!: string
  // 表示名
  public STF_DSP_NAME!: string
  // 部門名
  public STF_DEPT_NM_NM!: string
  // 考试番号
  public EVALUATE_NO!: string
  // 回答时间
  public ANS_DATE!: Date
  // レベル
  public LEASTLEVEL!: string
  // 角色1
  public ROLE_1!: string
  // 角色1名
  public ROLE_1_NM!: string
  // 角色2
  public ROLE_2!: string
  // 角色2名
  public ROLE_2_NM!: string
}
