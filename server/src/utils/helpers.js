const fs = require('fs').promises;
const path = require('path');

// 将文件转换为Base64
async function fileToBase64(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return `data:${getMimeType(filePath)};base64,${data.toString('base64')}`;
  } catch (error) {
    console.error('文件转Base64失败:', error);
    throw error;
  }
}

// 获取文件的MIME类型
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.pdf': 'application/pdf'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// 验证输入数据
function validateInput(data) {
  const requiredFields = ['name', 'location', 'tags', 'recentFocus', 'highlights', 'skills', 'hobbies', 'motto'];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`缺少必填字段: ${field}`);
    }
  }
}

// 格式化标签列表
function formatTags(tags) {
  return tags.map(tag => tag.trim()).filter(Boolean).join(', ');
}

// 格式化技能列表
function formatSkills(skills) {
  return skills.map(skill => `${skill.name}: ${skill.description}`).join('\n');
}

// 格式化兴趣爱好
function formatHobbies(hobbies) {
  return hobbies.map(hobby => hobby.trim()).filter(Boolean).join(' | ');
}

module.exports = {
  fileToBase64,
  getMimeType,
  validateInput,
  formatTags,
  formatSkills,
  formatHobbies
};
