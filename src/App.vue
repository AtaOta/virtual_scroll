<script setup>
import virtualScroll from './components/API/VirtualScroll/virtualScroll.vue';
import RandomCards from './components/Cards/RandomCards.vue';
import { ref, onMounted } from 'vue';
let totalItems = ref(20)

let cards = ref([]);

const BottomTriggerPoint = () =>{
  for(let i=totalItems.value; i<totalItems.value+20; i++){
    cards.value.push(i+1)
  }
  totalItems.value += 20;
}

onMounted(()=>{
  for(let i=0; i<totalItems.value; i++){
    cards.value.push(i+1)
  }
})
</script>

<template>
  <header>
    Virtual Scroll Component
  </header>
  <section>
    <virtualScroll
      @callBottomTrigerPoint="BottomTriggerPoint()"
    >
      <RandomCards :cardObj="cards"/>
    </virtualScroll>
  </section>
</template>

<style scoped>
</style>
