const express = require('express')
const port = 8000
const app = express()
const path = require('path')

app.set('view engine', 'ejs' )
app.set('views',path.join(__dirname,'views'))
//app.use(express.urlencoded())
app.use(express.urlencoded({ extended: true }));

app.use(express.static('assets'))
//app.set('view engine', 'ejs')
var contactList = [
    {name:"vishal",phone:"7739301752"},
    {name:"Akash",phone:"7739301752"},
    {name:"Tom",phone:"7739301752"},
    {name:"Jerry",phone:"7739301752"}
];
app.get('/',function(req,res){
    res.render('home',{title:"Contact List ", contact_list:contactList})
    //res.send("<h1>hello Express is up!</h1>");
    //console.log(res)
})

app.get('/pratice',function(req,res){
    res.render('pratice',{title:"EjsPlayGround",contentHeader:"This is my ejs PlayGroud"})
})

app.get('/delete-contact',function(req,res){
    let phone = req.query.phone;
    console.log(phone + " " + JSON.stringify(req.query.name));
    let name = req.query.name;
    let contactIndex = contactList.findIndex(contact => contact.name == name && contact.phone == phone );
    console.log(contactIndex);
    if(contactIndex!= -1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back')
})


app.post('/add-contact',function(req,res){
    console.log("post request is hit " + JSON.stringify(req.body))
   contactList.push(req.body)
   return res.redirect('back')
});

app.listen(port,
    function(err){if(err){console.log("Error in running the express server")}
     console.log("Server is running on Port: "+port)
}
    )
