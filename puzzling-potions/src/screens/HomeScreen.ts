import { Container, NineSliceSprite, Texture } from 'pixi.js';
import { navigation } from '../utils/navigation';
import { GameScreen } from './GameScreen';
import gsap from 'gsap';
import { i18n } from '../utils/i18n';
import { LargeButton } from '../ui/LargeButton';
import { registerCustomEase } from '../utils/animation';
import { Logo } from '../ui/Logo';
import { Dragon } from '../ui/Dragon';
import { waitFor } from '../utils/asyncUtils';
import { SmallButton } from '../ui/SmallButton';
import { ImageButton } from '../ui/ImageButton';
import { RippleButton } from '../ui/RippleButton';
import { InfoPopup } from '../popups/InfoPopup';
import { SettingsPopup } from '../popups/SettingsPopup';
import { bgm } from '../utils/audio';

/** Custom ease curve for y animation of the base to reveal the screen */
/** 用于基础 y 轴动画的自定义缓动曲线，用于显示界面 */
const easeSoftBackOut = registerCustomEase(
    'M0,0,C0,0,0.05,0.228,0.09,0.373,0.12,0.484,0.139,0.547,0.18,0.654,0.211,0.737,0.235,0.785,0.275,0.864,0.291,0.896,0.303,0.915,0.325,0.944,0.344,0.97,0.356,0.989,0.38,1.009,0.413,1.039,0.428,1.073,0.604,1.074,0.72,1.074,0.822,1.035,0.91,1.011,0.943,1.002,1,1,1,1',
);

/** The first screen that shows up after loading */
/** 加载后显示的第一个界面 */
export class HomeScreen extends Container {
    /** Assets bundles required by this screen */
    /** 此界面所需的资源包 */
    public static assetBundles = ['home', 'common'];
    /** The game logo */
    /** 游戏标志 */
    private logo: Logo;
    /** Animated dragon */
    /** 动画龙 */
    private dragon: Dragon;
    /** Button that leads to gameplay */
    /** 引导到游戏玩法的按钮 */
    private playButton: LargeButton;
    /** Button that links to the Github project */
    /** 链接到 Github 项目的按钮 */
    private githubButton: SmallButton;
    /** Button that links to the PixiJS page */
    /** 链接到 PixiJS 页面的按钮 */
    private pixiButton: ImageButton;
    /** Button that opens the info panel */
    /** 打开信息面板的按钮 */
    private infoButton: RippleButton;
    /** Button that opens the settings panel */
    /** 打开设置面板的按钮 */
    private settingsButton: RippleButton;
    /** The footer base, also used for transition in */
    /** 页脚基础，也用于进入过渡 */
    private base: NineSliceSprite;

    constructor() {
        super();

        this.logo = new Logo();
        this.addChild(this.logo);

        this.dragon = new Dragon();
        this.dragon.playIdle();
        this.addChild(this.dragon);

        this.base = new NineSliceSprite({
            texture: Texture.from('rounded-rectangle'),
            leftWidth: 32,
            topHeight: 32,
            rightWidth: 32,
            bottomHeight: 32,
        });
        this.base.tint = 0x2c136c;
        this.addChild(this.base);

        this.infoButton = new RippleButton({
            image: 'icon-info',
            ripple: 'icon-info-stroke',
        });
        this.infoButton.onPress.connect(() => navigation.presentPopup(InfoPopup));
        this.addChild(this.infoButton);

        this.settingsButton = new RippleButton({
            image: 'icon-settings',
            ripple: 'icon-settings-stroke',
        });
        this.settingsButton.onPress.connect(() => navigation.presentPopup(SettingsPopup));
        this.addChild(this.settingsButton);

        this.githubButton = new SmallButton({ text: i18n.githubButton });
        this.githubButton.onPress.connect(() => window.open(i18n.urlGithub, 'blank'));
        this.addChild(this.githubButton);

        this.pixiButton = new ImageButton({ image: 'logo-pixi', scaleOverride: 0.75 });
        this.pixiButton.onPress.connect(() => window.open(i18n.urlPixi, 'blank'));
        this.addChild(this.pixiButton);

        this.playButton = new LargeButton({ text: i18n.playButton });
        this.playButton.onPress.connect(() => navigation.showScreen(GameScreen));
        this.addChild(this.playButton);
    }

    /** Resize the screen, fired whenever window size changes  */
    /** 调整界面大小，每当窗口大小改变时触发 */
    public resize(width: number, height: number) {
        this.dragon.x = width * 0.5;
        this.dragon.y = height * 0.5;
        this.playButton.x = width * 0.5;
        this.playButton.y = height - 130;
        this.base.width = width;
        this.base.y = height - 140;
        this.logo.x = width * 0.5;
        this.logo.y = height * 0.2;
        this.githubButton.x = width - 50;
        this.githubButton.y = height - 40;
        this.pixiButton.x = 50;
        this.pixiButton.y = height - 40;
        this.infoButton.x = 30;
        this.infoButton.y = 30;
        this.settingsButton.x = width - 30;
        this.settingsButton.y = 30;
    }

    /** Show screen with animations */
    /** 显示界面并播放动画 */
    public async show() {
        bgm.play('common/bgm-main.mp3', { volume: 0.7 });

        // Reset visual state, hide things that will show up later
        // 重置视觉状态，隐藏稍后将显示的内容
        this.playButton.hide(false);
        this.pixiButton.hide(false);
        this.infoButton.hide(false);
        this.settingsButton.hide(false);
        this.githubButton.hide(false);
        this.dragon.show(false);
        this.logo.show(false);

        // Play reveal animation
        // 播放显示动画
        this.playRevealAnimation();

        // Show remaining components in sequence
        // 按顺序显示剩余组件
        await waitFor(0.5);
        await this.playButton.show();
        this.interactiveChildren = true;
        // this.infoButton.show();
        await this.settingsButton.show();
        this.pixiButton.show();
        await this.githubButton.show();
    }

    /** Hide screen with animations */
    /** 隐藏界面并播放动画 */
    public async hide() {
        this.playButton.hide();
        this.pixiButton.hide();
        this.githubButton.hide();
        this.infoButton.hide();
        await waitFor(0.1);
        gsap.to(this.base.pivot, { y: -200, duration: 0.3, ease: 'back.in' });
        await waitFor(0.1);
        this.logo.hide();
        await waitFor(0.1);
        await this.dragon.hide();
    }

    /** Animation for revealing the screen behind the purple sprite */
    /** 用于显示紫色精灵后面界面的动画 */
    private async playRevealAnimation() {
        const duration = 1;
        const ease = easeSoftBackOut;

        gsap.killTweensOf(this.base);
        gsap.killTweensOf(this.base.pivot);

        // Make the flat colour base cover the entire screen, matching the visual state
        // left from loading screen
        // 让纯色基础覆盖整个屏幕，匹配从加载界面留下的视觉状态
        this.base.height = navigation.height * 1.25;
        this.base.pivot.y = navigation.height;

        // Animate it to uncover the screen and rest at the bottom
        // 动画显示以揭开界面并停在底部
        gsap.to(this.base, {
            height: 200,
            duration,
            ease,
        });
        await gsap.to(this.base.pivot, {
            y: 0,
            duration,
            ease,
        });
    }
}
