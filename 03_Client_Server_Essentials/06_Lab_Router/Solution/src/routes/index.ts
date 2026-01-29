import { Router } from 'express'
import userRoutes from './userRoutes'

const router = Router()

// Health check
router.get('/', (_req, res) => {
  res.json({ status: 'ok' })
})

// Mount user routes
router.use('/users', userRoutes)

export default router
