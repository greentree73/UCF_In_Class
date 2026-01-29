import { Router } from 'express'
import { User } from '../models'
import userRoutes from "./userRoutes";

const router = Router()

// Health check
router.get('/', (_req, res) => {
  res.json({ status: 'ok' })
})

// ===== USER ROUTES =====
// TODO: Move these user routes to a separate userRoutes.ts file
// Then import and use them in this file

router.use("/users", userRoutes);

export default router
