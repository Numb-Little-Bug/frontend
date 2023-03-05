<template>
  <BasicModal
    v-bind="$attrs"
    title="管理现场侧"
    @ok="handleOk"
    width="85%"
    @visible-change="getDetected"
  >
    <Row>
      <Col :span="17">
        <Tabs v-model:activeKeys="activeKey">
          <TabPane key="1" tab="监控1">
            <span class="flex" style="margin-bottom: 10px">
              <video controls :src="site.video1" style="width: 100%; height: 100%"></video>
            </span>
          </TabPane>
          <TabPane key="2" tab="监控2">
            <span class="flex" style="margin-bottom: 10px">
              <video controls :src="site.video2" style="width: 100%; height: 100%"></video>
            </span>
          </TabPane>
        </Tabs>
      </Col>
      <Col :span="7">
        <br />
        <div v-if="!loading && operations.length !== 0">
          <strong style="font-size: 15px; margin-left: 10px"> 操作步骤</strong>
          <Timeline style="margin-left: 10px">
            <br />
            <TimelineItem
              v-for="(operation, index) in operations"
              :key="operation.id"
              :color="operation_colors[index]"
            >
              <div style="display: flex">
                <div style="margin-right: auto"
                  >将 {{ operation.description }} {{ operation.type }}</div
                >
              </div>
              <div style="opacity: 0.6; display: inline-block"
                >注意事项：{{ operation.notice }}</div
              >
            </TimelineItem>
          </Timeline>
        </div>
        <Empty v-if="operations.length === 0" style="margin-top: 50px" />
        <div class="spinning-box">
          <Spin size="large" :spinning="loading && operations.length !== 0" tip="Loading..." />
        </div>
      </Col>
    </Row>
  </BasicModal>
</template>

<script lang="ts" setup>
import {reactive, ref, watch} from 'vue'
  import { BasicModal } from '/@/components/Modal'
  import { Row, Col, Tabs, TabPane, Timeline, TimelineItem, Empty, Spin } from 'ant-design-vue'
  import { getDeviceApi } from '/@/api/sys/device'
  import { detectApi, testApi } from '/@/api/sys/detect'
  import { DetectModel, DetectResultModel } from '/@/api/sys/model/detectModel'
  import axios from 'axios'
  const props = defineProps(['site', 'activateTicket', 'operations'])
  let activeKey = ref('1')

  const handleOk = async () => {}
  // 时间戳：1637244864707
  /* 时间戳转换为时间 */
  function timestampToTime(timestamp) {
    timestamp = timestamp ? timestamp : null
    let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
  }
  let time = ref('')
  let loading = ref(true)
  let operation_colors: any = ref([])
  const status_dict = {
    投入: 'strap-in',
    退出: 'strap-out',
    右: 'switch-right',
    左: 'switch-left',
    中: 'switch-middle',
    带电: 'charged',
    断电: 'uncharged',
    红色: 'light-red',
    绿色: 'light-green',
    熄灭: 'light-off',
  }
  setInterval(() => {
    time.value = timestampToTime(new Date().getTime())
  }, 1000)
  const getDetected = async (visible: boolean) => {
    if (!visible) {
      loading.value = true
      return
    }
    const res = await getDeviceApi(props.activateTicket.deviceTypeId)
    console.log('sdf', res)
    let detectModel: DetectModel = {
      source: props.site.video1,
      device_type_conf: res,
    }
    try {
      const res1 = await detectApi(detectModel)
      console.log(res1)
      if (res1.length >= 0) {
        loading.value = false
        operation_colors.value.splice(0, operation_colors.value.length)
      }
      if (res1.length > 1) {
        for (let i = 0; i < props.operations.length; i++) {
          if (props.operations[i].description.includes('charged_light')) {
            if (res1[i + 1].charged_light === status_dict[props.operations[i].type]) {
              operation_colors.value.push('green')
            } else {
              operation_colors.value.push('red')
            }
          } else if (props.operations[i].description.includes('light')) {
            for (let j = 0; j < res1[i + 1].lights.length; j++) {
              if (Object.keys(res1[i + 1].lights[j])[0] === props.operations[i].description) {
                if (
                  Object.values(res1[i + 1].lights[j])[0] === status_dict[props.operations[i].type]
                ) {
                  operation_colors.value.push('green')
                } else {
                  operation_colors.value.push('red')
                }
              }
            }
          } else if (props.operations[i].description.includes('strap')) {
            for (let j = 0; j < res1[i + 1].straps.length; j++) {
              if (Object.keys(res1[i + 1].straps[j])[0] === props.operations[i].description) {
                if (
                  Object.values(res1[i + 1].straps[j])[0] === status_dict[props.operations[i].type]
                ) {
                  operation_colors.value.push('green')
                } else {
                  operation_colors.value.push('red')
                }
              }
            }
          } else if (props.operations[i].description.includes('switch')) {
            for (let j = 0; j < res1[i + 1].switches.length; j++) {
              if (
                Object.keys(res1[i + 1].switches[j])[0] === props.operations[i].description
              ) {
                if (
                  Object.values(res1[i + 1].switches[j])[0] ===
                  status_dict[props.operations[i].type]
                ) {
                  operation_colors.value.push('green')
                } else {
                  operation_colors.value.push('red')
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
</script>

<style scoped>
  .spinning-box {
    text-align: center;
    padding: 30px 50px;
    margin-top: 50px;
  }
</style>
