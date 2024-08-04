import crypto from 'node:crypto';
import { Request, response, Response } from 'express';

import models from '../models';
import handleHttpError from '../utils/handleError';


import type { Ctx } from '../interfaces/builderbot.interface';
import { addRowsToSheet } from '../utils/handleSheetService';

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { from: number }: Ctx = req.body.ctx;

    const existingUser = await models.user.findOne({ cellphone: number });
    
    if(existingUser) {
      res.status(200).send({ message: 'user exists', user: existingUser });
      return;
    };

    const userData = new models.user({
      cellphone: number,
    });

    await userData.save();
    res.status(200).send('user created succesfully');
  } catch (error) {
    handleHttpError(res, 'Cannot create user');
  };
};

export async function setUserGuardian(req: Request, res: Response): Promise<void> {
  try {
    const { from: number, body: message }: Ctx = req.body.ctx;

    const user = await models.user.findOne({ cellphone: number });


    if(!user) {
      return handleHttpError(res, 'user not found');
    };

    const sheetRowID = crypto.randomUUID();

    await addRowsToSheet('uuid', sheetRowID);
    await addRowsToSheet('nro de telefono', number);
    await addRowsToSheet('nombre del acudiente', message);

    res.status(200).send('data setted');
  } catch (error) {
    console.error('errosote: ', error)
    handleHttpError(res, 'cannot set user guardian');
  };
};

export async function setUserPatient(req: Request, res: Response): Promise<void> {
  try {
    const { from: number, body: message }: Ctx = req.body.ctx;

    const user = await models.user.findOne({ cellphone: number });

    if(!user) {
      return handleHttpError(res, 'cannot found user', 404);
    };

    await addRowsToSheet('nombre del paciente', message);

    res.status(200).send('data setted');
  } catch (error) {
    handleHttpError(res, 'cannot set user patient');
  };
};

export async function setUserLocation(req: Request, res: Response): Promise<void> {
  try {
    const { from: number, body: message } : Ctx = req.body.ctx;

    const user = await models.user.findOne({ cellphone: number });
    
    if(!user) {
      return handleHttpError(res, 'cannot found user', 404);
    };

    await addRowsToSheet('sede escogida', message);

    res.status(200).send('data setted');
  } catch (error) {
    handleHttpError(res, 'cannot set user location');
  };
};

export async function showLocationDates(req: Request, res: Response): Promise<void> {
  try {
    // const { from: number, body: message } : Ctx = req.body.ctx;

    // const user = await models.user.findOne({ cellphone: number });
    
    // if (!user) {
    //   return handleHttpError(res, 'cannot found user', 404);
    // }

    // Formar el mensaje para WhatsApp
    const availableDays = `*Días disponibles:*\n- Lunes: 9:00 AM - 4:30 PM\n- Martes: 9:00 AM - 4:30 PM\n- Miércoles: 9:00 AM - 4:30 PM\n- Jueves: 9:00 AM - 4:30 PM\n- Viernes: 9:00 AM - 4:30 PM`;

    const response = {
      messages: [
        {
          type: 'to_user',
          content: availableDays
        }
      ],
    }
    res.status(200).send(response);
  } catch (error) {
    handleHttpError(res, 'cannot show dates');
  };
};

export async function setLocationDate(req: Request, res: Response): Promise <void> {
  try {
    const { from: number, body: message } : Ctx = req.body.ctx;

    const user = await models.user.findOne({ cellphone: number });
    
    if(!user) {
      return handleHttpError(res, 'cannot found user', 404);
    };

    await addRowsToSheet('dia escogido', message);
    
  } catch (error) {
    handleHttpError(res, 'cannot set location date');
  }
}