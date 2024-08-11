import express from 'express';

import {
	createUser,
	setUserGuardian,
	setUserPatient,
	setUserLocation,
  showLocationDates,
	setLocationDate,
	showLocationtoUser
} from "../controllers/user.controller";
import { userValidatorCreate } from '../validators/user.validator';

const router = express.Router();

router.post('/user', userValidatorCreate, createUser);

// form routes
router.post('/user-set-guardian', setUserGuardian);
router.post('/user-set-patient', setUserPatient);
router.get('/user-show-location', showLocationtoUser);
router.post('/user-set-ask-location', setUserLocation);


//show date to user
router.post('/user-show-dates', showLocationDates);
router.post('/user-get-date', setLocationDate);

export default router;