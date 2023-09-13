<script setup>
import { onMounted, ref, watch } from 'vue';
const VirtualScroll = ref(null);
let previousScrollPosition = ref(0);

let VSCdimension = ref(null);
let NewPosition = ref(null);
let TrigerPoint = ref('');
let NoOfContToRm = ref(0);
let NoOfContToAdd = ref(0);

let StoreForPrevObj = ref([]); // IT WILL STORE PREVIOUS OBJECTS
let CountStorePrevObj = ref(0)
let StoreForNextObj = ref([]); // IT WILL STORE NEXT OBJECTS IF PRESENT

let CurrentObj = defineProps({
    TotalObj: Object,
    noca:Number,
})

/* CBT => Call bottom trigger point */
let CBT = defineEmits(['callBottomTrigerPoint', 'removeContent']);


const ScrollEvent = () => {
    // VIRTUAL SCROLL COMPONENT
    let VSC = VirtualScroll.value;
    previousScrollPosition.value = VSC.children[0].getBoundingClientRect().top;

    VSC.addEventListener('scroll', () => {
        // GET VIRTUAL SCROLL WRAPPER RECTANGELE BOUNDARY
        VSCdimension.value = VSC.getBoundingClientRect();
        NewPosition.value = VSC.children[0].getBoundingClientRect();
        // console.warn(NewPosition.value)
        // console.warn(VSC.children[0].getBoundingClientRect().top)
        // console.warn(NewPosition.value.height)
        // VSCheight => [ SCROLLABLE SECTION HEIGHT OF VIRTUAL SCROLLER ]
        let VSCheight = NewPosition.value.height;
        let ScrollTopPosition = VSC.scrollTop;
        let contentHeight = VSCheight/CurrentObj.TotalObj.length;
        // console.warn(VSCdimension.value.height)
        // console.warn(VSCheight)
        // console.warn('total height',  (VSCdimension.value.height + ScrollTopPosition))

        /* ~~~~~~~~:~~~~~~~~:~~~~~~~~~~:[ DITECT SCROLL DIRECTION ]:~~~~~~~~:~~~~~~~~:~~~~~~~~~~ */
        if(previousScrollPosition.value>NewPosition.value.top){
            // console.warn('Scroll Bottom')
            // console.warn(NewPosition.value.top)
            if ((VSCdimension.value.height - NewPosition.value.top) >= (VSCheight*80/100)){
                // console.warn('Bottom Trigger Point');
                // console.warn('Content Height :', contentHeight);
                TrigerPoint.value = 'Bottom Trigger Point';
                // CONTENT WE REMOVE FROM BIGINING
                let rmBigining = Math.floor(-NewPosition.value.top/contentHeight);
                // console.warn('Content We Should Remove From Bigining:', rmBigining);
                // CBT('callBottomTrigerPoint', 20);
                let ARFB = CurrentObj.TotalObj.slice(
                    CountStorePrevObj.value, rmBigining
                );
                console.warn(ARFB)
                if ((ARFB.every(e => StoreForPrevObj.value.includes(e))) & (ARFB.length !=0)){
                    console.warn('present')
                    return;
                }
                else if(ARFB.length != 0){
                    StoreForPrevObj.value.push(...ARFB)
                    CountStorePrevObj.value += ARFB.length;
                    console.warn(ARFB)
                    console.warn('not present')
                    NoOfContToAdd.value = CurrentObj.noca;
                    addMoreContent();
                    NoOfContToRm.value += ARFB.length;
                    removeContent();
                }
            }
        }
        else if (previousScrollPosition.value<NewPosition.value.top){
            console.warn('Scroll Top direction');
            TrigerPoint.value = '';
        }
        previousScrollPosition.value=NewPosition.value.top;
        /*  
            VSCdimension.value.height => [ VIRTUAL SCROLL FIXED CONTAINER HEIGHT ]
            VSC.scrollTop => [ TOP POSITION OF SCROLLER DURING SCROLL ]
            (VSCheight*80/100) => [ 80% HEIGHT OF VIRTUAL-SCROLLER SCROLLABLE HEIGHT ] 
        */
        // if ((VSCheight * 80 / 100) <= (VSCdimension.value.height + ScrollTopPosition)) {
        //     TrigerPoint.value = 'Triger Point';

        //     // console.warn(VSC.children[0].getBoundingClientRect().height)
        //     // let rmCont = Math.round((ScrollTopPosition-VSCdimension.value.height)/contentHeight);
        //     // let rmCont = Math.floor((0-NewPosition.value.top)/contentHeight);
        //     // CBT('removeContent', rmCont);
        //     // console.warn(rmCont)
        //     // CBT('removeContent', rmCont);
        //     // console.warn(VSCparentDimension.height)
        //     let rmCont = Math.floor(ScrollTopPosition/contentHeight);
        //     let newArr = CurrentObj.TotalObj.slice(StoreForPrevObj.value.length,  rmCont);
        //     if ((newArr.length !=0) & (newArr.every(e => StoreForPrevObj.value.includes(e)))){
        //         console.warn('present')
        //         return;
        //     }
        //     // else if((newArr.length !=0)){
        //     //     // console.warn('not present')
        //     //     StoreForPrevObj.value.push(...newArr)
        //     //     CBT('removeContent', rmCont);
        //     //     // CBT('callBottomTrigerPoint', newArr.length);
        //     //     console.warn(newArr.length)
        //     //     NoOfContToRm.value = newArr.length;
        //     //     NoOfContToAdd.value = newArr.length;
        //     //     // ScrollTopPosition=-10;
        //     // }
        //     else if((newArr.length >=2)){
        //         StoreForPrevObj.value.push(...newArr)
        //         NoOfContToAdd.value = newArr.length;
        //         NoOfContToRm.value = newArr.length;
        //         addMoreContent();
        //         // CBT('removeContent', rmCont);
        //         // ScrollTopPosition=-10;
        //     }
        //     // console.warn(newArr.length)
        //     // console.warn(rmCont)
        //     // else if (newArr.length == 0){
        //     //     CBT('callBottomTrigerPoint', 20);
        //     // }

        //     // CBT('callBottomTrigerPoint', rmCont);
        // }
        // else if (ScrollTopPosition==0){
        //     console.warn('Triger Top Point')
        // }
        // else {
        //     TrigerPoint.value = ''
        // }
    })
}
onMounted(()=>{
    ScrollEvent();
})
// watch(VirtualScroll, () => {
//     ScrollEvent();
// })

