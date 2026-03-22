export async function apiLogin(account: string, password: string) {
  await new Promise((r) => setTimeout(r, 300))

  if (account === '111' && password === '123') {
    return {
      token: 'demo-token',
      role: 'student' as const,
      account
    }
  }

  if (account === '222' && password === '123') {
    return {
      token: 'demo-token',
      role: 'teacher' as const,
      account
    }
  }

  if (account === '333' && password === '123') {
    return {
      token: 'demo-token',
      role: 'admin' as const,
      account
    }
  }

  throw new Error('帳號或密碼錯誤')
}