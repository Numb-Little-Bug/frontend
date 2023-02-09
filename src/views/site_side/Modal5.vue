<template>
  <BasicModal v-bind="$attrs" title="管理现场侧" @ok="handleOk" width="75%">
    <Row>
      <Col :span="17">
        <Tabs v-model:activeKeys="activeKey">
          <TabPane key="1" tab="监控1">
            <span class="flex" style="margin-bottom: 10px">
              <video controls :src="site.video1" style="width: 100%; height: 100%"></video>
            </span>
          </TabPane>
          <TabPane key="2" tab="监控2">
            <span class="flex" style="margin-bottom: 10px">
              <video controls :src="site.video2" style="width: 100%; height: 100%"></video>
            </span>
          </TabPane>
        </Tabs>
      </Col>
      <Col :span="7">
        <strong style="font-size: 15px"> 操作步骤</strong>
      </Col>
    </Row>
<!--    <Form-->
<!--      class="p-4 enter-x"-->
<!--      :model="formData"-->
<!--      :rules="getFormRules"-->
<!--      ref="formRef"-->
<!--      @keypress.enter="handleOk"-->
<!--    >-->
<!--      <FormItem name="name" class="enter-x">-->
<!--        <AInput-->
<!--          class="fix-auto-fill"-->
<!--          size="large"-->
<!--          v-model:value="formData.name"-->
<!--          :placeholder="t('sys.site.name')"-->
<!--        />-->
<!--      </FormItem>-->
<!--    </Form>-->
  </BasicModal>
</template>

<script lang="ts" setup>
  import { Form } from 'ant-design-vue'
  import { ref, reactive } from 'vue'
  import { BasicModal } from '/@/components/Modal'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { useFormRules } from './useSite'
  import { getSiteByIdApi } from '/@/api/sys/site'
  import { notification, Row, Col, Tabs, TabPane } from 'ant-design-vue'
  import { useTabs } from '/@/hooks/web/useTabs'
  const { getFormRules } = useFormRules()
  const FormItem = Form.Item
  const { t } = useI18n()
  const formRef = ref()

  const props = defineProps(['site'])

  let activeKey = ref('1')

  interface formModal {
    name: string
  }
  const formData = reactive<formModal>({
    name: '',
  })
  const { refreshPage } = useTabs()
  const handleOk = async () => {
    // try {
    //   const res = await siteApi({
    //     name: formData.name,
    //   })
    //   if (res) {
    //     notification.success({
    //       message: t('sys.site.siteSuccessTitle'),
    //       duration: 2,
    //     })
    //     await getSiteApi()
    //     await refreshPage()
    //   }
    // } catch (error) {}
  }
</script>

<style scoped></style>
