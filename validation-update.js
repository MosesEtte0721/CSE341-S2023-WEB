const valid = require("express-validator").checkSchema;

const schema = {

  username: {

      
      isLength: { options: {
        errorMessage: "username should contain at least 6 characters",
        min: 6
      }
      }
 
    },

  phone: {
   
    isInt: {errorMessage: "Phone number must be digits"},
    isLength: {options: {min: 8, max: 15, errorMessage: "must not be less than six (6) and not more than fifteen(15)"}}
  },

  last_name: {
    isString: {errorMessage:"last name must be string"}
  }, 

  // 
  first_name: {
    isString: {errorMessage:"first name must be string"}
  },

  profession: {
    isString: {errorMessage:" profession must be string"}
  },

  country: {
    isString: {errorMessage:"country must be string"}
  },
  


  email: {
    errorMessage: "Email must be more than 9 characters",
    isEmail: {errorMessage: "NOT a valid Email"},
    isLength: { options: { min: 13 }}
  },

  password: {
      errorMessage: "password must be more than 8 characters and must contain symbol(S)",
      isLength: { options: {min: 8 , max: 15}},

      matches: { options: /[-_$#]/ }
    }

  };


const validate = (next)=> {
  valid(schema);
 
}


module.exports = {
  validate,
  schema
}