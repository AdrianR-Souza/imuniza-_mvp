import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { findMyth } from '../data/myths.js'
import { useApp } from '../context/AppContext.jsx'

const SUGGESTIONS = [
  'Vi no TikTok que a vacina causa autismo, é verdade?',
  'A vacina de rotavírus pode virar o intestino do bebê?',
  'Tomar muitas vacinas de uma vez sobrecarrega a imunidade?',
  'A vacina de dengue é perigosa pra quem nunca teve dengue?',
  'A vacina de Covid-19 causa miocardite?',
]

const VERDICT_STYLE = {
  mito: { label: 'MITO', className: 'bg-red-100 text-red-700' },
  'parcialmente mito': { label: 'PARCIALMENTE MITO', className: 'bg-amber-100 text-amber-800' },
  'parcialmente verdade': { label: 'PARCIALMENTE VERDADE', className: 'bg-sky-100 text-sky-700' },
  verdade: { label: 'VERDADE', className: 'bg-emerald-100 text-emerald-700' },
}

function AnswerCard({ myth }) {
  const v = VERDICT_STYLE[myth.verdict] || VERDICT_STYLE.mito
  return (
    <div className="max-w-[92%] md:max-w-[75%] rounded-2xl rounded-tl-sm bg-white p-4 shadow-card">
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${v.className}`}>{v.label}</span>
        <span className="text-xs font-semibold text-brand-900/40">{myth.claim}</span>
      </div>
      <p className="mt-2.5 text-sm text-brand-900/85 leading-relaxed">{myth.summary}</p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg bg-brand-50/70 p-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-brand-700">Efeitos adversos esperados</p>
          <p className="mt-0.5 text-xs text-brand-900/70">{myth.expectedEffects.join(' · ')}</p>
        </div>
        <div className="rounded-lg bg-red-50 p-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-red-600">Quando procurar atendimento</p>
          <p className="mt-0.5 text-xs text-brand-900/70">{myth.seekCareIf}</p>
        </div>
      </div>

      <div className="mt-2.5 rounded-lg bg-gold-50 p-2.5">
        <p className="text-[11px] font-bold uppercase tracking-wide text-gold-700">Indicação da vacina</p>
        <p className="mt-0.5 text-xs text-brand-900/70">{myth.indication}</p>
      </div>

      <div className="mt-3 border-t border-brand-900/8 pt-2.5">
        <p className="text-[11px] font-bold uppercase tracking-wide text-brand-900/40">Fontes</p>
        <ul className="mt-1 space-y-0.5">
          {myth.sources.map((s) => (
            <li key={s} className="text-xs text-brand-900/55">
              📎 {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function FallbackCard() {
  return (
    <div className="max-w-[92%] md:max-w-[75%] rounded-2xl rounded-tl-sm bg-white p-4 shadow-card text-sm text-brand-900/75">
      Ainda não tenho uma resposta curada para essa dúvida específica nesta demo. Em produção, essa busca seria feita em tempo real
      em fontes oficiais (Ministério da Saúde, OMS, ANVISA). Por enquanto, cobrimos dúvidas sobre BCG, hepatite B e A, pentavalente,
      poliomielite, rotavírus, pneumocócica, meningocócica, tríplice viral, catapora, tétano/difteria, HPV, dengue, febre amarela,
      gripe, Covid-19 e VSR — além de mitos gerais como autismo, infertilidade, "muitas vacinas de uma vez" e alteração de DNA.
    </div>
  )
}

export default function Duvidas() {
  const { registerMythCheck } = useApp()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      kind: 'text',
      text: 'Oi! Cole aqui uma dúvida ou alegação que você viu nas redes sobre alguma vacina — eu respondo com base em fontes científicas e oficiais.',
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing])

  const send = (text) => {
    const q = (text ?? input).trim()
    if (!q) return
    setMessages((m) => [...m, { role: 'user', kind: 'text', text: q }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const myth = findMyth(q)
      setTyping(false)
      if (myth) {
        setMessages((m) => [...m, { role: 'assistant', kind: 'myth', myth }])
        registerMythCheck()
      } else {
        setMessages((m) => [...m, { role: 'assistant', kind: 'fallback' }])
      }
    }, 700)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] md:h-[calc(100vh-190px)]">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-950">Tire sua dúvida</h1>
        <p className="mt-1 text-sm text-brand-900/55">Educação em saúde baseada em evidências, com fontes sempre visíveis.</p>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto rounded-3xl bg-brand-50/40 p-3 md:p-5 space-y-3">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.kind === 'text' && (
              <div
                className={`max-w-[85%] md:max-w-[65%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-card ${
                  m.role === 'user' ? 'rounded-tr-sm bg-brand-600 text-white' : 'rounded-tl-sm bg-white text-brand-900/85'
                }`}
              >
                {m.text}
              </div>
            )}
            {m.kind === 'myth' && <AnswerCard myth={m.myth} />}
            {m.kind === 'fallback' && <FallbackCard />}
          </motion.div>
        ))}
        <AnimatePresence>
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-start">
              <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-card">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-300 [animation-delay:-.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-300 [animation-delay:-.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-300" />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {messages.length < 3 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="shrink-0 rounded-full border border-brand-900/10 bg-white px-3.5 py-2 text-xs font-semibold text-brand-900/65 hover:border-brand-300"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
        className="mt-3 flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: vi que a vacina X causa Y, é verdade?"
          className="flex-1 rounded-full border border-brand-900/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-soft disabled:opacity-40"
          disabled={!input.trim()}
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
