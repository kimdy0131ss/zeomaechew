import { useState } from 'react'
import { questions } from './data/decisionTree'
import { findRecommendedMenus } from './services/menuService'
import type { Decision, Menu } from './types/menu'

const sampleMenus: Menu[] = [
  {
    id: 'sample-1',
    name: '얼큰 순두부찌개',
    category: '한식',
    priceFrom: 8000,
    priceTo: 12000,
    weight: 'heavy',
    temperature: 'hot',
    spicyLevel: 'medium',
    mealTime: 'dinner',
    company: 'solo',
    mainIngredient: 'vegetable',
    mealFormat: 'one_dish',
    description: '몽글몽글한 순두부와 칼칼한 국물로 속을 따뜻하게 채워요.',
  },
  {
    id: 'sample-2',
    name: '들깨 칼국수',
    category: '한식',
    priceFrom: 9000,
    priceTo: 13000,
    weight: 'heavy',
    temperature: 'hot',
    spicyLevel: 'none',
    mealTime: 'lunch',
    company: 'solo',
    mainIngredient: 'vegetable',
    mealFormat: 'one_dish',
    description: '고소한 들깨 향과 따뜻한 면발이 편안한 한 끼를 만들어요.',
  },
  {
    id: 'sample-3',
    name: '연어 포케',
    category: '양식',
    priceFrom: 11000,
    priceTo: 15000,
    weight: 'light',
    temperature: 'cold',
    spicyLevel: 'none',
    mealTime: 'lunch',
    company: 'solo',
    mainIngredient: 'seafood',
    mealFormat: 'one_dish',
    description: '신선한 연어와 채소를 가볍고 산뜻하게 즐기는 한 그릇이에요.',
  },
  {
    id: 'sample-4',
    name: '마라탕',
    category: '아시아식',
    priceFrom: 12000,
    priceTo: 18000,
    weight: 'adventurous',
    temperature: 'hot',
    spicyLevel: 'high',
    mealTime: 'dinner',
    company: 'pair',
    mainIngredient: 'meat',
    mealFormat: 'one_dish',
    description: '원하는 재료를 골라 화끈하게 즐기는 자극적인 한 끼예요.',
  },
  {
    id: 'sample-5',
    name: '해물 파전',
    category: '한식',
    priceFrom: 12000,
    priceTo: 18000,
    weight: 'heavy',
    temperature: 'hot',
    spicyLevel: 'none',
    mealTime: 'dinner',
    company: 'group',
    mainIngredient: 'seafood',
    mealFormat: 'share',
    description: '바삭한 전을 여럿이 나눠 먹기 좋은 메뉴예요.',
  },
  {
    id: 'sample-6',
    name: '치킨 타코',
    category: '양식',
    priceFrom: 9000,
    priceTo: 14000,
    weight: 'adventurous',
    temperature: 'mild',
    spicyLevel: 'medium',
    mealTime: 'late',
    company: 'pair',
    mainIngredient: 'meat',
    mealFormat: 'handheld',
    description: '바삭한 치킨과 채소를 또르띠야에 담아 간편하게 즐겨요.',
  },
  {
    id: 'sample-7',
    name: '새우 딤섬',
    category: '아시아식',
    priceFrom: 8000,
    priceTo: 14000,
    weight: 'light',
    temperature: 'hot',
    spicyLevel: 'none',
    mealTime: 'late',
    company: 'group',
    mainIngredient: 'seafood',
    mealFormat: 'share',
    description: '작은 딤섬을 여러 종류로 나눠 먹기 좋은 메뉴예요.',
  },
  {
    id: 'sample-8',
    name: '비빔국수',
    category: '한식',
    priceFrom: 7000,
    priceTo: 10000,
    weight: 'light',
    temperature: 'cold',
    spicyLevel: 'medium',
    mealTime: 'lunch',
    company: 'solo',
    mainIngredient: 'vegetable',
    mealFormat: 'one_dish',
    description: '새콤달콤한 양념이 더운 날의 입맛을 깨워줘요.',
  },
]

