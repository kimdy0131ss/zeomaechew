import type { Decision } from '../types/menu'

export type Question = {
  key: keyof Decision
  eyebrow: string
  title: string
  options: Array<{ label: string; value: string; hint: string }>
}

export const questions: Question[] = [
  {
    key: 'mealTime',
    eyebrow: 'STEP 01',
    title: '언제 먹을 메뉴를 찾고 있나요?',
    options: [
      { label: '가벼운 점심', value: 'lunch', hint: '빠르고 든든한 한 끼' },
      { label: '여유로운 저녁', value: 'dinner', hint: '하루를 마무리할 식사' },
      { label: '야식 또는 간식', value: 'late', hint: '늦은 시간의 즐거움' },
    ],
  },
  {
    key: 'mealFormat',
    eyebrow: 'STEP 02',
    title: '어떤 방식으로 먹고 싶나요?',
    options: [
      { label: '한 그릇으로', value: 'one_dish', hint: '빠르고 깔끔하게 끝내요' },
      { label: '여러 메뉴를 나눠서', value: 'share', hint: '골라 먹는 재미가 있어요' },
      { label: '손에 들고 간편하게', value: 'handheld', hint: '이동 중에도 부담 없어요' },
    ],
  },
  {
    key: 'temperature',
    eyebrow: 'STEP 03',
    title: '오늘 밖의 공기는 어떤가요?',
    options: [
      { label: '쌀쌀해요', value: 'hot', hint: '따뜻한 한 그릇이 필요해요' },
      { label: '맑고 포근해요', value: 'mild', hint: '부담 없는 메뉴가 좋아요' },
      { label: '덥고 습해요', value: 'cold', hint: '시원한 메뉴가 당겨요' },
    ],
  },
  {
    key: 'weight',
    eyebrow: 'STEP 04',
    title: '지금 가장 가까운 기분은?',
    options: [
      { label: '든든하게', value: 'heavy', hint: '식사다운 식사를 원해요' },
      { label: '가볍고 산뜻하게', value: 'light', hint: '부담 없이 먹고 싶어요' },
      { label: '새로운 자극', value: 'adventurous', hint: '평소와 다른 맛이 좋아요' },
    ],
  },
  {
    key: 'spicyLevel',
    eyebrow: 'STEP 05',
    title: '매운맛은 어디까지 괜찮나요?',
    options: [
      { label: '전혀 안 매운 맛', value: 'none', hint: '편안한 맛이 좋아요' },
      { label: '적당히 얼큰하게', value: 'medium', hint: '약간의 자극은 좋아요' },
      { label: '화끈하게', value: 'high', hint: '스트레스를 날리고 싶어요' },
    ],
  },
  {
    key: 'budget',
    eyebrow: 'STEP 06',
    title: '오늘은 어느 가격대가 좋나요?',
    options: [
      { label: '알뜰하게', value: 'under_10000', hint: '1만 원 이하로 골라요' },
      { label: '적당하게', value: '10000_to_15000', hint: '1만~1.5만 원대가 좋아요' },
      { label: '특별하게', value: 'over_15000', hint: '1.5만 원 이상도 괜찮아요' },
    ],
  },
  {
    key: 'category',
    eyebrow: 'STEP 07',
    title: '오늘은 어느 나라의 맛이 끌리나요?',
    options: [
      { label: '한식', value: '한식', hint: '익숙하고 든든한 맛' },
      { label: '아시아식', value: '아시아식', hint: '중식, 일식, 동남아식' },
      { label: '양식', value: '양식', hint: '파스타, 피자, 샐러드' },
    ],
  },
  {
    key: 'mainIngredient',
    eyebrow: 'STEP 08',
    title: '지금 가장 끌리는 재료는?',
    options: [
      { label: '고기', value: 'meat', hint: '육즙 가득한 만족감' },
      { label: '해산물', value: 'seafood', hint: '깔끔하고 시원한 맛' },
      { label: '채소와 곡물', value: 'vegetable', hint: '가볍고 건강한 선택' },
    ],
  },
  {
    key: 'company',
    eyebrow: 'STEP 09',
    title: '누구와 함께 먹나요?',
    options: [
      { label: '혼자', value: 'solo', hint: '혼밥하기 좋은 메뉴' },
      { label: '친구 또는 연인', value: 'pair', hint: '함께 나누기 좋은 메뉴' },
      { label: '여럿이 함께', value: 'group', hint: '모두가 즐길 수 있는 메뉴' },
    ],
  },
]
