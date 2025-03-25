<script setup lang="ts">
import { ref,onMounted } from 'vue'
import axios from './api/request'
const msg = ref('Hello, World!')


import type { Student } from "./model/Student";
import type { SpringList } from "./model/SpringRes";

const students = ref<Student[]>([]);

async function getStudents() {
  // 说明 resp.data 类型是 SpringList<Student>
  const resp = await axios.get<SpringList<Student>>("/api/students");  
  console.log(resp.data.data);
  students.value = resp.data.data;
}
onMounted(() => getStudents());
</script>

<template>
  <h1>{{ msg }}</h1>
</template>