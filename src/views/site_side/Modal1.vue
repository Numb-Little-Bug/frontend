<template>
  <BasicModal
    v-bind="$attrs"
    :title="t('sys.site.deleteConfirm')"
    :helpMessage="t('sys.site.deleteConfirmMessage', { name: props.siteId })"
    @ok="deleteSite"
  >
    {{ siteId }}
    {{ t('sys.site.deleteConfirmMessage', { name: props.siteId }) }}
  </BasicModal>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import BasicModal from '/@/components/Modal/src/BasicModal.vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { deleteSiteApi } from '/@/api/sys/site'
  import { notification } from 'ant-design-vue'
  import { useTabs } from '/@/hooks/web/useTabs'
  import { getSiteApi } from '/@/api/sys/site'

  const { refreshPage } = useTabs()

  const props = defineProps(['siteId'])
  const { t } = useI18n()
  let siteId = ref(props.siteId)
  const deleteSite = async () => {
    try {
      const res = await deleteSiteApi({
        siteId: siteId.value,
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
