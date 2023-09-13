<script setup>
import virtualScroll from './components/API/VirtualScroll/virtualScroll.vue';
import RandomCards from './components/Cards/RandomCards.vue';
import { ref, onMounted } from 'vue';
let totalItems = ref(20);
let prevTotalItems = ref(20)

let cards = ref([]);

const BottomTriggerPoint = (e) =>{
  console.warn('Total Content Add :', e)
  let newarr = fetchNewObj(e);
  cards.value.push(...newarr);
}
const RemoveContent = (e) =>{
  console.warn('Total Content Remove :', e)
  cards.value = cards.value.splice(e);
}

onMounted(()=>{
  for(let i=0; i<prevTotalItems.value; i++){
    cards.value.push({'id': i+1})
  }
})

const fetchNewObj = (e)=>{
  let newArr = []
  for(let i=prevTotalItems.value; i<(prevTotalItems.value + e); i++){
    newArr.push({'id': i+1})
  }
  prevTotalItems.value += e;
  return newArr;
}
</script>

<template>
  <header>
    Virtual Scroll Component
  </header>
  <section>
    <virtualScroll
      :TotalObj="cards"
      :noca="10"
      @callBottomTrigerPoint="BottomTriggerPoint($event)"
      @removeContent="RemoveContent($event)"
      >
      <RandomCards :cardObj="cards"/>
    </virtualScroll>
  </section>
</template>

<style scoped>
</style>
