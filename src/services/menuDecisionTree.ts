import { questions, type Question } from '../data/decisionTree'
import type { Decision, Menu } from '../types/menu'

export type DecisionTreeNode = {
  questionIndex: number
  candidates: Menu[]
  decision: Decision
  parent?: DecisionTreeNode
  children: Map<string, DecisionTreeNode>
}

export type AvailableOption = Question['options'][number] & {
  candidateCount: number
}

export class MenuDecisionTree {
  readonly root: DecisionTreeNode

  constructor(menus: Menu[]) {
    this.root = this.createNode(0, menus, {})
  }

  getQuestion(node: DecisionTreeNode) {
    return questions[node.questionIndex]
  }

  getAvailableOptions(node: DecisionTreeNode): AvailableOption[] {
    const question = this.getQuestion(node)
    if (!question) return []

    return question.options.flatMap((option) => {
      const candidateCount = node.candidates.filter((menu) => matches(menu, question.key, option.value)).length
      return candidateCount ? [{ ...option, candidateCount }] : []
    })
  }

  select(node: DecisionTreeNode, value: string) {
    const existingChild = node.children.get(value)
    if (existingChild) return existingChild

    const question = this.getQuestion(node)
    if (!question) return node

    const candidates = node.candidates.filter((menu) => matches(menu, question.key, value))
    const child = this.createNode(
      node.questionIndex + 1,
      candidates,
      { ...node.decision, [question.key]: value },
      node,
    )
    node.children.set(value, child)
    return child
  }

  private createNode(questionIndex: number, candidates: Menu[], decision: Decision, parent?: DecisionTreeNode): DecisionTreeNode {
    return { questionIndex, candidates, decision, parent, children: new Map() }
  }
}

function matches(menu: Menu, key: keyof Decision, value: string) {
  if (key === 'budget') return matchesBudget(menu, value)

  const menuValue = menu[key]
  return menuValue === value
}

function matchesBudget(menu: Menu, budget: string) {
  const ranges: Record<string, [number, number]> = {
    under_10000: [0, 10000],
    '10000_to_15000': [10000, 15000],
    over_15000: [15000, Number.POSITIVE_INFINITY],
  }
  const range = ranges[budget]

  return Boolean(range && menu.priceFrom <= range[1] && menu.priceTo >= range[0])
}
