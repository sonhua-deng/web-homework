var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/css/index.css"] = requestHandlers.write_index_css;
handle["/css/detail.css"] = requestHandlers.write_detail_css;
server.start(router.route, handle);