<template>
  <BasicModal
    v-bind="$attrs"
    title="操作执行"
    @ok="handleOk"
    width="100%"
    wrap-class-name="full-modal"
    :okText="okText"
  >
    <Descriptions :title="props.ticket.name" layout="horizontal">
      <DescriptionsItem label="现场侧">{{ props.ticket.siteName }}</DescriptionsItem>
      <DescriptionsItem label="唱票人">{{ props.ticket.tellerName }}</DescriptionsItem>
      <DescriptionsItem label="执行人">{{ props.ticket.operatorName }}</DescriptionsItem>
      <DescriptionsItem label="发布人">{{ props.ticket.publisherName }}</DescriptionsItem>
      <DescriptionsItem label="起止时间">
        {{ timestampToTime(props.ticket.startTime) }} &#45;
        {{ timestampToTime(props.ticket.endTime) }}
      </DescriptionsItem>
    </Descriptions>
    <div style="width: 100%; text-align: center; margin: 15px 0">
      <strong style="font-size: 16px">操作记录</strong>
    </div>
    <Timeline>
      <TimelineItem v-for="operation in operations" :key="operation.id">
        <div style="display: flex">
          <div style="margin-right: auto">{{ operation.description }}</div>
          <div style="float: right">{{ time }}</div>
        </div>
        <div style="opacity: 0.6; display: inline-block">注意事项：{{ operation.notice }}</div>
      </TimelineItem>
    </Timeline>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { BasicModal } from '/@/components/Modal'
  import { Descriptions, DescriptionsItem, Timeline, TimelineItem } from 'ant-design-vue'
  const props = defineProps(['ticket', 'operations'])
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
  let okText = ref('完成')
  const handleOk = () => {
    console.log('ok')
  }
</script>

<style lang="less">
  .full-modal {
    .ant-modal {
      max-width: 100%;
      top: 0;
      padding-bottom: 0;
      margin: 0;
    }
    .ant-modal-content {
      display: flex;
      flex-direction: column;
      height: calc(100vh);
    }
    .ant-modal-body {
      flex: 1;
    }
  }
</style>
