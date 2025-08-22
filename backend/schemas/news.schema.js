import Joi from 'joi';

export const newsSchema = Joi.object({
      news_id: Joi.number().optional(),
    title: Joi.string().min(2).max(100).required(),
    content: Joi.string().min(10).max(1000).required(),    
    author_id: Joi.number()   
});