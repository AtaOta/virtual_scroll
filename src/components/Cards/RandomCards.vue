<script setup>
import { defineProps } from 'vue';
let cards = defineProps({
    cardObj: Object,
})
</script>

<template>
    <div v-for="card in cards.cardObj" v-bind:="card.id" class="Cards">
        <div class="CardContent">
            {{ card.id }}
        </div>
    </div>
</template>

<style scoped>
.Cards{
    padding: 5px;
}
.CardContent{
    background-color: #fff;
    min-height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}
</style>