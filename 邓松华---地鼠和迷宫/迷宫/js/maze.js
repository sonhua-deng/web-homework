var bool_s = 0;//判断s是否被触摸过
var bool_maze = 0;//判断鼠标是否在迷宫中
var bool_wall = 0;//是否碰过墙；
var bool_win = 0;//是否胜利
var bool_cheat = 0;//有没有作弊

//改变结果的函数
function change_result() {
    var result = document.getElementById("result");
    result.style.marginLeft = "0px";
    if (bool_cheat == 1) {
        bool_cheat = 0;
        result.style.marginLeft = "-120px";
        result.firstChild.nodeValue = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
    }
    else if (bool_wall == 1) {
        result.style.marginLeft = "210px";
        result.firstChild.nodeValue = "You  Lose";
    }
    else if (bool_win == 1) {
        result.style.marginLeft = "210px";
        result.firstChild.nodeValue = "You Win";
    }
    else if (bool_win == 0) {
        result.firstChild.nodeValue = " ";
    }
}

//鼠标在主框上
document.getElementById("game").onmouseover = function () {
    bool_maze = 1;
}

//鼠标在s上
document.getElementById("s").onmouseover = function () {
    if (bool_wall == 0&&bool_win==0&&bool_cheat==0) {
        bool_s = 1;
    }
    if (bool_cheat == 0 && bool_wall==0&&bool_win == 0)
    change_result();
}

var bar = document.getElementsByClassName("bar");//class 为bar的元素节点组

//鼠标碰墙
for (var i = 0; i < bar.length; i++) {
    var bar_single = bar[i];
    if (i != 4 && i != 6) {
        bar_single.onmouseover = function () {
            if (bool_s == 1 && bool_wall == 0) {
                bool_wall = 1;
                bool_s = 0;
                this.style.backgroundColor = "red";
                change_result();
            }
        }
    }
    else {
        bar_single.onmouseover = function () {
            if (bool_s == 1 && bool_wall == 0) {
                bool_wall = 1;
                bool_s = 0;
                bar[4].style.backgroundColor = "red";
                bar[6].style.backgroundColor = "red";
                change_result();
            }
        }
    }
}

//鼠标到达E
document.getElementById("e").onmouseover = function () {
    if (bool_cheat == 1) {               //cheat
        bool_win = 0;
        bool_s = 0;
        change_result();
        return;
    }
    else if (bool_s == 1 && bool_wall == 0 && bool_win == 0 && bool_cheat == 0) {     //win
        bool_win = 1;
        bool_s = 0;
        change_result();
        return;
    }
    else if (bool_s == 0 && bool_wall == 0 && bool_win == 0 && bool_cheat == 0) {   //cheat
        bool_win = 0;
        bool_s = 0;
        bool_cheat = 1;
        change_result();
    }
}

//鼠标离开游戏主框
document.getElementById("game").onmouseleave = function () {
    if (bool_s == 1 && bool_wall == 0 && bool_win == 0) {
        bool_cheat = 1;
    }
    else {
        bool_cheat = 0;
    }
    if (bool_wall == 1) {
        for (var i = 0; i < bar.length; i++) {
            bar[i].style.backgroundColor = "#EEEEEE";
        }
    }
    bool_maze = 0;
    bool_wall = 0;
    bool_win = 0;
}