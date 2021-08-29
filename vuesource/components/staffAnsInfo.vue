<template>
<div class="staffAnsInfo">
  <el-table
    :data="varStaffAnsInfoList"
    border
    style="width: 100%">
    <el-table-column
      property="STF_CARD"
      label="番号"
      sortable
      width="110">
    </el-table-column>
    <el-table-column
      property="STF_DSP_NAME"
      label="名前"
      sortable
      width="115">
    </el-table-column>
    <el-table-column
      property="STF_DEPT_NM_NM"
      label="部門名"
      sortable
      width="115">
    </el-table-column>
    <el-table-column
      property="LEASTLEVEL"
      label="レベル"
      sortable
      width="115">
    </el-table-column>
    <el-table-column
      property="ANS_DATE"
      label="回答时间"
      sortable
      width="200">
    </el-table-column>
    <el-table-column
      property="ROLE_1_NM"
      label="角色1"
      sortable
      width="115">
    </el-table-column>
    <el-table-column
      property="ROLE_2_NM"
      label="角色2"
      sortable
      width="115">
    </el-table-column>
  </el-table>
</div>
</template>

<script lang="ts">
import { ResultObject } from '@/common/Entity/ResultObjects'
import { HttpInterceptorService } from '@/common/Services/request'
import { CommonUtil } from '@/common/Utils/Common'
import { Options, Vue } from 'vue-class-component'
import { StaffAnsInfo } from '@/common/Entity/User/StaffAnsInfo'
import { Common } from '@/common/Const/common'

@Options({
  name: 'staffAnsInfo',
  props: {}
})
export default class staffAnsInfo extends Vue {
  msg!: string
  $https!: HttpInterceptorService
  $CommonUtil!: CommonUtil
  varStaffAnsInfoList: StaffAnsInfo[] = []
  $message: any

  created () : void {
    this.$https.post('/api/Evaluate/GetStaffAnswerList', { EvaluateNo: '2' }).then((res: any) => {
      this.GetStaffAnsInfoList(res)
    }).catch(
      (error: any) => {
        this.$message.error(Common.CONNECTION_FAIL)
        console.log(error)
      }
    )
  }

  GetStaffAnsInfoList (event: any): void {
    if (event.data.Code !== Common.RESULT_SUCCESS) {
      this.$message.error(event.data.Message)
      return
    }

    const res: ResultObject<StaffAnsInfo> = this.$CommonUtil.ResultObjectToEntity(event.data, StaffAnsInfo)
    const staffAnsList: StaffAnsInfo[] = JSON.parse(JSON.stringify(res.Results))
    this.varStaffAnsInfoList = staffAnsList
  }
}
</script>

<style scoped>
</style>
