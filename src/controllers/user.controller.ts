import crypto from 'node:crypto';
import { Request, Response } from 'express';

import models from '../models';
import prompts from '../utils/prompts';
import AIClass from '../services/openai.class';
import handleHttpError from '../utils/handleError';
import GoogleSheetService from '../services/spreadsheets';
import { addRowsToSheet } from '../utils/handleSheetService';
import { formatMessageOfSede } from '../utils/formattedMessages';

import type { Ctx } from '../interfaces/builderbot.interface';

const ai = new AIClass(process.env.OPEN_AI_KEY!)
const sheetService = new GoogleSheetService();


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

export async function showLocationtoUser(req: Request, res: Response): Promise<void> {
  try {

    const userSedes = await sheetService.getSheetData(1);


    const messageToUser = formatMessageOfSede(userSedes);

    const response = {
      messages: [
        {
          type: 'to_user',
          content: messageToUser
        }
      ],
    }

    res.status(200).send(response)
  } catch {
    handleHttpError(res, 'cannot show location to user')
  }
}

export async function setUserLocation(req: Request, res: Response): Promise<void> {
  try {
    const { from: number, body: message } : Ctx = req.body.ctx;

    const user = await models.user.findOne({ cellphone: number });
    
    if(!user) {
      return handleHttpError(res, 'cannot found user', 404);
    };

    const userSedes = await sheetService.getSheetData(1);

    const userSedesParsed = formatMessageOfSede(userSedes);
    const locationParsed = await ai.createChat([
      {
        role: 'assistant',
        content: prompts.parseUserLocation.replace('{userMessage}', message).replace('{userSedes}', userSedesParsed)
      }
    ]);

    let messageToUser = '';
    
    if (locationParsed != 'BOGOTÁ') {
      messageToUser = `¡Perfecto! Tu ubicación fue tomada 📍.\n\nUbicación seleccionada: ${locationParsed}`
      await addRowsToSheet('sede escogida', locationParsed!);
    } else {
      messageToUser = 'Por favor, especifica tu ubicación 📍.'
    }

    const response = {
      messages: [
        {
          type: 'to_user',
          content: messageToUser
        }
      ],
    }

    res.status(200).send(response)
  } catch (error) {
    console.error('error', error)
    handleHttpError(res, 'cannot set user location');
  };
};

export async function showLocationDates(req: Request, res: Response): Promise<void> {
  try {
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

    let userMessage = ''

    const userSedes = await sheetService.getSheetData(1);

    const userSedesParsed = formatMessageOfSede(userSedes);

    const dateParsed = await ai.createChat([
      {
        role: 'assistant',
        content: prompts.parseUserDateSelected
          .replace('{userMessage}', message)
          .replace('{date}', String(new Date()))
          .replace('{sedesDate}', userSedesParsed)
      },
    ]);

    if(dateParsed === 'not_possible') {
      userMessage = 'Escoge otra fecha por favor 🙁'
    } else {
      userMessage = `El dia agendado fue ${dateParsed}`
    }

    // const date = extractDayFromMessage(dateParsed as string);

    // console.log('date: ', date);

    await addRowsToSheet('dia escogido', dateParsed as string);
    
    const response = {
      messages: [
        {
          type: 'to_user',
          content: userMessage
        }
      ],
      userMessage
    }

    res.status(200).send(response);
  } catch (error) {
    console.error('errosote: ', error)
    handleHttpError(res, 'cannot set location date');
  }
}