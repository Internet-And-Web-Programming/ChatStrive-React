var http = require('http')
var url = require('url')
var util = require('util')
var strdec = require('string_decoder').StringDecoder
var mysql = require('mysql');
var cryptojs = require('crypto-js');

var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'ayush2301',
    database : 'ChatStrive'
})

// API INFO: (all request fields are case sensitive) (all requests are POST)

//     /sign_up=>
//     request
//         {
//             ID:""
//             name:"" - password field need to be added
//         }
//     Response - response unimportant(only needed for confirmation of insertion)
//         String({ID:,name:})

//     /sign_in=>
//     request
//         {
//             UserID:""
//         }
//     Response
//     String(encoded token)
//     where token = AES encrypted JSON.stringify({UserID}) - password field need to be added

//     /new_message=>
//     request
//     {
//         senderID:""
//         recvID:""
//         message:""
//     }
//     response
//         String(senderID,recvID,message) - again, response unimportant(only needed for confirmation of insertion)
//     /fetch_message=>
//     request
//     {
//         senderID:""
//         recvID:""
//     }
//     response
//     List of objects.

// Hints for pagination ==> select * from --- where --- LIMIT x -> x is the number of outputs

con.connect(function(err){
    if(err) throw err;
})

function sign_up(req,res){
    let decoder = new strdec('utf-8');
    let buffer = "";
    req.on("data",function(chunk){
        buffer += decoder.write(chunk);
        
    })
    req.on("end",function(){
        buffer += decoder.end();
        var userobj = JSON.parse(buffer);
            let fquery = "insert into Users values ('"+userobj.ID+"','"+userobj.name+"')";
            con.query(fquery,function(err,result){
                if(err) throw err;
                console.log('New Insertion : '+userobj);
                res.writeHead(200,"OK",{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
                res.write(buffer);
                res.end();
        }) 
    })
}

function fetch_message(req,res){
    let decoder = new strdec('utf-8');
    let buffer = "";
    req.on("data",function(chunk){
        buffer += decoder.write(chunk);
        
    })
    req.on("end",function(){
        buffer += decoder.end();
        var queryobj = JSON.parse(buffer);
            let fquery = "select * from Messages where (senderID = '"+queryobj.senderID+"'and recvID = '"+queryobj.recvID+"')";
            con.query(fquery,function(err,result){
                if(err) throw err;
                // console.log("");
                res.writeHead(200,"OK",{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
                res.write(JSON.stringify(result));
                res.end();
        }) 
    })
}

function new_message(req,res){
    let decoder = new strdec('utf-8');
    let buffer = "";
    req.on("data",function(chunk){
        buffer += decoder.write(chunk);
        
    })
    req.on("end",function(){
        buffer += decoder.end();
        var messageobj = JSON.parse(buffer);
            let fquery = "insert into Messages values ('"+messageobj.senderID+"','"+messageobj.recvID+"','"+messageobj.message+"')";
            con.query(fquery,function(err,result){
                if(err) throw err;
                console.log('New Insertion : '+ buffer);
                res.writeHead(200,"OK",{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
                res.write(buffer);
                res.end();
        }) 
    })
}

function sign_in(req,res){
    let decoder = new strdec('utf-8');
    let buffer = "";
    req.on("data",function(chunk){
        buffer += decoder.write(chunk);
        
    })
    req.on("end",function(){
        buffer += decoder.end();
        var userobj = JSON.parse(buffer);
            let fquery = "select * from Users where (UserID = '"+userobj.UserID+"')";
            con.query(fquery,function(err,result){
                if(err) throw err;
                if(!result){
                    res.writeHead(401,"UNAUTHORIZED",{'Access-Control-Allow-Origin':'*'});
                    res.end();
                }
                res.writeHead(200,"OK",{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
                console.log('Found User');
                let token = {"UserID":result[0].UserID}
                let enctoken = cryptojs.AES.encrypt(JSON.stringify(token),'secretkey123').toString();
                res.write(enctoken);
                res.end();
        }) 
    })
}

http.createServer(function(req,resp){
    if(req.method=="OPTIONS"){
        resp.writeHead(200,"OK",{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'*','Access-Control-Allow-Methods':'*'});
        resp.end();
    }
    else if(req.method=="GET"){
        //For checking connectivity
        resp.writeHead(200,"OK",{'Content-Type':'text/plain','Access-Control-Allow-Origin':'*'});
        resp.write("Enpoint Hit, Request Acknowledged")
    }
    else{
        let path = url.parse(req.url, true);
        switch(path.pathname){
            case "/sign_up":
                sign_up(req,resp);
                break;
            case "/sign_in":
                sign_in(req,resp);
                break
            case "/new_message":
                new_message(req,resp);
                break;
            case "/fetch_message":
                fetch_message(req,resp);
                break;
        }
    }
}).listen(4500,"192.168.1.10");