watch(CurrentObj, ()=>{
    removeContent();
})

const addMoreContent = () =>{
    if (NoOfContToAdd.value!=0){
        CBT('callBottomTrigerPoint', NoOfContToAdd.value);
        NoOfContToAdd.value = 0;
    }
}

const removeContent = () =>{
    console.warn('Remove Contents', NoOfContToRm.value)
    if(StoreForPrevObj.value.length!=0 & NoOfContToRm.value>=CurrentObj.noca){
        CBT('removeContent', NoOfContToRm.value);
        NoOfContToRm.value = 0;
    }
}


</script>

<template>
    <div class="DisPlayScrollPosition">
        <!-- Top: {{ NewPosition }} -->
        <span v-if="NewPosition">Top: {{ NewPosition.top }},</span>
        <span v-if="NewPosition">Bottom: {{ NewPosition.bottom }}</span>
        <div style="position: fixed; bottom: 50px; background-color: tomato; left: 0;" v-if="TrigerPoint">
            {{ TrigerPoint }} <br>
        </div>
        <div style="position: fixed; top: 50px; background-color: yellow; left: 0;">
            <span>{{ NoOfContToRm }}</span>
        </div>

    </div>
    <div class="VirtualScroll_Wrapper" ref="VirtualScroll">
        <div class="VirtualScrollElement">
            <slot>
            </slot>
        </div>
    </div>
</template>

<style scoped>
.DisPlayScrollPosition {
    position: fixed;
    left: 0;
    bottom: 0;
}

.VirtualScroll_Wrapper {
    max-width: 600px;
    width: 100vw;
    min-height: 100%;
    background-color: #00ff99;
    overflow: auto;
    position: relative;
}
/* .VirtualScrollElement{
    position: absolute;
    width: 100%;
    top: 0;
} */
</style>