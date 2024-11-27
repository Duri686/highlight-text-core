// 防抖函数实现
function debounce<F extends (...args: any[]) => any>(func: F, delay: number = 300): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<F>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args)
      timeoutId = null
    }, delay)
  }
}

// 高效的文本搜索算法 - Rabin-Karp算法
class RabinKarpSearch {
  private static PRIME = 101
  private static patternHashCache = new Map<string, number>() // 缓存模式哈希值

  static findAllIndexes(text: string, pattern: string, ignoreCase = false): number[] {
    if (ignoreCase) {
      text = text.toLowerCase()
      pattern = pattern.toLowerCase()
    }

    const indexes: number[] = []
    const textLength = text.length
    const patternLength = pattern.length

    if (patternLength > textLength) return indexes

    const patternHash = this.getHashWithCache(pattern, patternLength)
    let textHash = this.calculateHash(text, patternLength)

    // 滑动窗口搜索
    for (let i = 0; i <= textLength - patternLength; i++) {
      if (patternHash === textHash && text.substr(i, patternLength) === pattern) {
        indexes.push(i)
      }

      if (i < textLength - patternLength) {
        textHash = this.recalculateHash(text, i, patternLength, textHash)
      }
    }

    return indexes
  }

  private static getHashWithCache(str: string, length: number): number {
    const cacheKey = `${str}-${length}`
    if (this.patternHashCache.has(cacheKey)) {
      return this.patternHashCache.get(cacheKey)!
    }
    const hash = this.calculateHash(str, length)
    this.patternHashCache.set(cacheKey, hash)
    return hash
  }

  private static calculateHash(str: string, length: number): number {
    let hash = 0
    for (let i = 0; i < length; i++) {
      hash += str.charCodeAt(i) * Math.pow(this.PRIME, i)
    }
    return hash
  }

  private static recalculateHash(text: string, oldIndex: number, patternLength: number, oldHash: number): number {
    let newHash = oldHash - text.charCodeAt(oldIndex)
    newHash /= this.PRIME
    newHash += text.charCodeAt(oldIndex + patternLength) * Math.pow(this.PRIME, patternLength - 1)
    return newHash
  }
}

// 高级文本高亮管理器
class AdvancedTextHighlighter {
  private highlights = new Map<string, Highlight>()
  private renderQueue: Array<HighlightTask> = []
  private dynamicRenderTime = 50

  private debouncedRender = debounce(this.processRenderQueue.bind(this), 150)

  queueHighlight(task: HighlightTask) {
    this.highlights.delete(task.uid)
    this.renderQueue.push(task)
    this.debouncedRender()
  }

  private processRenderQueue() {
    const startTime = performance.now()

    while (this.renderQueue.length > 0) {
      if (performance.now() - startTime > this.dynamicRenderTime) {
        this.debouncedRender()
        break
      }

      const task = this.renderQueue.shift()
      if (!task) continue
      this.renderHighlight(task)
    }
  }

  private renderHighlight(task: HighlightTask) {
    const { uid, text, nodeList, ignoreCase = false } = task

    if (!text) {
      CSS.highlights.delete(uid)
      return
    }

    const highlight = new Highlight()
    const textNodes = nodeList.flatMap(node => Array.from(node.childNodes).filter(n => n.nodeType === Node.TEXT_NODE))

    textNodes.forEach(textNode => {
      const indexes = RabinKarpSearch.findAllIndexes(textNode.textContent || '', text, ignoreCase)

      indexes.forEach(start => {
        try {
          const range = new Range()
          range.setStart(textNode, start)
          range.setEnd(textNode, start + text.length)
          highlight.add(range)
        } catch (error) {
          console.error('Range creation error', error)
        }
      })
    })

    this.highlights.set(uid, highlight)
    CSS.highlights.set(uid, highlight)
  }

  clearHighlight(uid: string) {
    this.highlights.delete(uid)
    CSS.highlights.delete(uid)
    this.renderQueue = this.renderQueue.filter(item => item.uid !== uid)
  }

  getHighlightKeys(): string[] {
    return Array.from(this.highlights.keys())
  }
}

// 导出Hook
export const useAdvancedTextHighlight = () => {
  const highlighter = new AdvancedTextHighlighter()

  return {
    renderHighlight: highlighter.queueHighlight.bind(highlighter),
    clearHighlight: highlighter.clearHighlight.bind(highlighter),
    getHighlightKeys: highlighter.getHighlightKeys.bind(highlighter),
  }
}

// 定义 Highlight 任务接口
interface HighlightTask {
  uid: string
  text: string
  nodeList: HTMLElement[]
  ignoreCase?: boolean
}
