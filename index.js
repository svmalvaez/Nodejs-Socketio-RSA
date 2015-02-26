var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var users = new Array();

function handler (req, res) {
  fs.readFile("http://localhost:8000/templates/rsa.html",
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function(socket){
  console.log('a user connected');
	socket.on("new_user",function(data){
	  	console.log("DATA: ", data);
	  	users.push(data);
	  });
});

app.listen(3000, function(){
  console.log('listening on *:3000');
  console.log(users)
});
