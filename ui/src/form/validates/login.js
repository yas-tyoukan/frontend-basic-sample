export default (values) => {
  const errors = {};
  if (!values.id) {
    errors.id = '必須項目です';
  }
  if (!values.password) {
    errors.password = '必須項目です';
  }
  return errors;
};
