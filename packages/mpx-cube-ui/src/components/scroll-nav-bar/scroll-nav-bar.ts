import { createComponent } from '../../common/helper/create-component'

const ITEM_ID_PREFIX = 'cube-scroll-nav-item-'
const DIRECTION_HORIZONTAL = 'horizontal'
const DIRECTION_VERTICAL = 'vertical'
const ROOT_CLASS = 'cube-scroll-nav-bar'
const CONTAINER_CLASS = 'scroll-container'
const CONTENT_CLASS = 'scroll-content'

let scrollNavBarInstanceSeed = 0

function createItemIdPrefix() {
  return `${ITEM_ID_PREFIX}${scrollNavBarInstanceSeed++}-`
}

type LabelValue = string | number

export interface NavItem {
  text?: string
  txt?: string
  label?: LabelValue
  value?: LabelValue
  disabled?: boolean
  [key: string]: any
}

interface NormalizedNavItem {
  id: string
  label: LabelValue
  txt: string
  plainText: string
  disabled: boolean
  isActive: boolean
  activeClass: string
  className: string
}

interface DirectionState {
  rootClass: string
  containerClass: string
  contentClass: string
  scrollX: boolean
  scrollY: boolean
  enableFlex: boolean
}

interface ScrollNavBarData {
  navItems: NormalizedNavItem[]
  activeIndex: number
  currentValue: LabelValue | ''
  currentView: string
  resolvedDirection: string
  showScrollbar: boolean
  bounces: boolean
  useEnhanced: boolean
  rootClass: string
  containerClass: string
  contentClass: string
  scrollX: boolean
  scrollY: boolean
  enableFlex: boolean
}

function stripHtml(txt: string | number) {
  return String(txt).replace(/<[^>]+>/g, '')
}

function isSameLabel(a: LabelValue | '', b: LabelValue | '') {
  return a === b || String(a) === String(b)
}

function resolveOptions(options: Record<string, any> = {}) {
  return Object.assign({
    enhanced: false
  }, options || {})
}

