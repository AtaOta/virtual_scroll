<script setup>
import { ref, onMounted, watch } from 'vue';
const VirtualScroll = ref(null);
let VSCdimension = ref(null);
let NewPosition = ref(null);

onMounted(()=>{
    // VIRTUAL SCROLL COMPONENT
    let VSC = VirtualScroll.value;

    // GET VIRTUAL SCROLL WRAPPER RECTANGELE BOUNDARY
    VSCdimension.value = VSC.getBoundingClientRect();

    ScrollEvent(VSC);
})

const ScrollEvent = (vsc) =>{
    vsc.addEventListener('scroll', ()=>{
        NewPosition.value = vsc.children[0].getBoundingClientRect();
        console.log(vsc.children[0].getBoundingClientRect())
    })
}

watch(VirtualScroll, ()=>{
    // ScrollEvent(VirtualScroll.value)
})


</script>

<template>
    <div class="DisPlayScrollPosition">
        <!-- Top: {{ NewPosition }} -->
        Top: {{ NewPosition.top }},
        Bottom: {{ NewPosition.bottom }}
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