export function getCategoryStyle(
  category: string
) {
  const normalized =
    category.toLowerCase()

  // =========================
  // ALIMENTAÇÃO
  // =========================

  if (
    normalized.includes(
      'aliment'
    ) ||
    normalized.includes(
      'mercado'
    ) ||
    normalized.includes(
      'lanche'
    )
  ) {
    return {
      icon: '🍔',
      color:
        'bg-orange-500/20 text-orange-400',
    }
  }

  // =========================
  // TRANSPORTE
  // =========================

  if (
    normalized.includes(
      'uber'
    ) ||
    normalized.includes(
      'gasolina'
    ) ||
    normalized.includes(
      'transporte'
    )
  ) {
    return {
      icon: '🚗',
      color:
        'bg-blue-500/20 text-blue-400',
    }
  }

  // =========================
  // CASA
  // =========================

  if (
    normalized.includes(
      'casa'
    ) ||
    normalized.includes(
      'aluguel'
    ) ||
    normalized.includes(
      'energia'
    )
  ) {
    return {
      icon: '🏠',
      color:
        'bg-purple-500/20 text-purple-400',
    }
  }

  // =========================
  // LAZER
  // =========================

  if (
    normalized.includes(
      'lazer'
    ) ||
    normalized.includes(
      'game'
    ) ||
    normalized.includes(
      'netflix'
    )
  ) {
    return {
      icon: '🎮',
      color:
        'bg-pink-500/20 text-pink-400',
    }
  }

  // =========================
  // INVESTIMENTO
  // =========================

  if (
    normalized.includes(
      'invest'
    )
  ) {
    return {
      icon: '📈',
      color:
        'bg-green-500/20 text-green-400',
    }
  }

  // =========================
  // PADRÃO
  // =========================

  return {
    icon: '💸',
    color:
      'bg-gray-700 text-gray-300',
  }
}