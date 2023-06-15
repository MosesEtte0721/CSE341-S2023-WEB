const valid = require("express-validator").checkSchema;

const schema = {

  email: {
    errorMessage: "Email must be more than 9 characters",
    isEmail: {errorMessage: "NOT a valid Email"}, 

    notEmpty: {errorMessage: "Email must not be empty"},

    isLength: { options: { min: 13 }}
  },

  password: {
      errorMessage: "password must be more than 8 characters and must contain symbol(S)",

      isLength: { options: {min: 8 , max: 15}},

      matches: { options: /[-_$#]/ },

      notEmpty: true,
      
    }

  };


const validate = (next)=> {
  valid(schema);
  
}


module.exports = {
  validate, 
  schema

}