import Food from './Food';
import Snake from './Snake';
import ScorePanel from './ScorePanel';

// 游戏控制器，控制所有类
class GameControl {
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 积分
    scorePanel: ScorePanel;
    // 键盘信息
    direction: string;
    // 为 false 游戏结束
    isLive: boolean;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
                            // 最高10级 每2分升一级 
        this.scorePanel = new ScorePanel(10, 2);
        this.direction = '';
        this.isLive = true;
        this.init();
    }

    // 创建游戏的初始化方法，调用后游戏即开始
    init() {
        // 绑定键盘按键按下的事件
        // 这里使用.bind(this) 避免this.指向document
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }

    // 录入键盘按键信息
    keydownHandler(event: KeyboardEvent) {
        // 此时的 this 指向的是 document
        this.direction = event.key;
    }

    // 蛇奔跑
    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;
        }

        // 检查蛇是否吃到了食物
        this.checkEat(X, Y)
        // Sncak 返回异常处理
        try {
            this.snake.X = X;
            this.snake.Y = Y;  
        } catch (e: any) {
            alert(e.message + 'GAME OVER')
            this.isLive = false
        }
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    // checkEat 判断蛇吃食物
    checkEat(x: number, y: number) {
        if (x === this.food.X && y === this.food.Y) {
            // 增加蛇长度
            this.snake.addBody();
            // 增加分数
            this.scorePanel.addScore();
            // 食物重新换位
            this.food.change();
        }
    }
}

export default GameControl;