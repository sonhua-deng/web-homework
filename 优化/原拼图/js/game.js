var is_in = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]]; //是否存在拼图
var photo_bar_elem = document.getElementById("photo_bar");//photo所在框的元素
var photo_class = document.getElementsByClassName("photo");// photo的数组
var num_click = 0;//按了图片次数
var bool_start = 0;//是否开始

//生成15个小拼图
for (var i = 0; i < 15; i++) {
        var elem=document.createElement("div");
        /*var left_value = ((i % 4) * 87.5);
        var top_value = ((Math.floor(i / 4)) * 87.5);*/
        var left_value = 130;
        var top_value = 130;
        elem.style.position = "absolute";
        elem.style.left = left_value + "px";
        elem.style.top = top_value + "px";
        elem.setAttribute("class", "photo");
        elem.setAttribute("id", "pho"+(i+1));
        photo_bar_elem.appendChild(elem);
}

var m = setTimeout(random_elem, 500); //初始生成；

//点击重新开始按钮
document.getElementById("restart").onclick = function () {
    bool_start = 0;
    for (var i = 0; i < 15; i++) {
        var left_value = 130;
        var top_value = 130;
        photo_class[i].style.left = left_value + "px";
        photo_class[i].style.top = top_value + "px";
    }
    num_click = 0;
    document.getElementById("num_click_id").firstChild.nodeValue = num_click;
    m = setTimeout(random_elem, 500);
}

//点击拼图的反应
for (var i = 0; i < photo_class.length; i++) {
    photo_class[i].onclick = function () {
        var x = Math.round((parseFloat(this.style.top) / 87.5));
        var y = Math.round((parseFloat(this.style.left) / 87.5));
        if (is_in[x][y] ==1&&bool_start==1) {
            if ((x + 1 < 4) && is_in[x + 1][y] == 0) {
                is_in[x][y] = 0;
                change_position(this, x + 1, y);
            }
            else if ((x - 1 >= 0) && is_in[x - 1][y] == 0) {
                is_in[x][y] = 0;
                change_position(this, x - 1, y);
            }
            else if ((y + 1 < 4) && is_in[x][y + 1] == 0) {
                is_in[x][y] = 0;
                change_position(this, x, y + 1);
            }
            else if ((y - 1 >= 0) && is_in[x][y - 1] == 0) {
                is_in[x][y] = 0;
                change_position(this, x, y - 1);
            }
        }
    };
}

//改变位置
function change_position(fla, x, y) {
    num_click++;
    document.getElementById("num_click_id").firstChild.nodeValue = num_click;
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
    for (var i = 0; i < photo_class.length; i++) {
        var left_value = ((i % 4) * 87.5) + "px";
        var top_value = ((Math.floor(i / 4)) * 87.5) + "px";
        if (photo_class[i].style.left != left_value || photo_class[i].style.top != top_value) {            
            return false;
        }
    }
    return true;
}

//重新开始
function random_elem() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            is_in[i][j] = 0;
        }
    }
    var aarr = random_map();
    var k = 0;
    var random_single = function () {
        for (var i = 0; i <= 3; i++) {
            for (var j = 0; j <= 3; j++) {
                var flag = aarr[i][j];
                var x = Math.floor(flag / 4);
                var y = flag % 4;
                is_in[x][y] = 1;
                var b = function (i, j, p) {
                    return function () {
                        change(photo_class[i],j*87.5,p*87.5); 
                    }
                };
                var q=b(k,x,y);
                setTimeout(q, k*300);
                /*photo_class[k].style.left = (y * 87.5) + "px";
                photo_class[k].style.top = (x * 87.5) + "px"; */
                k++;
                if (k > 14) { return; }
            }
        }
    }();
    bool_start = 1;
}

//生成随机地图,保证还原
function random_map() {
    var arr = [];
    var sum = 0;
    var nixushu = 0;
    while (1) {
        for (var i = 0; i < 16; i++) {
            arr[i] = -1;
        }
        for (var i = 0; i <= 15; i++) {
                while (1) {
                    sum = 0;
                    arr[i] = Math.round(Math.random() * 15);
                    for (var x = 0; x <= 15; x++) {
                            if (arr[i] == arr[x]) {
                                sum++;
                            }
                    }
                    if (sum == 1) {
                        break;
                    }
                }
        }
        nixushu = 0;
        for (var i = 0; i <= 15; i++) {
            for(var y=i+1;y<=15;y++) {
                if (arr[i] > arr[y]) {
                    nixushu++;
                }
            }
        }
        if (nixushu % 2 == 0) {
            break;
        }
    }
    var k = 0;
    var ar = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]];
    for (var i = 0; i <= 3; i++) {
        for (var j = 0; j <= 3; j++) {
            ar[i][j] = arr[k++];
        }
    }
    return ar;
}

//开始走向四方的函数
function change(flag, x_, y_) {
    a();
    var p = 0;
    function a() {
        var y = parseFloat(flag.style.left);
        var x = parseFloat(flag.style.top);
        if (x_ == x && y == y_) {
            return true;
        }
        if (x > x_) {
            x = x - 2.5;
        }
        if (x < x_) {
            x = x + 2.5;
        }
        if (y > y_) {
            y = y - 2.5;
        }
        if (y < y_) {
            y = y + 2.5;
        }
        flag.style.left = y + "px";
        flag.style.top = x + "px";
        p++;
        setTimeout(a, 1);
    };
}