var time = 30;//时间
var score = 0;//分数
var bool_start_game=0;//游戏是否开始
var bool_start = 0;//是否暂停
var num = 0; // 生成地鼠的洞号码

//生成60个洞
for (var i = 0; i < 60; i++) {
    var game = document.getElementById("game");//游戏主框函数
    var button_one = document.createElement("button");
    game.appendChild(button_one);
    document.getElementById("game").appendChild(button_one);
    var id_name = i;
    button_one.setAttribute("class", "hole");
    button_one.setAttribute("id", id_name);
}

var hole_array = document.getElementsByClassName("hole"); //hole 的数组
var time_interval// 时间间隔

//游戏开始的函数
document.getElementById("start_stop").onclick = function () {
    if (bool_start_game == 0) {
        score = 0;
        time = 30;
        document.getElementById("score").firstChild.nodeValue = score;
        document.getElementById("time").firstChild.nodeValue = time;
        createMouse();
    }
    if (bool_start == 0) {
        if (time == 0) {
            score = 0;
            time = 30;
        }
        bool_start = 1;
        bool_start_game = 1;
        time_interval = setInterval("time_change()", 1000);
        document.getElementById("over").firstChild.nodeValue = "Playing";
    }
    else{
        bool_start = 0;
        clearInterval(time_interval);
        document.getElementById("over").firstChild.nodeValue = "Stop";
    }

}

//生成地鼠的函数
function createMouse() {
    var random_num = Math.round(Math.random() * 59);
    hole_array[random_num].style.backgroundColor = "blue";
    num = random_num;
}

//点击地鼠的函数
for (var i = 0; i < hole_array.length; i++) {
    var hole_now = hole_array[i];
    hole_now.onclick = function () {
        if (bool_start == 1&&bool_start_game==1) {
            if (time > 0) {
                really(this.getAttribute("id"));
            }
        }
    }
}

//时间减的函数
function time_change() {
    if (time > 0) {
        time = time - 1;
        document.getElementById("time").firstChild.nodeValue = time;
    }
    else {
        clearInterval(time_interval);
        document.getElementById("over").firstChild.nodeValue = "Gameover";
        bool_start_game = 0;
        bool_start = 0;
        hole_array[num].style.backgroundColor = "white";
        alert("Score:" + score);
    }
}

//判断是否打中地鼠，分数变化的函数
function really(flag) {
    if (flag == num) {
        hole_array[num].style.backgroundColor = "white";
        score = score + 1;
        document.getElementById("score").firstChild.nodeValue = score;
        createMouse();
    }
    else{
        if (score > 0) {
            score = score - 1;
        }
        document.getElementById("score").firstChild.nodeValue = score;
    }
}