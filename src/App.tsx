import { useEffect, useState } from 'react'
import { questions } from './data/decisionTree'
import { fetchMenus } from './services/menuService'
import { MenuDecisionTree, type DecisionTreeNode } from './services/menuDecisionTree'
import type { Menu } from './types/menu'

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
    company: ['pair', 'group'],
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
    company: ['solo', 'pair'],
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
    company: ['pair', 'group'],
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

function App() {
  const [tree, setTree] = useState(() => new MenuDecisionTree(sampleMenus))
  const [node, setNode] = useState<DecisionTreeNode>(() => new MenuDecisionTree(sampleMenus).root)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [dataStatus, setDataStatus] = useState('')

  const question = tree.getQuestion(node)
  const options = tree.getAvailableOptions(node)
  const isResult = node.questionIndex === questions.length

  useEffect(() => {
    async function loadMenus() {
      try {
        const menus = await fetchMenus()
        if (menus.length) {
          const nextTree = new MenuDecisionTree(menus)
          setTree(nextTree)
          setNode(nextTree.root)
        } else {
          setDataStatus('Supabase 메뉴 데이터가 없거나 환경 변수가 설정되지 않아 예시 메뉴를 표시합니다.')
        }
      } catch (loadError) {
        const detail = loadError instanceof Error ? ` (${loadError.message})` : ''
        setError(`메뉴를 불러오지 못해 예시 메뉴로 가지를 만들었어요.${detail}`)
        setDataStatus('예시 메뉴를 사용 중입니다.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadMenus()
  }, [])

  function choose(value: string) {
    setNode(tree.select(node, value))
  }

  function restart() {
    setNode(tree.root)
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
          {dataStatus && <p className={error ? 'data-status error' : 'data-status'}>{dataStatus}</p>}
          <div className="progress" aria-label={`총 ${questions.length}단계 중 ${Math.min(node.questionIndex + 1, questions.length)}단계`}>
           {questions.map((item, index) => <span key={item.key} className={index <= node.questionIndex ? 'progress-node active' : 'progress-node'} />)}
        </div>

         {!isResult ? (
           <div className="question-card">
            <p className="step-label">{question.eyebrow}</p>
            <h2>{question.title}</h2>
            <div className="options">
              {options.map((option, index) => (
                <button className="option" key={option.value} onClick={() => choose(option.value)} disabled={isLoading}>
                  <span className="option-number">0{index + 1}</span>
                  <span><strong>{option.label}</strong><small>{option.hint} · {option.candidateCount}개 메뉴 남음</small></span>
                  <span className="arrow">&#8594;</span>
                </button>
              ))}
             </div>
           </div>
         ) : (
          <div className="result-card">
            <p className="step-label">YOUR BRANCH HAS BLOOMED</p>
            <h2>조건을 통과한 메뉴예요.</h2>
            {error && <p className="notice">{error}</p>}
            <div className="menu-grid">
              {node.candidates.map((menu, index) => (
                <article className="menu-card" key={menu.id}>
                  <span className="rank">LEAF 0{index + 1}</span>
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
