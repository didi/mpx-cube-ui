import { createComponent } from '../../common/helper/create-component';
const ITEM_ID_PREFIX = 'cube-scroll-nav-item-';
const DIRECTION_HORIZONTAL = 'horizontal';
const DIRECTION_VERTICAL = 'vertical';
const ROOT_CLASS = 'cube-scroll-nav-bar';
const CONTAINER_CLASS = 'scroll-container';
const CONTENT_CLASS = 'scroll-content';
let scrollNavBarInstanceSeed = 0;
function createItemIdPrefix() {
    return `${ITEM_ID_PREFIX}${scrollNavBarInstanceSeed++}-`;
}
function stripHtml(txt) {
    return String(txt).replace(/<[^>]+>/g, '');
}
function isSameLabel(a, b) {
    return a === b || String(a) === String(b);
}
function resolveOptions(options = {}) {
    return Object.assign({
        enhanced: false
    }, options || {});
}
createComponent({
    properties: {
        direction: {
            type: String,
            value: DIRECTION_HORIZONTAL
        },
        labels: {
            type: Array,
            value: []
        },
        txts: {
            type: Array,
            value: []
        },
        current: {
            type: String,
            value: ''
        },
        options: {
            type: Object,
            value: {}
        },
        list: {
            type: Array,
            value: []
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
    },
    watch: {
        labels: {
            immediate: true,
            handler() {
                this.refreshInternal();
            }
        },
        txts() {
            this.refreshInternal();
        },
        current() {
            this.refreshInternal();
        },
        direction() {
            this.refreshInternal(true);
        },
        options() {
            this.refreshInternal();
        },
        list() {
            this.refreshInternal();
        },
        defaultIndex() {
            this.refreshInternal();
        }
    },
    methods: {
        onItemTap(e) {
            const index = Number(e.currentTarget.dataset.index);
            this.setActiveByIndex(index, true);
        },
        refresh() {
            this.refreshInternal(true);
        },
        scrollToIndex(index) {
            this.setActiveByIndex(index, false, true);
        },
        refreshInternal(forceView = false) {
            const baseNavItems = this.getNavItems();
            const resolvedDirection = this.getDirection();
            const resolvedOptions = resolveOptions(this.options);
            const activeIndex = this.getInitialIndex(baseNavItems);
            const currentValue = activeIndex > -1 ? baseNavItems[activeIndex].label : '';
            const currentView = activeIndex > -1 ? baseNavItems[activeIndex].id : '';
            const directionState = this.getDirectionState(resolvedDirection);
            const useEnhanced = !!resolvedOptions.enhanced || !!resolvedOptions.scrollbar || !!resolvedOptions.bounce;
            this.navItems = this.decorateNavItems(baseNavItems, activeIndex, resolvedDirection);
            this.activeIndex = activeIndex;
            this.currentValue = currentValue;
            this.resolvedDirection = resolvedDirection;
            this.showScrollbar = useEnhanced && !!resolvedOptions.scrollbar;
            this.bounces = useEnhanced && !!resolvedOptions.bounce;
            this.useEnhanced = useEnhanced;
            this.rootClass = directionState.rootClass;
            this.containerClass = directionState.containerClass;
            this.contentClass = directionState.contentClass;
            this.scrollX = directionState.scrollX;
            this.scrollY = directionState.scrollY;
            this.enableFlex = directionState.enableFlex;
            if (forceView && currentView) {
                this.currentView = '';
                this.$nextTick(() => {
                    this.currentView = currentView;
                });
                return;
            }
            this.currentView = currentView;
        },
        setActiveByIndex(index, needEmit = false, forceView = false) {
            const navItems = (this.navItems || []);
            if (!navItems.length)
                return;
            const nextIndex = this.getValidIndex(index, navItems.length);
            const nextItem = navItems[nextIndex];
            if (!nextItem || nextItem.disabled)
                return;
            const changed = !isSameLabel(nextItem.label, this.currentValue);
            this.activeIndex = nextIndex;
            this.currentValue = nextItem.label;
            this.navItems = this.decorateNavItems(navItems, nextIndex, this.resolvedDirection);
            if (forceView && nextItem.id === this.currentView) {
                this.currentView = '';
                this.$nextTick(() => {
                    this.currentView = nextItem.id;
                });
            }
            else {
                this.currentView = nextItem.id;
            }
            if (needEmit && changed) {
                this.triggerChange(nextItem, nextIndex);
            }
        },
        getInitialIndex(navItems) {
            if (!navItems.length)
                return -1;
            const currentIndex = this.getIndexByLabel(navItems, this.current);
            if (currentIndex > -1) {
                return currentIndex;
            }
            return this.getValidIndex(this.defaultIndex, navItems.length);
        },
        getNavItems() {
            const labels = this.getSourceLabels();
            const txts = this.getSourceTxts(labels);
            const list = (this.list || []);
            const itemIdPrefix = this.getItemIdPrefix();
            return labels.map((label, index) => {
                const rawListItem = list[index];
                const rawTxt = txts[index] !== undefined ? txts[index] : label;
                const disabled = typeof rawListItem === 'object' && rawListItem !== null ? !!rawListItem.disabled : false;
                return {
                    id: `${itemIdPrefix}${index}`,
                    label,
                    txt: String(rawTxt),
                    plainText: stripHtml(rawTxt),
                    disabled,
                    isActive: false,
                    activeClass: '',
                    className: 'nav-item'
                };
            });
        },
        getItemIdPrefix() {
            if (!this.itemIdPrefix) {
                this.itemIdPrefix = createItemIdPrefix();
            }
            return this.itemIdPrefix;
        },
        getSourceLabels() {
            if (Array.isArray(this.labels) && this.labels.length) {
                return this.labels;
            }
            return (this.list || []).map((item) => {
                if (typeof item === 'object' && item !== null) {
                    if (item.value !== undefined)
                        return item.value;
                    if (item.label !== undefined)
                        return item.label;
                    if (item.text !== undefined)
                        return item.text;
                    if (item.txt !== undefined)
                        return item.txt;
                }
                return item;
            });
        },
        getSourceTxts(labels) {
            if (Array.isArray(this.txts) && this.txts.length) {
                return this.txts;
            }
            if (Array.isArray(this.list) && this.list.length) {
                return (this.list || []).map((item, index) => {
                    if (typeof item === 'object' && item !== null) {
                        if (item.txt !== undefined)
                            return item.txt;
                        if (item.text !== undefined)
                            return item.text;
                    }
                    return labels[index];
                });
            }
            return labels;
        },
        getDirectionState(direction) {
            const isVertical = direction === DIRECTION_VERTICAL;
            return {
                rootClass: isVertical ? `${ROOT_CLASS} ${ROOT_CLASS}_vertical` : ROOT_CLASS,
                containerClass: isVertical ? `${CONTAINER_CLASS} ${CONTAINER_CLASS}_vertical` : CONTAINER_CLASS,
                contentClass: isVertical ? `${CONTENT_CLASS} ${CONTENT_CLASS}_vertical` : CONTENT_CLASS,
                scrollX: !isVertical,
                scrollY: isVertical,
                enableFlex: !isVertical
            };
        },
        decorateNavItems(navItems, activeIndex, direction) {
            const isVertical = direction === DIRECTION_VERTICAL;
            return navItems.map((item, index) => {
                const isActive = index === activeIndex;
                const classNames = ['nav-item'];
                if (isActive) {
                    classNames.push('active');
                }
                if (item.disabled) {
                    classNames.push('disabled');
                }
                if (isVertical) {
                    classNames.push('nav-item_vertical');
                }
                return {
                    ...item,
                    isActive,
                    activeClass: isActive ? 'active' : '',
                    className: classNames.join(' ')
                };
            });
        },
        getDirection() {
            return this.direction === DIRECTION_VERTICAL ? DIRECTION_VERTICAL : DIRECTION_HORIZONTAL;
        },
        getIndexByLabel(navItems, current) {
            if (current === '' || current === undefined || current === null) {
                return -1;
            }
            return navItems.findIndex(item => isSameLabel(item.label, current));
        },
        getValidIndex(index, length) {
            const parsedIndex = Number(index);
            if (Number.isNaN(parsedIndex)) {
                return 0;
            }
            return Math.max(0, Math.min(length - 1, parsedIndex));
        },
        triggerChange(item, index) {
            this.triggerEvent('change', {
                active: item.label,
                index,
                txt: item.txt,
                label: item.label
            });
        }
    }
});
