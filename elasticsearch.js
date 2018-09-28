const elasticsearch = require('elasticsearch');

var elasticClient =  new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'info'
});

var indexName = "test";


/*  Metodos Base  */

/**
 * Eliminando index
 */

 function deleteIndex()
{
	return elasticClient.indices.delete({
		index: indexName
	});
}

exports.deleteIndex = deleteIndex;


/**
 * Creando index
 */

 function initIndex()
 {
	 return elasticClient.indices.create({
		 index: indexName
	 });
 }

exports.initIndex = initIndex;


/**
 * Validacion si existe un index
 */

function indexExist()
{
	return elasticClient.indices.exists({
		index: indexName
	});
}

exports.indexExist = indexExist;


/**
 * Estructura de nuestro contenido
 */

function initMapping()
{
	return elasticClient.indices.putMapping({
		index: indexName,
		type: "document",
		body:{
			properties: {
				titulo: {
					type: "text"
				},
				contenido:{
					type: "text"
				}
			}
		}
	});
}

exports.initMapping = initMapping;

/**
 * Crear un instancia ( Documento )
 */

function addDocument( document )
{
	return elasticClient.index({
		index: indexName,
		type: "document",
		body:{
			title: document.titulo,
			content: document.contenido,
		}
	});
}
exports.addDocument = addDocument;


/**
 * Busqueda
 */
function search(input) {
	return elasticClient.search({
		index: indexName,
		type: "document",
		q: input
	})
}

exports.search = search;

function deleteDocument( id )
{
	return elasticClient.delete({
		index: indexName,
		type: "document",
		id: id
	});
}

exports.deleteDocument = deleteDocument;

