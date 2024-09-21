let defaultOffset = 480;
let cardWidth = 480;
let currentOffset = defaultOffset;

const carousel = document.querySelector(".slides");
const cardList = carousel.querySelectorAll(".slide");
const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");
const sliderControls = document.querySelectorAll('.slider-controls .control');

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

	if (document.documentElement.scrollWidth > 740) {
		cardWidth = 480;
	}
    else {
		cardWidth = 348;
	}

    defaultOffset = (cardWidth * (cardList.length - 1)) / 2;
	currentOffset = defaultOffset;
}

function getActiveSlideIndex() {
    return -((currentOffset - defaultOffset) / cardWidth);
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
    setActiveControl(getActiveSlideIndex());
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
        setActiveControl(index);
    });
});


resizeWindow();
changeOffset();
setActiveControl(0);

let intervalId = setInterval( changeSlide, 5000 );

carousel.onmouseover = function() { 
    clearInterval( intervalId );
}
carousel.onmouseout = function() { 
    intervalId = setInterval( changeSlide, 5000 );
}

carousel.addEventListener('touchstart', function() { 
    clearInterval( intervalId );
}, false);

carousel.addEventListener('touchend', function() { 
    intervalId = setInterval( changeSlide, 5000 );
}, false); 


/* let x = null;
carousel.addEventListener('touchstart', e => x = e.touches[0].clientX);
carousel.addEventListener('touchmove', e => {
    
    if (!x) return;

    if (x - e.touches[0].clientX < 0) {
        changeSlide();
    }
    else {
        changeSlide(false);
    }

    x = null;
}); */

carousel.addEventListener('touchstart', handleTouchStart, false);  
carousel.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( !xDown || !yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

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
