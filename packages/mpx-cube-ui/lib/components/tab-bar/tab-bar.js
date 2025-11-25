import mpx, { createComponent, MOUNTED, UNMOUNTED, ONRESIZE } from '@mpxjs/core';
import useObserver from '@mpxjs/mpx-cube-ui/src/common/helper/useObserver';
const EVENT_INPUT = 'input';
const EVENT_CHANGE = 'change';
const EVENT_CLICK = 'click';
createComponent({
    options: {
        styleIsolation: 'shared'
    },
    properties: {
        /**
         * @description 双向绑定属性值
         */
        value: {
            type: Number,
            optionalTypes: [String],
            value: 0
        },
        data: {
            type: Array,
            value: []
        },
        /**
         * @description 文字与图标是否显示在一行
         * @optional true/false
         */
        inline: {
            type: Boolean,
            value: false
        },
        /**
         * @description 是否开启下划线跟随效果
         * @optional true/false
         */
        showSlider: {
            type: Boolean,
            value: false
        },
        /**
         * @description 是否开启 transition 过渡
         * @optional true/false
         */
        useTransition: {
            type: Boolean,
            value: true
        }
    },
    data: {
        inited: false,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        unobserver: () => { },
        els: []
    },
    computed: {
        tabBarClass() {
            return {
                'cube-tab-bar_inline': this.inline,
                'cube-tab-bar_transition': this.useTransition
            };
        },
        currentIndex() {
            return this.data.findIndex(item => item.value === this.value);
        },
        currentOffset() {
            let offsetLeft = 0;
            for (let i = 0; i < this.currentIndex; i++) {
                const width = this.els[i]?.width || 0;
                const marginLeft = Number.parseInt(this.els[i]?.['margin-left'] || 0);
                const marginRight = Number.parseInt(this.els[i]?.['margin-right'] || 0);
                offsetLeft += width + marginLeft + marginRight;
            }
            offsetLeft += Number.parseInt(this.els[this.currentIndex]?.['margin-left'] || 0);
            return offsetLeft;
        },
        currentWidth() {
            return this.els[this.currentIndex]?.width;
        }
    },
    methods: {
        change(item) {
            this.triggerEvent(EVENT_CLICK, {
                value: item.value
            });
            if (item.value === this.value) {
                return;
            }
            const changedEvents = [EVENT_INPUT, EVENT_CHANGE];
            changedEvents.forEach((eventType) => {
                this.triggerEvent(eventType, {
                    value: item.value
                });
            });
            this.$nextTick(() => {
                this.calcAllTabWidth();
            });
        },
        calcAllTabWidth() {
            mpx.createSelectorQuery().in(this).selectAll('.tab-bar-item').fields({
                size: true,
                computedStyle: ['margin-left', 'margin-right']
            }, (rects) => {
                this.els = rects;
            }).exec();
        }
    },
    [MOUNTED]() {
        this.unobserver = useObserver.call(this, '.tab-bar', () => {
            if (!this.inited) {
                this.calcAllTabWidth();
            }
            this.inited = true;
        });
    },
    [ONRESIZE]() {
        this.$nextTick(() => {
            this.calcAllTabWidth();
        });
    },
    [UNMOUNTED]() {
        this.unobserver?.();
    }
});
