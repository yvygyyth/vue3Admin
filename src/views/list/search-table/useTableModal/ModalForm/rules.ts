const rules = () => {
  return {
    amt: [
      {
        required: true,
        message: '请填写金额',
        trigger: 'blur'
      }
    ],
    bill_type_id: [
      {
        required: true,
        message: '请填写收支类型',
        trigger: 'blur'
      }
    ]
  }
}

export const validateForm = async (
  submit: () => Promise<boolean>,
  callback: () => Promise<any>
) => {
  const valid = await submit()
  if (!valid) {
    try {
      await callback()
    } catch (e) {
      console.error(e)
      return false
    }
    return true
  }
  return false
}

export default rules
