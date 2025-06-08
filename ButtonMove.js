const viewingArea = document.getElementById('viewingArea');
const makeButton = document.getElementById('makeButton');
const colorSelector = document.getElementById('colorSelector');
const totalLabel = document.getElementById('totalLabel');
const toggleMoveBtn = document.getElementById('toggleMove');

let total = 0;
let moving = false;
let buttons = [];
let moveInterval;

makeButton.addEventListener('click', () => {
  const color = colorSelector.value;
  const number = Math.floor(Math.random() * 100) + 1;

  const btn = document.createElement('button');
  btn.className = 'button';
  btn.textContent = number;
  btn.style.backgroundColor = color;
  btn.style.color = (color === 'white') ? 'black' : 'white';

  // button fits in bounds
  const x = Math.random() * (viewingArea.clientWidth - 60);
  const y = Math.random() * (viewingArea.clientHeight - 30);
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;

  btn.dataset.dx = (Math.random() < 0.5 ? 1 : -1) * 2;
  btn.dataset.dy = (Math.random() < 0.5 ? 1 : -1) * 2;

  btn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    const selectedColor = colorSelector.value;
    btn.style.backgroundColor = selectedColor;
    btn.style.color = selectedColor === 'white' ? 'black' : 'white';
    total += parseInt(btn.textContent);
    totalLabel.textContent = `Total: ${total}`;
  });

  viewingArea.appendChild(btn);
  buttons.push(btn);
});

toggleMoveBtn.addEventListener('click', () => {
  moving = !moving;
  toggleMoveBtn.textContent = moving ? 'PAUSE' : 'MOVE';

  if (moving) {
    moveInterval = setInterval(() => {
      buttons.forEach(btn => {
        let x = btn.offsetLeft;
        let y = btn.offsetTop;
        let dx = parseInt(btn.dataset.dx);
        let dy = parseInt(btn.dataset.dy);

        // bounce off edges
        if (x + dx < 0 || x + dx > viewingArea.clientWidth - btn.offsetWidth) {
          dx *= -1;
        }
        if (y + dy < 0 || y + dy > viewingArea.clientHeight - btn.offsetHeight) {
          dy *= -1;
        }

        btn.dataset.dx = dx;
        btn.dataset.dy = dy;
        btn.style.left = `${x + dx}px`;
        btn.style.top = `${y + dy}px`;
      });
    }, 30);
  } else {
    clearInterval(moveInterval);
  }
});
