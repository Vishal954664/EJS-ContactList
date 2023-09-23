const express = require('express')
const port = 8000
const db = require('./config/mongoose');
const Contact = require('./models/contact')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
//app.use(express.urlencoded())
app.use(express.urlencoded({ extended: true }));

app.use(express.static('assets'))
//app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    /*Contact.find({},function(err,contacts){
        if(err){
            console.log("Error in loading contacts from DB");
            return
        }
        return res.render('home', { title: "Contact List ", contact_list: contacts })
    })*/
    //code update due to newer mongoose version as callBack function is no longer supported after v6.0 so promises are used
    Contact.find({})
    .then(contacts => {
        //console.log('***********', newContact);
        return res.render('home', { title: "Contact List ", contact_list: contacts })
    })
    .catch(err => {
        console.log("Error in loading contacts from DB");
        return
    });

    

})



app.get('/delete-contact', async function (req, res) {
    try {
        const contactId = req.query.id; // Assuming your contact has an 'id' field

        // Use findByIdAndDelete to delete the contact by its ID
        const deletedContact = await Contact.findByIdAndDelete(contactId);

        if (!deletedContact) {
            console.log("Contact not found");
        } else {
            console.log("Contact deleted successfully");
        }

        return res.redirect('back');
    } catch (err) {
        console.error("Error deleting contact:", err);
        return res.redirect('back');
    }
});


app.post('/add-contact', function (req, res) {
    console.log("post request is hit " + JSON.stringify(req.body));
    
    Contact.create(req.body)
        .then(newContact => {
            console.log('***********', newContact);
            return res.redirect('back');
        })
        .catch(err => {
            console.log("!Error in creating new Contact:", err);
            return res.redirect('back');
        });
});


app.listen(port,
    function (err) {
        if (err) { console.log("Error in running the express server") }
        console.log("Server is running on Port: " + port)
    }
)
