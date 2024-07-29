import { Response } from "express";

function handleHttpError(
  res: Response, 
  message: string = 'something happened, but god will solve it',
  code: number = 443
): void {
  res.status(code);
  res.send({message: message})
}

export default handleHttpError