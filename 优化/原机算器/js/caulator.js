var expresion="";   //要计算的式子
var screen=document.getElementById("screen")  //screen 元素
var screen_value ="";   //screen 的元素的文本的值
var button = document.getElementsByTagName("button");//获得所有的span即button的元素
//点击button的处理
for (var i = 0; i < button.length; i++) {
    if (i == 13) {
        button[i].onclick = function () {
            deal(".");
        };
    }
    else if (i == 14) {
        button[i].onclick = function () {
            dele();
        };
    }
    else if (i == 18) {
        button[i].onclick = function () {
            clear();
        };
    }
    else if (i == 19) {
        button[i].onclick = function () {
            all();
        };
    }
    else {
        button[i].onclick = function () {
            deal(this.firstChild.nodeValue);
        };
    }
}

//对不是删除，清屏，等于的处理
function deal(button_common) {
    screen_value+= button_common;
    expresion += button_common;
    if (screen_value.length > 18) {
        alert("只支持18个数");
        screen_value = slice(0, 17);
    }
    screen.firstChild.nodeValue = screen_value;
}

//清屏的函数
function clear() {
    screen_value = "";
    expresion = "";
    screen.firstChild.nodeValue = "0";
}

//删除的函数
function dele () {
    screen_value = screen_value.slice(0,screen_value.length-1);
    expresion = expresion.slice(0, expresion.length - 1);
    if (screen_value == "") {
        screen.firstChild.nodeValue = "0";
    }
    else {
        screen.firstChild.nodeValue = screen_value;
    }
}
//等于的函数
function all() {
    try {
        if (expresion == "") {
            expresion = "0";
        }
        screen.firstChild.nodeValue = eval(expresion);
    }
    catch (error) {
        alert("输入错误");
        screen.firstChild.nodeValue = "0";
    }
    screen_value = "";
    expresion = "";
}