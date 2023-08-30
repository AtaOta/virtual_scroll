<script setup>
import { ref, onMounted } from 'vue';
const VirtualScroll = ref(null);

onMounted(()=>{
    // VIRTUAL SCROLL COMPONENT
    let VSC = VirtualScroll.value;

    // GET VIRTUAL SCROLL WRAPPER RECTANGELE BOUNDARY
    let VSCrect = VSC.getBoundingClientRect();

    VSC.addEventListener('scroll', ()=>{
        console.warn('scroll')
    })

    console.warn(VirtualScroll.value)
    console.warn(VSCrect);
})


</script>

<template>
    <div >
        <div class="VirtualScroll_Wrapper" ref="VirtualScroll">
            <slot>
            </slot>
        </div>
    </div>
</template>

<style scoped>
.VirtualScroll_Wrapper{
    max-width: 600px;
    width: 100vw;
    min-height: 100vh;
    background-color: #00ff99;
    overflow: auto;
}
</style>