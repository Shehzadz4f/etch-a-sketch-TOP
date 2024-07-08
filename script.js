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
        box.style.backgroundColor = 'rgba(0, 0, 0, 0)';
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
rgbButton.textContent = 'RANDOM COLOR';
document.body.insertBefore(rgbButton, container);

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `${r}, ${g}, ${b}`;
} 

rgbButton.addEventListener('click', () => {
    if(!rgbToggle) {
        rgbToggle = true;
        lightToDarkToggle = false;
        rgbButton.textContent = 'RANDOM ON';
        lightToDarkBtn.textContent = 'LIGHT TO DARK OFF';
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
lightToDarkBtn.textContent = 'LIGHT TO DARK EFFECT';
document.body.insertBefore(lightToDarkBtn, container);

lightToDarkBtn.addEventListener('click', () => {
    if (!lightToDarkToggle) {
        lightToDarkToggle = true;
        rgbToggle = false;
        lightToDarkBtn.textContent = 'LIGHT TO DARK ON';
        rgbButton.textContent = 'RANDOM OFF';
    }
    else {
        lightToDarkToggle = false;
        lightToDarkBtn.textContent = 'LIGHT TO DARK OFF';
    }
});

function lightToDarkToggleOn(currentRgb) { 
    let RgbValues = currentRgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d*)?\)/);
    //Add this rule if you want black to remain black 
    // if (!RgbValues[4] && RgbValues[4] === 'rgb(0, 0, 0)') {
    //     return 'rgba (0, 0, 0, 1)'; }

    //If aplha doesnt exist then set alpha to 0.1
    //Remove this rule if you want colored boxes to remain dark
    if (!RgbValues[4]) {
        return `rgba(${RgbValues[1]}, ${RgbValues[2]}, ${RgbValues[3]}, 0.1)`;
    }  
    else if (RgbValues[4]) {
        //if alpha is less than 1 then increment by 0.1
        let alpha = Number(RgbValues[4]) + 0.1;   
        if (alpha <= 1) {
            return `rgba(${RgbValues[1]}, ${RgbValues[2]}, ${RgbValues[3]}, ${alpha})`;
        }
    } 
}

let boxes = document.querySelectorAll('.boxes');

let previousElementColor;
let currentElementColor;

boxes.forEach((element) => {
    element.addEventListener('mouseenter', (event) => {
        currentElementColor = `rgba(${randomColor()})`;
        if(isMouseDown && !rgbToggle) {
            if(lightToDarkToggle) {
                event.target.style.backgroundColor = lightToDarkToggleOn(event.target.style.backgroundColor);
            } else {
                event.target.style.backgroundColor = 'rgba(0, 0, 0, 1)';
            }
        }
        else if(isMouseDown && rgbToggle) {
            if(lightToDarkToggle) {
                event.target.style.backgroundColor = lightToDarkToggleOn(event.target.style.backgroundColor);
            } else {
                event.target.style.backgroundColor = currentElementColor;
                previousElementColor = currentElementColor;
            }
        }
    });
});

boxes.forEach((element) => {
    element.addEventListener('mouseleave', (event) => {
        if(isMouseDown && !rgbToggle) {
            if(isMouseDown && !rgbToggle) {
                if(lightToDarkToggle) {
                    event.target.style.backgroundColor = lightToDarkToggleOn(event.target.style.backgroundColor);
                } else {
                    event.target.style.backgroundColor = 'rgba(0, 0, 0, 1)';
                }
            } else if (isMouseDown && rgbToggle) {
                if(lightToDarkToggle) {
                    event.target.style.backgroundColor = lightToDarkToggleOn(event.target.style.backgroundColor);
                } else {
                    event.target.style.backgroundColor = previousElementColor;
                }
            }
        }
    });
});

boxes.forEach((element) => {
    element.addEventListener('click', (event) => {
        if(!rgbToggle && lightToDarkToggle) {
            event.target.style.backgroundColor = lightToDarkToggleOn(event.target.style.backgroundColor);
        } else if (!rgbToggle && !lightToDarkToggle) {
            event.target.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        } else if(rgbToggle) {
                event.target.style.backgroundColor = `rgba(${randomColor()})`;
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