type Envirorment = {
  NODE_ENV: 'production' | 'development'
  PORT: string
  DATABASE_URI: string
  SESSION_SECRET: string
  MAILING_EMAIL: string
  MAILING_CLIENT_ID: string
  MAILING_CLIENT_SECRET: string
  MAILING_ACCESS_TOKEN: string
  MAILING_REFRESH_TOKEN: string
  MAILING_REDIRECT_URI: string
}

export function getEnv<Key extends keyof Envirorment>(key: Key, fallback?: Envirorment[Key]): Envirorment[Key] {
  const value = process.env[key] as Envirorment[Key] | undefined
  if (value === undefined) {
    if (fallback !== undefined) return fallback
    throw new Error('Missing envirorment variable ' + key)
  }
  return value
}