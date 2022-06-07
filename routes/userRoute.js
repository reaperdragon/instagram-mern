import express from 'express';
const router = express.Router();

import { register, login, updateUser } from '../controllers/user.js'

import authenticateUser from '../middleware/auth.js'

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user').patch(authenticateUser,updateUser);

export default router;