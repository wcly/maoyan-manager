import Express from 'express'
import multer from 'multer'
import path from 'path'
import { ResponseHelper } from './ResponseHelper'

const router = Express.Router()

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "../../public/upload"),
    filename(req, file, cb) {
        const time = new Date().getTime() // 文件名
        const extname = path.extname(file.originalname) // 后缀名
        cb(null, `${time}${extname}`)
    }
})

const allowedExtensions = ['.jpg', '.png', '.gif', '.bmp', '.jiff']

const upload = multer({
    storage, limits: {
        fileSize: 1024 * 1024, // 文件最多1M
    },
    fileFilter(req, file, cb) {
        const extname = path.extname(file.originalname)
        if (allowedExtensions.includes(extname)) {
            cb(null, true)
        } else {
            cb(new Error("文件类型不正确"))
        }
    }
}).single("imgfile")

router.post("/", (req, res) => {
    upload(req, res, err => {
        if (err) {
            ResponseHelper.sendError(err.message, res)
        } else {
            const url = `/upload/${req.file.filename}`
            ResponseHelper.sendData(url, res)
        }
    })
})

export default router