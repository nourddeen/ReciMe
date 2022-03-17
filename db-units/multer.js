// const path = require('path')
const multer = require('multer')

// module.exports = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req ,file , cb )=>{
//         let extention =path.extname(file.originalname)
//         if(extention !== ".jpg" && extention !== ".jpeg" && extention !== ".png"){
//             cb( new Error("File is not supported"), false)
//             return
//         }
//         cb(null, true)
//     }
// })
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
const upload = multer({ storage: storage });
module.exports = upload