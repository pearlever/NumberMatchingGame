const gameBoard = document.getElementById('game-board');
const timerElement = document.getElementById('timer').getElementsByTagName('span')[0];
const targetNumberElement = document.getElementById('target-number');
const scoreElement = document.getElementById('score');
let timer = 30;
let score = 0;
let selectedTiles = [];
let targetNumber = 10;
let numbers = [];

// 타일 생성
function generateTiles() {
    numbers = [];
    for (let i = 0; i < 16; i++) {
        const randomNumber = Math.floor(Math.random() * 9) + 1;  // 1부터 9까지의 랜덤 숫자
        numbers.push(randomNumber);
    }
    gameBoard.innerHTML = '';
    numbers.forEach(num => {
        const tile = document.createElement('div');
        tile.textContent = num;
        tile.onclick = () => selectTile(tile, num);
        gameBoard.appendChild(tile);
    });
}

// 타일 선택
function selectTile(tile, num) {
    if (selectedTiles.length < 2 && !tile.classList.contains('selected')) {
        tile.classList.add('selected');
        selectedTiles.push({ tile, num });

        if (selectedTiles.length === 2) {
            checkMatch();
        }
    }
}

// 매칭 확인
function checkMatch() {
    const [firstTile, secondTile] = selectedTiles;
    if (firstTile.num + secondTile.num === targetNumber) {
        score += 10;
        scoreElement.textContent = `점수: ${score}`;
    } else {
        setTimeout(() => {
            firstTile.tile.classList.remove('selected');
            secondTile.tile.classList.remove('selected');
        }, 500);
    }
    selectedTiles = [];
}

// 타이머
function startTimer() {
    const interval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(interval);
            alert('시간이 다 되었습니다! 최종 점수: ' + score);
            resetGame();
        }
    }, 1000);
}

// 게임 초기화
function resetGame() {
    timer = 30;
    score = 0;
    scoreElement.textContent = `점수: 0`;
    targetNumber = Math.floor(Math.random() * 18) + 2;  // 2부터 18까지의 목표 숫자
    targetNumberElement.textContent = targetNumber;
    generateTiles();
    startTimer();
}

resetGame();  // 게임 시작
