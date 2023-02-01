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
      <BasicUpload :maxSize="20" :maxNumber="1" :api="upload" />
      <BasicUpload :maxSize="20" :maxNumber="1" :api="upload" />
<!--      <a-upload-->
<!--        v-model:file-list="fileList"-->
<!--        name="file"-->
<!--        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"-->
<!--        :headers="headers"-->
<!--        @change="handleChange"-->
<!--      >-->
<!--        <a-button>-->
<!--          <upload-outlined />-->
<!--          Click to Upload-->
<!--        </a-button>-->
<!--      </a-upload>-->
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
  import { siteApi, getSiteApi, videoApi } from '/@/api/sys/site'
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
  const upload = (file: any) => {
    console.log(file.file)
    return videoApi({
      file: file.file,
    })
  }
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
