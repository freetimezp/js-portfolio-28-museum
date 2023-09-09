// carousel
var radius = screen.width < 768 ? 145 : 390;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = screen.width < 768 ? 120 : 324;
var imgHeight = screen.width < 768 ? 170 : 459;

setTimeout(init, 1000);

var odrag = document.querySelector('#drag-container');
var ospin = document.querySelector('#spin-container');
var aImg = ospin.getElementsByTagName('img');
var aEle = [...aImg];

ospin.style.width = imgWidth + 'px';
ospin.style.height = imgHeight + 'px';

var ground = document.querySelector('#ground');
ground.style.width = radius * 3 + 'px';
ground.style.height = radius * 3 + 'px';

function init(delayTime) {
    for (var i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
        aEle[i].style.transition = 'transform 2s';
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4;
    }
}

function applyTransform(obj) {
    if (tY > 100) {
        tY = 180;
    }
    if (tY < 0) {
        tY = 0;
    }

    obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
}

function playSpin(yes = true) {
    ospin.style.animationPlayState = yes ? 'running' : 'paused';
}

var sX,
    sY,
    nX,
    nY,
    desX = 0,
    desY = 0,
    tX = 0,
    tY = 0;

if (autoRotate) {
    var animationName = rotateSpeed > 0 ? 'spin' : 'spinRevert';
    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

odrag.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    var sX = e.clientX;
    var sY = e.clientY;

    this.onpointermove = function (e) {
        var nX = e.clientX;
        var nY = e.clientY;

        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform(odrag);
        sX = nX;
        sY = nY;

    };

    this.onpointerup = function (e) {
        odrag.timer = setInterval(() => {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTransform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };

    return false;
}

odrag.onmousewheel = function (e) {
    e = e || window.event;
    var d = e.wheelDelta / 20 || -e.detial;
    radius += d;
    init(1);
}


//toggle section active
const sectionNavigator = name => {
    let sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.classList.contains(name)) {
            section.classList.add('active');
        }
    })
}

window.addEventListener('load', () => {
    const navList = document.querySelectorAll('.nav-btn');
    navList.forEach(nav => {
        nav.addEventListener('click', function (e) {
            e.preventDefault();
            navList.forEach(el => {
                el.classList.remove('active');
            });
            this.classList.add('active');
            sectionNavigator(this.getAttribute('data-target'));
            screen.width < 768 && toggleMenu();
        });
    });
});


//swiper 
var swiper = new Swiper('.artsSwiper', {
    grabCursor: true,
    effect: 'creative',
    creativeEffect: {
        prev: {
            shadow: false,
            translate: [0, 0, -400]
        },
        next: {
            translate: ['100%', 0, 0]
        }
    }
});
















