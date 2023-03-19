import joi from 'joi';

export const headersValidator ={
   headers:joi.object().required().options({allowUnknown:true}).keys({
       authorization:joi.string().required()
   })}

   export const signupValidator = {
       body: joi
         .object()
         .required()
         .keys({
            name: joi.string().required(),
           email: joi.string().email().required(),
           password: joi
             .string()
             .pattern(
               new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
             )
             .required(),
           cPassword: joi.string().valid(joi.ref("password")).required(),
           phone: joi.number(),
           age: joi.number(),
         
         })
     };   

     export const loginValidator = {
       body: joi
         .object()
         .required()
         .keys({
           email: joi.string().email().required(),
           password: joi
             .string()
             .pattern(
               new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
             )
             .required()
         })
     };
   