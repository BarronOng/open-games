import { Match3Mode } from '../match3/Match3Config';
import { Match3StatsData } from '../match3/Match3Stats';
import { storage } from './storage';

// Keys for saved items in storage
// 存储中保存项目的键
const KEY_PREFIX_STATS = 'stats-';
const KEY_PREFIX_BEST_SCORE = 'stats-best-score-';

/**
 * Organise persistent user gameplay stats by game mode, meaning that each
 * game mode will have its own score and best score saved, also a bunch of other
 * properties that could be useful like number of matches, popped pieces, etc.
 */
/**
 * 按游戏模式组织持久用户游戏统计数据，意味着每个
 * 游戏模式都将保存自己的分数和最佳分数，以及其他一些
 * 可能有用的属性，如匹配次数、消除方块数等。
 */
export class UserStats {
    /**
     * Load last saved gameplay stats for a game mode
     * @param mode A valid game mode
     * @returns Gameplay stats of given mode
     */
    /**
     * 加载游戏模式的最后保存的游戏统计数据
     * @param mode 有效的游戏模式
     * @returns 给定模式的游戏统计数据
     */
    public load(mode: Match3Mode): Match3StatsData {
        const obj = storage.getObject(KEY_PREFIX_STATS + mode);
        if (!obj) {
            return {
                score: 0,
                matches: 0,
                pops: 0,
                specials: 0,
                grade: 0,
            };
        }
        return obj;
    }

    /**
     * Save gameplay stats for given gamemode.It will also update the best score
     * for the game mode, if the provided score is higher.
     * @param mode A valid game mode
     * @param data The stats data to be saved
     */
    public save(mode: Match3Mode, data: Match3StatsData) {
        if (data.score > this.loadBestScore(mode)) {
            storage.setNumber(KEY_PREFIX_BEST_SCORE + mode, data.score);
        }
        storage.setObject(KEY_PREFIX_STATS + mode, data);
    }

    /** Retrieve the saved best score for a game mode */
    public loadBestScore(mode: Match3Mode) {
        return storage.getNumber(KEY_PREFIX_BEST_SCORE + mode) ?? 0;
    }
}

/** Shared user stats instance */
export const userStats = new UserStats();
