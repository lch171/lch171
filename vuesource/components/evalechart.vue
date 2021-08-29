<template>
  <div id="myChart"></div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import * as echarts from 'echarts'
import { HttpInterceptorService } from '@/common/Services/request'
import { CommonUtil } from '@/common/Utils/Common'
import { UserAnswerInfo } from '@/common/Entity/Answer/UserAnswerInfo'
import { ResultObject } from '@/common/Entity/ResultObjects'
import { AnalyseScore } from '@/common/Entity/Answer/AnalyseScore'
import { Common } from '@/common/Const/common'

@Options({
  name: 'evalechart',
  props: {}
})
export default class evalechart extends Vue {
  $https!: HttpInterceptorService
  $CommonUtil!: CommonUtil
  $message!: any
  varValue1: Array<any> = []
  varoption: any = {
    title: {
      text: '雷达图',
      subtext: ''
    },
    legend: {
      data: ['自我评价']
    },
    radar: {
      // 雷达图的指示器，用来指定雷达图中的多个变量（维度）
      indicator: [
        { name: 'CW', max: 10 },
        { name: 'CO', max: 10 },
        { name: 'SH', max: 10 },
        { name: 'PL', max: 10 },
        { name: 'RI', max: 10 },
        { name: 'ME', max: 10 },
        { name: 'TW', max: 10 },
        { name: 'FI', max: 10 }
      ]
    },
    series: [{
      name: '自我评价结果',
      type: 'radar',
      data: [
        {
          value: [5, 5, 5, 5, 5, 5, 5, 5],
          name: '自我评价',
          areaStyle: {
            color: 'yellow'
          }
        }
      ]
    }]
  }

  created () : void {
    this.$https.post('/api/Evaluate/GetAnswerList', { EvaluateNo: '2', EvaStfId: this.$store.state.staff.STF_ID }).then((res: any) => {
      this.GetUserAnswerInfo(res)
    }).catch(
      (error: any) => {
        this.$message.error(Common.CONNECTION_FAIL)
        console.log(error)
      }
    )
  }

  GetUserAnswerInfo (event: any): void {
    if (event.data.Code !== Common.RESULT_SUCCESS) {
      this.$message.error(event.data.Message)
      this.setOptionmethod()
      return
    }

    const res: ResultObject<UserAnswerInfo> = this.$CommonUtil.ResultObjectToEntity(event.data, UserAnswerInfo)
    const varUserAnswerInfo: UserAnswerInfo = JSON.parse(JSON.stringify(res.Result))
    this.varValue1 = []
    let maxsorce = 0
    varUserAnswerInfo.AnalyseScoreList.forEach((element: AnalyseScore) => {
      if (element.TypeTotalScore > maxsorce) {
        maxsorce = element.TypeTotalScore
      }
    })

    this.varoption.radar.indicator.forEach((element: any) => {
      element.max = maxsorce
      const varAnalyseScoreList = varUserAnswerInfo.AnalyseScoreList.filter((value: AnalyseScore, index: number, array: AnalyseScore[]) => {
        return value.OPTIONS_TYP_NM === element.name
      })
      if (varAnalyseScoreList.length !== 0) {
        this.varValue1.push(varAnalyseScoreList[0].TypeTotalScore)
      } else {
        this.varValue1.push(0)
      }
    })
    this.varoption.series[0].data[0].value = this.varValue1
    this.varoption.title.subtext = '回答时间: ' + varUserAnswerInfo.ANS_DATE.toString()
    this.setOptionmethod()
  }

  setOptionmethod () : void {
    const chartDom = document.getElementById('myChart') as HTMLElement
    var myChart = echarts.init(chartDom)
    myChart.setOption(this.varoption)
  }
}
</script>

<style scoped>
#myChart{
  height: 600px;
  width: 700px;
}
</style>
