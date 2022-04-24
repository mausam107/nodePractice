const Product =require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product',{
      pageTitle:"Add product",
      path:'/add-product',
      formCSS:true,
      productCSS:true,
      activeAddProduct:true 
    });
};

exports.postAddProduct=(req, res, next) => {
    console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
      const products = new Product(title,imageUrl,description,price);
      products.save();
      res.redirect("/");
  };

  exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    });
  };
  