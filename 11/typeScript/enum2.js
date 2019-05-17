var Response1;
(function (Response1) {
    Response1[Response1["No"] = 0] = "No";
    Response1[Response1["Yes"] = 1] = "Yes";
})(Response1 || (Response1 = {}));
function respond(recipient, message) {
    console.log(recipient + ' ' + message);
}
respond("huxu", Response1.Yes);
