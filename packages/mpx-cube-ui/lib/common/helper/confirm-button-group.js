const functionBtn = {
    openType: '',
    appParameter: '',
    lang: 'zh_CN',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: false,
    formType: '',
    scope: ''
};
export const defConfirmBtn = {
    text: '确定',
    disabled: false,
    ...functionBtn
};
export const defCancelBtn = {
    text: '取消',
    disabled: false,
    ...functionBtn
};
export function parseBtn(btn, defBtn) {
    if (typeof btn === 'string') {
        btn = {
            text: btn
        };
    }
    return Object.assign({}, defBtn, btn);
}
