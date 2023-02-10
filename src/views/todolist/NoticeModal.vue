<template>
  <BasicModal
    v-bind="$attrs"
    :title="title"
    @ok="handleOk"
    width="100%"
    :okText="okText"
    wrap-class-name="full-modal"
    @visible-change="handleVisibleChange"
    :showOkBtn="showOkBtn"
  >
    <div style="width: 100%; text-align: center">
      <strong style="font-size: 22px"
        >请仔细阅读以下须知{{ countDown > 0 ? '(' + countDown + 's)' : '' }}</strong
      >
    </div>
    <div>{{ props.ticket.notice }}</div>
  </BasicModal>
  <OperationModal
    @register="OperationModalRegister"
    :ticket="props.ticket"
    :operations="operations"
  />
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { BasicModal } from '/@/components/Modal'
  import OperationModal from './OperationModal.vue'
  import { useModal } from '/@/components/Modal'
  import { getOperationsByTicketIdApi } from '/@/api/sys/ticket'
  import { OperationParams } from '/@/api/sys/model/ticketModel'

  let title = ref('操作注意事项')
  let showOkBtn = ref(false)
  let countDown = ref(5)
  const timer = () => {
    // 倒计时
    let timer = setInterval(() => {
      countDown.value--
      title.value = `操作注意事项（${countDown.value}秒）`
      if (countDown.value === 0) {
        clearInterval(timer)
        showOkBtn.value = true
        title.value = '操作注意事项'
      }
    }, 1000)
  }
  const handleVisibleChange = (visible: boolean) => {
    console.log('NoticeModal handleVisibleChange', visible)
    if (visible) {
      countDown.value = 5
      showOkBtn.value = false
      title.value = `操作注意事项（${countDown.value}秒）`
      timer()
    }
  }
  const [OperationModalRegister, { openModal: openOperationModal }] = useModal()
  const props = defineProps(['ticket'])
  let okText = ref('下一步')
  let operations: OperationParams[] = reactive([])
  const getOperations = async () => {
    operations.splice(0, operations.length)
    try {
      let res: any = await getOperationsByTicketIdApi(props.ticket.id)
      for (let i = 0; i < res.length; i++) {
        operations.push(res[i])
      }
      // operations根据stepNumber排序
      operations.sort((a, b) => {
        return a.stepNumber - b.stepNumber
      })
      operations = reactive(operations)
    } catch (e) {
      console.log(e)
    }
  }
  const handleOk = () => {
    getOperations()
    openOperationModal()
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
