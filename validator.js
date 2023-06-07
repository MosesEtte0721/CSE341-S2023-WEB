const { checkSchema } = require("express-validator");

const schema = {

  username: {

      isAlphanumeric: {errorMessage: "username should contain string and and numbers "},
      notEmpty: {errorMessage: "username must not be empty"},
      
      isLength: {options: {
        min: 6, 
        errorMessage: "Username must not be less than 6 characters "
      }
      }
  },


  email: {
    isEmail: {errorMessage: "Invalid Email"}, 
    notEmpty: {errorMessage: "email must not be empty"},
    isLength: { options: {
      min: 10,
      errorMessage: "Email must not be less than 10 characters"
    }
  }
  }

};


module.exports = {
  schema
}