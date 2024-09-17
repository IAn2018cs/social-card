import axios from 'axios';

const API_BASE_URL = '/api/cards';

export async function generateCardFromFile(avatar, qrCode, file) {
  const formData = new FormData();
  formData.append('avatar', avatar);
  formData.append('qrCode', qrCode);
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/generate-from-file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.html;
  } catch (error) {
    console.error('生成卡片失败:', error);
    throw error;
  }
}

export async function generateCardFromManualInput(data) {
  const formData = new FormData();
  formData.append('avatar', data.avatar);
  formData.append('qrCode', data.qrCode);
  Object.keys(data).forEach(key => {
    if (key !== 'avatar' && key !== 'qrCode') {
      formData.append(key, data[key]);
    }
  });

  try {
    const response = await axios.post(`${API_BASE_URL}/generate-from-manual`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.html;
  } catch (error) {
    console.error('生成卡片失败:', error);
    throw error;
  }
}