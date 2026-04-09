import { createComponent } from '../../common/helper/create-component';
import StickyEle from './sticky-ele/index.mpx?resolve';
const EVENT_CHANGE = 'change';
const EVENT_DIFF_CHANGE = 'diff-change';
createComponent({
    relations: {
        [StickyEle]: {
            type: 'child'
        }
    },
    properties: {
        pos: {
            type: Number,
            value: 0
        },
        checkTop: {
            type: Boolean,
            value: true
        },
        offset: {
            type: Number,
            value: 0
        },
        styleConfig: {
            type: Object,
            value: {}
        }
    },
    data: {
        diff: 0,
        currentDiff: 0,
        currentIndex: -1,
        currentKey: '',
        fixedEleHeight: 0,
        positions: [],
        heights: [],
        eles: []
    },
    computed: {
        fixedEleStyle() {
            return {
                top: `${this.offset}px`
            };
        }
    },
    watch: {
        pos: {
            handler(pos) {
                this.computeCurrentSticky(pos);
            },
            immediate: true
        },
        offset() {
            this.computeCurrentSticky(this.pos);
        },
        checkTop() {
            this.computeCurrentSticky(this.pos);
        },
        currentIndex(newIndex, oldIndex) {
            const oldEle = this.eles[oldIndex];
            const newEle = this.eles[newIndex];
            const currentKey = (newEle && newEle.eleKey !== undefined) ? newEle.eleKey : newIndex === -1 ? '' : newIndex;
            const fixedEle = this.$refs?.fixedEle._selector;
            const fixedSlot = this.$slots?.fixed || this.$scopedSlots?.fixed;
            this.currentKey = currentKey;
            this.triggerEvent(EVENT_CHANGE, { current: currentKey, index: newIndex });
            if (__mpx_mode__ === 'web') {
                this.$nextTick(() => {
                    if (fixedSlot) {
                        this.fixedEleHeight = fixedEle?.offsetHeight || 0;
                    }
                    else {
                        const oldChild = fixedEle?.firstElementChild;
                        if (oldChild && oldEle && oldEle.$el) {
                            oldEle.$el.firstElementChild.appendChild(oldChild);
                            oldEle.refresh && oldEle.refresh();
                        }
                        if (newEle && newEle.$el) {
                            const newChild = newEle.$el.firstElementChild?.firstElementChild;
                            if (newChild) {
                                fixedEle?.appendChild(newChild);
                            }
                            this.fixedEleHeight = fixedEle?.offsetHeight || 0;
                        }
                        else {
                            this.fixedEleHeight = 0;
                        }
                    }
                });
            }
            else {
                oldEle?.refresh();
                oldEle?.setContentStyle({});
                newEle.setContentStyle({
                    position: 'fixed',
                    top: this.rootRect.top + this.offset + 'px',
                    left: this.rootRect.left + 'px',
                    right: this.rootRect.right + 'px',
                    width: this.rects[newIndex].width + 'px'
                });
            }
        },
        currentDiff(newVal) {
            const height = this.heights[this.currentIndex] || 0;
            this.triggerEvent(EVENT_DIFF_CHANGE, { diff: newVal, height });
        }
    },
    lifetimes: {
        ready() {
            this.refresh();
        }
    },
    methods: {
        _getEles() {
            const nodes = this.getRelationNodes(StickyEle);
            return nodes || [];
        },
        // @vuese
        // 刷新 sticky 内部元素位置与高度
        refresh() {
            this.$nextTick(() => {
                this.eles = this._getEles();
                this.eles.forEach((ele) => ele.refresh && ele.refresh());
                this._calculateHeight(() => {
                    this.computeCurrentSticky(this.pos);
                });
            });
        },
        computeCurrentSticky(scrollY) {
            scrollY += this.offset;
            const positions = this.positions;
            const heights = this.heights;
            const checkTop = this.checkTop;
            const len = positions.length;
            for (let i = len - 1; i >= 0; i--) {
                const isLast = i === len - 1;
                const nextTop = isLast ? scrollY : positions[i + 1];
                let top;
                let bottom;
                if (checkTop) {
                    top = positions[i];
                    bottom = top + heights[i];
                }
                else {
                    top = positions[i] + heights[i];
                    bottom = top;
                }
                const max = Math.max(bottom, nextTop);
                if (scrollY >= top && scrollY <= max) {
                    this.currentIndex = i;
                    this.currentDiff = scrollY - top;
                    const diff = nextTop - scrollY;
                    if (diff >= 0 && !isLast) {
                        this.diff = diff - (this.fixedEleHeight || heights[i]);
                    }
                    else {
                        this.diff = 0;
                    }
                    return;
                }
            }
            this.currentIndex = -1;
            this.currentDiff = 0;
            this.diff = 0;
        },
        _updateFixedEleHeight() {
            const query = this.createSelectorQuery();
            query.select('.cube-sticky-fixed').boundingClientRect((rect) => {
                this.fixedEleHeight = rect?.height || 0;
            });
            query.exec();
        },
        _calculateHeight(done) {
            const nodes = this._getEles();
            let rootTop = 0;
            this.positions = [];
            this.heights = [];
            this.rects = [];
            const query = this.createSelectorQuery();
            query.select('.cube-sticky').boundingClientRect((rootRect) => {
                this.rootRect = rootRect;
                rootTop = rootRect?.top || 0;
                this.rootTop = rootTop;
            });
            nodes.forEach((node, index) => {
                query.in(node);
                query.selectAll('.cube-sticky-ele').boundingClientRect((rects) => {
                    (rects || []).forEach((rect) => {
                        this.rects.push(rect);
                        this.positions[index] = (rect?.top || 0) - rootTop;
                        this.heights[index] = rect?.height || 0;
                    });
                });
            });
            query.exec(() => {
                this._updateFixedEleHeight();
                done && done();
            });
        }
    }
});
