import { Router } from 'express';
import userRoutes from './user.js';
import transactionRoutes from './transactions.js';

const router = Router();

// Base route for API
router.get('/v1', (req, res) => {
    res.status(200).json({
        message: 'Welcome to  X-ARME API'
    });
});

// Mount user routes under user
router.use('/v1', userRoutes);
// Mount transaction routes under transactions
router.use('/v1', transactionRoutes);

export default router;
