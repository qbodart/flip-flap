
// game.js
document.getElementById('tableForm').addEventListener('submit', startGame);

function startGame(event) {
    event.preventDefault();
    document.getElementById('form-wrapper').classList.add('hidden');

    const selectedTables = Array.from(event.target.tables.options)
        .filter(option => option.selected)
        .map(option => parseInt(option.value));
    const gridSize = parseInt(event.target.gridSize.value);
    const time = parseInt(event.target.time.value);
    const operators = Array.from(event.target.operator.options)
        .filter(option => option.selected)
        .map(option => option.value);
    const grid = document.getElementById('grid');
    grid.style.setProperty('--grid-size', gridSize);
    // set the background image of the grid to random square image from web service on them harry potter 
    grid.style.setProperty('background-image', `url("https://source.unsplash.com/featured/?harry,potter,${Math.random()}")`);
    grid.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const button = document.createElement('button');
            const table = selectedTables[Math.floor(Math.random() * selectedTables.length)];
            const number = Math.floor(Math.random() * 10) + 1;
            const operator = operators[Math.floor(Math.random() * operators.length)];
            if (operator === 'x') {
                button.textContent = `${number} ${operator} ${table}`;
            } else {
                button.textContent = `${table * number} ${operator} ${table}`;
            }
            button.addEventListener('click', () => {
                const answer = parseInt(prompt(button.textContent));
                if ((operator === 'x' && answer === table * number) || (operator === ':' && answer === number)) {
                    button.style.visibility = 'hidden';
                }
                // if all buttons are hidden, then show the fireworks
                if (Array.from(grid.children).every(child => child.style.visibility === 'hidden')) {
                    triggerFireworks();
                }
            });
            grid.appendChild(button);
        }
    }
    startTimer(time);
}

function startTimer(duration) {
    const display = document.getElementById('timer');
    let timer = duration, minutes, seconds;
    const countdown = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        // if all buttons are hidden, then show the fireworks
        const grid = document.getElementById('grid');
        if (Array.from(grid.children).every(child => child.style.visibility === 'hidden')) {
            clearInterval(countdown);
        }

        if (--timer < 0) {
            timer = duration;
            clearInterval(countdown);
            alert('Time is up!');
            document.getElementById('form-wrapper').classList.remove('hidden');
            document.getElementById('grid').innerHTML = '';
        }
    }, 1000);
}

function triggerFireworks() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        }),
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        }),
      );
    }, 250);
  }