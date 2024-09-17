<template>
    <div>
      <InfoSourceTabs @file-selected="handleFileSelected" @form-submitted="handleFormSubmitted" />
    </div>
  </template>
  
  <script>
  import InfoSourceTabs from '../components/InfoSourceTabs.vue';
  import { generateCardFromFile, generateCardFromManualInput } from '../services/api';
  
  export default {
    components: {
      InfoSourceTabs
    },
    methods: {
      async handleFileSelected({ avatar, qrCode, file }) {
        try {
          const html = await generateCardFromFile(avatar, qrCode, file);
          this.displayGeneratedCard(html);
        } catch (error) {
          console.error('生成卡片失败:', error);
        }
      },
      async handleFormSubmitted(data) {
        try {
          const html = await generateCardFromManualInput(data);
          this.displayGeneratedCard(html);
        } catch (error) {
          console.error('生成卡片失败:', error);
        }
      },
      displayGeneratedCard(html) {
        // 显示生成的HTML卡片
        console.log(html);
      }
    }
  };
  </script>
  
  <style scoped>
  /* 添加样式 */
  div {
    padding: 20px;
    background-color: #f9f9f9;
  }
  </style>