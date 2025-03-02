import { useCallback, useMemo, useState } from "react"

export const useFormValidation = (validationSchema: Record<string, Array<(value: string) => null | string>>) => {
  const [fields, setFields] = useState(() => 
    Object.fromEntries(
      Object.keys(validationSchema).map(key => [
        key,
        {value: '', dirty: false, error: null}
      ])
    )
  )

  const validateField = useCallback((fieldName: string, value: string) => {
    const validators = validationSchema[fieldName]
    if (!validators) return null

    for (const validator of validators) {
      const error = validator(value)
      if (error) return error
    }
    return null
  }, [validationSchema])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFields(prev => {
      const error = validateField(name, value)
      return {
        ...prev,
        [name]: {
          value,
          dirty: true,
          error
        }
      }
    })
  }, [validateField])

  const isFormValid = useMemo(() => {
    return Object.values(fields).every(field => field.error != null)
  }, [fields])

  return {
    fields,
    handleChange,
    isFormValid,
    setFields
  }
}