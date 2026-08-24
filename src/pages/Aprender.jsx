import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { relevantQuiz } from '../data/quiz.js'
import { useApp } from '../context/AppContext.jsx'

export default function Aprender() {
  const { profile, answerQuiz, quizAnswered, level } = useApp()
  const QUIZ = useMemo(() => relevantQuiz(profile.phase), [profile.phase])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [roundCorrect, setRoundCorrect] = useState(0)

  const question = QUIZ[index]
  const done = index >= QUIZ.length
  const alreadyAnswered = question && quizAnswered.includes(question.id)

  const progressPct = useMemo(() => Math.round((index / QUIZ.length) * 100), [index, QUIZ])

  const choose = (i) => {
    if (selected !== null) return
    setSelected(i)
    const correct = i === question.answer
    if (correct) setRoundCorrect((c) => c + 1)
    answerQuiz(question.id, correct && !alreadyAnswered)
  }

  const next = () => {
    setSelected(null)
    setIndex((i) => i + 1)
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md text-center py-10">
        <div className="text-5xl">🏆</div>
        <h1 className="mt-3 text-2xl font-extrabold text-brand-950">Rodada concluída!</h1>
        <p className="mt-2 text-sm text-brand-900/60">
          Você acertou {roundCorrect} de {QUIZ.length} perguntas nesta rodada. Nível atual: {level.level}.
        </p>
        <button
          onClick={() => {
            setIndex(0)
            setRoundCorrect(0)
          }}
          className="mt-6 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-soft"
        >
          Jogar de novo
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-center gap-2">
        {QUIZ.map((q, i) => (
          <div key={q.id} className={`h-1.5 flex-1 rounded-full ${i <= index ? 'bg-brand-500' : 'bg-brand-100'}`} />
        ))}
      </div>
      <p className="mt-2 text-xs font-semibold text-brand-900/40">
        Pergunta {index + 1} de {QUIZ.length} · {progressPct}%
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="mt-5 rounded-3xl bg-white p-5 md:p-7 shadow-card"
        >
          <p className="text-lg font-extrabold text-brand-950 leading-snug">{question.question}</p>

          <div className="mt-5 space-y-2.5">
            {question.options.map((opt, i) => {
              const isCorrect = i === question.answer
              const isSelected = selected === i
              let style = 'border-brand-900/10 bg-white hover:border-brand-300'
              if (selected !== null) {
                if (isCorrect) style = 'border-emerald-400 bg-emerald-50 text-emerald-800'
                else if (isSelected) style = 'border-red-300 bg-red-50 text-red-700'
                else style = 'border-brand-900/8 bg-white opacity-60'
              }
              return (
                <button
                  key={opt}
                  onClick={() => choose(i)}
                  disabled={selected !== null}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${style}`}
                >
                  <span>{opt}</span>
                  {selected !== null && isCorrect && <span>✓</span>}
                  {selected !== null && isSelected && !isCorrect && <span>✕</span>}
                </button>
              )
            })}
          </div>

          <AnimatePresence>
            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div
                  className={`mt-4 rounded-xl p-3.5 text-sm ${
                    selected === question.answer ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                  }`}
                >
                  <p className="font-bold">{selected === question.answer ? `Certo! +15 XP` : 'Quase!'}</p>
                  <p className="mt-1">{question.explanation}</p>
                </div>
                <button
                  onClick={next}
                  className="mt-4 w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white shadow-soft"
                >
                  Continuar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
