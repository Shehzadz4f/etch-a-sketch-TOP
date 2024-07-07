let container = document.querySelector('#container');
container.style.border = "solid 1px black";
container.style.height = "500px";
container.style.width = "500px";
container.style.display = 'flex';
container.style.flexWrap = 'wrap';

let grid = "";
while (!grid || grid < 16 || grid > 100) {
    grid = prompt('Enter grid size between 16-100','16');
    if (grid >= '16' && grid <= '100')
        break;
}

for (let i=0; i<grid; i++) {
    for (let j=0; j<grid; j++) {
        let box = document.createElement('div');
        box.classList.add('boxes');
        box.style.boxSizing = 'border-box';
        box.style.border = 'solid 1px black';
        box.style.minHeight = `${(500/grid)}px`;
        box.style.minWidth = `${(500/grid)}px`;
        box.style.flex = 'auto';
        container.appendChild(box); 
    }
}

let isMouseDown = false;

document.addEventListener('mousedown', (event) => {
    if (event.button === 0) isMouseDown = true;
});
document.addEventListener('mouseup', (event) => {
    if (event.button === 0) isMouseDown = false;
});
document.addEventListener('mouseleave', () => {
    isMouseDown = false;
});

//Handling RANDOM COLORS button
let rgbToggle = false;

let rgbButton = document.createElement('button');
rgbButton.classList.add('topButtons');
rgbButton.setAttribute('id','rgbButton');
rgbButton.textContent = 'RANDOM OFF';
document.body.insertBefore(rgbButton, container);

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `${r} ${g} ${b}`;
} 

rgbButton.addEventListener('click', () => {
    if(!rgbToggle) {
        rgbToggle = true;
        rgbButton.textContent = 'RANDOM ON';
    }
    else {
        rgbToggle = false;
        rgbButton.textContent = 'RANDOM OFF'; 
    }
});

//Handling LIGHT TO DARK EFFECT BUTTON
let lightToDarkToggle = false;

let lightToDarkBtn = document.createElement('button');
lightToDarkBtn.classList.add('topButtons');
lightToDarkBtn.setAttribute('id','lightToDark');
lightToDarkBtn.textContent = 'LIGHT TO DARK EFFECT OFF';
document.body.insertBefore(lightToDarkBtn, container);

lightToDarkBtn.addEventListener('click', () => {
    if (!lightToDarkToggle) {
        lightToDarkToggle = true;
        lightToDarkBtn.textContent = 'LIGHT TO DARK EFFECT ON';
    }
    else {
        lightToDarkToggle = false;
        lightToDarkBtn.textContent = 'LIGHT TO DARK EFFECT OFF';
    }
});

let opacity = 0;
let previousElementColor;
let currentElementColor;

let boxes = document.querySelectorAll('.boxes');
boxes.forEach((element) => {
    element.addEventListener('mouseenter', (event) => {
        currentElementColor = `rgb(${randomColor()})`;
        if(isMouseDown && !rgbToggle) {
            event.target.style.backgroundColor = "black";
        }
        else if(isMouseDown && rgbToggle) {
            event.target.style.backgroundColor = currentElementColor;
            previousElementColor = currentElementColor;
        }
    });
});

boxes.forEach((element) => {
    element.addEventListener('mouseleave', (event) => {
        if(isMouseDown && !rgbToggle) {
            event.target.style.backgroundColor = "black";
        }
        else if(isMouseDown && rgbToggle) {
            event.target.style.backgroundColor = previousElementColor;
        }
    });
});

boxes.forEach((element) => {
    element.addEventListener('click', (event) => {
        if(!rgbToggle) {
            event.target.style.backgroundColor = "black";
        }
        else if(rgbToggle) {
            event.target.style.backgroundColor = `rgb(${randomColor()})`;
        }
    });
});

//Handling RESET button
let resetButton = document.createElement('button');
resetButton.classList.add('topButtons');
resetButton.setAttribute('id','resetButton');
resetButton.textContent = 'RESET';
document.body.prepend(resetButton);

resetButton.addEventListener('click', () => { 
    for (const box of boxes) {
        box.style.backgroundColor = "white";
    }
});




