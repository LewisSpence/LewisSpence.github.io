/* ==========================================================
   Lewis Spence Portfolio
   Generic Carousel
   Expects a global "slides" array defined by the page.
========================================================== */

let currentSlide = 0;

const title = document.getElementById("feature-title");
const image = document.getElementById("feature-image");
const description = document.getElementById("feature-description");
const dots = document.getElementById("carousel-dots");

function createDots(){

    dots.innerHTML = "";

    slides.forEach((slide,index)=>{

        const dot = document.createElement("span");

        dot.classList.add("dot");

        dot.onclick = ()=>showSlide(index);

        dots.appendChild(dot);

    });

}

function updateDots(){

    document.querySelectorAll(".dot").forEach((dot,index)=>{

        dot.classList.toggle("active",index===currentSlide);

    });

}

function fadeOut(){

    title.style.opacity=0;
    image.style.opacity=0;
    description.style.opacity=0;

}

function fadeIn(){

    title.style.opacity=1;
    image.style.opacity=1;
    description.style.opacity=1;

}

function showSlide(index){

    currentSlide=index;

    fadeOut();

    setTimeout(()=>{

        title.textContent=slides[index].title;

        image.src=slides[index].image;

        image.alt=slides[index].title;

        description.textContent=slides[index].description;

        updateDots();

        fadeIn();

    },180);

}

function nextSlide(){

    currentSlide++;

    if(currentSlide>=slides.length){

        currentSlide=0;

    }

    showSlide(currentSlide);

}

function previousSlide(){

    currentSlide--;

    if(currentSlide<0){

        currentSlide=slides.length-1;

    }

    showSlide(currentSlide);

}

/* ---------- Buttons ---------- */

const next=document.getElementById("next-button");

const previous=document.getElementById("previous-button");

if(next){

    next.onclick=nextSlide;

}

if(previous){

    previous.onclick=previousSlide;

}

/* ---------- Keyboard ---------- */

document.addEventListener("keydown",(event)=>{

    if(event.key==="ArrowRight"){

        nextSlide();

    }

    if(event.key==="ArrowLeft"){

        previousSlide();

    }

});

/* ---------- Mobile Swipe ---------- */

let touchStartX=0;

let touchEndX=0;

image.addEventListener("touchstart",(event)=>{

    touchStartX=event.changedTouches[0].screenX;

});

image.addEventListener("touchend",(event)=>{

    touchEndX=event.changedTouches[0].screenX;

    if(touchEndX-touchStartX>50){

        previousSlide();

    }

    if(touchStartX-touchEndX>50){

        nextSlide();

    }

});

/* ---------- Image Click Navigation ---------- */

image.onclick=(event)=>{

    const x=event.offsetX;

    if(x<image.clientWidth/2){

        previousSlide();

    }

    else{

        nextSlide();

    }

};

/* ---------- Initialise ---------- */

createDots();

showSlide(0);

/* ==============================
   Carousel
============================== */

#feature-title,
#feature-image,
#feature-description{

    transition:opacity .25s ease;

}

#feature-image{

    cursor:pointer;

}

#carousel-dots{

    margin-top:25px;

    display:flex;

    justify-content:center;

    gap:10px;

}

.dot{

    width:12px;

    height:12px;

    border-radius:50%;

    background:#555;

    cursor:pointer;

    transition:.25s;

}

.dot:hover{

    background:#7ca7ff;

}

.dot.active{

    background:#2b6fff;

    transform:scale(1.25);

}
