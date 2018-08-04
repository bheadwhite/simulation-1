module.exports ={
    getProducts: (req,res,next) => {
        const dbInstance = req.app.get('db')
        dbInstance.getProducts().then(products => {res.status(200).send(products)})
        .catch(err => {console.log(err);
        res.status(500).send(err)})
    },
    addProducts: (req,res,next)=>{
        const dbInstance = req.app.get('db')
        dbInstance.addProduct(req.body.img, req.body.productName, req.body.price).then(resp => {
            res.status(200).send('success!')
        })
    },
    deleteProduct: (req,res,next)=>{
        
    }
}