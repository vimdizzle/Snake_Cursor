class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // Game state
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        
        // Snake properties
        this.snake = [{x: 10, y: 10}];
        this.dx = 0;
        this.dy = 0;
        this.speed = 150;
        
        // Food properties
        this.food = this.generateFood();
        
        // Initialize
        this.init();
        this.updateHighScore();
    }
    
    init() {
        this.bindEvents();
        this.draw();
    }
    
    bindEvents() {
        // Button events
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.playAgain());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => this.handleTouch(e));
    }
    
    handleKeyPress(e) {
        if (!this.gameRunning || this.gamePaused) return;
        
        switch(e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (this.dy !== 1) {
                    this.dx = 0;
                    this.dy = -1;
                }
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (this.dy !== -1) {
                    this.dx = 0;
                    this.dy = 1;
                }
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (this.dx !== 1) {
                    this.dx = -1;
                    this.dy = 0;
                }
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (this.dx !== -1) {
                    this.dx = 1;
                    this.dy = 0;
                }
                break;
            case ' ':
                e.preventDefault();
                this.togglePause();
                break;
        }
    }
    
    handleTouch(e) {
        e.preventDefault();
        if (!this.gameRunning || this.gamePaused) return;
        
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        const deltaX = x - centerX;
        const deltaY = y - centerY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0 && this.dx !== -1) {
                this.dx = 1;
                this.dy = 0;
            } else if (deltaX < 0 && this.dx !== 1) {
                this.dx = -1;
                this.dy = 0;
            }
        } else {
            // Vertical swipe
            if (deltaY > 0 && this.dy !== -1) {
                this.dx = 0;
                this.dy = 1;
            } else if (deltaY < 0 && this.dy !== 1) {
                this.dx = 0;
                this.dy = -1;
            }
        }
    }
    
    startGame() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.gamePaused = false;
        this.dx = 1;
        this.dy = 0;
        
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        
        this.gameLoop();
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (this.gamePaused) {
            pauseBtn.textContent = 'Resume';
            pauseBtn.classList.remove('btn-secondary');
            pauseBtn.classList.add('btn-primary');
        } else {
            pauseBtn.textContent = 'Pause';
            pauseBtn.classList.remove('btn-primary');
            pauseBtn.classList.add('btn-secondary');
            this.gameLoop();
        }
    }
    
    resetGame() {
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.snake = [{x: 10, y: 10}];
        this.dx = 0;
        this.dy = 0;
        this.food = this.generateFood();
        this.speed = 150;
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('pauseBtn').textContent = 'Pause';
        document.getElementById('pauseBtn').classList.remove('btn-primary');
        document.getElementById('pauseBtn').classList.add('btn-secondary');
        
        this.updateScore();
        this.draw();
    }
    
    gameLoop() {
        if (!this.gameRunning || this.gamePaused) return;
        
        this.update();
        this.draw();
        
        setTimeout(() => this.gameLoop(), this.speed);
    }
    
    update() {
        // Move snake
        const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        for (let i = 0; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.gameOver();
                return;
            }
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.food = this.generateFood();
            
            // Increase speed every 50 points
            if (this.score % 50 === 0 && this.speed > 50) {
                this.speed -= 10;
            }
        } else {
            this.snake.pop();
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid (optional)
        this.drawGrid();
        
        // Draw snake
        this.drawSnake();
        
        // Draw food
        this.drawFood();
    }
    
    drawGrid() {
        this.ctx.strokeStyle = '#1a1a1a';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
    }
    
    drawSnake() {
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Head
                this.ctx.fillStyle = '#4ade80';
                this.ctx.shadowColor = '#4ade80';
                this.ctx.shadowBlur = 10;
            } else {
                // Body
                this.ctx.fillStyle = '#22c55e';
                this.ctx.shadowColor = '#22c55e';
                this.ctx.shadowBlur = 5;
            }
            
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });
        
        this.ctx.shadowBlur = 0;
    }
    
    drawFood() {
        this.ctx.fillStyle = '#ef4444';
        this.ctx.shadowColor = '#ef4444';
        this.ctx.shadowBlur = 15;
        
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 2,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
        
        this.ctx.shadowBlur = 0;
    }
    
    generateFood() {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
        
        return food;
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
    }
    
    updateHighScore() {
        document.getElementById('highScore').textContent = this.highScore;
    }
    
    gameOver() {
        this.gameRunning = false;
        this.gamePaused = false;
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
            this.updateHighScore();
        }
        
        // Show game over modal
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('modalHighScore').textContent = this.highScore;
        document.getElementById('gameOverModal').classList.remove('hidden');
        
        // Reset button states
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('pauseBtn').textContent = 'Pause';
        document.getElementById('pauseBtn').classList.remove('btn-primary');
        document.getElementById('pauseBtn').classList.add('btn-secondary');
    }
    
    playAgain() {
        document.getElementById('gameOverModal').classList.add('hidden');
        this.resetGame();
        this.startGame();
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame();
});
