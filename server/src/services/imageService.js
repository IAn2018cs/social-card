const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { fileToBase64 } = require('../utils/helpers');

const uploadDir = path.join(__dirname, '../../uploads');

// 调整图片大小
async function resizeImage(filePath, width, height) {
  const outputPath = path.join(uploadDir, `resized-${path.basename(filePath)}`);
  await sharp(filePath)
    .resize(width, height)
    .toFile(outputPath);
  return outputPath;
}

// 压缩图片
async function compressImage(filePath, quality = 80) {
  const outputPath = path.join(uploadDir, `compressed-${path.basename(filePath)}`);
  await sharp(filePath)
    .jpeg({ quality })
    .toFile(outputPath);
  return outputPath;
}

// 处理上传的图片
async function processUploadedImage(file, maxWidth = 800, maxHeight = 800, quality = 80) {
  const filePath = await saveUploadedFile(file);
  const resizedPath = await resizeImage(filePath, maxWidth, maxHeight);
  const compressedPath = await compressImage(resizedPath, quality);
  const base64Image = await fileToBase64(compressedPath);

  // 清理临时文件
  await Promise.all([
    fs.unlink(filePath),
    fs.unlink(resizedPath),
    fs.unlink(compressedPath)
  ]);

  return base64Image;
}

// 从fileService.js导入的函数
async function saveUploadedFile(file) {
  // 这里使用fileService.js中的saveUploadedFile函数
  // 为了避免循环依赖，我们在这里重新实现这个函数
  await ensureUploadDir();
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, file.data);
  return filePath;
}

async function ensureUploadDir() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

module.exports = {
  processUploadedImage,
  resizeImage,
  compressImage
};
