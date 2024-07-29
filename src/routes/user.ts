import express from 'express';

import { createUser } from '../controllers/user.controller';
import { userValidatorCreate } from '../validators/user.validator';

const router = express.Router();

router.post('/user', userValidatorCreate, createUser);

export default router;