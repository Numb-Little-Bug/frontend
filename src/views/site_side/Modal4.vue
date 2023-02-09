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
    </Form>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { Form } from 'ant-design-vue'
  import { ref, reactive } from 'vue'
  import { BasicModal } from '/@/components/Modal'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { useFormRules } from './useSite'
  import { siteApi, getSiteApi, videoApi } from '/@/api/sys/site'
  import { notification } from 'ant-design-vue'
  import { useTabs } from '/@/hooks/web/useTabs'
  const { getFormRules } = useFormRules()
  const FormItem = Form.Item
  const { t } = useI18n()
  const formRef = ref()

  interface formModal {
    name: string
  }
  const formData = reactive<formModal>({
    name: '',
  })
  const { refreshPage } = useTabs()
  const handleOk = async () => {
    try {
      const res = await siteApi({
        name: formData.name,
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
