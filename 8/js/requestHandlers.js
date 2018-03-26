var fs = require("fs");

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    fs.readFile("../html/index.html", "binary", function (error, file) {
        if (error) {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            console.log("html" + file);
            response.write(file, "binary");
            console.log(postData);
            response.write("<div id='err'>" + postData + "</div>");
            response.end();
        }
    });

}

function write_index_css(response, postData) {
    fs.readFile("../css/index.css", 'utf-8', function (err, data) {//读取内容
        if (err) throw err;
        response.writeHead(200, {
            "Content-Type": "text/css", 
        });
        console.log("index.css"+data);
        response.write(data, "binary");
        response.end();
    });
}

function write_detail_css(response, postData) {
    fs.readFile("../css/detail.css", 'utf-8', function (err, data) {//读取内容
        if (err) throw err;
        response.writeHead(200, {
            "Content-Type": "text/css",
        });
        console.log("detail.css" + data);
        response.write(data, "binary");
        response.end();
    });
}

function upload(response, postData) {
    console.log(postData);
    console.log("Request handler 'upload' was called.");
    var body=creatBody(response, postData);
    console.log("body" + body);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();

}

function creatBody(response, postData) {
    var body = '<html>' +
         '<head>' +
         '<meta http-equiv="Content-Type" ' +
         'content="text/html; charset=UTF-8" />' +
    '<link rel="stylesheet" href="../css/detail.css" />'+
    '</head>' +
         '<body>' +
          '<main>' + '<div id="detail">' +
            '<header>' + '用户' + '</header>' +
            '<p>' + '用户：' + postData.username + '</p>' +
            '<p>' + '学号：' + postData.studentID + '</p>' +
            '<p>' + '电话：' + postData.teleNumber + '</p>' +
            '<p>' + '邮箱：' + postData.email + '</p>' + '</div>' +
            '</main>' +
             '</body>' +
             '</html>';
    return body;
}

exports.start = start;
exports.upload = upload;
exports.write_index_css = write_index_css;
exports.write_detail_css = write_detail_css;