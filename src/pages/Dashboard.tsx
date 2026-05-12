import { useEffect, useState } from 'react'

import {
  createTransaction,
  getTransactions,
} from '../services/transactions'

import { uploadAvatar } from '../services/profile'

import {
  supabase,
} from '../services/supabase'

import { formatCurrency } from '../utils/formatCurrency'

import SummaryCard from '../components/SummaryCard'

import TransactionCard from '../components/TransactionCard'

import FinancialChart from '../components/FinancialChart'

import MonthlyEvolutionChart from '../components/MonthlyEvolutionChart'

import FinancialInsights from '../components/FinancialInsights'

import ExportButtons from '../components/ExportButtons'

import FinancialBreakdown from '../components/FinancialBreakdown'

import ProfileModal from '../components/ProfileModal'

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

  const [type, setType] = useState('')
  const [category, setCategory] =
    useState('')
  const [amount, setAmount] =
    useState('')
  const [description, setDescription] =
    useState('')

  const [monthlyGoal, setMonthlyGoal] =
    useState('')

  const [transactions, setTransactions] =
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

  // =========================
  // USER
  // =========================

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
      } else {
        setUserName('Usuário')
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

  // =========================
  // AVATAR
  // =========================

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

  // =========================
  // TRANSAÇÕES
  // =========================

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

  useEffect(() => {
    loadTransactions()
  }, [selectedMonth])

  // =========================
  // VALOR BR
  // =========================

  function convertBrazilianValue(
    value: string
  ) {
    return Number(
      value
        .replace(/\./g, '')
        .replace(',', '.')
    )
  }

  // =========================
  // CRIAR TRANSAÇÃO
  // =========================

  async function handleCreateTransaction() {
    const formattedAmount =
      convertBrazilianValue(amount)

    const { error } =
      await createTransaction({
        user_id: userId,
        type,
        category,
        amount: formattedAmount,
        description,
        month: selectedMonth,
      })

    if (error) {
      alert(error.message)
      return
    }

    setType('')
    setCategory('')
    setAmount('')
    setDescription('')

    loadTransactions()
  }

  // =========================
  // CÁLCULOS
  // =========================

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

  const investments = transactions
    .filter(
      (t) => t.type === 'investment'
    )
    .reduce(
      (acc, t) =>
        acc + Number(t.amount),
      0
    )

  const saved = transactions
    .filter((t) => t.type === 'saved')
    .reduce(
      (acc, t) =>
        acc + Number(t.amount),
      0
    )

  const availableBalance =
    incomes - expenses

  const totalWealth =
    investments + saved

  // =========================
  // META
  // =========================

  const goalValue =
    Number(
      monthlyGoal.replace(',', '.')
    ) || 0

  const goalProgress =
    goalValue > 0
      ? (availableBalance /
          goalValue) *
        100
      : 0

  // =========================
  // DETALHAMENTO
  // =========================

  function openBreakdown(
    type: string,
    title: string
  ) {
    setBreakdownType(type)
    setBreakdownTitle(title)
  }

  // =========================
  // RENDER
  // =========================

  return (
    <div className="min-h-screen bg-black text-white p-4">

      <div className="max-w-2xl mx-auto flex flex-col gap-4">

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

        {/* SALDO */}
        <div className="bg-green-600 p-6 rounded-2xl">

          <p className="text-sm">
            Saldo disponível
          </p>

          <h2 className="text-3xl font-bold">
            {formatCurrency(
              availableBalance
            )}
          </h2>

        </div>

        {/* PATRIMÔNIO */}
        <div className="bg-indigo-600 p-4 rounded-2xl">

          <p className="text-sm">
            Patrimônio total
          </p>

          <h3 className="text-xl font-bold">
            {formatCurrency(
              totalWealth
            )}
          </h3>

        </div>

        {/* EXPORTAÇÃO */}
        <ExportButtons
          transactions={transactions}
        />

        {/* MÊS */}
        <div className="bg-gray-900 border border-gray-700 p-4 rounded-2xl">

          <p className="text-sm mb-2">
            Selecione o mês
          </p>

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(
                e.target.value
              )
            }
            className="w-full p-2 bg-gray-800 rounded"
          />

        </div>

        {/* META */}
        <div className="bg-gray-900 border border-gray-700 p-4 rounded-2xl">

          <p className="text-sm mb-2">
            Meta mensal
          </p>

          <input
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="Ex: 2000"
            value={monthlyGoal}
            onChange={(e) =>
              setMonthlyGoal(
                e.target.value
              )
            }
          />

          <div className="w-full bg-gray-800 h-2 rounded mt-3">

            <div
              className="bg-green-500 h-2 rounded"
              style={{
                width: `${Math.min(
                  goalProgress,
                  100
                )}%`,
              }}
            />

          </div>

          <p className="text-xs mt-1 text-gray-400">
            {goalProgress.toFixed(1)}%
          </p>

        </div>

        {/* INSIGHTS */}
        <FinancialInsights
          incomes={incomes}
          expenses={expenses}
          investments={investments}
          saved={saved}
        />

        {/* RESUMOS */}
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
              title="Invest"
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

        {/* GRÁFICOS */}
        <FinancialChart
          incomes={incomes}
          expenses={expenses}
          investments={investments}
          saved={saved}
        />

        <MonthlyEvolutionChart
          transactions={transactions}
        />

        {/* FORM */}
        <div className="bg-gray-900 p-4 rounded-2xl flex flex-col gap-2">

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="p-2 bg-gray-800 rounded"
          >
            <option value="">
              Tipo
            </option>

            <option value="income">
              Receita
            </option>

            <option value="expense">
              Despesa
            </option>

            <option value="investment">
              Investimento
            </option>

            <option value="saved">
              Guardado
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
            className="p-2 bg-gray-800 rounded"
          />

          <input
            placeholder="Valor"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="p-2 bg-gray-800 rounded"
          />

          <input
            placeholder="Descrição"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="p-2 bg-gray-800 rounded"
          />

          <button
            onClick={handleCreateTransaction}
            className="bg-green-500 p-2 rounded font-bold"
          >
            Adicionar
          </button>

        </div>

        {/* TRANSAÇÕES */}
        <div className="flex flex-col gap-2">

          {transactions.length ===
            0 && (
            <p className="text-gray-400 text-center">
              Nenhuma transação neste mês
            </p>
          )}

          {transactions.map((t) => (
            <TransactionCard
              key={t.id}
              transaction={t}
              onDeleted={loadTransactions}
            />
          ))}

        </div>

      </div>

      {/* MODAL DETALHAMENTO */}
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

      {/* MODAL PERFIL */}
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