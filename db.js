const mongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectID
//conexão

mongoClient.connect("mongodb://localhost:27017/dbProdutos", { useNewUrlParser: true }).then(conn => global.conn = conn.db("dbProdutos"), console.log("Conectado")).catch(err => console.log(err));

//função para varrer o banco de dados e retornar os valores numa array
function findAll(callback) {
    global.conn.collection("produtos").find({}).toArray(callback);
}

//função para adicionar no banco de dados
function insert(customer, callback) {
    global.conn.collection("produtos").insert(customer, callback);
}

//função para buscar por id
function findOne(id, callback) {
    global.conn.collection("produtos").findOne(new ObjectId(id), callback);
}

//função para fazer update
function update(id, customer, callback) {
    global.conn.collection("produtos").update({ _id: new ObjectId(id) }, customer, callback);
}

//função  para deletar
function deleteOne(id, callback) {
    global.conn.collection("produtos").deleteOne({ _id: new ObjectId(id) }, callback);
}

module.exports = {findAll, insert, findOne, update, deleteOne}
