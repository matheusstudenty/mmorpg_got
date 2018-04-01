/* importar mongoDB */
var mongo = require('mongodb');

var connMongoDB = function(){
    var db = new mongo.Db(
        /*paramter1*/'got',
        /*paramter2*/new mongo.Server(
            'localhost', //string de caminho do banco
            27017, //porta de conexao 
            {} //config do sevidor
        ),
        /*paramter3*/{}
    );

    return db;
}

module.exports = function(){
    return connMongoDB;
}