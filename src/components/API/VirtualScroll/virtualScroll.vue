<script setup>
import { ref, watch } from 'vue';
const VirtualScroll = ref(null);
let VSCdimension = ref(null);
let NewPosition = ref(null);
let TrigerPoint = ref(null);

let cbt = defineEmits(['callBottomTrigerPoint'])

const ScrollEvent = () =>{
    // VIRTUAL SCROLL COMPONENT
    let VSC = VirtualScroll.value;

    // GET VIRTUAL SCROLL WRAPPER RECTANGELE BOUNDARY
    VSCdimension.value = VSC.getBoundingClientRect();
    VSC.addEventListener('scroll', ()=>{
        NewPosition.value = VSC.children[0].getBoundingClientRect();
        // VSCheight => [ SCROLLABLE SECTION HEIGHT OF VIRTUAL SCROLLER ]
        let VSCheight = NewPosition.value.height;

        /*  
            VSCdimension.value.height => [ VIRTUAL SCROLL FIXED CONTAINER HEIGHT ]
            VSC.scrollTop => [ TOP POSITION OF SCROLLER DURING SCROLL ]
            (VSCheight*80/100) => [ 80% HEIGHT OF VIRTUAL-SCROLLER SCROLLABLE HEIGHT ] 
        */
        if((VSCheight*80/100) <= (VSCdimension.value.height + VSC.scrollTop)){
            TrigerPoint.value='Triger Point'
            cbt('callBottomTrigerPoint', true);
        }
        else{
            TrigerPoint.value = ''
        }
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
        <div style="position: fixed; bottom: 50px; background-color: tomato; left: 0;" v-if="TrigerPoint">{{ TrigerPoint }}</div>
        
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