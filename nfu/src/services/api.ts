export async function apiLogin(account: string, password: string) {
  await new Promise((r) => setTimeout(r, 300))

  if (account === '11111111' && password === 'student123') {
    return {
      token: 'demo-token',
      role: 'student' as const,
      account
    }
  }

  if (account === '2222222' && password === 'teacher123') {
    return {
      token: 'demo-token',
      role: 'teacher' as const,
      account
    }
  }

  if (account === '333333' && password === 'admin123') {
    return {
      token: 'demo-token',
      role: 'admin' as const,
      account
    }
  }

  throw new Error('帳號或密碼錯誤')
}