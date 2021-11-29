var http = require("http");
var url = require("url");
var util = require("util");
var strdec = require("string_decoder").StringDecoder;
var mysql = require("mysql");
var cryptojs = require("crypto-js");
var bcrypt = require("bcrypt-nodejs");
var SHA1 = require("crypto-js/sha1");
var time = require("time");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ayush2301",
    database: "temp",
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to Database");
});

function sign_up(req, res) {
    let decoder = new strdec("utf-8");
    let buffer = "";
    req.on("data", function (chunk) {
        buffer += decoder.write(chunk);
    });
    req.on("end", function () {
        buffer += decoder.end();
        var userobj = JSON.parse(buffer);
        let userID = bcrypt.hashSync(userobj.Username);
        let fquery =
            "insert into Users (UserID, Name, Username, Password) " +
            "values ('" +
            userID +
            "', '" +
            userobj.Name +
            "', '" +
            userobj.Username +
            "', '" +
            userobj.Password +
            "' )";
        con.query(fquery, function (err, result) {
            if (err) throw err;
            console.log("New Insertion : " + userobj);
            res.writeHead(200, "OK", {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            res.write(buffer);
            res.end();
        });
    });
}

//Fetches User if found, issues token
function sign_in(req, res) {
    let decoder = new strdec("utf-8");
    let buffer = "";
    req.on("data", function (chunk) {
        buffer += decoder.write(chunk);
    });
    req.on("end", function () {
        buffer += decoder.end();
        var userobj = JSON.parse(buffer);
        let fquery =
            "select * from Users where (Username = '" +
            userobj.Username +
            "'and Password = '" +
            userobj.Password +
            "')";
        con.query(fquery, function (err, result) {
            if (err) throw err;
            // console.log(result);
            if (result[0] == undefined) {
                console.log("User Not Found")
                res.writeHead(401, "UNAUTHORIZED", {
                    "Access-Control-Allow-Origin": "*",
                });
                res.end();
            }
            else {
                res.writeHead(200, "OK", {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                });
                console.log("Found User");
                let token = { UserID: result[0].UserID, Username: result[0].Username, Name: result[0].Name };
                let enctoken = cryptojs.AES.encrypt(
                    JSON.stringify(token),
                    "secretkey123"
                ).toString();
                res.write(enctoken);
                res.end();
            }
        });
    });
}

function fetch_message(req, res) {
    let decoder = new strdec("utf-8");
    let buffer = "";
    req.on("data", function (chunk) {
        buffer += decoder.write(chunk);
    });
    req.on("end", function () {
        buffer += decoder.end();
        var queryobj = JSON.parse(buffer);
        let fquery =
            "select * from Messages where (Sender = '" +
            queryobj.currUser +
            "' and Receiver = '" +
            queryobj.targetUser +
            "') or (Sender = '" +
            queryobj.targetUser +
            "' and Receiver = '" +
            queryobj.currUser +
            "')";
        con.query(fquery, function (err, result) {
            if (err) throw err;
            // console.log("");
            res.writeHead(200, "OK", {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            res.write(JSON.stringify(result));
            res.end();
        });
    });
}

function new_message(req, res) {
    let decoder = new strdec("utf-8");
    let buffer = "";
    req.on("data", function (chunk) {
        buffer += decoder.write(chunk);
    });
    req.on("end", function () {
        buffer += decoder.end();
        var messageobj = JSON.parse(buffer);
        let fquery =
            "insert into Messages(SenderID, ReceiverID, Message) values ('" +
            messageobj.senderID +
            "','" +
            messageobj.recvID +
            "','" +
            messageobj.message +
            "')";
        con.query(fquery, function (err, result) {
            if (err) throw err;
            // create_session()
            console.log(
                "New Message: " + messageobj.senderID + " to " + messageobj.recvID
            );
            res.writeHead(200, "OK", {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            res.write(buffer);
            res.end();
        });
    });
}

function create_connection(req, res) {
    let decoder = new strdec('utf-8');
    let buffer = "";
    req.on("data", function (chunk) {
        buffer += decoder.write(chunk);
    })
    req.on("end", function () {
        buffer += decoder.end();
        let userobj = JSON.parse(buffer);
        let fquery = "insert into Connections values ('" + userobj.UserID + "','" + userobj.Username + "','" + userobj.Connections + "');";
        con.query(fquery, function (err, result) {
            if (err) throw err;
            console.log("User saved in Connections");
            res.writeHead(200, "OK", { "Access-Control-Allow-Origin": "*" });
            res.write(buffer);
            res.end();
        });
    });
}

function append_connection(req, res) {
    let decoder = new strdec('utf-8');
    let buffer = "";
    req.on("data", function (chunk) {
        buffer += decoder.write(chunk);
    })
    req.on("end", function () {
        buffer += decoder.end();
        let userobj = JSON.parse(buffer);
        let fquery = "update Connections set connections=concat(connections,'," + userobj.Connections + "') where (Username='" + userobj.Username + "');";
        con.query(fquery, function (err, result) {
            if (err) throw err;
            console.log("User appended in Connections");
            res.writeHead(200, "OK", { "Access-Control-Allow-Origin": "*" });
            res.write(buffer);
            res.end();
        });
    });
}

function fetch_connection(req, res) {
    let decoder = new strdec('utf-8');
    let buffer = "";
    req.on("data", function (chunk) {
        buffer += decoder.write(chunk);
    })
    req.on("end", function () {
        buffer += decoder.end();
        let userobj = JSON.parse(buffer);
        let fquery = "select Connections from Connections where (Username='" + userobj.Username + "');";
        con.query(fquery, function (err, result) {
            if (err) throw err;
            console.log("Connections Returned");
            res.writeHead(200, "OK", { "Access-Control-Allow-Origin": "*" });
            res.write(JSON.stringify(result));
            res.end();
        });
    });
}
// create session endpoint to be hit, whenever message sent (or user searched -- optional) -- see ./messages.py
// basically creates a log of who sent to who without duplication
// 'Sessions' table is used in fetch_contacts
function create_session(req, res) {
    let decoder = new strdec("utf-8");
    let buffer = "";
    req.on("data", function (chunk) {
        buffer += decoder.write(chunk);
    });
    req.on("end", function () {
        buffer += decoder.end();
        userobj = JSON.parse(buffer);
        let fquery =
            "insert into Sessions values('" +
            userobj.User1 +
            "','" +
            userobj.User2 +
            "')";
        con.query(fquery, function (err, result) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    console.log(
                        "Session: " +
                        userobj.User1 +
                        " to " +
                        userobj.User2 +
                        " already recorded, skipping...\n"
                    );
                    res.writeHead(502, "BAD GATEWAY", {
                        "Access-Control-Allow-Origin": "*",
                    });
                    res.end();
                } else throw err;
            } else {
                console.log(buffer);
                console.log(
                    "Session: " +
                    userobj.User1 +
                    " to " +
                    userobj.User2 +
                    " added into record\n"
                );
                res.writeHead(200, "OK", {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                });
                res.write(JSON.stringify(buffer));
                res.end();
                // move console log here (last message issue)
            }
        });
    });
}

function fetch_contacts(req, res) {
    let decoder = new strdec("utf-8");
    let buffer = "";
    req.on("data", function (chunk) {
        buffer += decoder.write(chunk);
    });
    req.on("end", function () {
        buffer += decoder.end();
        var queryobj = JSON.parse(buffer);
        let fquery =
            "select User2 as 'Username' from Sessions where (User1 = '" +
            queryobj.User1 +
            "')";
        con.query(fquery, function (err, result) {
            if (err) throw err;
            // console.log("");
            res.writeHead(200, "OK", {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            res.write(JSON.stringify(result));
            res.end();
        });
    });
}

// function new_session(x, y) {
//     let fquery = "insert into Sessions values('" + x + "','" + y + "')";
//     con.query(fquery, function (err, result) {
//         if (err) {
//             if (err.code == "ER_DUP_ENTRY") {
//                 return;
//             }
//             else throw err;
//         }
//         else {
//             return;
//         }
//     })
// }

http
    .createServer(function (req, resp) {
        if (req.method == "OPTIONS") {
            resp.writeHead(200, "OK", {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Methods": "*",
            });
            resp.end();
        } else if (req.method == "GET") {
            //For checking connectivity
            resp.writeHead(200, "OK", {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
            });
            resp.write("Enpoint Hit, Request Acknowledged");
        } else {
            let path = url.parse(req.url, true);
            switch (path.pathname) {
                case "/sign_up":
                    sign_up(req, resp);
                    break;
                case "/sign_in":
                    sign_in(req, resp);
                    break;
                case "/new_message":
                    new_message(req, resp);
                    break;
                case "/fetch_message":
                    fetch_message(req, resp);
                    break;
                case "/create_session":
                    create_session(req, resp);
                    break;
                case "/fetch_contacts":
                    fetch_contacts(req, resp);
                    break;
                case "/create_connection":
                    create_connection(req, resp);
                    break;
                case "/append_connection":
                    append_connection(req, resp);
                    break;
                case "/fetch_connections":
                    fetch_connection(req, resp);
                    break;
            }
        }
    })
    .listen(4500, "localhost");
