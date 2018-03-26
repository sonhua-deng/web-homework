var expresion="";   //要计算的式子
var screen_value ="";   //screen 的元素的文本的值
//点击button的处理
$(".number").click(deal);
$(".operator1").click(deal);
$(".operator2").click(deal_oprator2);
$(".dt,.blacket").click(deal);
$("#delete").click(dele);
$("#CE").click(clear);
$(".operator3").click(all);

//对不是删除，清屏，等于的处理
function deal() {
    screen_value += $(this).text();
    expresion += $(this).text();
    if (screen_value.length > 18) {
        alert("只支持18个数");
        screen_value = slice(0, 17);
    }
    $("#screen").text() = screen_value;
}

function deal_oprator2() {
    if (expresion[expresion.length - 1] != '/' && expresion[expresion.length - 1] != '*') {
        screen_value += $(this).text();
        expresion += $(this).text();
        if (screen_value.length > 18) {
            alert("只支持18个数");
            screen_value = slice(0, 17);
        }
        $("#screen").text() = screen_value;
    }
}

//清屏的函数
function clear() {
    screen_value = "";
    expresion = "";
    $("#screen").text() = "0";
}

//删除的函数
function dele () {
    screen_value = screen_value.slice(0,screen_value.length-1);
    expresion = expresion.slice(0, expresion.length - 1);
    if (screen_value == "") {
        $("#screen").text() = "0";
    }
    else {
        $("#screen").text() = screen_value;
    }
}
//等于的函数
function all() {
    try {
        if (expresion == "") expresion = "0";
        $("#screen").text() = eval(expresion);
    }
    catch (error) {
        alert("输入错误");
        $("#screen").text() = "0";
    }
    screen_value = "";
    expresion = "";
}