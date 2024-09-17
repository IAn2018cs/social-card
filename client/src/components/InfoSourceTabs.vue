<template>
    <div>
      <button @click="selectTab('file')">文件上传</button>
      <button @click="selectTab('manual')">手动输入</button>
  
      <div v-if="selectedTab === 'file'">
        <AvatarUpload @file-selected="handleAvatarFile" />
        <QRCodeUpload @file-selected="handleQRCodeFile" />
        <FileUpload @file-selected="handleFileUpload" />
      </div>
  
      <div v-if="selectedTab === 'manual'">
        <ManualInput @form-submitted="handleManualInput" />
      </div>
  
      <GeneratedCard v-if="generatedHtml" :htmlContent="generatedHtml" />
    </div>
  </template>
  
  <script>
  import AvatarUpload from './AvatarUpload.vue';
  import QRCodeUpload from './QRCodeUpload.vue';
  import FileUpload from './FileUpload.vue';
  import ManualInput from './ManualInput.vue';
  import GeneratedCard from './GeneratedCard.vue';
  
  export default {
    components: {
      AvatarUpload,
      QRCodeUpload,
      FileUpload,
      ManualInput,
      GeneratedCard
    },
    data() {
      return {
        selectedTab: 'file',
        generatedHtml: ''
      };
    },
    methods: {
      selectTab(tab) {
        this.selectedTab = tab;
      },
      handleAvatarFile(file) {
        // 处理头像文件
      },
      handleQRCodeFile(file) {
        // 处理二维码文件
      },
      handleFileUpload(file) {
        // 处理上传的文件
      },
      handleManualInput(data) {
        // 处理手动输入的数据
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    margin-right: 10px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>