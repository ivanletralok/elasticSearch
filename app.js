var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var documents = require("./router");

app.use(bodyParser.json());
app.use("/", documents);

/* Inicialisamos algunas cosa */

var elastic = require("./elasticsearch");


elastic.indexExist().then( function(exist){
  if( !exist )
  {
    return elastic.initIndex();
  }
}).then( function(){
  elastic.initMapping().then( function(resp){

    /* creamos un contenido para ver */

    //elastic.addDocument( {titulo:"prueba 1", contenido:"soy el contenido"} );
  });
})

var server = http.createServer(app);
server.listen(8000, function() {
  console.log(`Servidor corriendo  localhost:8000`);
});
