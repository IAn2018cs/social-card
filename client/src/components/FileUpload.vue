<template>
    <div>
      <input type="file" @change="onFileChange" accept=".pdf,image/*" />
      <p v-if="fileName">{{ fileName }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fileName: ''
      };
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.fileName = file.name;
          this.$emit('file-selected', file);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  p {
    margin-top: 10px;
    font-size: 14px;
  }
  </style>