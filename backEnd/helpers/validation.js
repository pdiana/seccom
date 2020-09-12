const Joi = require('joi');
module.exports =  (user) => {
    const schema = Joi.object({
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
    });
    return schema.validate(user);
};

