import Joi from "joi"

const schema = Joi.object({

})
export default eventHandler(async(event)=>{
    const body = await readBody(event);
    return body;
})
