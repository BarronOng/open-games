import { Match3 } from './Match3';

/**
 * Controls the gameplay session time.
 */
/**
 * 控制游戏会话时间。
 */
export class Match3Timer {
    /** The Match3 instance */
    /** 三消游戏实例 */
    private match3: Match3;
    /** Current gameplay time in milliseconds - from `0` to `duration` */
    /** 当前游戏时间（毫秒）- 从 `0` 到 `duration` */
    private time = 0;
    /** Gameplay session duration, in milliseconds */
    /** 游戏会话持续时间（毫秒） */
    private duration = 0;
    /** True if the timer is paused */
    /** 如果计时器暂停则为 true */
    private paused = false;
    /** True if the timer is running, even if its paused */
    /** 如果计时器正在运行则为 true，即使它暂停了 */
    private running = false;

    constructor(match3: Match3) {
        this.match3 = match3;
    }

    /** Fully stop reset the timer */
    public reset() {
        this.time = 0;
        this.duration = 0;
        this.running = false;
        this.paused = false;
    }

    /**
     * Set up  the timer with a new duration
     * @param duration The total duration (in milliseconds) of the session
     */
    public setup(duration: number) {
        this.reset();
        this.duration = Math.floor(duration);
    }

    /** Start the timer */
    public start() {
        this.running = true;
        this.paused = false;
        this.time = 0;
    }

    /** Stop the timer and set as complete */
    public stop() {
        this.running = false;
        this.paused = false;
        this.time = this.duration;
    }

    /** Pause the timer */
    public pause() {
        this.paused = true;
    }

    /** Resume the timer */
    public resume() {
        this.paused = false;
    }

    /**
     * Update timer's internal time and fire the time up callback when finishes
     * @param delta The delta time in milliseconds
     */
    public update(delta: number) {
        if (!this.running || this.paused) return;
        this.time += delta;
        if (this.time >= this.duration) {
            this.stop();
            this.match3.onTimesUp?.();
        }
    }

    /** Check if is paused */
    public isPaused() {
        return this.paused;
    }

    /** CHeck if the timer is running, even if its paused */
    public isRunning() {
        return this.running;
    }

    /** Get current time */
    public getTime() {
        return this.time;
    }

    /** Get current time remaining */
    public getTimeRemaining() {
        return this.duration - this.time;
    }
}
