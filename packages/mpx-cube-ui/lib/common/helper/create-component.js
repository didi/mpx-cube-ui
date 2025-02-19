import { createComponent as _createComponent } from '@mpxjs/core';
import { visibilityMixin, popupMixin, formItemMixin, optionsMixin, confirmButtonGroupMixin, maskMixin, modalPropsMixin, pickerCommonMixin, pickerMixin, datePickerMixin, timePickerMixin, pickerPopupBaseMixin, pickerModalBaseMixin, pickerPopupMixin, configProviderMixin, themePropsMixin } from '../mixins';
function addMixins(options, mixins = []) {
    mixins.push(...[optionsMixin, themePropsMixin]);
    if (!options.mixins) {
        options.mixins = mixins;
    }
    else if (Array.isArray(options.mixins)) {
        options.mixins.push(...mixins);
    }
    configProviderMixin && options.mixins.push(configProviderMixin);
}
/**
 * TODO:
 *
 * 1. 组件分类：
 *  1.1 common(基础公共): Button/Icon...
 *  1.2 popup(弹出层): Modal/Picker/Dialog...
 *  1.3 form(表单类): Radio/Checkbox/Textarea...
 *  1.4 layout(布局类组件) Divider...
 *
 */
export function createComponent(options) {
    addMixins(options);
    return _createComponent(options);
}
export function createPopupComponent(options) {
    addMixins(options, [visibilityMixin, popupMixin]);
    return _createComponent(options);
}
export function createSelectComponent(options) {
    addMixins(options, [formItemMixin]);
    return _createComponent(options);
}
export function createOptionButtonsComponent(options) {
    addMixins(options, [confirmButtonGroupMixin]);
    return _createComponent(options);
}
export function createModalComponent(options) {
    addMixins(options, [visibilityMixin, maskMixin, modalPropsMixin]);
    return _createComponent(options);
}
// picker
export function createPickerComponent(options) {
    addMixins(options, [pickerCommonMixin, pickerMixin]);
    return _createComponent(options);
}
// picker-popup-base
export function createPickerPopupBaseComponent(options) {
    addMixins(options, [visibilityMixin, maskMixin, pickerPopupBaseMixin]);
    return _createComponent(options);
}
// picker-popup & cascade-picker-popup
export function createPickerPopupComponent(options) {
    addMixins(options, [visibilityMixin, maskMixin, pickerCommonMixin, pickerPopupBaseMixin, pickerMixin, pickerPopupMixin]);
    return _createComponent(options);
}
export function createDatePickerComponent(options) {
    addMixins(options, [pickerCommonMixin, datePickerMixin]);
    return _createComponent(options);
}
export function createTimePickerComponent(options) {
    addMixins(options, [pickerCommonMixin, timePickerMixin]);
    return _createComponent(options);
}
// time-picker-popup & date-picker-popup
export function createTimePickerPopupComponent(options) {
    addMixins(options, [visibilityMixin, maskMixin, pickerCommonMixin, pickerPopupBaseMixin, pickerPopupMixin]);
    return _createComponent(options);
}
// picker-modal-base
export function createPickerModalBaseComponent(options) {
    addMixins(options, [visibilityMixin, maskMixin, modalPropsMixin, pickerModalBaseMixin]);
    return _createComponent(options);
}
// picker-modal & cascade-picker-modal
export function createPickerModalComponent(options) {
    addMixins(options, [visibilityMixin, maskMixin, pickerCommonMixin, modalPropsMixin, pickerModalBaseMixin, pickerMixin, pickerPopupMixin]);
    return _createComponent(options);
}
// time-picker-modal & date-picker-modal
export function createTimePickerModalComponent(options) {
    addMixins(options, [visibilityMixin, maskMixin, pickerCommonMixin, modalPropsMixin, pickerModalBaseMixin, pickerPopupMixin]);
    return _createComponent(options);
}
