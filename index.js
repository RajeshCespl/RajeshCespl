const  express = require('express');

const app = express();
const path = require('path');
const  fs = require('fs');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));

app.get("/",function(req,res){
    fs.readdir(`./files`,function(err,files){
        console.log(files);
        res.render('index',{files:files});
    });
  
})
app.post("/create", function(req, res) {
    const fileName = req.body.title + '.txt';
    fs.writeFile(`./files/${fileName}`, req.body.details, function(err) {
       if (err) {
          // Handle the error properly
          console.error("Error writing file:", err);
          res.status(500).send("Error writing file");
       } else {
          res.redirect('/');
       }
    });
 });
 
// app.get("/about/:username/:age",function(req,res){
    
//     // res.send(req.params.username);
//     res.send(`Welcome ${req.params.username} and age is ${req.params.age}`);
// })

app.listen(3000);