import express from 'express'
import { getJobId, getJobs } from '../controllers/jobController.js';

const router = express.Router()

// route to get all jobs data
router.get('/',getJobs)

// route to get a singke job by Id
router.get('/:id', getJobId)

export default router;
