const mongoose = require("mongoose")

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