import { supabase } from './supabase'

export async function getWallet(
  userId: string
) {
  return await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .single()
}

export async function createWallet(
  userId: string
) {
  return await supabase
    .from('wallets')
    .insert({
      user_id: userId,
      invested_balance: 0,
      saved_balance: 0,
    })
}

export async function updateWallet(
  walletId: string,
  data: {
    invested_balance?: number
    saved_balance?: number
  }
) {
  return await supabase
    .from('wallets')
    .update(data)
    .eq('id', walletId)
}