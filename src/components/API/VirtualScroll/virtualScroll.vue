<script setup>
import { ref, watch } from 'vue';
const VirtualScroll = ref(null);
let VSCdimension = ref(null);
let NewPosition = ref(null);

const ScrollEvent = () =>{
    // VIRTUAL SCROLL COMPONENT
    let VSC = VirtualScroll.value;

    // GET VIRTUAL SCROLL WRAPPER RECTANGELE BOUNDARY
    VSCdimension.value = VSC.getBoundingClientRect();
    VSC.addEventListener('scroll', ()=>{
        NewPosition.value = VSC.children[0].getBoundingClientRect();
        console.log(VSC.children[0].getBoundingClientRect())
    })
}

watch(VirtualScroll, ()=>{
    ScrollEvent();
})


</script>

<template>
    <div class="DisPlayScrollPosition">
        <!-- Top: {{ NewPosition }} -->
        <span v-if="NewPosition">Top: {{ NewPosition.top }},</span>
        <span v-if="NewPosition">Bottom: {{ NewPosition.bottom }}</span>
        
    </div>
    <div class="VirtualScroll_Wrapper" ref="VirtualScroll">
        <div>
            <slot>
            </slot>
        </div>
    </div>
</template>

<style scoped>
.DisPlayScrollPosition{
    position: fixed;
    left: 0;
    bottom: 0;
}
.VirtualScroll_Wrapper{
    max-width: 600px;
    width: 100vw;
    min-height: 100vh;
    background-color: #00ff99;
    overflow: auto;
}
</style>