const valid = require("express-validator").checkSchema;

const schema = {

  username: {

      isAlphanumeric: {errorMessage: "username should contain string and and numbers "},
      notEmpty: {errorMessage: "username must not be empty"},
      
      isLength: {options: {
        min: 6, 
      }
      }
  },

  phone: {
   
    // isMobilePhone: {options: ['any', { strictMode: false }]},
    notEmpty: {errorMessage:"Phone number must be provided"},
    isInt: {errorMessage: "Phone number must be digits"},
    isLength: {options: {min: 8, max: 15, errorMessage: "must not be less than six (6) and not more than fifteen(15)"}}
  },

  last_name: {
    notEmpty: {errorMessage:"last name must be provided"}
  }, 

  first_name: {
    notEmpty: {errorMessage:"first name must be provided"}
  },

  profession: {
    notEmpty: {errorMessage:"profession is required"}
  },

  country: {
    notEmpty: {errorMessage:"country is required"}
  },
  


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