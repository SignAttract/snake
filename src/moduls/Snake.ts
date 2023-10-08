class Snake {
    // 头部
    head: HTMLElement;
    // 身体部位
    // HTMLCollection: 集合会实时更新
    bodies: HTMLCollection;
    element: HTMLElement;

    constructor() {
        this.element = document.querySelector('.snake')!;
        this.head = document.querySelector('.snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div')!;
    }

    // 获取坐标
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    // 获取坐标
    set X(value: number) {
        // 添加判断减少负担
        if (this.X === value) return;
        // 添加蛇游动范围
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了！')
        }

        // 修改x时，是在修改水平坐标，蛇在左右移动，在向左移动时，不能向右掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 如发生了掉头，让蛇向反方向继续移动
            if (value > this.X) {
                // 如果新值 value 大于旧值 X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                value = this.X - 10;
            } else {
                // 向左走
                value = this.X + 10;
            }
        }

        // 蛇移动身体方法
        this.moveBody()
        this.head.style.left = value + 'px';
        this.checkHeadBody()
    }
    set Y(value: number) {
        if (this.Y === value) return;
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了！')
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }

        }
        this.moveBody()
        this.head.style.top = value + 'px';
        this.checkHeadBody()
    }

    // 设置蛇增加身体的方法
    addBody() {
        // 向 element 中添加一个 div
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }
    // 移动蛇身体方法
    moveBody() {
        /*
            * 将后边的身体设置为前边身体的位置
                举例子：
                    第四节 = 第三节的位置
                    第三节 = 第二节的位置
                    第二节 = 蛇头的位置
                    舌头的位置不用更改 set XY来更改 所以循环结束条件为 i > 0 
        */
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取身体当前格格位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    // 检查蛇头有没有和身体相撞
    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            if (this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
                throw new Error('撞到了自己')
            }
        }
    }
}

export default Snake;