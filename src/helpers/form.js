export const formData = (obj, form = new FormData(), namespace = '') => {
  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      const formKey = namespace ? `${namespace}[${property}]` : property;

      if (Array.isArray(obj[property])) {
        obj[property].forEach((item, index) => {
          if (typeof item === 'object' && !(item instanceof File) && !(item instanceof Blob)) {
            formData(item, form, `${formKey}[${index}]`);
          } else {
            form.append(`${formKey}[${index}]`, item);
          }
        });
      } else if (
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof File) &&
        !(obj[property] instanceof Blob)
      ) {
        formData(obj[property], form, formKey);
      } else {
        form.append(formKey, obj[property]);
      }
    }
  }
  return form;
};

export const formatPhone = (value) => {
  const cleaned = value?.replace(/\D/g, '')
  const match = cleaned?.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/)
  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`
  }
  return value || ''
}
