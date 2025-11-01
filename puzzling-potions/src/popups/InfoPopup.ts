import { BlurFilter, Container, Sprite, Texture } from 'pixi.js';
import { Label } from '../ui/Label';
import { LargeButton } from '../ui/LargeButton';
import { RoundedBox } from '../ui/RoundedBox';
import { i18n } from '../utils/i18n';
import gsap from 'gsap';
import { navigation } from '../utils/navigation';

/** Popup with some info about the project */
/** 包含项目信息的弹窗 */
export class InfoPopup extends Container {
    /** The dark semi-transparent background covering current screen */
    /** 覆盖当前界面的深色半透明背景 */
    private bg: Sprite;
    /** Container for the popup UI components */
    /** 弹窗 UI 组件的容器 */
    private panel: Container;
    /** The popup title label */
    /** 弹窗标题标签 */
    private title: Label;
    /** Button that closes the popup */
    /** 关闭弹窗的按钮 */
    private doneButton: LargeButton;
    /** The panel background */
    /** 面板背景 */
    private panelBase: RoundedBox;

    constructor() {
        super();

        this.bg = new Sprite(Texture.WHITE);
        this.bg.tint = 0x0a0025;
        this.bg.interactive = true;
        this.addChild(this.bg);

        this.panel = new Container();
        this.addChild(this.panel);

        this.panelBase = new RoundedBox();
        this.panel.addChild(this.panelBase);

        this.title = new Label(i18n.infoTitle, { fill: 0xffd579, fontSize: 50 });
        this.title.y = -230;
        this.panel.addChild(this.title);

        this.doneButton = new LargeButton({ text: i18n.infoDone });
        this.doneButton.y = 220;
        this.doneButton.onPress.connect(() => navigation.dismissPopup());
        this.panel.addChild(this.doneButton);
    }

    /** Resize the popup, fired whenever window size changes */
    public resize(width: number, height: number) {
        this.bg.width = width;
        this.bg.height = height;
        this.panel.x = width * 0.5;
        this.panel.y = height * 0.5;
    }

    /** Present the popup, animated */
    public async show() {
        if (navigation.currentScreen) {
            navigation.currentScreen.filters = [new BlurFilter(5)];
        }
        gsap.killTweensOf(this.bg);
        gsap.killTweensOf(this.panel.pivot);
        this.bg.alpha = 0;
        this.panel.pivot.y = -400;
        gsap.to(this.bg, { alpha: 0.8, duration: 0.2, ease: 'linear' });
        await gsap.to(this.panel.pivot, { y: 0, duration: 0.3, ease: 'back.out' });
    }

    /** Dismiss the popup, animated */
    public async hide() {
        if (navigation.currentScreen) {
            navigation.currentScreen.filters = [];
        }
        gsap.killTweensOf(this.bg);
        gsap.killTweensOf(this.panel.pivot);
        gsap.to(this.bg, { alpha: 0, duration: 0.2, ease: 'linear' });
        await gsap.to(this.panel.pivot, { y: -500, duration: 0.3, ease: 'back.in' });
    }
}
