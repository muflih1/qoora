export const isRequired = (message = 'Field is required') => (value: unknown) =>
  value != null && typeof value === 'string' && value.trim() ? null : message

export const minLegth = (length: number, message = `Field must have atleast ${length} character`) => (value: string) =>
  value.length >= length ? null : message

export const isEmail = (message = 'Email must be in a valid format') => (value: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? null : message

// class String {

// }

// export const createValidationSchema = validationSchema => {

// }

export const isStringNotNullAndNotWhitespaceOnly = (value: unknown) => {
  return !(value == null || (typeof value === 'string' && value.trim() === ''))
}

export const isStringEmail = (val: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val)

export const isStringOfMinLength = (length: number) => (value: string) => value.length >= length

export const isStringEndsWithQuestionsMark = (value: string) => value.endsWith('?')