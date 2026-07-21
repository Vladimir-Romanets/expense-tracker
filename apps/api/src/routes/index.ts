import express from 'express';
import usersRouter from './users';
import storesRouter from './stores';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/stores', storesRouter);

export default router;
