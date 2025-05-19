const mongoose = require("mongoose");

if(process.argv.length < 3){
    console.log("give password as argument");
    process.exit(1)
}
 
const password = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];

const url = `mongodb+srv://mteijeiro2025:${password}@cluster0.ijjy6fk.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false);

mongoose.connect(url);

const contactSchema = new mongoose.Schema([{
    name: String,
    phone: String,
}])


const Contact = mongoose.model("Contact", contactSchema);

// Contact.insertMany([
//     {
//         name: "Arto Hellas",
//         phone: "040-123456", 
//     },
//     {
//         name: "Ada Lovelace",
//         phone: "39-44-5323523" 
//     },
//     {
//         name: "Dan Abramov",
//         phone: "12-43-234345" 
//     },
//     {
//         name: "Mary Poppendieck",
//         phone: "39-23-6423122" 
//     },
// ])
// .then((result) =>{
//     mongoose.connection.close()
// })



if(name && phone){
    const contact = new Contact({
        name,
        phone
    })

    contact.save().then( resul => {
        console.log("added", name, "number" , phone, "to phonebook");
        mongoose.connection.close();
    })
}else{
    Contact
        .find({})
        .then( persons => {
            console.log("Phonebook:");
            
            persons.forEach( person => {
                console.log(person.name, person.phone); 
            });
            mongoose.connection.close();
        })
}   


