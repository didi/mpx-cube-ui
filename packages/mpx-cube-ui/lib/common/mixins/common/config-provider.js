import { getMixin } from '@mpxjs/core';
import { transformProperties } from '../../helper/config-provider';
let configProviderMixin;
if (Object.keys(transformProperties).length) {
    configProviderMixin = getMixin({
        properties: {
            ...transformProperties
        }
    });
}
export { configProviderMixin };
