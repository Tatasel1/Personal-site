const track = document.getElementById("gallery");

if(!track.dataset.prevPercentage) track.dataset.prevPercentage = "0";
if(!track.dataset.percentage) track.dataset.percentage = "0";
track.dataset.mouseDownAt = "0";

track.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
};


window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;

    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;

    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
};


const mainContainer = document.querySelector("main"); 
const header = document.querySelector("header");
let lastScrollTop = 0;


mainContainer.addEventListener("scroll", function() {

    let scrollTop = mainContainer.scrollTop; 

    if (scrollTop > lastScrollTop) {
        header.classList.add("ascuns");
    } else {
        header.classList.remove("ascuns");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});