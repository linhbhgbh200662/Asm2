var MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://Linh:linh@cluster0.pplrl3a.mongodb.net/test'
const { Int32, ObjectId } = require('bson')

async function insertProduct(newProduct) {
    let client = await MongoClient.connect(url)
    let db = client.db("Asm2")
    let newId = await db.collection("products").insertOne(newProduct)
    return newId
}

async function getAllProduct() {
    let client = await MongoClient.connect(url)
    let db = client.db("Asm2")
    let results = await db.collection("products").find().toArray()
    return results
}

async function deleteProductById(id) {
    let client = await MongoClient.connect(url)
    let db = client.db("Asm2")
 
    await db.collection("products").deleteOne({ _id: ObjectId(id) })
}

async function updateProduct(id, name, price, picture, qty) {
    let client = await MongoClient.connect(url)
    let db = client.db("Asm2")
    await db.collection("products").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "price": price, "pictureURL": picture , "qty" : qty} })
}

async function findProductById(id) {
    let client = await MongoClient.connect(url)
    let db = client.db("Asm2")
    const productToEdit = await db.collection("products").findOne({ _id: ObjectId(id) })
    return productToEdit
}

async function searchProductByName(name){
    let client = await MongoClient.connect(url)
    let db = client.db("Asm2")
    const results = await db.collection("products").find({ name: new RegExp(name, 'i') }).toArray()
    return results
}
module.exports = {findProductById, updateProduct, deleteProductById, getAllProduct, insertProduct, searchProductByName}