const express = require('express');
const cardController = require('../controllers/cardController');
const router = express.Router();

// 文件上传中间件
const multer = require('multer');
const upload = multer();

// 路由定义
router.post('/generate-from-file', upload.fields([{ name: 'avatar' }, { name: 'qrCode' }, { name: 'file' }]), cardController.generateCardFromFile);
router.post('/generate-from-manual', upload.fields([{ name: 'avatar' }, { name: 'qrCode' }]), cardController.generateCardFromManualInput);

module.exports = router;