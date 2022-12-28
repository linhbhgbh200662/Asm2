const { Int32, ObjectId } = require('bson')
var express = require('express')
var app = express()
const {findProductById, updateProduct, deleteProductById, getAllProduct, insertProduct, searchProductByName} = require('./databasehandler')

app.set('view engine','hbs')

app.use(express.urlencoded({extended:true}))

app.post('/search',async (req,res)=>{
    const search = req.body.search
    const result = await searchProductByName(search)
    console.log(result)
    res.render('view all',{'results':result})
})

app.post('/new',async (req,res)=>
{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtPic
    const qty = req.body.txtQty
    const newProduct = {
        name :name,
        price: Number.parseFloat(price),
        picture: picture,
        qty : Number.parseInt(qty),
    }
    let id = await insertProduct(newProduct)
    console.log(id)
    res.render('home')

})

app.get('/viewAll',async (req,res)=>{
    const result = await getAllProduct()
    console.log(result);
    res.render('viewAll',{'results':result})
})

app.get('/delete',async (req,res)=>{
    const id = req.query.id
    await deleteProductById(id)
    res.redirect('/viewAll')
})
app.post('/edit',async (req,res)=>{
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtPic
    const qty = req.body.txtQty
    await updateProduct(id, name, price, picture, qty)
    res.redirect('/viewAll')
})

app.get('/edit',async (req,res)=>{
    const id = req.query.id
    const productToEdit = await findProductById(id)
    res.render('edit',{product:productToEdit})
})

app.get('/new',(req,res)=>
{
    res.render('newProduct')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("Server is running at: ",PORT)
})