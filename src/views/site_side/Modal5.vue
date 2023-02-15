<template>
  <BasicModal v-bind="$attrs" title="管理现场侧" @ok="handleOk" width="85%">
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
        <div v-if="operations.length !== 0">
          <strong style="font-size: 15px; margin-left: 10px"> 操作步骤</strong>
          <Timeline style="margin-left: 10px">
            <br />
            <TimelineItem v-for="operation in operations" :key="operation.id">
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
        <Empty v-else style="margin-top: 50px" />
      </Col>
    </Row>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { BasicModal } from '/@/components/Modal'
  import { Row, Col, Tabs, TabPane, Timeline, TimelineItem, Empty } from 'ant-design-vue'
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
  setInterval(() => {
    time.value = timestampToTime(new Date().getTime())
  }, 1000)
</script>

<style scoped></style>
