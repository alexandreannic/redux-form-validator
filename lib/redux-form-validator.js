export function reduxFormValidator(values, validators) {
  const errors = {};
  Object.keys(validators).forEach(f => {
    const validations = validators[f];
    const vals = values[f];
    if (!Array.isArray(validations)) {
      errors[f] = validation(vals || {}, validations);
    } else {
      validations.forEach(v => {
        const error = v(vals);
        if (error) errors[f] = error
      })
    }
  });
  return errors;
}