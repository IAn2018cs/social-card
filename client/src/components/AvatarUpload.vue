<template>
    <div>
      <input type="file" @change="onFileChange" accept="image/*" />
      <img v-if="previewUrl" :src="previewUrl" alt="Avatar Preview" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        previewUrl: null
      };
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.previewUrl = URL.createObjectURL(file);
          this.$emit('file-selected', file);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  img {
    max-width: 100px;
    max-height: 100px;
    margin-top: 10px;
  }
  </style>