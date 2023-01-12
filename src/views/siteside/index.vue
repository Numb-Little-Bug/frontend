<template>
  <PageWrapper>
    <div>site</div>
    <CollapseContainer>
      <template #title>
        <div>title</div>
      </template>
      <template #content>
        <div>content</div>
      </template>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { CollapseContainer } from '/@/components/Container'
  import { ref } from 'vue'
  import { PageWrapper } from '/@/components/Page'

  const loading = ref(true)

  setTimeout(() => {
    loading.value = false
  }, 1500)
</script>
