const fileService = require('../services/fileService');
const imageService = require('../services/imageService');
const llmService = require('../services/llmService');

async function generateCardFromFile(req, res) {
  try {
    const { avatar, qrCode, file } = req.files;

    const avatarUrl = await imageService.processUploadedImage(avatar);
    const qrCodeUrl = await imageService.processUploadedImage(qrCode);
    const fileContent = await fileService.processUploadedFile(file);

    const htmlCard = await llmService.generateCardFromFile(avatarUrl, qrCodeUrl, fileContent);

    res.json({ html: htmlCard });
  } catch (error) {
    console.error('生成卡片失败:', error);
    res.status(500).json({ error: '生成卡片失败' });
  }
}

async function generateCardFromManualInput(req, res) {
  try {
    const { avatar, qrCode } = req.files;
    const data = req.body;

    data.avatarUrl = await imageService.processUploadedImage(avatar);
    data.qrCodeUrl = await imageService.processUploadedImage(qrCode);

    const htmlCard = await llmService.generateCardFromManualInput(data);

    res.json({ html: htmlCard });
  } catch (error) {
    console.error('生成卡片失败:', error);
    res.status(500).json({ error: '生成卡片失败' });
  }
}

module.exports = {
  generateCardFromFile,
  generateCardFromManualInput
};
