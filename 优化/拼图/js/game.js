var is_in = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]]; //是否存在拼图
var num_click = 0;//按了图片次数
var bool_start = 0;//是否开始

//生成小拼图

_.times(15, function (i) { $("#photo_bar").append("<div></div>"); $("#photo_bar div").last().attr('id', 'pho' + i);});
$("#photo_bar").find("div").addClass("photo");

var m = setTimeout(random_elem, 500); //初始生成；

//点击重新开始按钮
$("#restart").click(function () {
    bool_start = 0;
    $("#photo_bar").find("div").css({ "left": "130px", "top": "130px" });
    num_click = 0;
    $("#num_click_id").text(num_click);
    m = setTimeout(random_elem, 500);
});

//点击拼图的反应

$("#photo_bar").find("div").click(how_to_move);

//判断拼图怎样移动
function how_to_move() {
    var x = Math.round((parseFloat(this.style.top) / 87.5));
    var y = Math.round((parseFloat(this.style.left) / 87.5));
    if (is_in[x][y] == 1 && bool_start == 1) {
        how_to_move_x(x, y, this);
        how_to_move_y(x, y, this);
    }
}

function how_to_move_x(x,y,elem) {
    if ((x + 1 < 4) && is_in[x + 1][y] == 0) {
        change_position(elem, x + 1, y);
    }
    else if ((x - 1 >= 0) && is_in[x - 1][y] == 0) {
        change_position(elem, x - 1, y);
    }
    else return false;
    is_in[x][y] = 0;
    return true;
}

function how_to_move_y(x,y,elem) {
    if ((y + 1 < 4) && is_in[x][y + 1] == 0) {
        change_position(elem, x, y + 1);
    }
    else if ((y - 1 >= 0) && is_in[x][y - 1] == 0) {
        change_position(elem, x, y - 1);
    }
    else return false;
    is_in[x][y] = 0;
    return true;
}

//改变位置
function change_position(fla, x, y) {
    num_click++;
    $("#num_click_id").text(num_click);
    is_in[x][y] = 1;
    fla.style.top= (x * 87.5)+"px";
    fla.style.left = (y * 87.5) + "px";
    var bool_success = is_success();
    if (bool_success == true) {
        alert("次数："+num_click+"\n"+"You are winner");
    }
}

//是否成功
function is_success() {
    $(".photo").each(function (index) { return parseFloat(this.style.left) == ((index % 4) * 87.5) && parseFloat(this.style.top) == ((Math.floor(index / 4)) * 87.5) });
}



//生成随机地图,保证还原
function random_map() {
    var arr = create_right_array();
    var k = 0;
    var ar = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]];
    for (var i = 0; i <= 3; i++) {
        for (var j = 0; j <= 3; j++) {
            ar[i][j] = arr[k++];
        }
    }
    return ar;
}

function create_right_array() {
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    shuffle(arr);
    if (nixu(arr) % 2 != 0) {
        var term = arr[15];
        arr[15] = arr[14];
        arr[14] = term;
    }
    return arr;
}

function shuffle(array) {
    for (var i = 2; i <array.length; i++) {
        var term = array[i];
        var k=Math.round(Math.random() * i);
        array[i] = array[k];
        array[k] = term;
    }
}

function nixu(array) {
    nixushu = 0;
    for (var i = 0; i < array.length; i++) {
        for (var y = i + 1; y < array.length; y++) {
            if (array[i] > array[y]) {
                nixushu++;
            }
        }
    }
    return nixushu;
}

//重新开始
function random_elem() {
    _.times(4, function (i) { _.times(4, function (j) { is_in[i][j] = 0; }); });
    var k = 0;
    var aarr = random_map();
    var random_single = function (k_, aarr_) {
        random_single_change(k_, aarr_);
    }(k,aarr);
    bool_start = 1;
}

function random_single_change(k, arr) {
    for (var i = 0; i <= 3; i++) {
        for (var j = 0; j <= 3; j++) {
            var x = Math.floor(arr[i][j] / 4);
            var y = arr[i][j] % 4;
            is_in[x][y] = 1;
            var q = random_single_change_photo(k, x, y);
            setTimeout(q, k * 300);
            k++;
            if (k > 14) { return; }
        }
    }
}

var random_single_change_photo = function (k_, x_, y_) {
    var photo_class = document.getElementsByClassName("photo");
    return function () {
        photo_class[k_].style.left = (y_ * 87.5) + "px";
        photo_class[k_].style.top = (x_ * 87.5) + "px"
    }
};