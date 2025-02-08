<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <button @click="changeMessage">vue测试 template 2</button>
    <p>{{ counter }}</p>
    <button @click="incrementCounter">vue测试1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'vue测试 data',
      counter: 0
    };
  },
  methods: {
    changeMessage() {
      this.message = 'You clicked the button!';
    },
    incrementCounter() {
      this.counter++;
    }
  }
};
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 50px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
