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
            <a-col :span="6">
              <a-list-item>
                <a-card :hoverable="true" :class="`${prefixCls}__card`">
                  <div :class="`${prefixCls}__card-title`">
                    <a
                      ><Icon icon="logos:todomvc" color="#1890ff" /><span>{{ item.name }}</span></a
                    ></div
                  >
                  <div :class="`${prefixCls}__card-detail`">唱票人:{{ item.tellerId }}</div>
                  <div :class="`${prefixCls}__card-detail`">执行人：{{ item.operatorId }} </div>
                  <div :class="`${prefixCls}__card-detail`">现场侧id：{{ item.siteId }} </div>
                  <div :class="`${prefixCls}__card-detail`"
                    >起止时间：{{ item.startTime }} -- {{ item.endTime }}</div
                  >
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
  import { Card, Row, Col, List } from 'ant-design-vue'
  import { getTicketByIdApi } from '/@/api/sys/ticket'
  import { getUserInfo } from '/@/api/sys/user'
  import { AddTicketParams } from '/@/api/sys/model/ticketModel'

  export default defineComponent({
    components: {
      Icon,
      PageWrapper,
      [Card.name]: Card,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    setup() {
      let tickets: AddTicketParams[] = reactive([])
      onMounted(async () => {
        try {
          const res = await getUserInfo()
          console.log('res:', res)
          const re = await getTicketByIdApi(res.id)
          console.log('tic:', re)
          for (let i = 0; i < re.length; i++) {
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
</style>
