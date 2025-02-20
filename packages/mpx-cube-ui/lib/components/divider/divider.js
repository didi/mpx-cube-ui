import { createComponent } from '../../common/helper/create-component';
var DividerContentPosition;
(function (DividerContentPosition) {
    DividerContentPosition["LEFT"] = "left";
    DividerContentPosition["CENTER"] = "center";
    DividerContentPosition["RIGHT"] = "right";
})(DividerContentPosition || (DividerContentPosition = {}));
createComponent({
    properties: {
        /**
         * @description 文本内容（会覆盖 slot）
         */
        text: String,
        /**
         * @description 文本/slot 的位置
         * @optional left/center/right
         */
        position: {
            type: String,
            value: DividerContentPosition.CENTER
        }
    }
});
