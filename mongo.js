const mongoose = require("mongoose")


// mongoose.connect('mongodb+srv://pranaav6703:sunny1234@cluster0.akzd3ue.mongodb.net/mydatabase?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(()=>{
//     console.log("mongodb connected");
// })
// .catch(()=>{
//     console.log('failed');
// })


const newSchema=new mongoose.Schema({
    name: {
		type: String,
		required: true
	  },
	  
	  email: {
		type: String,
		required: true
	  },
	  password: {
		type: String,
		required: true
	  },
	  mobNo: {
		type: String,
		required: true
	  }
})

const Users = mongoose.model("users",newSchema)

module.exports = Users