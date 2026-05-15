import { useEffect, useState } from 'react'

import {
  createTransaction,
  getTransactions,
  getAllTransactions,
} from '../services/transactions'

import { uploadAvatar } from '../services/profile'

import {
  supabase,
} from '../services/supabase'

import { formatCurrency } from '../utils/formatCurrency'

import SummaryCard from '../components/SummaryCard'

import FinancialInsights from '../components/FinancialInsights'

import FinancialBreakdown from '../components/FinancialBreakdown'

import ProfileModal from '../components/ProfileModal'

import BottomNav from '../components/BottomNav'

import PremiumBalanceCard from '../components/PremiumBalanceCard'

import WealthEvolutionChart from '../components/WealthEvolutionChart'

type Props = {
  userId: string
  onLogout: () => void
}

export default function Dashboard({
  userId,
  onLogout,
}: Props) {
  const currentMonth =
    new Date().toISOString().slice(0, 7)

  const [selectedMonth, setSelectedMonth] =
    useState(currentMonth)

  const [activeTab, setActiveTab] =
    useState('home')

  const [category, setCategory] =
    useState('')

  const [amount, setAmount] =
    useState('')

  const [description, setDescription] =
    useState('')

  const [monthlyGoal, setMonthlyGoal] =
    useState('')

  const [transactionMode, setTransactionMode] =
    useState<
      | 'income'
      | 'expense'
      | 'investment_add'
      | 'investment_remove'
      | 'saved_add'
      | 'saved_remove'
    >('income')

  const [transactions, setTransactions] =
    useState<any[]>([])

  const [allTransactions, setAllTransactions] =
    useState<any[]>([])

  const [breakdownType, setBreakdownType] =
    useState('')

  const [breakdownTitle, setBreakdownTitle] =
    useState('')

  const [userName, setUserName] =
    useState('Usuário')

  const [avatar, setAvatar] =
    useState<string | null>(null)

  const [showProfileModal, setShowProfileModal] =
    useState(false)

  useEffect(() => {
    async function loadUserData() {
      const {
        data: { user },
      } =
        await supabase.auth.getUser()

      if (user?.user_metadata?.name) {
        setUserName(
          user.user_metadata.name
        )
      }

      if (
        user?.user_metadata?.avatar
      ) {
        setAvatar(
          user.user_metadata.avatar
        )
      }
    }

    loadUserData()
  }, [])

  async function handleAvatarChange(
    event: any
  ) {
    const file =
      event.target.files[0]

    if (!file) return

    const result =
      await uploadAvatar(
        file,
        userId
      )

    if (result.error) {
      alert(
        result.error.message
      )
      return
    }

    if (result.publicUrl) {
      setAvatar(
        result.publicUrl
      )

      await supabase.auth.updateUser({
        data: {
          avatar:
            result.publicUrl,
        },
      })
    }
  }

  async function loadTransactions() {
    const { data, error } =
      await getTransactions(
        userId,
        selectedMonth
      )

    if (error) {
      console.log(error)
      return
    }

    setTransactions(data || [])
  }

  async function loadAllTransactions() {
    const { data, error } =
      await getAllTransactions(
        userId
      )

    if (error) {
      console.log(error)
      return
    }

    setAllTransactions(data || [])
  }

  useEffect(() => {
    loadTransactions()
    loadAllTransactions()
  }, [selectedMonth])

  function convertBrazilianValue(
    value: string
  ) {
    return Number(
      value
        .replace(/\./g, '')
        .replace(',', '.')
    )
  }

  async function handleCreateTransaction() {
    const formattedAmount =
      convertBrazilianValue(amount)

    let finalType = ''

    switch (transactionMode) {
      case 'income':
        finalType = 'income'
        break

      case 'expense':
        finalType = 'expense'
        break

      case 'investment_add':
        finalType =
          'investment_add'
        break

      case 'investment_remove':
        finalType =
          'investment_remove'
        break

      case 'saved_add':
        finalType = 'saved_add'
        break

      case 'saved_remove':
        finalType =
          'saved_remove'
        break
    }

    const created =
      await createTransaction({
        user_id: userId,
        type: finalType,
        category,
        amount: formattedAmount,
        description,
        month: selectedMonth,
      })

    if (created.error) {
      alert(created.error.message)
      return
    }

    setCategory('')
    setAmount('')
    setDescription('')

    loadTransactions()
    loadAllTransactions()
  }

  const incomes = transactions
    .filter((t) => t.type === 'income')
    .reduce(
      (acc, t) =>
        acc + Number(t.amount),
      0
    )

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce(
      (acc, t) =>
        acc + Number(t.amount),
      0
    )

  const investmentsAdded =
    allTransactions
      .filter(
        (t) =>
          t.type ===
          'investment_add'
      )
      .reduce(
        (acc, t) =>
          acc + Number(t.amount),
        0
      )

  const investmentsRemoved =
    allTransactions
      .filter(
        (t) =>
          t.type ===
          'investment_remove'
      )
      .reduce(
        (acc, t) =>
          acc + Number(t.amount),
        0
      )

  const savedAdded =
    allTransactions
      .filter(
        (t) =>
          t.type === 'saved_add'
      )
      .reduce(
        (acc, t) =>
          acc + Number(t.amount),
        0
      )

  const savedRemoved =
    allTransactions
      .filter(
        (t) =>
          t.type ===
          'saved_remove'
      )
      .reduce(
        (acc, t) =>
          acc + Number(t.amount),
        0
      )

  const investments =
    investmentsAdded -
    investmentsRemoved

  const saved =
    savedAdded - savedRemoved

  const availableBalance =
    incomes - expenses

  const totalWealth =
    investments + saved

  function openBreakdown(
    type: string,
    title: string
  ) {
    setBreakdownType(type)
    setBreakdownTitle(title)
  }

  return (
    <div className="min-h-screen bg-black text-white pb-28">

      <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <label className="cursor-pointer relative">

              {avatar ? (
                <img
                  src={avatar}
                  className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-xl font-bold">
                  {userName
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              <div className="absolute -bottom-1 -right-1 bg-black px-1 rounded text-xs">
                📷
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleAvatarChange
                }
                className="hidden"
              />

            </label>

            <div>

              <h1 className="text-2xl font-bold">
                Olá, {userName} 👋
              </h1>

              <button
                onClick={() =>
                  setShowProfileModal(
                    true
                  )
                }
                className="text-sm text-green-400"
              >
                Editar perfil
              </button>

            </div>

          </div>

          <button
            onClick={onLogout}
            className="text-red-400 text-sm"
          >
            Sair
          </button>

        </div>

        {/* HOME */}
        {activeTab === 'home' && (
          <>

            <PremiumBalanceCard
              title="Saldo disponível"
              amount={formatCurrency(
                availableBalance
              )}
              subtitle="Valor livre no mês atual"
              gradient="bg-gradient-to-br from-green-500 to-emerald-700"
            />

            <PremiumBalanceCard
              title="Patrimônio total"
              amount={formatCurrency(
                totalWealth
              )}
              subtitle="Investimentos + valores guardados"
              gradient="bg-gradient-to-br from-indigo-500 to-purple-700"
            />

            <FinancialInsights
              incomes={incomes}
              expenses={expenses}
              investments={investments}
              saved={saved}
            />

            <WealthEvolutionChart
              transactions={allTransactions}
            />

            <div className="grid grid-cols-2 gap-2">

              <div
                onClick={() =>
                  openBreakdown(
                    'income',
                    'Receitas'
                  )
                }
              >
                <SummaryCard
                  title="Receitas"
                  amount={formatCurrency(
                    incomes
                  )}
                  color="bg-green-500"
                />
              </div>

              <div
                onClick={() =>
                  openBreakdown(
                    'expense',
                    'Despesas'
                  )
                }
              >
                <SummaryCard
                  title="Despesas"
                  amount={formatCurrency(
                    expenses
                  )}
                  color="bg-red-500"
                />
              </div>

              <div
                onClick={() =>
                  openBreakdown(
                    'investment',
                    'Investimentos'
                  )
                }
              >
                <SummaryCard
                  title="Investimentos"
                  amount={formatCurrency(
                    investments
                  )}
                  color="bg-yellow-500"
                />
              </div>

              <div
                onClick={() =>
                  openBreakdown(
                    'saved',
                    'Guardado'
                  )
                }
              >
                <SummaryCard
                  title="Guardado"
                  amount={formatCurrency(
                    saved
                  )}
                  color="bg-purple-500"
                />
              </div>

            </div>

          </>
        )}

        {/* ADICIONAR */}
        {activeTab === 'add' && (
          <div className="bg-gray-900 p-4 rounded-2xl flex flex-col gap-3">

            <select
              value={transactionMode}
              onChange={(e) =>
                setTransactionMode(
                  e.target.value as any
                )
              }
              className="p-3 bg-gray-800 rounded-xl"
            >
              <option value="income">
                Receita
              </option>

              <option value="expense">
                Despesa
              </option>

              <option value="investment_add">
                Adicionar investimento
              </option>

              <option value="investment_remove">
                Retirar investimento
              </option>

              <option value="saved_add">
                Guardar dinheiro
              </option>

              <option value="saved_remove">
                Retirar guardado
              </option>

            </select>

            <input
              placeholder="Categoria"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="p-3 bg-gray-800 rounded-xl"
            />

            <input
              placeholder="Valor"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              className="p-3 bg-gray-800 rounded-xl"
            />

            <input
              placeholder="Descrição"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="p-3 bg-gray-800 rounded-xl"
            />

            <button
              onClick={
                handleCreateTransaction
              }
              className="bg-green-500 p-3 rounded-xl font-bold"
            >
              Salvar movimentação
            </button>

          </div>
        )}

        {/* PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-gray-900 border border-gray-700 p-4 rounded-2xl flex flex-col gap-4">

            <div>

              <p className="text-sm mb-2">
                Selecione o mês
              </p>

              <input
                type="month"
                value={
                  selectedMonth
                }
                onChange={(e) =>
                  setSelectedMonth(
                    e.target.value
                  )
                }
                className="w-full p-3 bg-gray-800 rounded-xl"
              />

            </div>

            <div>

              <p className="text-sm mb-2">
                Meta mensal
              </p>

              <input
                className="w-full p-3 bg-gray-800 rounded-xl"
                placeholder="Ex: 2000"
                value={monthlyGoal}
                onChange={(e) =>
                  setMonthlyGoal(
                    e.target.value
                  )
                }
              />

            </div>

          </div>
        )}

      </div>

      <BottomNav
        active={activeTab}
        onChange={setActiveTab}
      />

      {breakdownType && (
        <FinancialBreakdown
          title={breakdownTitle}
          type={breakdownType}
          transactions={transactions}
          onClose={() =>
            setBreakdownType('')
          }
        />
      )}

      {showProfileModal && (
        <ProfileModal
          currentName={userName}
          onClose={() =>
            setShowProfileModal(
              false
            )
          }
          onUpdated={(newName) =>
            setUserName(newName)
          }
        />
      )}

    </div>
  )
}