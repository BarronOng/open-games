import '@pixi/spine-pixi';

import { Application } from 'pixi.js';
import { initAssets } from './utils/assets';
import { navigation } from './utils/navigation';
import { GameScreen } from './screens/GameScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LoadScreen } from './screens/LoadScreen';
import { ResultScreen } from './screens/ResultScreen';
import { TiledBackground } from './ui/TiledBackground';
import { getUrlParam } from './utils/getUrlParams';
import { sound } from '@pixi/sound';

/** The PixiJS app Application instance, shared across the project */
/** PixiJS 应用实例，在整个项目中共享 */
export const app = new Application();

/** Set up a resize function for the app */
/** 为应用设置调整大小的函数 */
function resize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const minWidth = 375;
    const minHeight = 700;

    // Calculate renderer and canvas sizes based on current dimensions
    // 根据当前尺寸计算渲染器和画布大小
    const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
    const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
    const scale = scaleX > scaleY ? scaleX : scaleY;
    const width = windowWidth * scale;
    const height = windowHeight * scale;

    // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
    // 更新画布样式尺寸并滚动窗口以避免移动端调整大小时的问题
    app.renderer.canvas.style.width = `${windowWidth}px`;
    app.renderer.canvas.style.height = `${windowHeight}px`;
    window.scrollTo(0, 0);

    // Update renderer  and navigation screens dimensions
    // 更新渲染器和导航界面尺寸
    app.renderer.resize(width, height);
    navigation.resize(width, height);
}

/** Fire when document visibility changes - lose or regain focus */
/** 当文档可见性改变时触发 - 失去或重新获得焦点 */
function visibilityChange() {
    if (document.hidden) {
        sound.pauseAll();
        navigation.blur();
    } else {
        sound.resumeAll();
        navigation.focus();
    }
}

/** Setup app and initialise assets */
/** 设置应用并初始化资源 */
async function init() {
    // Initialize app
    // 初始化应用
    await app.init({
        resolution: Math.max(window.devicePixelRatio, 2),
        backgroundColor: 0xffffff,
    });

    // Add pixi canvas element (app.canvas) to the document's body
    // 将 pixi 画布元素 (app.canvas) 添加到文档的 body 中
    document.body.appendChild(app.canvas);

    // Whenever the window resizes, call the 'resize' function
    // 每当窗口调整大小时，调用 'resize' 函数
    window.addEventListener('resize', resize);

    // Trigger the first resize
    // 触发第一次调整大小
    resize();

    // Add a visibility listener, so the app can pause sounds and screens
    // 添加可见性监听器，以便应用可以暂停声音和界面
    document.addEventListener('visibilitychange', visibilityChange);

    // Setup assets bundles (see assets.ts) and start up loading everything in background
    // 设置资源包（参见 assets.ts）并在后台开始加载所有内容
    await initAssets();

    // Add a persisting background shared by all screens
    // 添加所有界面共享的持久背景
    navigation.setBackground(TiledBackground);

    // Show initial loading screen
    // 显示初始加载界面
    await navigation.showScreen(LoadScreen);

    // Go to one of the screens if a shortcut is present in url params, otherwise go to home screen
    // 如果 URL 参数中存在快捷方式，则转到其中一个界面，否则转到主界面
    if (getUrlParam('game') !== null) {
        await navigation.showScreen(GameScreen);
    } else if (getUrlParam('load') !== null) {
        await navigation.showScreen(LoadScreen);
    } else if (getUrlParam('result') !== null) {
        await navigation.showScreen(ResultScreen);
    } else {
        await navigation.showScreen(HomeScreen);
    }
}

// Init everything
// 初始化所有内容
init();