createComponent({
  properties: {
    direction: {
      type: String,
      value: DIRECTION_HORIZONTAL
    },
    labels: {
      type: Array,
      value: [] as LabelValue[]
    },
    txts: {
      type: Array,
      value: [] as Array<string | number>
    },
    current: {
      type: String,
      optionalTypes: [Number],
      value: ''
    },
    options: {
      type: Object,
      value: {}
    },
    list: {
      type: Array,
      value: [] as NavItem[]
    },
    defaultIndex: {
      type: Number,
      value: 0
    },
    scrollWithAnimation: {
      type: Boolean,
      value: true
    },
    useItemSlot: {
      type: Boolean,
      value: false
    }
  },

  data: {
    navItems: [],
    activeIndex: -1,
    currentValue: '',
    currentView: '',
    resolvedDirection: DIRECTION_HORIZONTAL,
    showScrollbar: false,
    bounces: false,
    useEnhanced: false,
    rootClass: ROOT_CLASS,
    containerClass: CONTAINER_CLASS,
    contentClass: CONTENT_CLASS,
    scrollX: true,
    scrollY: false,
    enableFlex: true
  } as ScrollNavBarData,

  watch: {
    labels: {
      immediate: true,
      handler() {
        this.refreshInternal()
      }
    },
    txts() {
      this.refreshInternal()
    },
    current() {
      this.refreshInternal()
    },
    direction() {
      this.refreshInternal(true)
    },
    options() {
      this.refreshInternal()
    },
    list() {
      this.refreshInternal()
    },
    defaultIndex() {
      this.refreshInternal()
    }
  },

  methods: {
    onItemTap(e: WechatMiniprogram.TouchEvent) {
      const index = Number(e.currentTarget.dataset.index)
      this.setActiveByIndex(index, true)
    },

    refresh() {
      this.refreshInternal(true)
    },

    scrollToIndex(index: number) {
      this.setActiveByIndex(index, false, true)
    },

    refreshInternal(forceView = false) {
      const baseNavItems = this.getNavItems()
      const resolvedDirection = this.getDirection()
      const resolvedOptions = resolveOptions(this.options)
      const activeIndex = this.getInitialIndex(baseNavItems)
      const currentValue = activeIndex > -1 ? baseNavItems[activeIndex].label : ''
      const currentView = activeIndex > -1 ? baseNavItems[activeIndex].id : ''
      const directionState = this.getDirectionState(resolvedDirection)
      const useEnhanced = !!resolvedOptions.enhanced || !!resolvedOptions.scrollbar || !!resolvedOptions.bounce

      this.navItems = this.decorateNavItems(baseNavItems, activeIndex, resolvedDirection)
      this.activeIndex = activeIndex
      this.currentValue = currentValue
      this.resolvedDirection = resolvedDirection
      this.showScrollbar = useEnhanced && !!resolvedOptions.scrollbar
      this.bounces = useEnhanced && !!resolvedOptions.bounce
      this.useEnhanced = useEnhanced
      this.rootClass = directionState.rootClass
      this.containerClass = directionState.containerClass
      this.contentClass = directionState.contentClass
      this.scrollX = directionState.scrollX
      this.scrollY = directionState.scrollY
      this.enableFlex = directionState.enableFlex

      if (forceView && currentView) {
        this.currentView = ''
        this.$nextTick(() => {
          this.currentView = currentView
        })
        return
      }

      this.currentView = currentView
    },

    setActiveByIndex(index: number, needEmit = false, forceView = false) {
      const navItems = (this.navItems || []) as NormalizedNavItem[]
      if (!navItems.length) return

      const nextIndex = this.getValidIndex(index, navItems.length)
      const nextItem = navItems[nextIndex]
      if (!nextItem || nextItem.disabled) return

      const changed = !isSameLabel(nextItem.label, this.currentValue)
      this.activeIndex = nextIndex
      this.currentValue = nextItem.label
      this.navItems = this.decorateNavItems(navItems, nextIndex, this.resolvedDirection)

      if (forceView && nextItem.id === this.currentView) {
        this.currentView = ''
        this.$nextTick(() => {
          this.currentView = nextItem.id
        })
      } else {
        this.currentView = nextItem.id
      }

      if (needEmit && changed) {
        this.triggerChange(nextItem, nextIndex)
      }
    },

    getInitialIndex(navItems: NormalizedNavItem[]) {
      if (!navItems.length) return -1

      const currentIndex = this.getIndexByLabel(navItems, this.current)
      if (currentIndex > -1) {
        return currentIndex
      }

      return this.getValidIndex(this.defaultIndex, navItems.length)
    },

    getNavItems(): NormalizedNavItem[] {
      const labels = this.getSourceLabels()
      const txts = this.getSourceTxts(labels)
      const list = (this.list || []) as Array<NavItem | string | number>
      const itemIdPrefix = this.getItemIdPrefix()

      return labels.map((label: LabelValue, index: number): NormalizedNavItem => {
        const rawListItem = list[index]
        const rawTxt = txts[index] !== undefined ? txts[index] : label
        const disabled = typeof rawListItem === 'object' && rawListItem !== null ? !!rawListItem.disabled : false

        return {
          id: `${itemIdPrefix}${index}`,
          label,
          txt: String(rawTxt),
          plainText: stripHtml(rawTxt),
          disabled,
          isActive: false,
          activeClass: '',
          className: 'nav-item'
        }
      })
    },

    getItemIdPrefix() {
      if (!this.itemIdPrefix) {
        this.itemIdPrefix = createItemIdPrefix()
      }

      return this.itemIdPrefix
    },

    getSourceLabels(): LabelValue[] {
      if (Array.isArray(this.labels) && this.labels.length) {
        return this.labels as LabelValue[]
      }

      return ((this.list || []) as Array<NavItem | string | number>).map((item: NavItem | string | number): LabelValue => {
        if (typeof item === 'object' && item !== null) {
          if (item.value !== undefined) return item.value
          if (item.label !== undefined) return item.label
          if (item.text !== undefined) return item.text
          if (item.txt !== undefined) return item.txt
        }
        return item as LabelValue
      })
    },

    getSourceTxts(labels: LabelValue[]): Array<string | number> {
      if (Array.isArray(this.txts) && this.txts.length) {
        return this.txts as Array<string | number>
      }

      if (Array.isArray(this.list) && this.list.length) {
        return ((this.list || []) as Array<NavItem | string | number>).map((item: NavItem | string | number, index: number): string | number => {
          if (typeof item === 'object' && item !== null) {
            if (item.txt !== undefined) return item.txt
            if (item.text !== undefined) return item.text
          }
          return labels[index]
        })
      }

      return labels
    },

    getDirectionState(direction: string): DirectionState {
      const isVertical = direction === DIRECTION_VERTICAL

      return {
        rootClass: isVertical ? `${ROOT_CLASS} ${ROOT_CLASS}_vertical` : ROOT_CLASS,
        containerClass: isVertical ? `${CONTAINER_CLASS} ${CONTAINER_CLASS}_vertical` : CONTAINER_CLASS,
        contentClass: isVertical ? `${CONTENT_CLASS} ${CONTENT_CLASS}_vertical` : CONTENT_CLASS,
        scrollX: !isVertical,
        scrollY: isVertical,
        enableFlex: !isVertical
      }
    },

    decorateNavItems(navItems: NormalizedNavItem[], activeIndex: number, direction: string): NormalizedNavItem[] {
      const isVertical = direction === DIRECTION_VERTICAL

      return navItems.map((item: NormalizedNavItem, index: number): NormalizedNavItem => {
        const isActive = index === activeIndex
        const classNames = ['nav-item']

        if (isActive) {
          classNames.push('active')
        }

        if (item.disabled) {
          classNames.push('disabled')
        }

        if (isVertical) {
          classNames.push('nav-item_vertical')
        }

        return {
          ...item,
          isActive,
          activeClass: isActive ? 'active' : '',
          className: classNames.join(' ')
        }
      })
    },

    getDirection() {
      return this.direction === DIRECTION_VERTICAL ? DIRECTION_VERTICAL : DIRECTION_HORIZONTAL
    },

    getIndexByLabel(navItems: NormalizedNavItem[], current: LabelValue | '') {
      if (current === '' || current === undefined || current === null) {
        return -1
      }

      return navItems.findIndex(item => isSameLabel(item.label, current))
    },

    getValidIndex(index: number, length: number) {
      const parsedIndex = Number(index)
      if (Number.isNaN(parsedIndex)) {
        return 0
      }
      return Math.max(0, Math.min(length - 1, parsedIndex))
    },

    triggerChange(item: NormalizedNavItem, index: number) {
      this.triggerEvent('change', {
        active: item.label,
        index,
        txt: item.txt,
        label: item.label
      })
    }
  }
})
