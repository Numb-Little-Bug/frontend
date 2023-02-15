<template>
  <PageWrapper title="设备类型管理">
    <div class="form-wrap">
      <BasicForm @register="register">
        <template #slot>
          <a-button @click="handleNext"> 下一步 </a-button>
        </template>
      </BasicForm>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicForm, FormSchema, useForm } from '/@/components/Form'
  import { schemas } from './data'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { PageWrapper } from '/@/components/Page'
  import { ref } from 'vue'
  import { DeviceModel } from '/@/api/sys/model/deviceModel'
  import { postDeviceApi } from "/@/api/sys/device";

  let light_line_number = ref(0)
  let strap_line_number = ref(0)
  let switch_line_number = ref(0)
  function handleNext() {
    for (let i = light_line_number.value; i > 0; i--) {
      removeSchemaByField('light_line_' + i)
    }
    for (let i = strap_line_number.value; i > 0; i--) {
      removeSchemaByField('strap_line_' + i)
    }
    for (let i = switch_line_number.value; i > 0; i--) {
      removeSchemaByField('switch_line_' + i)
    }
    light_line_number.value = getFieldsValue().light_line
    strap_line_number.value = getFieldsValue().strap_line
    switch_line_number.value = getFieldsValue().switch_line
    for (let i = light_line_number.value; i > 0; i--) {
      appendSchemaByField(
        [
          {
            field: 'light_line_' + i,
            label: '第' + i + '行指示灯数量',
            component: 'Select',
            show: true,
            colProps: {
              span: 24 / light_line_number.value,
            },
            componentProps: {
              options: [
                {
                  label: '1',
                  value: 1,
                },
                {
                  label: '2',
                  value: 2,
                },
                {
                  label: '3',
                  value: 3,
                },
                {
                  label: '4',
                  value: 4,
                },
              ],
            },
          },
        ],
        'light_line_number',
      )
    }
    for (let i = strap_line_number.value; i > 0; i--) {
      appendSchemaByField(
        [
          {
            field: 'strap_line_' + i,
            label: '第' + i + '行压板数量',
            component: 'Select',
            show: true,
            colProps: {
              span: 24 / strap_line_number.value,
            },
            componentProps: {
              options: [
                {
                  label: '1',
                  value: 1,
                },
                {
                  label: '2',
                  value: 2,
                },
                {
                  label: '3',
                  value: 3,
                },
                {
                  label: '4',
                  value: 4,
                },
              ],
            },
          },
        ],
        'strap_line_number',
      )
    }
    for (let i = switch_line_number.value; i > 0; i--) {
      appendSchemaByField(
        [
          {
            field: 'switch_line_' + i,
            label: '第' + i + '行开关数量',
            component: 'Select',
            show: true,
            colProps: {
              span: 24 / switch_line_number.value,
            },
            componentProps: {
              options: [
                {
                  label: '1',
                  value: 1,
                },
                {
                  label: '2',
                  value: 2,
                },
                {
                  label: '3',
                  value: 3,
                },
                {
                  label: '4',
                  value: 4,
                },
              ],
            },
          },
        ],
        'switch_line_number',
      )
    }
  }

  const { createMessage } = useMessage()
  const [
    register,
    { validate, setProps, appendSchemaByField, removeSchemaByField, getFieldsValue },
  ] = useForm({
    labelWidth: 80,
    schemas: schemas,
    actionColOptions: {
      span: 24,
    },
    submitButtonOptions: {
      text: '提交',
    },
    submitFunc: customSubmitFunc,
  })

  async function customSubmitFunc() {
    try {
      let values = await validate()
      await setProps({
        submitButtonOptions: {
          loading: true,
        },
      })
      setTimeout(() => {
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        })
        createMessage.success('提交成功！')
      }, 2000)
      console.log(values)
      let device: DeviceModel = {
        type: values.type,
      }
      let lights = {}
      for (let i = 1; i <= values.light_line; i++) {
        lights['line_' + i] = {}
        for (let j = 1; j <= values['light_line_' + i]; j++) {
          lights['line_' + i]['light_' + j] = 'line_' + i + '_light_' + j + '_func'
        }
      }
      device.lights = lights
      let straps = {}
      for (let i = 1; i <= values.strap_line; i++) {
        straps['line_' + i] = {}
        for (let j = 1; j <= values['strap_line_' + i]; j++) {
          straps['line_' + i]['strap_' + j] = 'line_' + i + '_strap_' + j + '_func'
        }
      }
      device.straps = straps
      let switches = {}
      for (let i = 1; i <= values.switch_line; i++) {
        switches['line_' + i] = {}
        for (let j = 1; j <= values['switch_line_' + i]; j++) {
          switches['line_' + i]['switch_' + j] = 'line_' + i + '_switch_' + j + '_func'
        }
      }
      device.switches = switches
      console.log(device)
      await postDeviceApi(device)
    } catch (error) {}
  }
</script>
<style lang="less" scoped>
  .form-wrap {
    padding: 15px;
    width: 920px;
    margin: 0 auto;
  }
</style>
