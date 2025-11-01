# Puzzling Potions

基于 PixiJS 开发的开源三消（Match-3）游戏项目。这是一个专业的游戏开发示例，展示了如何使用 PixiJS 生态系统构建完整的网页游戏。

本项目基于以下 PixiJS 相关库构建：

-   [PixiJS](https://github.com/pixijs/pixijs) - 专为 Web 构建的渲染库
-   [PixiJS Sound](https://github.com/pixijs/sound) - 带有滤镜的 WebAudio API 播放库
-   [PixiJS UI](https://github.com/pixijs/ui) - PixiJS 常用 UI 组件库
-   [PixiJS AssetPack](https://github.com/pixijs/assetpack) - 为 Web 编译和优化资源
-   [PixiJS Spine](https://github.com/pixijs/spine) - PixiJS 的 Spine 动画支持

## 功能特性

-   带有特殊道具和特效的简单三消游戏
-   基本的导航系统来组织界面和弹窗
-   使用 PixiJS 资源包进行资源加载管理
-   音量和游戏模式的持久化用户设置
-   保存和加载分数及最高分
-   动画、过渡和视觉效果
-   桌面和移动设备兼容

## 技术架构

### 核心技术栈
- **PixiJS 8.2.4** - 主要的 2D 渲染引擎
- **PixiJS Sound 6.0.0** - 音频播放库
- **PixiJS UI 2.1.2** - UI 组件库
- **PixiJS Spine 1.1.0** - 骨骼动画支持
- **PixiJS AssetPack** - 资源打包和优化工具
- **GSAP 3.12.5** - 动画库
- **TypeScript 5.5.3** - 类型安全的 JavaScript
- **Vite 5.3.3** - 现代构建工具

### 项目结构
```
src/
├── main.ts              # 应用入口点
├── match3/              # 游戏核心逻辑
│   ├── Match3.ts        # 主游戏类
│   ├── Match3Board.ts   # 游戏板管理
│   ├── Match3Actions.ts # 玩家操作处理
│   ├── Match3Process.ts # 匹配处理逻辑
│   └── specials/        # 特殊道具实现
├── screens/             # 游戏界面
│   ├── HomeScreen.ts    # 主菜单
│   ├── GameScreen.ts    # 游戏界面
│   ├── LoadScreen.ts    # 加载界面
│   └── ResultScreen.ts  # 结果界面
├── popups/              # 弹窗组件
├── ui/                  # UI 组件库
└── utils/               # 工具函数
```

## 游戏机制

### 核心玩法
- **经典三消玩法** - 通过交换相邻方块形成三连或更多
- **多种游戏模式** - 测试、简单、普通、困难四种难度
- **特殊道具系统** - 爆炸、行消除、列消除、颜色消除等特殊效果
- **连击系统** - 支持连续匹配获得更高分数
- **计时模式** - 60秒限时挑战

### 技术特性
- **响应式设计** - 支持桌面和移动设备
- **资源管理** - 使用 PixiJS AssetPack 进行资源打包和按需加载
- **音频系统** - 背景音乐和音效支持
- **数据持久化** - 保存用户设置和最高分
- **动画系统** - 使用 GSAP 实现流畅的动画效果
- **国际化支持** - 多语言界面

## 环境要求

-   NodeJS - https://nodejs.org/
-   NPM - 随 NodeJS 一起安装，用于包管理

## 安装和运行

```sh
# 克隆仓库
git clone https://github.com/pixijs/open-games

# 进入项目文件夹
cd ./puzzling-potions

# 安装依赖
npm install

# 启动开发服务器
npm run start
```

## 构建游戏

```sh
# 编译游戏用于发布，输出到 `dist/` 目录
npm run build

# 构建游戏并在本地预览
npm run preview
```

## 编译资源

资源会在启动或构建项目时自动编译，但在开发过程中不会像常规代码那样被"监听"。如果在开发过程中添加/修改/删除任何资源，需要手动运行 `npm run assets` 来重新编译资源并使更改生效。

## 项目结构详解

### `./src/main.ts` 文件

一切开始的地方。设置 PixiJS 应用并初始化导航。

### `./src/screens` 文件夹

应用显示的所有界面。

### `./src/popups` 文件夹

显示在界面上方的模态面板。

### `./src/match3` 文件夹

游戏本身，包含所有三消相关代码，包括游戏逻辑和方块视觉效果。

### `./src/ui` 文件夹

所有界面共享的 UI 组件。

### `./src/utils` 文件夹

所有共享的工具代码。

### `./raw-assets` 文件夹

未编译的资源，按文件夹分组，将转换为用于加载的资源包。

## 开源 Figma 设计

### 查看 Figma 文件 [这里](https://www.figma.com/file/Oqq2dAyNGL1g3Li0DGjnH2/Match-3?node-id=0%3A1&t=6fHhwUzb0b1PGGkJ-0)

除了使这个游戏的代码开源外，我们还使创建游戏时使用的 Figma 设计文件对社区开放。它包含游戏中使用的所有设计元素、资源和布局。

通过使文件开源，我们希望为开发者提供更全面的学习体验。您可以将其用作自己设计项目的参考，或了解专业游戏设计的方法。

> 请注意，设计文件仅作为只读版本提供。这意味着您可以查看和检查文件，但无法进行更改或将任何资源用于自己的项目。

## 使用方法

请随意将此项目用作自己游戏开发的参考。使用代码注释来理解游戏的工作原理，并通过修改代码来实验，看看它如何影响游戏。这个项目旨在成为您使用 PixiJS 学习和开发之旅的起点。

## 贡献

我们鼓励您分叉仓库并以任何您认为合适的方式改进游戏。通过向原始仓库提交拉取请求，与社区分享您的改进。

## 许可证

本项目采用 [MIT 许可证](https://opensource.org/licenses/MIT) 许可。

## GSAP

此游戏使用 GSAP 进行动画。您可以在某些商业项目中使用 GSAP 的免费版本。但是，请查看 [GreenSock](https://greensock.com/licensing/) 的许可选项。

---

> 作者 [Mauro](https://github.com/maurodetarso)

---

## 技术亮点

1. **现代化技术栈** - 使用最新的 PixiJS 8.x 版本和相关生态
2. **完整的游戏循环** - 从加载到游戏结束的完整流程
3. **专业的资源管理** - 按需加载和缓存机制
4. **跨平台兼容** - 同时支持桌面和移动设备
5. **可扩展架构** - 易于添加新功能和游戏模式

## 适用场景

### 学习用途
- PixiJS 游戏开发入门
- TypeScript 在游戏开发中的应用
- 现代前端构建工具的使用
- 游戏架构设计模式

### 商业应用
- 可作为三消游戏的基础框架
- 适合快速原型开发
- 移动端 H5 游戏开发
- 教育类游戏项目
