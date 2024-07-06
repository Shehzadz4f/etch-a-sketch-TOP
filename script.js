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

let boxes = document.querySelectorAll('.boxes');
boxes.forEach((element) => {
    element.addEventListener('mouseenter', (event) => {
        if(isMouseDown) {
            event.target.style.backgroundColor = "black";
        }
    });
});

boxes.forEach((element) => {
    element.addEventListener('mouseleave', (event) => {
        if(isMouseDown) {
            event.target.style.backgroundColor = "black";
        }
    });
});

boxes.forEach((element) => {
    element.addEventListener('click', (event) => {
            event.target.style.backgroundColor = "black";
    });
});

let resetButton = document.createElement('button');
resetButton.classList.add('topButtons');
resetButton.setAttribute('id','resetButton');
resetButton.textContent = 'RESET';
document.body.prepend(resetButton);

let rgbButton = document.createElement('button');
rgbButton.classList.add('topButtons');
rgbButton.setAttribute('id','rgbButton');
rgbButton.textContent = 'RANDOM COLORS';
document.body.insertBefore(rgbButton, container);

let lightToDark = document.createElement('button');
lightToDark.classList.add('topButtons');
lightToDark.setAttribute('id','lightToDark');
lightToDark.textContent = 'LIGHT TO DARK EFFECT';
document.body.insertBefore(lightToDark, container);

resetButton.addEventListener('click', () => { 
    for (const box of boxes) {
        box.style.backgroundColor = "white";
    }
});

