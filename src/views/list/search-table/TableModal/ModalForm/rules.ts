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

export const validateForm = async (submit: () => Promise<boolean>, callback: () => void) => {
  const valid = await submit()
  if (!valid) {
    callback()
    return true
  }
  return false
}

export default rules
