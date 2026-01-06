
import { Router } from 'express';
import { upload } from '../services/s3Service';
import { authenticateJWT } from '../middleware/auth';
import { isTeacher } from '../middleware/roleAuth';

const router = Router();

// Route for teachers to upload PDFs and Videos
router.post('/', authenticateJWT, isTeacher, upload.single('file'), (req: any, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // File location is the S3 URL
  res.status(200).json({
    message: "Upload successful",
    url: req.file.location,
    type: req.file.mimetype,
    name: req.file.key
  });
});

// Mock route for starting a live session
router.post('/live-start', authenticateJWT, isTeacher, (req, res) => {
  res.status(200).json({ message: "Live classroom session initialized" });
});

export default router;
