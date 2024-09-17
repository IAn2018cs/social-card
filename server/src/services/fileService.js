const fs = require('fs').promises;
const path = require('path');
const { fileToBase64, getMimeType } = require('../utils/helpers');
const pdf2img = require('pdf-img-convert');

const uploadDir = path.join(__dirname, '../../uploads');

// 确保上传目录存在
async function ensureUploadDir() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

// 保存上传的文件
async function saveUploadedFile(file) {
  await ensureUploadDir();
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, file.data);
  return filePath;
}

// 处理上传的文件
async function processUploadedFile(file) {
  const filePath = await saveUploadedFile(file);
  const mimeType = getMimeType(filePath);

  if (mimeType === 'application/pdf') {
    return await convertPdfToImages(filePath);
  } else if (mimeType.startsWith('image/')) {
    return [await fileToBase64(filePath)];
  } else {
    throw new Error('不支持的文件类型');
  }
}

// 将PDF转换为图片
async function convertPdfToImages(pdfPath) {
  try {
    const pdfArray = await pdf2img.convert(pdfPath);
    return pdfArray.map(img => `data:image/png;base64,${img.toString('base64')}`);
  } catch (error) {
    console.error('PDF转图片失败:', error);
    throw error;
  }
}

module.exports = {
  processUploadedFile,
  saveUploadedFile
};
