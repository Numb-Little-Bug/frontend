<template>
  <div class="step2">
    <div v-show="false">{{ initName() }}</div>
    <div v-show="false">{{ getOperations() }}</div>
    <a-alert message="请确认操作票信息正确无误" show-icon />
    <a-descriptions :column="1" class="mt-5">
      <a-descriptions-item label="任务名称"> {{ values.title }} </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="3" class="mt-5">
      <a-descriptions-item label="现场侧名"> {{ siteName }} </a-descriptions-item>
      <a-descriptions-item label="起止时间">
        {{ msToDate(values.start_end_time[0]).hasTime }} -
        {{ msToDate(values.start_end_time[1]).hasTime }}</a-descriptions-item
      >
    </a-descriptions>
    <a-descriptions :column="3" class="mt-5">
      <a-descriptions-item label="唱票人"> {{ tellerName }} </a-descriptions-item>
      <a-descriptions-item label="操作人"> {{ operatorName }} </a-descriptions-item>
      <a-descriptions-item label="发布人"> {{ publisherName }} </a-descriptions-item>
    </a-descriptions>
    <div style="margin-top: 10px">操作步骤：</div>
    <a-descriptions :column="7" class="mt-5" v-for="(item, index) in operations">
      <a-descriptions-item label="次序" span="1"> {{ index + 1 }} </a-descriptions-item>
      <a-descriptions-item label="描述" span="3">
        {{ item.description }}
      </a-descriptions-item>
      <a-descriptions-item label="类型" span="1"> {{ item.type }} </a-descriptions-item>
      <a-descriptions-item label="备注" span="2"> {{ item.notice }} </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="1" class="mt-5">
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
  import {
    addOperationsApi,
    addTicketApi,
    getUsernameByIdApi,
    getSiteNameByIdApi,
  } from '/@/api/sys/ticket'
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

      function msToDate(msec) {
        let datetime = new Date(msec)
        let year = datetime.getFullYear()
        let month = datetime.getMonth()
        let date = datetime.getDate()
        let hour = datetime.getHours()
        let minute = datetime.getMinutes()
        let second = datetime.getSeconds()

        let result1 =
          year +
          '-' +
          (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
          '-' +
          (date + 1 < 10 ? '0' + date : date) +
          ' ' +
          (hour + 1 < 10 ? '0' + hour : hour) +
          ':' +
          (minute + 1 < 10 ? '0' + minute : minute) +
          ':' +
          (second + 1 < 10 ? '0' + second : second)

        let result2 =
          year +
          '-' +
          (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
          '-' +
          (date + 1 < 10 ? '0' + date : date)

        let result = {
          hasTime: result1,
          withoutTime: result2,
        }

        return result
      }

      async function customResetFunc() {
        emit('prev')
      }

      async function getUserId() {
        const res: any = await getUserInfo()
        return res.id
      }
      const UserId = ref('')

      let siteName = ref('')
      let tellerName = ref('')
      let operatorName = ref('')
      let publisherName = ref('')

      const initName = async () => {
        // 唱票人姓名
        const res: any = await getUsernameByIdApi(_.values.name1)
        tellerName.value = res.name
        // 操作人姓名
        const res1: any = await getUsernameByIdApi(_.values.operator_name)
        operatorName.value = res1.name
        // 发布人姓名
        const res2 = await getUserInfo()
        publisherName.value = res2.name
        // 现场侧名
        const res3: any = await getSiteNameByIdApi(_.values.site_side_name)
        siteName.value = res3.name
      }
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
      let operations: OperationParams[] = reactive([])
      function getOperations() {
        operations.splice(0, operations.length)
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
          const ticket_id = await addTicketApi(Ticket)
          for (let i = 0; i < operations.length; i++) {
            operations[i].ticketId = Number(ticket_id)
          }
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
      return {
        register,
        initName,
        getOperations,
        msToDate,
        siteName,
        tellerName,
        operatorName,
        publisherName,
        operations,
      }
    },
  })
</script>
<style lang="less" scoped>
  .step2 {
    width: 750px;
    margin: 0 auto;
  }
</style>
