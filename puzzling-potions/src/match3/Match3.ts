import { Container } from 'pixi.js';
import { Match3Actions } from './Match3Actions';
import { Match3Board } from './Match3Board';
import { Match3Config, match3GetConfig } from './Match3Config';
import { Match3Piece } from './Match3Piece';
import { Match3Process } from './Match3Process';
import { Match3Special } from './Match3Special';
import { Match3Stats } from './Match3Stats';
import { Match3Timer } from './Match3Timer';
import { Match3Position, Match3Type } from './Match3Utility';

/** Interface for onMatch event data */
/** 匹配事件数据的接口 */
export interface Match3OnMatchData {
    /** List of all matches detected in the grid */
    /** 在网格中检测到的所有匹配列表 */
    matches: Match3Position[][];
    /** Combo level - starting from 1 */
    /** 连击等级 - 从 1 开始 */
    combo: number;
}

/** Interface for onPop event data */
/** 消除事件数据的接口 */
export interface Match3OnPopData {
    /** The type of the piece popped out */
    /** 被消除的方块类型 */
    type: Match3Type;
    /** The piece sprite */
    /** 方块精灵 */
    piece: Match3Piece;
    /** Current combo level */
    /** 当前连击等级 */
    combo: number;
    /** Tells if the given type is a special type */
    /** 判断给定类型是否为特殊类型 */
    isSpecial: boolean;
    /** True if the piece was popped from special effect, not plain match */
    /** 如果方块是通过特殊效果消除的（而非普通匹配），则为 true */
    causedBySpecial: boolean;
}

/** Interface for onMove event data */
/** 移动事件数据的接口 */
export interface Match3OnMoveData {
    /** The starting grid position of the move */
    /** 移动的起始网格位置 */
    from: Match3Position;
    /** The ending grid position of the move */
    /** 移动的结束网格位置 */
    to: Match3Position;
    /** True if is a valid movement (creates a match) */
    /** 如果是有效移动（创建匹配），则为 true */
    valid: boolean;
}

/**
 * The main match3 class that sets up game's sub-systems and provide some useful callbacks.
 * All game events are set as plain callbacks for simplicity
 */
/**
 * 主要的三消游戏类，设置游戏的子系统并提供一些有用的回调。
 * 为了简化，所有游戏事件都设置为普通回调
 */
export class Match3 extends Container {
    /** Match3 game basic configuration */
    /** 三消游戏基本配置 */
    public config: Match3Config;
    /** Counts the gameplay time */
    /** 计算游戏时间 */
    public timer: Match3Timer;
    /** Compute score, grade, number of matches */
    /** 计算分数、等级、匹配次数 */
    public stats: Match3Stats;
    /** Holds the grid state and display */
    /** 保存网格状态和显示 */
    public board: Match3Board;
    /** Sort out actions that the player can take */
    /** 处理玩家可以执行的操作 */
    public actions: Match3Actions;
    /** Process matches and fills up the grid */
    /** 处理匹配并填充网格 */
    public process: Match3Process;
    /** Handles pieces with special powers */
    /** 处理具有特殊能力的方块 */
    public special: Match3Special;

    /** Fires when player move pieces */
    /** 当玩家移动方块时触发 */
    public onMove?: (data: Match3OnMoveData) => void;
    /** Fires when a match is detected */
    /** 当检测到匹配时触发 */
    public onMatch?: (data: Match3OnMatchData) => void;
    /** Fires when a piece is popped out of the board */
    /** 当方块从游戏板中消除时触发 */
    public onPop?: (data: Match3OnPopData) => void;
    /** Fires when the game start auto-processing the grid */
    /** 当游戏开始自动处理网格时触发 */
    public onProcessStart?: () => void;
    /** Fires when the game finishes auto-processing the grid */
    /** 当游戏完成自动处理网格时触发 */
    public onProcessComplete?: () => void;
    /** Fires when game duration expires */
    /** 当游戏时间到期时触发 */
    public onTimesUp?: () => void;

    constructor() {
        super();

        // Game sub-systems
        // 游戏子系统
        this.config = match3GetConfig();
        this.timer = new Match3Timer(this);
        this.stats = new Match3Stats(this);
        this.board = new Match3Board(this);
        this.actions = new Match3Actions(this);
        this.process = new Match3Process(this);
        this.special = new Match3Special(this);
    }

    /**
     * Sets up a new match3 game with pieces, rows, columns, duration, etc.
     * @param config The config object in which the game will be based on
     */
    /**
     * 设置一个新的三消游戏，包括方块、行数、列数、持续时间等。
     * @param config 游戏将基于的配置对象
     */
    public setup(config: Match3Config) {
        this.config = config;
        this.reset();
        this.actions.setup(config);
        this.board.setup(config);
        this.timer.setup(config.duration * 1000);
    }

    /** Fully reset the game */
    /** 完全重置游戏 */
    public reset() {
        this.interactiveChildren = false;
        this.timer.reset();
        this.stats.reset();
        this.board.reset();
        this.special.reset();
        this.process.reset();
    }

    /** Start the timer and enable interaction */
    /** 启动计时器并启用交互 */
    public startPlaying() {
        this.interactiveChildren = true;
        this.timer.start();
    }

    /** Stop the timer and disable interaction */
    /** 停止计时器并禁用交互 */
    public stopPlaying() {
        this.interactiveChildren = false;
        this.timer.stop();
    }

    /** Check if the game is still playing */
    /** 检查游戏是否仍在进行 */
    public isPlaying() {
        return this.interactiveChildren;
    }

    /** Pause the game */
    /** 暂停游戏 */
    public pause() {
        this.timer.pause();
        this.board.pause();
        this.process.pause();
    }

    /** Resume the game */
    /** 恢复游戏 */
    public resume() {
        this.timer.resume();
        this.board.resume();
        this.process.resume();
    }

    /** Update the timer */
    /** 更新计时器 */
    public update(delta: number) {
        this.timer.update(delta);
    }
}
