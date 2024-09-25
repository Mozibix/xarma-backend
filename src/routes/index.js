import { Router } from 'express';
import getUser from './user.js';

const router = Router();

// Base route for API
router.get('/v1', (req, res) => {
    res.status(200).json({
        message: 'Welcome to  X-ARME API'
    });
});

// Mount user routes under /v1/user
router.use('/v1', getUser);

export default router;
