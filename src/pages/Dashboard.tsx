import { useEffect, useState } from 'react'

import { supabase } from '../services/supabase'

import { formatCurrency } from '../utils/formatCurrency'

import { exportFinancialReport } from '../utils/exportFinancialReport'

import { categories } from '../constants/categories'

import PremiumBalanceCard from '../components/PremiumBalanceCard'

import SummaryCard from '../components/SummaryCard'

import MonthlyFlowCard from '../components/MonthlyFlowCard'

import WealthEvolutionChart from '../components/WealthEvolutionChart'

import GoalProgress from '../components/GoalProgress'

import SmartAlerts from '../components/SmartAlerts'

import BottomNav from '../components/BottomNav'

import ProfileModal from '../components/ProfileModal'

import FinancialBreakdown from '../components/FinancialBreakdown'

import EditTransactionModal from '../components/EditTransactionModal'

import ExpenseAnalytics from '../components/ExpenseAnalytics'

import FinancialGoalCard from '../components/FinancialGoalCard'

import SmartNotifications from '../components/SmartNotifications'

import MonthlyEvolutionChart from '../components/MonthlyEvolutionChart'

import BudgetCard from '../components/BudgetCard'

type Props = {
  user: any
}

export default function Dashboard({
  user,
}: Props) {
  const [transactions, setTransactions] =
    useState<any[]>([])

  const [goals, setGoals] =
    useState<any[]>([])

  const [description, setDescription] =
    useState('')

  const [amount, setAmount] =
    useState('')

  const [type, setType] =
    useState('income')

  const [category, setCategory] =
    useState('')

  const [goalTitle, setGoalTitle] =
    useState('')

  const [goalTarget, setGoalTarget] =
    useState('')

  const [activeTab, setActiveTab] =
    useState('home')

  const [showProfileModal, setShowProfileModal] =
    useState(false)

  const [showBreakdown, setShowBreakdown] =
    useState(false)

  const [breakdownType, setBreakdownType] =
    useState('')

  const [breakdownTitle, setBreakdownTitle] =
    useState('')

  const [editingTransaction, setEditingTransaction] =
    useState<any | null>(null)

  const [monthlyGoal] =
    useState(5000)

  const [userName, setUserName] =
    useState('Usuário')

  const [budget, setBudget] =
    useState('')

  const [monthlyBudget, setMonthlyBudget] =
    useState(0)

  useEffect(() => {
    loadTransactions()

    loadGoals()

    loadBudget()

    const name =
      user?.user_metadata?.name

    if (name) {
      setUserName(name)
    }
  }, [])

  async function loadTransactions() {
    const { data } =
      await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {
          ascending: false,
        })

    if (data) {
      setTransactions(data)
    }
  }

  async function loadGoals() {
    const { data } =
      await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)

    if (data) {
      setGoals(data)
    }
  }

  async function loadBudget() {
    const { data } =
      await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', user.id)
        .single()

    if (data) {
      setMonthlyBudget(
        Number(data.amount)
      )
    }
  }

  async function handleSaveBudget() {
    if (!budget) {
      return
    }

    const value =
      Number(budget)

    const { error } =
      await supabase
        .from('budgets')
        .upsert({
          user_id: user.id,
          amount: value,
        })

    if (error) {
      alert(error.message)
      return
    }

    setMonthlyBudget(value)

    setBudget('')
  }

  async function handleCreateGoal() {
    if (
      !goalTitle ||
      !goalTarget
    ) {
      return
    }

    const {
      data,
      error,
    } = await supabase
      .from('goals')
      .insert([
        {
          user_id: user.id,

          title: goalTitle,

          target:
            Number(goalTarget),

          current: saved,
        },
      ])
      .select()

    if (error) {
      alert(error.message)
      return
    }

    if (data) {
      setGoals([
        ...goals,
        data[0],
      ])
    }

    setGoalTitle('')
    setGoalTarget('')
  }

  async function handleCreateTransaction() {
    if (
      !description ||
      !amount ||
      !category
    ) {
      return
    }

    const value =
      Number(amount)

    if (value <= 0) {
      return
    }

    const {
      data,
      error,
    } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: user.id,
          description,
          amount: value,
          type,
          category,
        },
      ])
      .select()

    if (error) {
      alert(error.message)
      return
    }

    if (data) {
      setTransactions([
        data[0],
        ...transactions,
      ])
    }

    setDescription('')
    setAmount('')
    setCategory('')
  }

  async function handleDeleteTransaction(
    id: string
  ) {
    const confirmDelete =
      confirm(
        'Deseja excluir esta transação?'
      )

    if (!confirmDelete) {
      return
    }

    await supabase
      .from('transactions')
      .delete()
      .eq('id', id)

    setTransactions(
      transactions.filter(
        (item) =>
          item.id !== id
      )
    )
  }

  async function handleUpdateTransaction(
    updatedTransaction: any
  ) {
    const { error } =
      await supabase
        .from('transactions')
        .update({
          description:
            updatedTransaction.description,

          amount:
            updatedTransaction.amount,

          category:
            updatedTransaction.category,

          type:
            updatedTransaction.type,
        })
        .eq(
          'id',
          updatedTransaction.id
        )

    if (error) {
      alert(error.message)
      return
    }

    setTransactions((old) =>
      old.map((item) =>
        item.id ===
        updatedTransaction.id
          ? updatedTransaction
          : item
      )
    )

    setEditingTransaction(null)
  }

  function openBreakdown(
    type: string,
    title: string
  ) {
    setBreakdownType(type)

    setBreakdownTitle(title)

    setShowBreakdown(true)
  }

  const incomes =
    transactions
      .filter(
        (item) =>
          item.type ===
          'income'
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      )

  const expenses =
    transactions
      .filter(
        (item) =>
          item.type ===
          'expense'
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      )

  const investments =
    transactions
      .filter(
        (item) =>
          item.type ===
          'investment'
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      )

  const saved =
    transactions
      .filter(
        (item) =>
          item.type ===
          'saved'
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      )

  const availableBalance =
    Math.max(
      incomes - expenses,
      0
    )

  const wealthData = [
    {
      name: 'Disponível',
      value: availableBalance,
    },

    {
      name: 'Investimentos',
      value: investments,
    },

    {
      name: 'Guardado',
      value: saved,
    },
  ]

  const monthlyEvolution = [
    {
      month: 'JAN',
      value:
        availableBalance * 0.3,
    },

    {
      month: 'FEV',
      value:
        availableBalance * 0.5,
    },

    {
      month: 'MAR',
      value:
        availableBalance * 0.7,
    },

    {
      month: 'ABR',
      value:
        availableBalance,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-28">

      <div className="max-w-xl mx-auto p-4 flex flex-col gap-4">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-green-500">

              <img
                src="https://i.pravatar.cc/150"
                className="w-full h-full object-cover"
              />

            </div>

            <div>

              <h1 className="text-3xl font-black">
                Olá, {userName} 👋
              </h1>

              <button
                onClick={() =>
                  setShowProfileModal(
                    true
                  )
                }
                className="text-green-400 text-sm"
              >
                Editar perfil
              </button>

            </div>

          </div>

          <button
            onClick={async () => {
              await supabase.auth.signOut()

              location.reload()
            }}
            className="text-red-400"
          >
            Sair
          </button>

        </div>

        <PremiumBalanceCard
          balance={
            availableBalance
          }
        />

        <button
          onClick={() =>
            exportFinancialReport({
              userName,

              balance:
                availableBalance,

              incomes,

              expenses,

              investments,

              saved,

              goals,

              transactions,
            })
          }
          className="bg-blue-500 hover:bg-blue-600 transition-all rounded-2xl p-4 font-bold"
        >
          Exportar relatório PDF
        </button>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col gap-3">

          <h2 className="text-xl font-bold">
            Definir orçamento mensal
          </h2>

          <input
            type="number"
            placeholder="Ex: 5000"
            value={budget}
            onChange={(e) =>
              setBudget(
                e.target.value
              )
            }
            className="bg-gray-800 rounded-xl p-3"
          />

          <button
            onClick={
              handleSaveBudget
            }
            className="bg-green-500 hover:bg-green-600 transition-all rounded-xl p-3 font-bold"
          >
            Salvar orçamento
          </button>

        </div>

        <BudgetCard
          budget={monthlyBudget}
          expenses={expenses}
        />

        <div className="grid grid-cols-2 gap-3">

          <SummaryCard
            title="Investimentos"
            amount={investments}
            type="investment"
            onClick={() =>
              openBreakdown(
                'investment',
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
                'saved',
                'Dinheiro guardado'
              )
            }
          />

        </div>

        <MonthlyFlowCard
          incomes={incomes}
          expenses={expenses}
          investmentsAdded={
            investments
          }
          savedAdded={saved}
        />

        <ExpenseAnalytics
          transactions={
            transactions
          }
        />

        <SmartNotifications
          incomes={incomes}
          expenses={expenses}
          balance={
            availableBalance
          }
          investments={
            investments
          }
          goals={goals}
          saved={saved}
        />

        <MonthlyEvolutionChart
          data={
            monthlyEvolution
          }
        />

        <WealthEvolutionChart
          data={wealthData}
        />

        <GoalProgress
          current={
            availableBalance
          }
          target={monthlyGoal}
        />

        <SmartAlerts
          balance={
            availableBalance
          }
          expenses={expenses}
          incomes={incomes}
        />

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col gap-3">

          <h2 className="text-xl font-bold">
            Nova movimentação
          </h2>

          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="bg-gray-800 rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="bg-gray-800 rounded-xl p-3"
          />

          <select
            value={type}
            onChange={(e) => {
              setType(
                e.target.value
              )

              setCategory('')
            }}
            className="bg-gray-800 rounded-xl p-3"
          >
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

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="bg-gray-800 rounded-xl p-3"
          >
            <option value="">
              Selecione categoria
            </option>

            {categories[
              type as keyof typeof categories
            ]?.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <button
            onClick={
              handleCreateTransaction
            }
            className="bg-green-500 hover:bg-green-600 transition-all rounded-xl p-3 font-bold"
          >
            Adicionar
          </button>

        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col gap-3">

          <h2 className="text-xl font-bold">
            Criar meta financeira
          </h2>

          <input
            type="text"
            placeholder="Nome da meta"
            value={goalTitle}
            onChange={(e) =>
              setGoalTitle(
                e.target.value
              )
            }
            className="bg-gray-800 rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Valor objetivo"
            value={goalTarget}
            onChange={(e) =>
              setGoalTarget(
                e.target.value
              )
            }
            className="bg-gray-800 rounded-xl p-3"
          />

          <button
            onClick={
              handleCreateGoal
            }
            className="bg-green-500 hover:bg-green-600 transition-all rounded-xl p-3 font-bold"
          >
            Criar meta
          </button>

        </div>

        <div className="flex flex-col gap-4">

          {goals.map((goal) => (
            <FinancialGoalCard
              key={goal.id}
              title={goal.title}
              current={saved}
              target={goal.target}
            />
          ))}

        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-xl font-bold">
              Histórico
            </h2>

          </div>

          <div className="flex flex-col gap-3">

            {transactions.map(
              (item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-2xl p-4"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <p className="font-bold">
                        {
                          item.description
                        }
                      </p>

                      <p className="text-sm text-gray-400">
                        {
                          item.category
                        }
                      </p>

                    </div>

                    <div className="text-right">

                      <p
                        className={`font-bold ${
                          item.type ===
                          'income'
                            ? 'text-green-400'
                            : item.type ===
                              'expense'
                            ? 'text-red-400'
                            : item.type ===
                              'investment'
                            ? 'text-green-300'
                            : 'text-blue-400'
                        }`}
                      >
                        {formatCurrency(
                          item.amount
                        )}
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-2 mt-4">

                    <button
                      onClick={() =>
                        setEditingTransaction(
                          item
                        )
                      }
                      className="flex-1 bg-yellow-500 text-black rounded-xl p-2 font-bold"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteTransaction(
                          item.id
                        )
                      }
                      className="flex-1 bg-red-500 rounded-xl p-2 font-bold"
                    >
                      Excluir
                    </button>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

      </div>

      <BottomNav
        activeTab={activeTab}
        setActiveTab={
          setActiveTab
        }
      />

      {showProfileModal && (
        <ProfileModal
          userName={userName}
          avatar={null}
          onClose={() =>
            setShowProfileModal(
              false
            )
          }
        />
      )}

      {showBreakdown && (
        <FinancialBreakdown
          transactions={
            transactions
          }
          type={breakdownType}
          title={breakdownTitle}
          onClose={() =>
            setShowBreakdown(
              false
            )
          }
        />
      )}

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

    </div>
  )
}