import { body, check } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

import validateResults from '../utils/handleValidator';

export const userValidatorCreate = [
  body('ctx.from')
    .trim()
    .notEmpty()
    .withMessage('Cellphone is required')
    .matches(/^\+?(\d{1,4})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,9}[-.\s]?\d{1,9}$/)
    .withMessage('Cellphone is not valid'),
    
  check('name')
    .optional()
    .isString()
    .withMessage('Name must be a string'),
    
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  },
];