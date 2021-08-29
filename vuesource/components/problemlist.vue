<template>
  <div class="problemlist">
    <div class="prolist">
      <el-table
        ref="singleTable"
        :data="varEvaluate.QuestionList"
        highlight-current-row
        :row-style="TableRowStyle"
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <!-- <el-table-column type="index" label="序号" width="50"></el-table-column> -->
        <el-table-column property="QUESTION_NO" label="题号" width="50"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" property="QUESTION_NM" label="问题内容" width="150"></el-table-column>
        <el-table-column property="QUESTION_TYP_NM" label="类型" width="100"></el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="lastsetCurrent()">上一题</el-button>
        <el-button @click="nextsetCurrent()">下一题</el-button>
        <el-button @click="setCurrent()">取消选择</el-button>
        <br>
        <el-button @click="committest()" type="primary">提交考试</el-button>
        <el-button @click="quittest()" type="primary">退出考试</el-button>
      </div>
    </div>
    <problem :inquestion="currentRow"></problem>
  </div>
</template>

<script lang="ts">
import problem from '../components/problem.vue'
import { Options, Vue } from 'vue-class-component'
import { Evaluate } from '@/common/Entity/Evaluate/Evaluate'
import { EvaluateQuestion } from '@/common/Entity/Evaluate/EvaluateQuestion'
import { HttpInterceptorService } from '@/common/Services/request'
import { ResultObject } from '@/common/Entity/ResultObjects'
import { CommonUtil } from '@/common/Utils/Common'
import { EvaluateOptions } from '@/common/Entity/Evaluate/EvaluateOptions'
import { UserAnswerInfo } from '@/common/Entity/Answer/UserAnswerInfo'
import { UserAnswerInfoDetail } from '@/common/Entity/Answer/UserAnswerInfoDetail'
import { Staff } from '@/common/Entity/User/Staff'
import { Common } from '@/common/Const/common'

@Options({
  name: 'problemlist',
  components: {
    problem
  },
  props: {
    inevaluateNo: {
      type: String,
      default: '0'
    }
  }
})
export default class problemlist extends Vue {
  inevaluateNo!: string
  $message: any

  public varEvaluate: Evaluate = new Evaluate()
  public currentRow: EvaluateQuestion = new EvaluateQuestion()
  public maxscore = 10
  $https!: HttpInterceptorService
  $CommonUtil!: CommonUtil

  created () : void {
    if (this.inevaluateNo) {
      this.$https.post('/api/Evaluate/GetEvaluateList', { EvaluateNo: this.inevaluateNo }).then((res: any) => {
        this.GetEvaluateInfo(res)
      }).catch(
        (error: any) => {
          this.$message.error(Common.CONNECTION_FAIL)
          console.log(error)
        }
      )
    }
  }

  GetEvaluateInfo (event: any): void {
    if (event.data.Code !== Common.RESULT_SUCCESS) {
      this.$message.error(event.data.Message)
      return
    }

    const res: ResultObject<Evaluate> = this.$CommonUtil.ResultObjectToEntity(event.data, Evaluate)
    this.varEvaluate = JSON.parse(JSON.stringify(res.Result))
    this.currentRow = this.varEvaluate.QuestionList[0]
    this.maxscore = 10
  }

  setCurrent (row: EvaluateQuestion) : void {
    (this.$refs.singleTable as any).setCurrentRow(row)
  }

  lastsetCurrent () : void {
    if (this.currentRow) {
      const index = this.varEvaluate.QuestionList.indexOf(this.currentRow)
      if (index !== 0) {
        this.setCurrent(this.varEvaluate.QuestionList[index - 1])
      }
    } else {
      this.setCurrent(this.varEvaluate.QuestionList[0])
    }
  }

  nextsetCurrent () : void {
    if (this.currentRow) {
      const index = this.varEvaluate.QuestionList.indexOf(this.currentRow)
      if (index !== this.varEvaluate.QuestionList.length - 1) {
        this.setCurrent(this.varEvaluate.QuestionList[index + 1])
      }
    } else {
      this.setCurrent(this.varEvaluate.QuestionList[0])
    }
  }

  committest () : void {
    const inmaxscore = this.maxscore
    const requedlist = this.varEvaluate.QuestionList.filter(function (item : EvaluateQuestion, index : number, array: any) {
      if (item.QUESTION_TYP === '0') {
        return (item.AnsSelect !== '')
      } else if (item.QUESTION_TYP === '1') {
        return (item.AnsSelectList.length !== 0)
      } else if (item.QUESTION_TYP === '2') {
        let sumvalue = 0
        item.OptionsList.forEach((element: EvaluateOptions) => {
          sumvalue += element.AnsOptionScore
        })
        return (sumvalue >= inmaxscore)
      }
    })

    if (requedlist.length < this.varEvaluate.QuestionList.length) {
      this.$message.error('题目还未答完')
      return
    }

    this.committestsub()

    this.viewback()
  }

