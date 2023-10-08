// 定义食物类
class Food {
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;

    constructor() {
        // 获取页面中的food元素并将其赋值给element
        this.element = document.getElementById('food')!;
    }

    // 定义一个获取食物X、Y坐标的方法
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }

    // 改变食物坐标
    change() {
        // 生成一个随机位置
        // 食物的位置最小是0 最大是290
        // 蛇移动一次就是一格，一格大小就是10 所以就要要求食物的坐标是整10
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

export default Food;