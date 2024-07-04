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


let resetButton = document.createElement('button');
resetButton.setAttribute('id','resetButton');
resetButton.textContent = 'RESET';
document.body.prepend(resetButton);
resetButton.style.margin = '5px 0px 5px 0px';
resetButton.style.padding = '5px 10px 5px 10px';
resetButton.style.borderRadius = '5px 5px 5px 0px';

resetButton.addEventListener('click', () => { 
    for (const box of boxes) {
        box.style.backgroundColor = "white";
    }
});