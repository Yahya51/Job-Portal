import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'
import userRoute from './routes/userRoute.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import { clerkMiddleware } from '@clerk/express'

const app = express()

const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary()
    console.log("DB Connected");

    // Restrict CORS to known frontend origin(s) in production.
    // Set ALLOWED_ORIGINS as a comma-separated list, e.g.
    // ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:5173
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
        .split(',')
        .map(o => o.trim())
        .filter(Boolean)

    app.use(cors({
        origin: (origin, callback) => {
            // allow non-browser requests (curl, server-to-server) with no origin
            if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true
    }))
    app.use(express.json());
    app.use(clerkMiddleware())

    app.get('/', (req, res) => res.send("API Working"))
    app.post('/webhooks', clerkWebhooks)
    app.use('/api/company', companyRoutes)
    app.use('/api/jobs', jobRoutes)
    app.use('/api/users', userRoute)

    // 404 handler for unknown routes
    app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }))

    const PORT = process.env.PORT || 5000
    Sentry.setupExpressErrorHandler(app);

    // Final error handler (e.g. multer file-type/size errors, CORS rejections)
    app.use((err, req, res, next) => {
        console.error(err)
        res.status(err.status || 400).json({ success: false, message: err.message || 'Server error' })
    })

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.log("Server Error ", error);
    process.exit(1);
  }
};

startServer();
