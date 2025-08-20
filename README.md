# 🐍 Snake App

A modern, responsive Snake game built with HTML5, CSS3, and JavaScript. Features smooth gameplay, beautiful UI, and cross-platform compatibility.

## ✨ Features

- **Modern UI Design**: Beautiful gradient backgrounds with glassmorphism effects
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Controls**: Support for both keyboard (Arrow keys/WASD) and touch controls
- **Progressive Difficulty**: Game speed increases as you score more points
- **Score System**: Track your current score and high score (persisted in localStorage)
- **Game Controls**: Start, pause, resume, and reset functionality
- **Visual Effects**: Glowing animations, shadows, and smooth transitions
- **Touch Support**: Swipe gestures for mobile devices

## 🎮 How to Play

1. **Start the Game**: Click the "Start Game" button
2. **Control the Snake**: Use arrow keys or WASD keys
   - ↑/W: Move up
   - ↓/S: Move down
   - ←/A: Move left
   - →/D: Move right
3. **Objective**: Eat the red food to grow longer and increase your score
4. **Avoid**: Hitting the walls or your own tail
5. **Scoring**: Each food item gives you 10 points
6. **Difficulty**: Game speed increases every 50 points

## 🎯 Game Controls

- **Start Game**: Begin a new game
- **Pause/Resume**: Pause the game (can also use Spacebar)
- **Reset**: Reset the current game
- **Play Again**: Restart after game over

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start playing!

### Running Locally
```bash
# Navigate to the project directory
cd "Snake App"

# Open in your default browser
start index.html
```

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and canvas element
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Object-oriented game logic with classes
- **Canvas API**: 2D graphics rendering
- **Local Storage**: Persistent high score storage

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Optimized game loop with requestAnimationFrame
- Efficient collision detection
- Smooth 60 FPS gameplay
- Responsive touch controls

## 📱 Mobile Support

The game is fully optimized for mobile devices:
- Touch-friendly controls with swipe gestures
- Responsive design that adapts to screen size
- Optimized canvas scaling
- Touch event handling for smooth mobile gameplay

## 🎨 Customization

### Colors and Themes
The game uses CSS custom properties and can be easily customized:
- Primary color: Green (#4ade80)
- Secondary color: Blue (#3b82f6)
- Danger color: Red (#ef4444)
- Background: Blue gradient (#1e3c72 to #2a5298)

### Game Settings
Modify these values in `game.js`:
- `gridSize`: Size of each grid cell (default: 20)
- `speed`: Initial game speed in milliseconds (default: 150)
- `speedIncrement`: Speed increase per level (default: 10)

## 🔧 Development

### Project Structure
```
Snake App/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── game.js            # Game logic and mechanics
└── README.md          # Project documentation
```

### Key Classes
- **SnakeGame**: Main game controller class
- **Game State Management**: Running, paused, game over states
- **Input Handling**: Keyboard and touch event processing
- **Rendering**: Canvas drawing with visual effects
- **Collision Detection**: Wall and self-collision logic

## 🚀 Future Enhancements

Potential features for future versions:
- Multiple difficulty levels
- Power-ups and special food
- Sound effects and background music
- Multiplayer support
- Leaderboard system
- Different snake skins
- Obstacle levels

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have suggestions, please open an issue on the project repository.

---

**Enjoy playing Snake App!** 🐍🎮
