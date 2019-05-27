module.exports = {
  getProducts: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.getProducts()
      .then(products => { res.status(200).send(products); })
      .catch(err => { console.log(err);res.status(500).send(err); });
  },
  addProducts: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const {name, image, price } = req.body
    dbInstance.shelfie.insert({name:name, image:image, price:price})
    .then(()=> {
      dbInstance.getProducts()
      .then(resp => { res.status(200).send(resp); })
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e))
  },
  deleteProduct: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.deleteProduct(req.params.id)
      .then(resp => { res.status(200).send("All Good!"); })
      .catch(e => console.log(e));
  },
  updateProduct: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { id, name, price, image } = req.body
    dbInstance.update(id, name, price, image)
      .then(resp => res.status(200).send("ok"))
      .catch(e => console.log(e));
  }
};
