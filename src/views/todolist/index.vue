<template>
  <PageWrapper :class="prefixCls" title="标准列表">
    <div :class="`${prefixCls}__top`">
      <a-row :gutter="12">
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <div>我的待办</div>
          <p>{{ tickets.length }}个任务</p>
        </a-col>
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <div>本周任务平均处理时间</div>
          <p>32分钟</p>
        </a-col>
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <div>本周完成任务数</div>
          <p>24个任务</p>
        </a-col>
      </a-row>
    </div>

    <div :class="`${prefixCls}__content`">
      <a-list>
        <a-row :gutter="16">
          <template v-for="item in tickets" :key="item.id">
            <a-col :xs="1" :sm="2" :md="3" :lg="4" :xl="6">
              <a-list-item>
                <a-card :hoverable="true" :class="`${prefixCls}__card`">
<!--                  <div :class="`${prefixCls}__card-detail`">唱票人：{{ item.tellerName }}</div>-->
<!--                  <div :class="`${prefixCls}__card-detail`">执行人：{{ item.operatorName }} </div>-->
<!--                  <div :class="`${prefixCls}__card-detail`">现场侧：{{ item.siteName }} </div>-->
<!--                  <div :class="`${prefixCls}__card-detail`">起止时间：</div>-->
<!--                  <div :class="`${prefixCls}__card-detail`"-->
<!--                    >{{ timestampToTime(item.startTime) }} &#45;&#45;-->
<!--                    {{ timestampToTime(item.endTime) }}</div-->
<!--                  >-->
                  <Descriptions :column="1" :title="item.name">
                    <template #extra>
                      <a-button type="primary">执行</a-button>
                    </template>
                    <DescriptionsItem label="唱票人">{{ item.tellerName }}</DescriptionsItem>
                    <DescriptionsItem label="执行人">{{ item.operatorName }}</DescriptionsItem>
                    <DescriptionsItem label="现场侧">{{ item.siteName }}</DescriptionsItem>
                    <DescriptionsItem label="起止时间">
                      {{ timestampToTime(item.startTime) }} &#45;&#45;
                      {{ timestampToTime(item.endTime) }}
                    </DescriptionsItem>
                  </Descriptions>
                </a-card>
              </a-list-item>
            </a-col>
          </template>
        </a-row>
      </a-list>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive } from 'vue'
  import Icon from '/@/components/Icon/index'
  import { cardList } from './data'
  import { PageWrapper } from '/@/components/Page'
  import { Card, Row, Col, List, Descriptions, DescriptionsItem } from 'ant-design-vue'
  import { getTicketByIdApi } from '/@/api/sys/ticket'
  import { getUserInfo } from '/@/api/sys/user'
  import { getUsernameByIdApi } from '/@/api/sys/ticket'
  import { getSiteByIdApi } from '/@/api/sys/site'

  export default defineComponent({
    components: {
      Icon,
      PageWrapper,
      [Card.name]: Card,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Row.name]: Row,
      [Col.name]: Col,
      Descriptions,
      DescriptionsItem,
    },
    setup() {
      let tickets: any[] = reactive([])

      // 时间戳：1637244864707
      /* 时间戳转换为时间 */
      function timestampToTime(timestamp) {
        timestamp = timestamp ? timestamp : null
        let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      }
      const getUsernameById = async (id: number) => {
        try {
          const res = await getUsernameByIdApi(id)
          console.log('res:', res.name)
          return res.name
        } catch (e) {
          console.log(e)
        }
      }
      onMounted(async () => {
        try {
          const res = await getUserInfo()
          console.log('res:', res)
          const re = await getTicketByIdApi(res.id)
          console.log('tic:', re)

          for (let i = 0; i < re.length; i++) {
            let tellerName = await getUsernameById(re[i].tellerId)
            let operatorName = await getUsernameById(re[i].operatorId)
            let publisherName = await getUsernameById(re[i].publisherId)
            let siteName = await getSiteByIdApi(re[i].siteId)
            tickets.push({
              name: re[i].name,
              tellerId: re[i].tellerId,
              operatorId: re[i].operatorId,
              notice: re[i].notice,
              publisherId: re[i].publisherId,
              siteId: re[i].siteId,
              startTime: re[i].startTime,
              endTime: re[i].endTime,
              remark: re[i].remark,
              status: 0,
              tellerName: tellerName,
              operatorName: operatorName,
              publisherName: publisherName,
              siteName: siteName.name,
            })
          }
          console.log('ticket:', tickets)
        } catch (e) {
          console.log(e)
        }
      })
      return {
        prefixCls: 'list-card',
        list: cardList,
        tickets,
        timestampToTime,
        getUsernameById,
      }
    },
  })
</script>
<style lang="less" scoped>
  .list-card {
    &__link {
      margin-top: 10px;
      font-size: 14px;

      a {
        margin-right: 30px;
      }

      span {
        margin-left: 5px;
      }
    }

    &__top {
      padding: 24px;
      text-align: center;
      background-color: @component-background;

      &-col {
        &:not(:last-child) {
          border-right: 1px dashed @border-color-base;
        }

        div {
          margin-bottom: 12px;
          font-size: 14px;
          line-height: 22px;
          color: @text-color;
        }

        p {
          margin: 0;
          font-size: 24px;
          line-height: 32px;
          color: @text-color;
        }
      }
    }

    &__card {
      width: 100%;
      margin-bottom: -8px;

      .ant-card-body {
        padding: 16px;
      }

      &-title {
        margin-bottom: 5px;
        font-size: 20px;
        font-weight: 500;
        color: @text-color;

        .icon {
          margin-top: -5px;
          margin-right: 10px;
          font-size: 18px !important;
        }
      }

      &-detail {
        padding-top: 10px;
        padding-left: 30px;
        font-size: 14px;
        color: @text-color;
      }
    }
  }
  .card-content {
    font-weight: bold;
  }
</style>
