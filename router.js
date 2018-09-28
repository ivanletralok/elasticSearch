var express = require("express");
var router = express.Router();

var elastic = require('./elasticsearch');


router.get('/', function(request, response, netx){
	elastic.search( "*" ).then( function( results ){
		response.json( results );
	});
});

router.get('/:search', function(request, response, next){
	let search = request.params.search;
	elastic.search( search ).then( function( result ){
		response.json( result );
	});
	
});

router.post('/', function(request, response, next){
	elastic.addDocument( request.body ).then( function(result){
		response.json(result.result);
	});
});

router.get('/delete/:id', function(request, response, netx){
	elastic.deleteDocument(request.params.id).then( function( result ){
		response.json( result );
	});
});

module.exports = router;