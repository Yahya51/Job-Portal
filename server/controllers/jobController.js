import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"

// get all jobs - FIX: was {path: true} should be {success: true}
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true })
      .populate({ path: 'companyId', select: '-password' })
    res.json({ success: true, jobs })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// get a single job by Id
export const getJobId = async (req, res) => {
  try {
    const { id } = req.params
    const job = await Job.findById(id)
      .populate({ path: 'companyId', select: '-password' })
    if (!job) return res.json({ success: false, message: 'Job not found' })
    res.json({ success: true, job })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
