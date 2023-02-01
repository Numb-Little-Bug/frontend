<template>
  <BasicModal v-bind="$attrs" title="添加现场侧" @ok="handleOk">
    <Form
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
      @keypress.enter="handleOk"
    >
      <FormItem name="name" class="enter-x">
        <AInput
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.name"
          :placeholder="t('sys.site.name')"
        />
      </FormItem>
      <BasicUpload :maxSize="20" :maxNumber="1" :api="Api.Video" />
      <BasicUpload :maxSize="20" :maxNumber="1" :api="Api.Video" />
    </Form>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { Form } from 'ant-design-vue'
  import { Api } from '/@/api/sys/site'
  import { BasicUpload } from '/@/components/Upload'
  import { ref, reactive } from 'vue'
  import { BasicModal } from '/@/components/Modal'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { useFormRules } from './useSite'
  import { siteApi, getSiteApi } from '/@/api/sys/site'
  import { notification } from 'ant-design-vue'
  import { useTabs } from '/@/hooks/web/useTabs'
  const { getFormRules } = useFormRules()
  const FormItem = Form.Item
  const { t } = useI18n()
  const formRef = ref()

  interface formModal {
    name: string
    video1: string
    video2: string
  }
  const formData = reactive<formModal>({
    name: '',
    video1: '',
    video2: '',
  })
  const { refreshPage } = useTabs()
  const handleOk = async () => {
    try {
      const res = await siteApi({
        name: formData.name,
        video1: formData.video1,
        video2: formData.video2,
      })
      if (res) {
        notification.success({
          message: t('sys.site.siteSuccessTitle'),
          duration: 2,
        })
        await getSiteApi()
        await refreshPage()
      }
    } catch (error) {}
  }
</script>