function rankMenus(menus: Menu[], decision: Decision) {
  return menus
    .map((menu) => ({ menu, score: scoreMenu(menu, decision) }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map(({ menu }) => menu)
}

function scoreMenu(menu: Menu, decision: Decision) {
  let score = 0
  if (menu.mealFormat === decision.mealFormat) score += 3
  if (menu.temperature === decision.temperature) score += 3
  if (menu.weight === decision.weight) score += 3
  if (menu.spicyLevel === decision.spicyLevel) score += 2
  if (menu.category === decision.category) score += 2
  if (menu.mealTime === decision.mealTime) score += 2
  if (menu.mainIngredient === decision.mainIngredient) score += 2
  if (menu.company === decision.company) score += 1
  if (matchesBudget(menu, decision.budget)) score += 3
  return score
}

function matchesBudget(menu: Menu, budget?: string) {
  const ranges: Record<string, [number, number]> = {
    under_10000: [0, 10000],
    '10000_to_15000': [10000, 15000],
    over_15000: [15000, Number.POSITIVE_INFINITY],
  }
  const range = budget ? ranges[budget] : undefined
  return Boolean(range && menu.priceFrom <= range[1] && menu.priceTo >= range[0])
}

function App() {
  const [step, setStep] = useState(0)
  const [decision, setDecision] = useState<Decision>({})
  const [menus, setMenus] = useState<Menu[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const question = questions[step]
  const isResult = step === questions.length

  async function choose(value: string) {
    if (!question) return

    const nextDecision = { ...decision, [question.key]: value }
    setDecision(nextDecision)

    if (step < questions.length - 1) {
      setStep((current) => current + 1)
      return
    }

    setIsLoading(true)
    setError('')
    try {
      const recommended = await findRecommendedMenus(nextDecision)
      setMenus(recommended.length ? recommended : rankMenus(sampleMenus, nextDecision))
      setStep(questions.length)
    } catch {
      setMenus(rankMenus(sampleMenus, nextDecision))
      setError('메뉴를 불러오지 못해 예시 추천을 보여드려요.')
      setStep(questions.length)
    } finally {
      setIsLoading(false)
    }
  }

  function restart() {
    setStep(0)
    setDecision({})
    setMenus([])
    setError('')
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="/" onClick={(event) => { event.preventDefault(); restart() }}>
          <span className="brand-mark">M</span>
          <span>MENU TREE</span>
        </a>
        <span className="course-label">DISCRETE MATH PROJECT</span>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="kicker">TODAY'S DECISION TREE</p>
          <h1 id="page-title">고민의 가지를 따라,<br /><em>오늘의 한 끼</em>를 찾아요.</h1>
          <p className="intro">몇 가지 조건만 고르면 의사결정 트리가 당신의 메뉴를 찾아드립니다.</p>
        </div>
        <div className="tree-art" aria-hidden="true">
          <span className="leaf leaf-one" /><span className="leaf leaf-two" /><span className="leaf leaf-three" />
          <span className="branch branch-one" /><span className="branch branch-two" /><span className="branch branch-three" />
          <span className="tree-core">?</span>
        </div>
      </section>

      <section className="journey" aria-live="polite">
        <div className="progress" aria-label={`총 ${questions.length}단계 중 ${Math.min(step + 1, questions.length)}단계`}>
          {questions.map((item, index) => <span key={item.key} className={index <= step ? 'progress-node active' : 'progress-node'} />)}
        </div>

        {!isResult ? (
          <div className="question-card">
            <p className="step-label">{question.eyebrow}</p>
            <h2>{question.title}</h2>
            <div className="options">
              {question.options.map((option, index) => (
                <button className="option" key={option.value} onClick={() => choose(option.value)} disabled={isLoading}>
                  <span className="option-number">0{index + 1}</span>
                  <span><strong>{option.label}</strong><small>{option.hint}</small></span>
                  <span className="arrow">&#8594;</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="result-card">
            <p className="step-label">YOUR BRANCH HAS BLOOMED</p>
            <h2>오늘은 이 메뉴가 어때요?</h2>
            {error && <p className="notice">{error}</p>}
            <div className="menu-grid">
              {menus.map((menu, index) => (
                <article className="menu-card" key={menu.id}>
                  <span className="rank">0{index + 1}</span>
                  <p>{menu.category}</p>
                  <h3>{menu.name}</h3>
                  <span className="price">{menu.priceFrom.toLocaleString()} - {menu.priceTo.toLocaleString()}원</span>
                  <p className="description">{menu.description}</p>
                </article>
              ))}
            </div>
            <button className="restart" onClick={restart}>처음부터 다시 고르기 <span>&#8594;</span></button>
          </div>
        )}
      </section>

      <footer>MENU TREE / A DECISION TREE FOR EVERYDAY HUNGER</footer>
    </main>
  )
}

export default App
