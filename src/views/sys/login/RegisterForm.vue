<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="name" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.name"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>

      <FormItem name="tel" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.tel"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem>

      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>

      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <FormItem name="role">
        <Select
          :options="roleOptions"
          size="large"
          v-model:value="formData.role"
          :placeholder="t('sys.login.role')"
        />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue'
  import LoginFormTitle from './LoginFormTitle.vue'
  import { Form, Input, Button, Checkbox } from 'ant-design-vue'
  import { StrengthMeter } from '/@/components/StrengthMeter'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin'
  import { registerApi } from '/@/api/sys/user'
  import { Select } from 'ant-design-vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { sha256 } from 'js-sha256'
  const { t } = useI18n()
  const roleOptions = [
    {
      label: '调度侧',
      value: 'dispatch',
    },
    {
      label: '现场侧',
      value: 'site',
    },
  ]
  const FormItem = Form.Item
  const InputPassword = Input.Password
  const { handleBackLogin, getLoginState } = useLoginState()

  const formRef = ref()
  const loading = ref(false)

  const formData = reactive({
    name: '',
    password: '',
    confirmPassword: '',
    tel: '',
    role: null,
  })
  const { getFormRules } = useFormRules(formData)
  const { validForm } = useFormValid(formRef)
  const { notification } = useMessage()
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)
  async function handleRegister() {
    const data = await validForm()
    if (!data) return
    console.log(data)
    loading.value = true
    //TODO: 在这里写注册逻辑, 发送ajax请求
    try {
      const res = await registerApi({
        name: data.name,
        password: sha256(data.password),
        tel: data.tel,
        role: formData.role,
      })
      if (res) {
        notification.success({
          message: t('sys.login.registerSuccessTitle'),
          description: `${t('sys.login.registerSuccessDesc')}`,
          duration: 3,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }
</script>
