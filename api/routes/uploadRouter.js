import multer from 'multer';
import { Router } from 'express';

const router = Router();
const uploadDestination = 'uploads/';

// Set storage engine
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single('myImage');

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send('error');
    } else {
      if (req.file === undefined) {
        res.send('error: No file selected');
      } else {
        res.send('file uploaded');
      }
    }
  });
});

export default router;
