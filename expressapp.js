const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf=require('csurf');
const flash=require('connect-flash');
const multer=require('multer');

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();
const mongodbUri =
  "mongodb+srv://Mausam:myra12345@cluster0.jcs3a.mongodb.net/shop";
const store = new MongoDBStore({
  uri: mongodbUri,
  collection: "sessions",
});

const csrfProtection=csrf();

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'image');
    },
    filename:(req,file,cb)=>{
      cb(null,new Date().toISOString()+'_'+file.originalname);
    }
});
 const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg'){

    cb(null,true);
  }
  else{

    cb(null,false);
  }
 };


app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage:fileStorage,fileFilter:fileFilter}).single('image'));
app.use(express.static(path.join(__dirname, "public")));
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUnintialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req,res,next)=>{
  res.locals.isAuthenticated=req.session.isLoggedIn;
  res.locals.csrfToken=req.csrfToken();
  next();
});

app.use((req,res,next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
  .then(user=>{
    if(!user){
      return next();
    }
    req.user=user;
    next();
  })
  .catch(err=>{
    next(new Error(err));
  });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);
app.use('/500',errorController.get500);

app.use((error,req,res,next)=>{
    // res.redirect('/500');
    res.status(500).render('500', {
      pageTitle: 'Error',
      path: '/500',
      // isAuthenticated:req.session.isLoggedin,
    });
});

mongoose
  .connect(mongodbUri)
  .then((result) => {
    console.log("Connected!");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
