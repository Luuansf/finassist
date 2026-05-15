import { supabase } from './supabase'

type CreateTransactionProps = {
  user_id: string
  type: string
  category: string
  amount: number
  description: string
  month: string
  recurring?: boolean
}

export async function createTransaction(
  data: CreateTransactionProps
) {
  return await supabase
    .from('transactions')
    .insert(data)
}

export async function getTransactions(
  userId: string,
  month: string
) {
  return await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .eq('month', month)
    .order('created_at', {
      ascending: false,
    })
}

export async function getAllTransactions(
  userId: string
) {
  return await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', {
      ascending: false,
    })
}

export async function deleteTransaction(
  id: string
) {
  return await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
}