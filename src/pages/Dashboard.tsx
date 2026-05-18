import { useEffect, useState } from 'react'

import {
  createTransaction,
  getTransactions,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
} from '../services/transactions'

import {
  uploadAvatar,
} from '../services/profile'

import {
  supabase,
} from '../services/supabase'

import SummaryCard from '../components/SummaryCard'

import FinancialInsights from '../components/FinancialInsights'

import FinancialBreakdown from '../components/FinancialBreakdown'

import ProfileModal from '../components/ProfileModal'

import BottomNav from '../components/BottomNav'

import PremiumBalanceCard from '../components/PremiumBalanceCard'

import WealthEvolutionChart from '../components/WealthEvolutionChart'

import GoalProgress from '../components/GoalProgress'

import MonthlyFlowCard from '../components/MonthlyFlowCard'

import TransactionHistoryCard from '../components/TransactionHistoryCard'

import ExpenseAnalytics from '../components/ExpenseAnalytics'

import FinancialGoalCard from '../components/FinancialGoalCard'

import SmartAlerts from '../components/SmartAlerts'

import EditTransactionModal from '../components/EditTransactionModal'

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

  const [monthlyGoal] =
    useState('5000')

  const [goalTitle] =
    useState('Reserva financeira')

  const [goalTarget] =
    useState('10000')

  const [recurring, setRecurring] =
    useState(false)

  const [isInstallment, setIsInstallment] =
    useState(false)

  const [installments, setInstallments] =
    useState('2')

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
    useState('expense')

  const [breakdownTitle, setBreakdownTitle] =
    useState('Despesas')

  const [userName, setUserName] =
    useState('Usuário')

  const [avatar, setAvatar] =
    useState<string | null>(null)

  const [showProfileModal, setShowProfileModal] =
    useState(false)

  const [editingTransaction, setEditingTransaction] =
    useState<any | null>(null)

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

  function addMonths(
    month: string,
    amount: number
  ) {
    const [year, mon] =
      month.split('-').map(Number)

    const date = new Date(
      year,
      mon - 1 + amount
    )

    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}`
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

  const investments = Math.max(
    investmentsAdded -
      investmentsRemoved,
    0
  )

  const saved = Math.max(
    savedAdded - savedRemoved,
    0
  )

  const rawAvailableBalance =
    incomes -
    expenses -
    investmentsAdded -
    savedAdded +
    investmentsRemoved +
    savedRemoved

  const availableBalance =
    Math.max(
      rawAvailableBalance,
      0
    )

  const totalWealth =
    investments + saved

  async function handleCreateTransaction() {
    const formattedAmount =
      convertBrazilianValue(amount)

    if (
      !formattedAmount ||
      formattedAmount <= 0
    ) {
      alert(
        'Informe um valor válido'
      )
      return
    }

    if (
      transactionMode ===
        'expense' &&
      formattedAmount >
        availableBalance
    ) {
      alert(
        'Saldo insuficiente'
      )
      return
    }

    const totalInstallments =
      Number(installments)

    const installmentGroup =
      crypto.randomUUID()

    if (
      isInstallment &&
      transactionMode ===
        'expense'
    ) {
      const installmentValue =
        formattedAmount /
        totalInstallments

      for (
        let i = 0;
        i < totalInstallments;
        i++
      ) {
        await createTransaction({
          user_id: userId,
          type: 'expense',
          category,
          amount:
            Number(
              installmentValue.toFixed(
                2
              )
            ),
          description,
          month: addMonths(
            selectedMonth,
            i
          ),
          recurring: false,
          installment_number:
            i + 1,
          installment_total:
            totalInstallments,
          installment_group:
            installmentGroup,
        } as any)
      }
    } else {
      await createTransaction({
        user_id: userId,
        type: transactionMode,
        category,
        amount: formattedAmount,
        description,
        month: selectedMonth,
        recurring,
      } as any)
    }

    setCategory('')
    setAmount('')
    setDescription('')
    setRecurring(false)
    setIsInstallment(false)
    setInstallments('2')

    loadTransactions()
    loadAllTransactions()
  }

  async function handleDeleteTransaction(
    id: string
  ) {
    await deleteTransaction(id)

    loadTransactions()
    loadAllTransactions()
  }

  async function handleUpdateTransaction(
    data: any
  ) {
    if (!editingTransaction) return

    await updateTransaction(
      editingTransaction.id,
      data
    )

    setEditingTransaction(null)

    loadTransactions()
    loadAllTransactions()
  }

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

        <PremiumBalanceCard
          balance={availableBalance}
        />

        <div className="grid grid-cols-2 gap-3">

          <SummaryCard
            title="Investimentos"
            amount={investments}
            type="investment"
            onClick={() =>
              openBreakdown(
                'investment_add',
                'Investimentos'
              )
            }
          />

          <SummaryCard
            title="Guardado"
            amount={saved}
            type="saved"
            onClick={() =>
              openBreakdown(
                'saved_add',
                'Dinheiro guardado'
              )
            }
          />

        </div>

        <MonthlyFlowCard
          incomes={incomes}
          expenses={expenses}
          investmentsAdded={
            investmentsAdded
          }
          savedAdded={savedAdded}
        />

        <WealthEvolutionChart
          transactions={
            allTransactions
          }
        />

        <ExpenseAnalytics
          transactions={transactions}
        />

        <GoalProgress
          current={totalWealth}
          target={Number(
            monthlyGoal
          )}
        />

        <FinancialGoalCard
          title={goalTitle}
          current={totalWealth}
          target={Number(
            goalTarget
          )}
        />

        <FinancialInsights
          incomes={incomes}
          expenses={expenses}
          investments={investments}
          saved={saved}
        />

        <SmartAlerts
          balance={availableBalance}
          expenses={expenses}
          incomes={incomes}
        />

        <div className="bg-gray-900 p-4 rounded-2xl flex flex-col gap-3">

          <h2 className="text-lg font-bold">
            Nova movimentação
          </h2>

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(
                e.target.value
              )
            }
            className="p-3 bg-gray-800 rounded-xl"
          />

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
              Investimento
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

          {transactionMode ===
            'expense' && (
            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={
                  isInstallment
                }
                onChange={(e) =>
                  setIsInstallment(
                    e.target.checked
                  )
                }
              />

              Compra parcelada

            </label>
          )}

          {isInstallment && (
            <input
              type="number"
              min="2"
              max="36"
              value={installments}
              onChange={(e) =>
                setInstallments(
                  e.target.value
                )
              }
              className="p-3 bg-gray-800 rounded-xl"
              placeholder="Parcelas"
            />
          )}

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={recurring}
              onChange={(e) =>
                setRecurring(
                  e.target.checked
                )
              }
            />

            Repetir automaticamente

          </label>

          <button
            onClick={
              handleCreateTransaction
            }
            className="bg-green-500 p-3 rounded-xl font-bold"
          >
            Salvar movimentação
          </button>

        </div>

        <div className="flex flex-col gap-3">

          {transactions.map(
            (transaction) => (
              <TransactionHistoryCard
                key={transaction.id}
                transaction={
                  transaction
                }
                onDelete={
                  handleDeleteTransaction
                }
                onEdit={() =>
                  setEditingTransaction(
                    transaction
                  )
                }
              />
            )
          )}

        </div>

      </div>

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {editingTransaction && (
        <EditTransactionModal
          transaction={
            editingTransaction
          }
          onClose={() =>
            setEditingTransaction(
              null
            )
          }
          onSave={
            handleUpdateTransaction
          }
        />
      )}

      {showProfileModal && (
        <ProfileModal
          userName={userName}
          avatar={avatar}
          onClose={() =>
            setShowProfileModal(
              false
            )
          }
        />
      )}

      <FinancialBreakdown
  transactions={transactions}
  type={breakdownType}
  title={breakdownTitle}
  onClose={() => {}}
/>

    </div>
  )
}