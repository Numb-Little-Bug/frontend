<template>
  <div class="step2">
    {{ values.device.name }} - {{ values.device.site_side_name }}
    {{ values.items }}
    <BasicForm @register="register" />
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, toRefs } from 'vue'
  import { BasicForm, useForm } from '/@/components/Form'
  import { postDeviceApi, postItemApi } from '/@/api/sys/device'
  import { DeviceModel } from '/@/api/sys/model/deviceModel'
  import { ItemModel } from '/@/api/sys/model/ItemModel'

  const props = defineProps(['values'])
  const emit = defineEmits(['next', 'prev'])
  const { device, items } = toRefs(props.values)
  console.log(device.value)
  console.log(items.value)

  const [register] = useForm({
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

  async function customSubmitFunc() {
    console.log(props.values.items)
    try {
      const device: DeviceModel = {
        name: props.values.device.name,
        siteId: props.values.device.site_side_name,
      }
      const items: ItemModel[] = []
      for (let item in props.values.items) {
        if (item.split('_')[3] === 'name') {
          items.push({
            name: props.values.items[item],
            type: item.split('_')[0],
            line: Number(item.split('_')[1]),
            col: Number(item.split('_')[2]),
            status: '',
          })
        }
      }
      for (let item in props.values.items) {
        if (item.split('_')[3] === 'status') {
          for (let i of items) {
            if (
              i.type === item.split('_')[0] &&
              i.line === Number(item.split('_')[1]) &&
              i.col === Number(item.split('_')[2])
            ) {
              i.status = props.values.items[item]
            }
          }
        }
      }
      postDeviceApi(device)
        .then((res) => {
          postItemApi(items, Number(res)).then(() => {
            emit('next')
          })
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  async function customResetFunc() {
    emit('prev')
  }
</script>
<style lang="less" scoped>
  .step2 {
    width: 750px;
    margin: 0 auto;
  }
</style>
