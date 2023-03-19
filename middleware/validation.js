const dataMethod = ['body', 'params', 'query', 'headers']

import joi from 'joi'

export const headersValidator ={
    headers:joi.object().required().options({allowUnknown:true}).keys({
        authorization:joi.string().required()
    })
}
export const validation = (Schema) => {
try {
    return (req, res, next) => {
        const validationArr = []
        dataMethod.forEach(key => {
            if (Schema[key]) {
                const validationResult = Schema[key].validate(req[key], { abortEarly: false })
                if (validationResult?.error) {
                    validationArr.push(validationResult.error.details)
                }
            }
        })
        if (validationArr.length) {
          return  res.status(400).json({ message: "Validation error", validationArr })
        } else {
            return  next()
        }
    }
} catch (error) {
    return res.status(500).json({message:"Catch Error",error})
}
   
}