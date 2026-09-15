import multer from 'multer';

const storage = multer.diskStorage({})

// Restrict uploads to images (company logos) and PDFs/docs (resumes),
// and cap file size at 5MB, to stop arbitrary/oversized file uploads.
const ALLOWED_MIME_TYPES = [
    'image/png', 'image/jpeg', 'image/jpg', 'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Unsupported file type'), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})

export default upload