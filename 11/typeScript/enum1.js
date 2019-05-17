var Direction;
(function (Direction) {
    Direction[Direction["up"] = 1] = "up";
    Direction[Direction["down"] = 2] = "down";
    Direction[Direction["left"] = 3] = "left";
    Direction[Direction["right"] = 4] = "right";
})(Direction || (Direction = {}));
console.log(Direction);
console.log('**********************');
var Direction2;
(function (Direction2) {
    Direction2[Direction2["up"] = 0] = "up";
    Direction2[Direction2["down"] = 1] = "down";
    Direction2[Direction2["left"] = 2] = "left";
    Direction2[Direction2["right"] = 3] = "right";
})(Direction2 || (Direction2 = {}));
console.log(Direction2);
console.log('**************************');
var Response;
(function (Response) {
    Response[Response["No"] = 0] = "No";
    Response[Response["Yes"] = 1] = "Yes";
})(Response || (Response = {}));
console.log(Response);
