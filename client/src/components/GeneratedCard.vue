<template>
    <div v-html="htmlContent"></div>
  </template>
  
  <script>
  export default {
    props: {
      htmlContent: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  div {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 20px;
  }
  </style>