<template>
  <BasicModal
    v-bind="$attrs"
    title="操作注意事项"
    @ok="handleOk"
    width="100%"
    :okText="okText"
    wrap-class-name="full-modal"
  >
    <div style="width: 100%; text-align: center">
      <strong style="font-size: 22px">请仔细阅读以下须知</strong>
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

  const [OperationModalRegister, { openModal: openOperationModal }] = useModal()
  const props = defineProps(['ticket'])
  let okText = ref('下一步')
  let operations: OperationParams[] = reactive([])
  const getOperations = async () => {
    operations.splice(0, operations.length)
    try {
      let res = await getOperationsByTicketIdApi(props.ticket.id)
      console.log(res)
      for (let i = 0; i < res.length; i++) {
        operations.push(res[i])
      }
      console.log('operations: ', operations)
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
    console.log('ok')
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
