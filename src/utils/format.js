// Máscaras e validações simples para o cadastro do paciente.
// Isto é uma demo — os dados ficam só no localStorage do navegador (LGPD-friendly:
// nada é enviado a nenhum servidor).

export const onlyDigits = (v) => (v || '').replace(/\D/g, '')

export function formatCPF(value) {
  const d = onlyDigits(value).slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

export function formatPhone(value) {
  const d = onlyDigits(value).slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || '').trim())
}

export function isValidCPF(value) {
  return onlyDigits(value).length === 11
}

export function isValidPhone(value) {
  const d = onlyDigits(value)
  return d.length === 10 || d.length === 11
}
