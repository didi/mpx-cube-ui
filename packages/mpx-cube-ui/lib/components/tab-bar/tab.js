import { createComponent } from '@mpxjs/core';
createComponent({
    options: {
        multipleSlots: true,
        styleIsolation: 'shared'
    },
    properties: {
        label: {
            type: Number,
            optionalTypes: [String]
        },
        value: {
            type: Number,
            optionalTypes: [String]
        },
        icon: {
            type: String,
            value: ''
        }
    }
});
