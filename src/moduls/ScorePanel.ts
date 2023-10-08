// 定义表示记分牌的类
class ScorePanel {
    score: number = 0;
    level: number = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    // 等级限制
    maxLevel: number;
    upScore: number;
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 设置一个加分的方法
    addScore() {
        this.scoreEle.innerHTML = ++this.score + '';
        // 每十分升一级
        if(this.score % this.upScore === 0) {
            this.levelUp();
        }
    }
    // 升级方法
    levelUp() {
        if(this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + '';
        }
    }
}

export default ScorePanel;