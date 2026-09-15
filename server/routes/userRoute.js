import express from "express";
import upload from "../config/multer.js";
import { requireAuth } from '@clerk/express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'

const router = express.Router()

// All routes below require a signed-in Clerk user.
// Without this, req.auth.userId is undefined for anonymous requests
// and every handler below silently no-ops instead of returning 401.
router.use(requireAuth())

// Get user data
router.get('/user', getUserData)

// apply for a job
router.post('/apply', applyForJob)

// get applied jobs data
router.get('/applications', getUserJobApplications)

// update user profile (resume)
router.post('/update-resume', upload.single('resume'), updateUserResume)

export default router;