$("#todo thead").delegate("th", "click", todo_sort);
function todo_sort() {
    var click_num = get_todo_click_num($(this).text());
    var up_bool=get_up_bool("todo",click_num);
    change_tr_of_this_thead("todo", up_bool, click_num);
}

function get_todo_click_num(elem_text) {
    if(elem_text=="What?") return 0;
    if(elem_text=="When?") return 1;
    if(elem_text=="Location") return 2;
}

$("#staff thead").delegate("th", "click", staff_sort);
function staff_sort() {
    var click_num = get_staff_click_num($(this).text());
    var up_bool = get_up_bool("staff", click_num);
    change_tr_of_this_thead("staff", up_bool, click_num);
}

function get_staff_click_num(elem_text) {
    if (elem_text == "First name") return 0;
    if (elem_text == "Last name") return 1;
    if (elem_text == "Latest checkin") return 2;
}

function get_up_bool(id_name,click_num_){
    test = $("#" + id_name + " td");
    if (test[click_num_].firstChild.nodeValue < test[click_num_ + 3].firstChild.nodeValue && test[click_num_ + 3].firstChild.nodeValue < test[click_num_ + 6].firstChild.nodeValue) {
        return 1;
    }
    return 0;
}

function change_tr_of_this_thead(id_name,up_bool_, click_num_) {
    if (up_bool_ == 1) {
        change_tr_of_this_thead_down(id_name, click_num_);
        $("#" + id_name + " th").css({ "background-image": "none", "background-color": "#031A7F" });
        $("#" + id_name + " th:nth-child(" + (click_num_ + 1) + ")").css({ "background-image": "url('img/descend.png')", "background-color": "#A4AEFC" });
    }
    else {
        change_tr_of_this_thead_up(id_name, click_num_);
        $("#" + id_name + " th").css({ "background-image": "none", "background-color": "#031A7F" });
        $("#" + id_name + " th:nth-child(" + (click_num_ + 1) + ")").css({ "background-image": "url('img/ascend.png')", "background-color": "#A4AEFC" });
    }
}

function change_tr_of_this_thead_up(id_name,click_num_) {
    test = $("#" + id_name + " td");
    for (var i = 0; i <= 2; i++) {
        for (var j = i + 1; j <= 2; j++) {
            if (test[click_num_ + 3 * i].firstChild.nodeValue > test[click_num_ + 3 * j].firstChild.nodeValue) {
                $("#"+id_name+" tbody tr:nth-child(" + (i+1) + ")").before($("#"+id_name+" tbody tr:nth-child(" + (j+1) + ")"));
                i = -1;
                test = $("#" + id_name + " td");
                break;
            }
        }
    }
}

function change_tr_of_this_thead_down(id_name,click_num_) {
    test = $("#" + id_name + " td");
    for (var i = 0; i <= 2; i++) {
        for (var j = i + 1; j <= 2; j++) {
            if (test[click_num_ + 3 * i].firstChild.nodeValue < test[click_num_ + 3 * j].firstChild.nodeValue) {
                $("#" + id_name + " tbody tr:nth-child(" + (i + 1) + ")").before($("#" + id_name + " tbody tr:nth-child(" + (j + 1) + ")"));
                i = -1;
                test = $("#" + id_name + " td");
                break;
            }
        }
    }
}
