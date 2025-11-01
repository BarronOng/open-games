import { BlurFilter, Container, Sprite, Texture } from 'pixi.js';
import { Label } from '../ui/Label';
import { LargeButton } from '../ui/LargeButton';
import { RoundedBox } from '../ui/RoundedBox';
import { i18n } from '../utils/i18n';
import gsap from 'gsap';
import { navigation } from '../utils/navigation';
import { userSettings } from '../utils/userSettings';
import { List } from '@pixi/ui';
import { VolumeSlider } from '../ui/VolumeSlider';
import { ModeSwitcher } from '../ui/ModeSwitcher';
import { GameScreen } from '../screens/GameScreen';

/** Popup for volume and game mode settings - game mode cannot be changed during gameplay */
/** 音量和游戏模式设置的弹窗 - 游戏模式在游戏过程中无法更改 */
export class SettingsPopup extends Container {
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
    /** The game build version label */
    /** 游戏构建版本标签 */
    private versionLabel: Label;
    /** Layout that organises the UI components */
    /** 组织 UI 组件的布局 */
    private layout: List;
    /** Slider that changes the master volume */
    /** 更改主音量的滑块 */
    private masterSlider: VolumeSlider;
    /** Slider that changes background music volume */
    /** 更改背景音乐音量的滑块 */
    private bgmSlider: VolumeSlider;
    /** Slider that changes sound effects volume */
    /** 更改音效音量的滑块 */
    private sfxSlider: VolumeSlider;
    /** Radio buttons to change the game mode (disabled during gameplay) */
    private mode: ModeSwitcher;

    constructor() {
        super();

        this.bg = new Sprite(Texture.WHITE);
        this.bg.tint = 0x0a0025;
        this.bg.interactive = true;
        this.addChild(this.bg);

        this.panel = new Container();
        this.addChild(this.panel);

        this.panelBase = new RoundedBox({ height: 600 });
        this.panel.addChild(this.panelBase);

        this.title = new Label(i18n.settingsTitle, { fill: 0xffd579, fontSize: 50 });
        this.title.y = -this.panelBase.boxHeight * 0.5 + 60;
        this.panel.addChild(this.title);

        this.doneButton = new LargeButton({ text: i18n.settingsDone });
        this.doneButton.y = this.panelBase.boxHeight * 0.5 - 78;
        this.doneButton.onPress.connect(() => navigation.dismissPopup());
        this.panel.addChild(this.doneButton);

        this.versionLabel = new Label(`${i18n.settingsVersion} ${APP_VERSION}`, {
            fill: 0xffffff,
            fontSize: 12,
        });
        this.versionLabel.alpha = 0.5;
        this.versionLabel.y = this.panelBase.boxHeight * 0.5 - 15;
        this.panel.addChild(this.versionLabel);

        this.layout = new List({ type: 'vertical', elementsMargin: 4 });
        this.layout.x = -140;
        this.layout.y = -160;
        this.panel.addChild(this.layout);

        this.masterSlider = new VolumeSlider(i18n.settingsMaster);
        this.masterSlider.onUpdate.connect((v) => {
            userSettings.setMasterVolume(v / 100);
        });
        this.layout.addChild(this.masterSlider);

        this.bgmSlider = new VolumeSlider(i18n.settingsBgm);
        this.bgmSlider.onUpdate.connect((v) => {
            userSettings.setBgmVolume(v / 100);
        });
        this.layout.addChild(this.bgmSlider);

        this.sfxSlider = new VolumeSlider(i18n.settingsSfx);
        this.sfxSlider.onUpdate.connect((v) => {
            userSettings.setSfxVolume(v / 100);
        });
        this.layout.addChild(this.sfxSlider);

        this.mode = new ModeSwitcher();

        this.mode.onChange.connect(() => {
            userSettings.setGameMode(this.mode.getSelectedMode());
        });
        this.layout.addChild(this.mode);
        this.mode.y -= 20;
    }

    /** Resize the popup, fired whenever window size changes */
    public resize(width: number, height: number) {
        this.bg.width = width;
        this.bg.height = height;
        this.panel.x = width * 0.5;
        this.panel.y = height * 0.5;
    }

    /** Set things up just before showing the popup */
    public prepare() {
        // Game mode switcher should be disabled during gameplay
        const canChangeMode = !(navigation.currentScreen instanceof GameScreen);
        this.mode.alpha = canChangeMode ? 1 : 0.3;
        this.mode.interactiveChildren = canChangeMode;

        this.masterSlider.value = userSettings.getMasterVolume() * 100;
        this.bgmSlider.value = userSettings.getBgmVolume() * 100;
        this.sfxSlider.value = userSettings.getSfxVolume() * 100;
        this.mode.setSelectedMode(userSettings.getGameMode());
    }

    /** Present the popup, animated */
    public async show() {
        if (navigation.currentScreen) {
            navigation.currentScreen.filters = [new BlurFilter({ strength: 4 })];
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
