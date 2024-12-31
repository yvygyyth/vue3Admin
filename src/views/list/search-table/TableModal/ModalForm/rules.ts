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

export default rules
