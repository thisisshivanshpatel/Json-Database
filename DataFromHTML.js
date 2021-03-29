const express=require("express");
const path=require('path');
const fs=require('fs');

const port=process.env.PORT || 80;

const app=express();

const templatepath=path.join(__dirname,'/templates/views');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","hbs");
app.set("views",templatepath);

var data=fs.readFileSync("Data.json");
var user=JSON.parse(data);

//var user={};  //object created 


function create(key,value) {
	user[key]=value;

    show();
}


function show()
{
	console.log(user);
    writetoFile();
}

function writetoFile()
{
const jsonobj=JSON.stringify(user);
fs.writeFileSync("Data.json",jsonobj);
}


app.get('/',(req,res)=>
{
    res.render('DataSender');
})


app.post('/takedata',(req,res)=>{
   res.send("Data Recieved");
   var key=req.body.key;
   var value=req.body.value;

   create(key,value);
})

app.post('/show',(req,res)=>{
   res.json(user);
})

app.get('*',(req,res)=>
{
   res.send("<h1>404 page not found </h1>")
})


app.listen(port,()=>{
    console.log(`server is listening to the port number ${port}`);
})