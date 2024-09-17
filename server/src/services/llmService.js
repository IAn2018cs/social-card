const axios = require('axios');
const { validateInput, formatTags, formatSkills, formatHobbies } = require('../utils/helpers');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

async function generateCardFromFile(avatarUrl, qrCodeUrl, fileContent) {
  const prompt = `
    根据以下信息生成一个HTML格式的个人社交名片:
    头像URL: ${avatarUrl}
    二维码URL: ${qrCodeUrl}
    文件内容: ${fileContent}
    
    请生成一个简约科技风格的HTML卡片,包含所有相关信息。
  `;

  return await callOpenAI(prompt);
}

async function generateCardFromManualInput(data) {
  validateInput(data);

  const prompt = `
    根据以下信息生成一个HTML格式的个人社交名片:
    头像URL: ${data.avatarUrl}
    二维码URL: ${data.qrCodeUrl}
    姓名: ${data.name}
    地点: ${data.location}
    身份标签: ${formatTags(data.tags)}
    近期关键投入: ${data.recentFocus}
    履历亮点: ${formatTags(data.highlights)}
    擅长领域: 
    ${formatSkills(data.skills)}
    兴趣爱好: ${formatHobbies(data.hobbies)}
    个人态度: ${data.motto}
    
    请生成一个简约科技风格的HTML卡片,包含所有相关信息。
  `;

  return await callOpenAI(prompt);
}

async function callOpenAI(prompt) {
  try {
    const response = await axios.post(OPENAI_API_URL, {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "你是一个专业的HTML卡片设计器。" },
        { role: "user", content: prompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const generatedHtml = response.data.choices[0].message.content;
    return extractHtmlFromResponse(generatedHtml);
  } catch (error) {
    console.error('调用OpenAI API失败:', error);
    throw error;
  }
}

function extractHtmlFromResponse(response) {
  const htmlMatch = response.match(/<html[\s\S]*?<\/html>/i);
  return htmlMatch ? htmlMatch[0] : response;
}

module.exports = {
  generateCardFromFile,
  generateCardFromManualInput
};
