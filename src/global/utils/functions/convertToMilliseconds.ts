export const convertToMilliseconds = (time: string): number => {
  const unit = time.slice(-1)
  const value = parseInt(time.slice(0, -1))

  switch (unit) {
    case 's':
      return value * 1000 // segundos
    case 'm':
      return value * 60 * 1000 // minutos
    case 'h':
      return value * 60 * 60 * 1000 // horas
    case 'd':
      return value * 24 * 60 * 60 * 1000 // dias
    default:
      throw new Error('Invalid time format')
  }
  return 0
}
