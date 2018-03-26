var http = require("http");
var url = require("url");
var data_student = new Array();
var querystring = require("querystring");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var path = url.parse(request.url).path;
        var query_username = querystring.parse(url.parse(request.url).query).username;
        console.log("Request for request.url" + request.url + " received.")
        console.log("Request for path" + path + " received.");
        console.log("Request for query_username" + query_username + " received.");
        if (query_username!=null) {
            postData = username_find(query_username);
            console.log("Request for postData3" + query_username + " received.");
            console.log("Request for postData" + postData + " received.");
            if (!isEmptyObject(postData)) {
                path = "/upload";
            }
        }
        console.log("Request for " + path + " received.");
        request.setEncoding("utf8");
        var err = "";

        request.addListener("data", function (postDataChunk) {
            console.log("request.addListener start");
            postData += postDataChunk;
            console.log("Received POST data chunk '" + postDataChunk + "'.");
            postData = querystring.parse(postData);
            console.log(postData);
            err = sign_in_is_right(postData) + sign_in_is_repeat(postData);
            if (err == "") {
                addData(postData);
                console.log(data_student);
            }
            else {
                console.log(err);
                path = "/";
                postData = err;
            }
        });
        request.addListener("end", function () {
            console.log("request.addListener end");
                console.log(postData);
                route(handle, path, response, postData);
        });
    }
    http.createServer(onRequest).listen(8000);
    console.log("Server has started.");
}

exports.start = start;

function sign_in_is_right(postData) {
    var err = "";
    err = sign_in_username_is_right(postData) + sign_in_studentID_is_right(postData) + sign_in_teleNumber_is_right(postData) + sign_in_email_is_right(postData);
    console.log(err);
    return err;
}

function sign_in_username_is_right(postData) {
    var username_test = /^[a-zA-Z](\w|\d){5,17}$/;
    var err = "";
    if (!username_test.test(postData.username)) {
        err += "<div><p>用户名格式错误：</p>";
        if (!(/[a-zA-Z]/.test(postData.username[0]))) {
            err += "<p>没有以英文字母开头</p>";
        }
        if (postData.username.length < 6 || postData.username.length>18) {
            err += "<p>用户名长度不在6-18</p>";
        }
        if (/\D|\W/.test(postData.username)) {
            err += "<p>出现不是数字，字母，下划线的字符</p>";
        }
        err += "</div>";
    }
    return err;
}

function sign_in_studentID_is_right(postData) {
    var studentID_test = /^[1-9][0-9]{7}$/;
    var err = "";
    if (!studentID_test.test(postData.studentID)) {
        err += "<div><p>学号格式错误：</p>";
        if (postData.studentID[0] == "0") {
            err += "<p>以0开头</p>";
        }
        if (postData.studentID.length != 8) {
            err += "<p>学号长度不等于8</p>";
        }
        if (/\D/.test(postData.studentID)) {
            err += "<p>出现不是数字的字符</p>";
        }
        err += "</div>";
    }
    return err;
}

function sign_in_teleNumber_is_right(postData) {
    var teleNumber_test = /^[1-9][0-9]{10}$/;
    var err = "";
    if (!teleNumber_test.test(postData.teleNumber)) {
        err += "<div><p>电话号码格式错误：</p>";
        if (postData.teleNumber[0] == "0") {
            err += "<p>以0开头</p>";
        }
        if (postData.teleNumber.length != 11) {
            err += "<p>电话长度不等于11</p>";
        }
        if (/\D/.test(postData.teleNumber)) {
            err += "<p>出现不是数字的字符</p>";
        }
        err += "</div>";
    }
    return err;
}

function sign_in_email_is_right(postData) {
    var email_test = /^[a-zA-Z0-9]([a-zA-Z0-9_-])+@([a-zA-Z0-9-])+((\.[a-zA-Z0-9-]{2,3}){1,2})$/;
    var err = "";
    if (!email_test.test(postData.email)) {
        err += "邮箱号码格式错误";
        err += ".\n\n";
    }
    return err;
}

function sign_in_is_repeat(postData) {
    var err="";
    for (var i = 0; i < data_student.length;i++) {
        if (data_student[i]["username"] == postData.username) {
            err += "  用户名重复 ";
        }
        if (data_student[i]["teleNumber"] == postData.teleNumber) {
            err += "  电话重复 ";
        }
        if (data_student[i]["email"] == postData.email) {
            err += "  邮箱重复 ";
        }
        if (data_student[i]["studentID"] == postData.studentID) {
            err += "  学号重复 ";
        }
    }
    console.log(err);
    return err;
}

function addData(postData) {
    var array_student = { username: postData.username, studentID: postData.studentID, teleNumber: postData.teleNumber, email: postData.email };
    data_student = data_student.concat(array_student);
    console.log("data was added in data_student.");
    console.log("data_student:");
    console.log(data_student);
}

function username_find(query_username) {
    var postData=new Object;
    for (var i = 0; i < data_student.length; i++) {
        if (data_student[i]["username"] == query_username) {
            postData["username"] = data_student[i]["username"];
            postData["teleNumber"] = data_student[i]["teleNumber"];
            postData["email"] = data_student[i]["email"];
            postData["studentID"] = data_student[i]["studentID"];
        }
    }
    return postData;
}

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}