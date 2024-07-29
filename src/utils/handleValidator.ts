import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

async function validateResults(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    validationResult(req);
    return next();
  } catch (error: any) {
    res.status(400);
    res.send({
      errors: error.array()
    })
  }
}

export default validateResults;