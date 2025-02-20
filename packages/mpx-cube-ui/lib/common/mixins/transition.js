import { getMixin } from '@mpxjs/core';
import { visibilityMixin } from '.';
const EVENT_ENTER = 'enter';
// const EVENT_ENTER_ACTIVE = 'enter-active'
const EVENT_ENTER_TO = 'enter-to';
const EVENT_LEAVE = 'leave';
// const EVENT_LEAVE_ACTIVE = 'leave-active'
const EVENT_LEAVE_TO = 'leave-to';
export default getMixin({
    mixins: [visibilityMixin],
    properties: {
        name: {
            type: String,
            value: 'scale'
        }
    },
    data: {
        animationClass: '',
        needHide: false
    },
    methods: {
        show() {
            this.animationClass = `${this.name}-${EVENT_ENTER}`;
            this.triggerEvent(EVENT_ENTER);
            this.isVisible = true;
        },
        hide() {
            this.needHide = true;
            this.animationClass = `${this.name}-${EVENT_LEAVE}`;
            this.triggerEvent(EVENT_LEAVE);
        },
        onAnimationEnd() {
            if (!this.needHide) {
                this.animationClass = `${this.name}-${EVENT_ENTER_TO}`;
                this.triggerEvent(EVENT_ENTER_TO);
            }
            else {
                this.animationClass = `${this.name}-${EVENT_LEAVE_TO}`;
                this.triggerEvent(EVENT_LEAVE_TO);
                this.isVisible = false;
                this.needHide = false;
            }
        }
    }
});