  committestsub () : void {
    if (this.varEvaluate) {
      const varUserAnswerInfo: UserAnswerInfo = new UserAnswerInfo()
      // 回答人員識別
      varUserAnswerInfo.ANS_STF_ID = this.$store.state.staff.STF_ID
      // 考试人員
      varUserAnswerInfo.EVA_STF_ID = this.$store.state.staff.STF_ID
      // 考试番号
      varUserAnswerInfo.EVALUATE_NO = this.varEvaluate.EVALUATE_NO
      // 回答时间
      varUserAnswerInfo.ANS_DATE = new Date()

      this.varEvaluate.QuestionList.forEach((varEvalItem: EvaluateQuestion) => {
        if (varEvalItem.QUESTION_TYP === '0') {
          const varUserAnswerInfoDetail: UserAnswerInfoDetail = new UserAnswerInfoDetail()
          // 回答人員識別
          varUserAnswerInfoDetail.ANS_STF_ID = varUserAnswerInfo.ANS_STF_ID
          // 考试人員
          varUserAnswerInfoDetail.EVA_STF_ID = varUserAnswerInfo.EVA_STF_ID
          // 考试番号
          varUserAnswerInfoDetail.EVALUATE_NO = varUserAnswerInfo.EVALUATE_NO
          // 回答时间
          varUserAnswerInfoDetail.ANS_DATE = varUserAnswerInfo.ANS_DATE
          // 问题番号
          varUserAnswerInfoDetail.QUESTION_NO = varEvalItem.QUESTION_NO
          // 選択項目番号
          varUserAnswerInfoDetail.OPTIONS_NO = varEvalItem.AnsSelect
          // 選択項目番号
          varUserAnswerInfoDetail.OPTIONS_SCORE = 0
          // リストに追加する
          varUserAnswerInfo.UserAnswerInfoDetailList.push(varUserAnswerInfoDetail)
        } else if (varEvalItem.QUESTION_TYP === '1') {
          varEvalItem.AnsSelectList.forEach((varValueStr: string) => {
            const varUserAnswerInfoDetail: UserAnswerInfoDetail = new UserAnswerInfoDetail()
            // 回答人員識別
            varUserAnswerInfoDetail.ANS_STF_ID = varUserAnswerInfo.ANS_STF_ID
            // 考试人員
            varUserAnswerInfoDetail.EVA_STF_ID = varUserAnswerInfo.EVA_STF_ID
            // 考试番号
            varUserAnswerInfoDetail.EVALUATE_NO = varUserAnswerInfo.EVALUATE_NO
            // 回答时间
            varUserAnswerInfoDetail.ANS_DATE = varUserAnswerInfo.ANS_DATE
            // 问题番号
            varUserAnswerInfoDetail.QUESTION_NO = varEvalItem.QUESTION_NO
            // 選択項目番号
            varUserAnswerInfoDetail.OPTIONS_NO = varValueStr
            // 選択項目番号
            varUserAnswerInfoDetail.OPTIONS_SCORE = 0
            // リストに追加する
            varUserAnswerInfo.UserAnswerInfoDetailList.push(varUserAnswerInfoDetail)
          })
        } else if (varEvalItem.QUESTION_TYP === '2') {
          varEvalItem.OptionsList.forEach((varOption: EvaluateOptions) => {
            const varUserAnswerInfoDetail: UserAnswerInfoDetail = new UserAnswerInfoDetail()
            // 回答人員識別
            varUserAnswerInfoDetail.ANS_STF_ID = varUserAnswerInfo.ANS_STF_ID
            // 考试人員
            varUserAnswerInfoDetail.EVA_STF_ID = varUserAnswerInfo.EVA_STF_ID
            // 考试番号
            varUserAnswerInfoDetail.EVALUATE_NO = varUserAnswerInfo.EVALUATE_NO
            // 回答时间
            varUserAnswerInfoDetail.ANS_DATE = varUserAnswerInfo.ANS_DATE
            // 问题番号
            varUserAnswerInfoDetail.QUESTION_NO = varEvalItem.QUESTION_NO
            // 選択項目番号
            varUserAnswerInfoDetail.OPTIONS_NO = varOption.OPTIONS_NO
            // 選択項目番号
            varUserAnswerInfoDetail.OPTIONS_SCORE = varOption.AnsOptionScore
            // リストに追加する
            varUserAnswerInfo.UserAnswerInfoDetailList.push(varUserAnswerInfoDetail)
          })
        }
      })

      this.$https.post('/api/Evaluate/SetAnswer', { UserAnswerInfo: varUserAnswerInfo, loginInfo: this.$store.state.staff }).then((res: any) => {
        console.log('success')
      }).catch(
        (error: any) => {
          console.log(error)
        }
      )
    }
  }

  quittest () : void {
    this.viewback()
  }

  handleCurrentChange (item: EvaluateQuestion) :void {
    // console.log(item)
    this.currentRow = item
  }

  viewback (): void {
    this.$emit('backchange')
  }

  TableRowStyle (rowandindex: any): any {
    const row: EvaluateQuestion = rowandindex.row
    const rowBackground: any = {}
    rowBackground.background = '#56a32d'

    if (row.QUESTION_TYP === '0' && row.AnsSelect !== '') {
      return rowBackground
    } else if (row.QUESTION_TYP === '1' && row.AnsSelectList.length !== 0) {
      return rowBackground
    } else if (row.QUESTION_TYP === '2') {
      let sumvalue = 0
      row.OptionsList.forEach((element: EvaluateOptions) => {
        sumvalue += element.AnsOptionScore
      })
      if (sumvalue >= this.maxscore) {
        return rowBackground
      }
    }
  }
}

</script>

<style scoped>
.problemlist{
  display: flex;
  width: 100%;
  height: 100%;
}
.prolist{
  height: 100%;
}
</style>
