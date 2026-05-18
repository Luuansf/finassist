import jsPDF from 'jspdf'

import autoTable from 'jspdf-autotable'

import { formatCurrency } from './formatCurrency'

type Transaction = {
  description: string
  amount: number
  category: string
  type: string
}

type Goal = {
  title: string
  target: number
}

type Props = {
  userName: string

  balance: number

  incomes: number

  expenses: number

  investments: number

  saved: number

  goals: Goal[]

  transactions: Transaction[]
}

export function exportFinancialReport({
  userName,
  balance,
  incomes,
  expenses,
  investments,
  saved,
  goals,
  transactions,
}: Props) {
  const doc = new jsPDF()

  doc.setFontSize(22)

  doc.text(
    'Relatório Financeiro',
    14,
    20
  )

  doc.setFontSize(12)

  doc.text(
    `Usuário: ${userName}`,
    14,
    32
  )

  doc.text(
    `Saldo disponível: ${formatCurrency(
      balance
    )}`,
    14,
    42
  )

  doc.text(
    `Receitas: ${formatCurrency(
      incomes
    )}`,
    14,
    50
  )

  doc.text(
    `Despesas: ${formatCurrency(
      expenses
    )}`,
    14,
    58
  )

  doc.text(
    `Investimentos: ${formatCurrency(
      investments
    )}`,
    14,
    66
  )

  doc.text(
    `Guardado: ${formatCurrency(
      saved
    )}`,
    14,
    74
  )

  doc.setFontSize(16)

  doc.text(
    'Metas financeiras',
    14,
    90
  )

  goals.forEach(
    (goal, index) => {
      doc.setFontSize(11)

      doc.text(
        `${goal.title} — ${formatCurrency(
          goal.target
        )}`,
        14,
        100 + index * 8
      )
    }
  )

  autoTable(doc, {
    startY:
      120 +
      goals.length * 8,

    head: [
      [
        'Descrição',
        'Categoria',
        'Tipo',
        'Valor',
      ],
    ],

    body: transactions.map(
      (item) => [
        item.description,
        item.category,
        item.type,
        formatCurrency(
          item.amount
        ),
      ]
    ),
  })

  doc.save(
    'relatorio-financeiro.pdf'
  )
}