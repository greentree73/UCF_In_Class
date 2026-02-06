import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// ========================================
// Extend Express Request Type
// ========================================

/**
 * Extend the Express Request interface to include user information
 * This allows us to access req.user in our route handlers
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number
        email: string
      }
    }
  }
}

// ========================================
// JWT Payload Interface
// ========================================

interface JwtPayload {
  userId: number
  email: string
  iat?: number
  exp?: number
}

// ========================================
// Authentication Middleware
// ========================================

/**
 * Middleware to authenticate JWT tokens
 * 
 * This middleware:
 * 1. Extracts the token from the Authorization header
 * 2. Verifies the token signature and expiration
 * 3. Decodes the payload and attaches user info to req.user
 * 4. Calls next() if token is valid
 * 5. Returns 401 if token is missing or invalid
 * 
 * Usage:
 * router.get('/protected', authenticateToken, (req, res) => {
 *   // req.user is available here
 * })
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // 1. Get the Authorization header
  const authHeader = req.headers.authorization
  
  // Expected format: "Bearer TOKEN"
  const token = authHeader?.split(' ')[1]
  
  // 2. Check if token exists
  if (!token) {
    res.status(401).json({
      error: 'No token provided',
      message: 'Authorization header must be in format: Bearer <token>'
    })
    return
  }
  
  // 3. Verify the token
  try {
    const secret = process.env.JWT_SECRET
    
    if (!secret) {
      console.error('JWT_SECRET is not defined in environment variables')
      res.status(500).json({ error: 'Server configuration error' })
      return
    }
    
    // jwt.verify() will throw an error if:
    // - Signature is invalid
    // - Token has expired
    // - Token is malformed
    const decoded = jwt.verify(token, secret) as JwtPayload
    
    // 4. Attach user info to request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    }
    
    // 5. Continue to the next middleware/route handler
    next()
    
  } catch (error: any) {
    // Handle different JWT errors
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        error: 'Token expired',
        message: 'Your session has expired. Please login again.'
      })
      return
    }
    
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        error: 'Invalid token',
        message: 'The provided token is invalid.'
      })
      return
    }
    
    // Generic error
    res.status(401).json({
      error: 'Authentication failed',
      message: error.message
    })
  }
}
