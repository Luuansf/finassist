import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'

type Transaction = {
  type: string
  category: string
  amount: number
  description: string
  month: string
}

type Props = {
  transactions: Transaction[]
}

export default function ExportButtons({
  transactions,
}: Props) {
  // 📄 PDF
  function exportPDF() {
    const doc = new jsPDF()

    doc.setFontSize(18)

    doc.text(
      'Relatório Financeiro',
      20,
      20
    )

    let y = 40

    transactions.forEach((t) => {
      doc.text(
        `${t.month} | ${t.type} | ${t.category} | R$ ${t.amount}`,
        20,
        y
      )

      y += 10
    })

    doc.save(
      'relatorio-financeiro.pdf'
    )
  }

  // 📊 EXCEL
  function exportExcel() {
    const worksheet =
      XLSX.utils.json_to_sheet(
        transactions
      )

    const workbook =
      XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Relatório'
    )

    XLSX.writeFile(
      workbook,
      'relatorio-financeiro.xlsx'
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-2xl flex gap-2">

      <button
        onClick={exportPDF}
        className="bg-red-500 px-4 py-2 rounded-xl font-bold"
      >
        Exportar PDF
      </button>

      <button
        onClick={exportExcel}
        className="bg-green-600 px-4 py-2 rounded-xl font-bold"
      >
        Exportar Excel
      </button>

    </div>
  )
}