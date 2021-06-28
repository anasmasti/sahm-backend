// const Joi = require("@hapi/joi");



// const registerValidation = (data) => {
//     const schema = Joi.object({ username: Joi.string() .min(6) .required(),
//     email: Joi.string() .min(6) .required() .email(),
//     password: Joi.string() .min(6) .required() ,
//     first_name:Joi.string() ,
//     last_name:Joi.string() ,
//     gender:Joi.string() ,
//     age:Joi.number() ,
//     type:Joi.string() ,
//     cin:Joi.string() ,
//     phone:Joi.string() ,
//     school_level:Joi.string() ,
//     job:Joi.string() ,
//     adress:Joi.string(),
//     action:Joi.string().min(0),
// });

//     const validation= schema.validate(data);
//     return validation;
// }

// const loginValidation = (data) => {
//     const schema = Joi.object({ 
//     email: Joi.string() .min(6) .required() .email(),
//     password: Joi.string() .min(6) .required() });

//     const validation= schema.validate(data);
//     return validation;
// }


// module.exports.registerValidation = registerValidation;
// module.exports.loginValidation = loginValidation;