import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/" + req.params.id;

    if(!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '_' + file.originalname);
  }
})

const upload = multer({ storage: storage });

export const uploadFile = (req, res) => {
  const id = req.params.id;
  upload.array(id)(req, res, err => {
    if(!err){
      const path = req.files.map(file => file.path);
      res.send(path)
    }
  })
}