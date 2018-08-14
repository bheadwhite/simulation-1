module.exports = {
  getProducts: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .getProduct()
      .then(products => {
        res.status(200).send(products);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  addProducts: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .addProduct(
        req.body.image,
        req.body.name,
        req.body.price,
        req.body.imgAddress
      )
      .then(resp => {
        res.status(200).send("success!");
      })
      .catch(e => console.log(e));
  },
  deleteProduct: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .deleteProduct(req.params.id)
      .then(resp => {
        res.status(200).send("All Good!");
      })
      .catch(e => console.log(e));
  },
  updateProduct: (req, res, next) => {
    const dbInstance = req.app.get("db");
    console.log(req.body)
    dbInstance
      .update(req.body.id, req.body.name, req.body.price, req.body.image)
      .then(resp => res.status(200).send("ok"))
      .catch(e => console.log(e));
  }
};
