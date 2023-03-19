import joi from'joi';

export const headersValidator ={
    headers:joi.object().required().options({allowUnknown:true}).keys({
        authorization:joi.string().required()
    })}

    export const addNoteValidate={
        body:joi.object().required().keys({
            title:joi.string().required(),
            desc:joi.string().required()
        })
    }

    export const updateNoteValidate={
        body:joi.object().required().keys({
            title:joi.string().required(),
            desc:joi.string().required()
        }),
        params:joi.object().required().keys({
            id:joi.string().required().min(24).max(24)
        })
    }
    export const NoteValidate={
       
        params:joi.object().required().keys({
            id:joi.string().required().min(24).max(24)
        })
    }