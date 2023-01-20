<template>
  <div class="step3">
    <a-result status="success" title="操作票下发成功">
      <template #extra>
        <a-button type="primary" @click="redo"> 完成 </a-button>
      </template>
    </a-result>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Result, Descriptions } from 'ant-design-vue'
  export default defineComponent({
    components: {
      [Result.name]: Result,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
    },
    emits: ['redo'],
    setup(_, { emit }) {
      return {
        redo: () => {
          emit('redo')
        },
      }
    },
  })
</script>
<style lang="less" scoped>
  .step3 {
    width: 600px;
    margin: 0 auto;
  }

  .desc-wrap {
    padding: 30px 40px;
    margin-top: 30px;
    background-color: @background-color-light;
  }
</style>
