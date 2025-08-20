import multer from "multer"

export const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:5*1024*1024,
    },
    fileFilter: (req, file, cb) => {
        const allowed = ["application/pdf", "application/msword"];
        if (!allowed.includes(file.mimetype)) {
          return cb(new Error("Invalid file type. Only PDF/DOCX allowed."));
        }
        cb(null, true);
      },
})