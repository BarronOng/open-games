import { TextStyleOptions, Text, TextStyle } from 'pixi.js';

const defaultLabelStyle: Partial<TextStyleOptions> = {
    fontFamily: 'Arial Rounded MT Bold',
    align: 'center',
};

export type LabelOptions = typeof defaultLabelStyle;

/**
 * A Text extension pre-formatted for this app, starting centered by default,
 * because it is the most common use in the app.
 */
/**
 * 为此应用预格式化的文本扩展，默认居中开始，
 * 因为这是应用中最常见的用法。
 */
export class Label extends Text {
    constructor(text?: string | number, style?: Partial<TextStyleOptions> | TextStyle) {
        style = { ...defaultLabelStyle, ...style };
        super({ text, style });
        // Label is always centered, but this can be changed in instance afterwards
        // 标签总是居中的，但这可以在实例之后更改
        this.anchor.set(0.5);
    }
}
