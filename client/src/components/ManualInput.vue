<template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">姓名:</label>
        <input type="text" v-model="formData.name" required />
      </div>
      <div>
        <label for="location">地点:</label>
        <input type="text" v-model="formData.location" required />
      </div>
      <div>
        <label for="tags">身份标签:</label>
        <input type="text" v-model="formData.tags" placeholder="用逗号分隔" />
      </div>
      <div>
        <label for="recentFocus">近期关键投入:</label>
        <input type="text" v-model="formData.recentFocus" />
      </div>
      <div>
        <label for="highlights">履历亮点:</label>
        <input type="text" v-model="formData.highlights" placeholder="用逗号分隔" />
      </div>
      <div>
        <label for="skills">擅长领域:</label>
        <textarea v-model="formData.skills" placeholder="格式: 技能名: 描述"></textarea>
      </div>
      <div>
        <label for="hobbies">兴趣爱好:</label>
        <input type="text" v-model="formData.hobbies" placeholder="用竖线分隔" />
      </div>
      <div>
        <label for="motto">个人态度:</label>
        <input type="text" v-model="formData.motto" />
      </div>
      <button type="submit">生成卡片</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          location: '',
          tags: '',
          recentFocus: '',
          highlights: '',
          skills: '',
          hobbies: '',
          motto: ''
        }
      };
    },
    methods: {
      submitForm() {
        this.$emit('form-submitted', this.formData);
      }
    }
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  label {
    font-weight: bold;
  }
  input, textarea {
    padding: 5px;
    font-size: 14px;
  }
  button {
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