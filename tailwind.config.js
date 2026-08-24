/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // brand-* é dinâmico: os valores reais vêm de variáveis CSS
        // (--brand-50..950) definidas em index.css e trocadas conforme o
        // gênero cadastrado (ver PatientForm/ThemeGate). O formato
        // rgb(var(..) / <alpha-value>) preserva os modificadores de opacidade
        // do Tailwind (ex.: bg-brand-500/40).
        brand: {
          50: 'rgb(var(--brand-50) / <alpha-value>)',
          100: 'rgb(var(--brand-100) / <alpha-value>)',
          200: 'rgb(var(--brand-200) / <alpha-value>)',
          300: 'rgb(var(--brand-300) / <alpha-value>)',
          400: 'rgb(var(--brand-400) / <alpha-value>)',
          500: 'rgb(var(--brand-500) / <alpha-value>)',
          600: 'rgb(var(--brand-600) / <alpha-value>)',
          700: 'rgb(var(--brand-700) / <alpha-value>)',
          800: 'rgb(var(--brand-800) / <alpha-value>)',
          900: 'rgb(var(--brand-900) / <alpha-value>)',
          950: 'rgb(var(--brand-950) / <alpha-value>)',
        },
        // sand-* é o neutro quente compartilhado pelas duas paletas (fundo
        // da página, bordas suaves) — não muda com o gênero.
        sand: {
          50: '#f2ebe0',
          100: '#f1e3cd',
          200: '#f5dfbb',
          300: '#eec074',
          400: '#e49d27',
        },
        gold: {
          50: '#fff9ec',
          100: '#ffefc8',
          200: '#ffdc8c',
          300: '#ffc250',
          400: '#ffa724',
          500: '#f98a0a',
          600: '#dd6805',
          700: '#b74a08',
          800: '#94390d',
          900: '#7a300e',
        },
      },
      boxShadow: {
        soft: '0 2px 10px -2px rgba(15, 60, 55, 0.08), 0 8px 24px -8px rgba(15, 60, 55, 0.12)',
        card: '0 1px 2px rgba(15,60,55,.06), 0 8px 20px -6px rgba(15,60,55,.10)',
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        floatUp: {
          '0%': { transform: 'translateY(6px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        popIn: 'popIn .25s ease-out',
        floatUp: 'floatUp .35s ease-out',
      },
    },
  },
  plugins: [],
}
