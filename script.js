const playbutton=document.getElementById("play");
const resetbutton=document.getElementById("reset");
const lapbutton=document.getElementById("lap");
const minuteEl=document.getElementById("minute")
const secondEl=document.getElementById("second");
const msecEl=document.getElementById("msec");
const lapsContainerEl=document.getElementById("laps-container");
const clearBtnEl=document.getElementById("clearBtn");
const outer= document.getElementsByClassName("outer")[0];

let isPlay=false;
let minute;
let sec;
let msec;
let minuteCounter=0;
let secCounter=0;
let msecCounter=0;
let isReset=false;
let lapItem=0;

const toggleButton=()=>{
    lapbutton.classList.remove("hidden");
    resetbutton.classList.remove("hidden");
}

const play=()=>{

    if (!isPlay && !isReset){
        playbutton.innerHTML="Pause";
        outer.classList.add("animation-bg");
        minute=setInterval(()=>{
                minuteEl.innerHTML=`${++minuteCounter} :`;
            },60*1000);
        sec=setInterval(()=>{
            if (secCounter===60){
                secCounter=0;
            }
                secondEl.innerHTML=`&nbsp;${++secCounter} :`;
            },1000);
        msec=setInterval(()=>{
                if (msecCounter===100){
                    msecCounter=0;
                }
                msecEl.innerHTML=`&nbsp;${++msecCounter}`
            },10);
        isPlay=true;
        isReset= true;
    }else{
        outer.classList.remove("animation-bg")
        playbutton.innerHTML="play";
        clearInterval(minute);
        clearInterval(sec);
        clearInterval(msec);
        isPlay=false;
        isReset=false;
    }

    toggleButton();
}

const reset=()=>{
    isReset=true;
    play();
    lapbutton.classList.add("hidden");
    resetbutton.classList.add("hidden");
    minuteEl.innerHTML="00 :"
    secondEl.innerHTML="&nbsp;00 :"
    msecEl.innerHTML="&nbsp;00"
    
}

const lap=()=>{
    const li = document.createElement("li");
    const number=document.createElement("span");
    const timeStamp=document.createElement("span");
    
    li.setAttribute("class","lap-item");
    number.setAttribute("class","number");
    timeStamp.setAttribute("class","time-stamp");
    
    number.innerText=`#${++lapItem}`
    timeStamp.innerHTML=`${minuteCounter} : ${secCounter} : ${msecCounter}`;

    li.append(number,timeStamp);
    lapsContainerEl.append(li);
    clearBtnEl.classList.remove("hidden");
}

const clearAll=()=>{
    lapsContainerEl.innerHTML="";
    lapsContainerEl.append(clearBtnEl);
    clearBtnEl.classList.add("hidden");
    lapItem=0;
}

playbutton.addEventListener("click",play);
resetbutton.addEventListener("click",reset);
lapbutton.addEventListener("click",lap);
clearBtnEl.addEventListener("click",clearAll)