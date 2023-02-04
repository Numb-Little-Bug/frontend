<template>
  <div class="step2">
    <a-alert message="请确认操作票信息正确无误" show-icon />
    <a-descriptions :column="1" class="mt-5">
      <a-descriptions-item label="任务名称"> {{ values.title }} </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="3" class="mt-5">
      <a-descriptions-item label="现场侧名"> {{ values.site_side_name }} </a-descriptions-item>
      <a-descriptions-item label="起止时间">
        {{ values.start_end_time[0] }} - {{ values.start_end_time[1] }}</a-descriptions-item
      >
      <a-descriptions-item label="类别"> {{ values.type }}</a-descriptions-item>
      <a-descriptions-item label="唱票人"> {{ values.name1 }} </a-descriptions-item>
      <a-descriptions-item label="操作人"> {{ values.operator_name }} </a-descriptions-item>
      <a-descriptions-item label="发布人"> {{}} </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="1" class="mt-5">
      <a-descriptions-item label="操作步骤"> {{ values.step }} </a-descriptions-item>
      <a-descriptions-item label="安全事项"> {{ values.safety_precautions }} </a-descriptions-item>
      <a-descriptions-item label="备注"> {{ values.notes }} </a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <BasicForm @register="register" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue'
  import { BasicForm, useForm } from '/@/components/Form'
  import { Alert, Divider, Descriptions } from 'ant-design-vue'
  import { addOperationsApi, addTicketApi } from '/@/api/sys/ticket'
  import { AddTicketParams, OperationParams } from '/@/api/sys/model/ticketModel'
  import { getUserInfo } from '/@/api/sys/user'

  export default defineComponent({
    components: {
      BasicForm,
      [Alert.name]: Alert,
      [Divider.name]: Divider,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
    },
    props: ['values'],
    emits: ['next', 'prev'],
    setup(_, { emit }) {
      const [register, { validate, setProps }] = useForm({
        labelWidth: 80,
        actionColOptions: {
          span: 30,
        },
        resetButtonOptions: {
          text: '上一步',
        },
        submitButtonOptions: {
          text: '提交',
        },
        resetFunc: customResetFunc,
        submitFunc: customSubmitFunc,
      })

      async function customResetFunc() {
        emit('prev')
      }

      async function getUserId() {
        const res = await getUserInfo()
        return res.id
      }
      const UserId = ref('')

      let Ticket: AddTicketParams = {
        name: _.values.title,
        siteId: _.values.site_side_name,
        startTime: _.values.start_end_time[0],
        endTime: _.values.start_end_time[1],
        tellerId: _.values.name1,
        operatorId: _.values.operator_name,
        publisherId: Number(UserId),
        notice: _.values.safety_precautions,
        remark: _.values.notes,
        status: 0,
      }

      const operations: OperationParams[] = reactive([])
      function getOperations() {
        for (let value in _.values) {
          if (value.split('_')[0] === 'step') {
            const stepNumber = Number(value.split('_')[2])
            if (operations.length < stepNumber) {
              operations.push({
                ticketId: null,
                stepNumber: stepNumber,
                description: '',
                notice: '',
                type: '',
              })
              if (value.split('_')[1] === 'desc') {
                operations[stepNumber - 1].description = _.values[value]
              } else if (value.split('_')[1] === 'remark') {
                operations[stepNumber - 1].notice = _.values[value]
              } else if (value.split('_')[1] === 'type') {
                operations[stepNumber - 1].type = _.values[value]
              }
            } else {
              console.log(value.split('_')[1])
              if (value.split('_')[1] === 'desc') {
                operations[stepNumber - 1].description = _.values[value]
              } else if (value.split('_')[1] === 'remark') {
                operations[stepNumber - 1].notice = _.values[value]
              } else if (value.split('_')[1] === 'type') {
                operations[stepNumber - 1].type = _.values[value]
              }
            }
          }
        }
      }
      async function customSubmitFunc() {
        try {
          UserId.value = await getUserId()
          const Step2_values = await validate()
          await setProps({
            submitButtonOptions: {
              loading: true,
            },
          })
          Ticket = {
            name: _.values.title,
            siteId: _.values.site_side_name,
            startTime: _.values.start_end_time[0],
            endTime: _.values.start_end_time[1],
            tellerId: _.values.name1,
            operatorId: _.values.operator_name,
            publisherId: Number(UserId.value),
            notice: _.values.safety_precautions,
            remark: _.values.notes,
            status: 0,
          }
          getOperations()
          console.log('operations', operations)
          const ticket_id = await addTicketApi(Ticket)
          console.log('ticket_id', ticket_id)
          for (let i = 0; i < operations.length; i++) {
            operations[i].ticketId = Number(ticket_id)
          }
          console.log('operations', operations)
          await addOperationsApi(operations)
          setTimeout(() => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            })
            emit('next', Step2_values)
          }, 1500)
        } catch (error) {}
      }
      return { register }
    },
  })
</script>
<style lang="less" scoped>
  .step2 {
    width: 450px;
    margin: 0 auto;
  }
</style>
