/** List of all valid game modes */
/** 所有有效游戏模式的列表 */
export const match3ValidModes = ['test', 'easy', 'normal', 'hard'] as const;

/** The game mode type */
/** 游戏模式类型 */
export type Match3Mode = (typeof match3ValidModes)[number];

/**
 * Map of all available blocks for the game, ordered by game mode.
 * Each item in these lists should have a corresponding pixi texture with the same name
 */
/**
 * 游戏中所有可用方块的映射，按游戏模式排序。
 * 这些列表中的每个项目都应该有一个具有相同名称的对应 pixi 纹理
 */
const blocks: Record<Match3Mode | 'special', string[]> = {
    /** Test mode piece set */
    /** 测试模式方块集合 */
    test: ['piece-dragon', 'piece-frog', 'piece-newt'],
    /** Easy mode piece set */
    /** 简单模式方块集合 */
    easy: ['piece-dragon', 'piece-frog', 'piece-newt', 'piece-snake'],
    /** Normal mode piece set */
    /** 普通模式方块集合 */
    normal: ['piece-dragon', 'piece-frog', 'piece-newt', 'piece-snake', 'piece-spider'],
    /** Hard mode piece set */
    /** 困难模式方块集合 */
    hard: ['piece-dragon', 'piece-frog', 'piece-newt', 'piece-snake', 'piece-spider', 'piece-yeti'],
    /** Special types that will be added to the game regardless the mode */
    /** 无论模式如何都会添加到游戏中的特殊类型 */
    special: ['special-blast', 'special-row', 'special-column', 'special-colour'],
};

/** Default match3 configuration */
/** 默认三消游戏配置 */
const defaultConfig = {
    /** Number of rows in the game */
    /** 游戏中的行数 */
    rows: 9,
    /** Number of columns in the game */
    /** 游戏中的列数 */
    columns: 7,
    /** The size (width & height, in pixels) of each cell in the grid */
    /** 网格中每个单元格的大小（宽度和高度，以像素为单位） */
    tileSize: 50,
    /** Validate all moves, regardless if they create a match or not */
    /** 验证所有移动，无论它们是否创建匹配 */
    freeMoves: false,
    /** Gameplay duration, in seconds */
    /** 游戏持续时间，以秒为单位 */
    duration: 60,
    /** Gameplay mode - affects the number of piece types in the grid */
    /** 游戏模式 - 影响网格中方块类型的数量 */
    mode: <Match3Mode>'normal',
};

/** Match3 configuration */
/** 三消游戏配置 */
export type Match3Config = typeof defaultConfig;

/** Build a config object overriding default values if suitable */
/** 如果合适，构建一个覆盖默认值的配置对象 */
export function match3GetConfig(customConfig: Partial<Match3Config> = {}): Match3Config {
    return { ...defaultConfig, ...customConfig };
}

/** Mount a list of blocks available for given game mode */
/** 为给定游戏模式挂载可用方块列表 */
export function match3GetBlocks(mode: Match3Mode): string[] {
    return [...blocks[mode], ...blocks.special];
}
