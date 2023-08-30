<script setup>
import virtualScroll from './components/API/VirtualScroll/virtualScroll.vue';
import RandomCards from './components/Cards/RandomCards.vue';
import { ref, onMounted } from 'vue';

let cards = ref([]);

onMounted(()=>{
  for(let i=0; i<20; i++){
    cards.value.push(i)
  }
})
</script>

<template>
  <header>
    Virtual Scroll Component
  </header>
  <section>
    <virtualScroll>
      <RandomCards :cardObj="cards"/>
    </virtualScroll>
  </section>
</template>

<style scoped>
</style>
