let defaultOffset = 480;
let cardWidth = (document.documentElement.scrollWidth > 740) ? 480 : 348;
let currentOffset = defaultOffset;

const carousel = document.querySelector(".slides");
const cardList = carousel.querySelectorAll(".slide");
const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");
const sliderControls = document.querySelectorAll('.slider-controls .control');
const sliderControlFill = document.querySelectorAll(".control-inner-fill");

defaultOffset = (cardWidth * (cardList.length - 1)) / 2;
currentOffset = defaultOffset;

function setTransition() {
	for (let i = 0; i < cardList.length; i++) {
		cardList[i].style.transitionDuration = "0.5s";
	}
}

function changeOffset() {

	for (let i = 0; i < cardList.length; i++) {
		cardList[i].style.transform = `translateX(${currentOffset}px)`;
	}
}

function resizeWindow() {
    let newCardWidth;
  
    if (document.documentElement.scrollWidth > 740) {
        newCardWidth = 480;
    } else {
        newCardWidth = 348;
    }
  
    if (newCardWidth !== cardWidth) {
        cardWidth = newCardWidth;
        defaultOffset = (cardWidth * (cardList.length - 1)) / 2;
        currentOffset = defaultOffset - cardWidth * getActiveSlideIndex();
        changeOffset();
    }
}
  
function getActiveSlideIndex() {
    return -Math.round((currentOffset - defaultOffset) / cardWidth);
}


function setActiveControl(n) {
    for (let i = 0; i < sliderControls.length; i++) {
        sliderControls[i].classList.remove('active');
    }
    sliderControls[n].classList.add('active');
}

function changeSlide(left = true) { 
    if (left) {
        currentOffset = currentOffset == defaultOffset ? -defaultOffset : (currentOffset += cardWidth);
    }
    else {
        currentOffset = currentOffset == -defaultOffset ? defaultOffset : (currentOffset -= cardWidth);
    }
    
	setTransition();
	changeOffset();
    startProgress(getActiveSlideIndex());
}

window.addEventListener("resize", () => {
	resizeWindow();
});

arrowRight.onclick = function () {
	changeSlide(false);
};

arrowLeft.onclick = function () {
	changeSlide();
};

sliderControls.forEach((control, index) => {
    control.addEventListener('click', function () {
        currentOffset = defaultOffset - index * cardWidth;
        setTransition();
        changeOffset();
        startProgress(index);
    });
});


changeOffset();

let progress = 0;
let isPaused = false;
let intervalId;

function startProgress(n) {
	sliderControlFill.forEach((progressBar) => {
		progressBar.style.flexBasis = `0%`;
	});
	progress = 0;
	clearInterval(intervalId);
	intervalId = setInterval(() => {
		if (!isPaused) {
			progress += 100 / (5000 / 100); // Increment based on time

			sliderControlFill[n].style.flexBasis = `${progress}%`;

			if (progress >= 100) {
				progress = 0;
				clearInterval(intervalId);
				changeSlide(false);
			}
		}
	}, 100); // Update every ~100ms for smoothness
}

carousel.onmouseover = () => (isPaused = true);
carousel.onmouseout = () => (isPaused = false);

carousel.onmousedown = () => (isPaused = true);
carousel.onmouseup = () => (isPaused = false);

startProgress(0);


carousel.addEventListener('touchstart', handleTouchStart, false);  
carousel.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;                                                        
let yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( !xDown || !yDown ) {
        return;
    }

    const xUp = evt.touches[0].clientX;                                    
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            changeSlide();
        } 
        else {
            changeSlide(false);
        }                       
    } 
    else { 
        return;                                                             
    }

    xDown = null;
    yDown = null;                                             
};
