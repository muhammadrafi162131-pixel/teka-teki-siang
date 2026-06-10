# 😂 Random Joke Generator

A fun and interactive web application that fetches random jokes from an external API. Built with vanilla HTML, CSS, and JavaScript.

## 🎯 Features

### Core Features
- ✅ **Fetch Random Jokes** - Get jokes from JokeAPI with different categories
- ✅ **Multiple Categories** - Random, Programming, Knock-Knock, General
- ✅ **Two Types of Jokes** - Single-liner and setup/delivery jokes
- ✅ **Reveal Answer** - Click to reveal punchlines for two-part jokes
- ✅ **Share Jokes** - Share jokes using Web Share API or copy to clipboard
- ✅ **Joke History** - Automatically saves last 20 jokes with timestamps
- ✅ **Local Storage** - Persist joke history across sessions
- ✅ **Joke Counter** - Track how many jokes you've seen

### UI/UX Features
- 🎨 **Modern Design** - Beautiful gradient background and smooth animations
- 📱 **Responsive Layout** - Works on desktop, tablet, and mobile
- ⏱️ **Loading State** - Animated spinner while fetching jokes
- ❌ **Error Handling** - Friendly error messages
- 💾 **Local Storage** - Saves preferences and history
- ✨ **Smooth Animations** - Hover effects and transitions

## 🔧 Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript ES6+** - Async/await, Fetch API
- **JokeAPI** - External API for jokes (https://jokeapi.dev)
- **Web APIs** - Clipboard API, Web Share API, LocalStorage

## 📚 API Used

**JokeAPI** (https://v2.jokeapi.dev)
- Free public API
- No authentication required
- JSON format
- Multiple categories available
- Rate limit: 120 requests per minute

### Available Categories
- **Any** - Random from all categories
- **Programming** - Programming-related jokes
- **Knock-Knock** - Classic knock-knock jokes
- **General** - General humor

## 🚀 How to Use

### Quick Start

1. **Clone/Download Repository**
   ```bash
   git clone https://github.com/muhammadrafi162131-pixel/teka-teki-siang.git
   cd joke-generator
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - No installation or server required!

3. **Start Getting Jokes**
   - Click "Get a Joke" button
   - For two-part jokes, click "Reveal Answer"
   - Share jokes with friends using "Share" button

### Features Guide

#### 🎭 Get a Joke
- Click the "Get a Joke" button to fetch a random joke
- Select a category from the dropdown before clicking
- Loading animation shows while fetching

#### 🎉 Reveal Answer
- Appears for two-part jokes only
- Click to show/hide the punchline
- Toggle between setup and punchline

#### 📤 Share Joke
- Share jokes on social media or via messaging
- Fallback: Copy joke to clipboard if Web Share API not available
- Automatically adds source attribution

#### 📋 Joke History
- Last 20 jokes automatically saved
- Shows category and timestamp
- Delete individual jokes with "Delete" button
- Clear all history with "Clear History" button
- Persists across browser sessions using LocalStorage

#### 📊 Joke Counter
- Displays total jokes fetched in current session
- Resets when you refresh the page

## 📁 File Structure

```
joke-generator/
├── index.html          # Main HTML file
├── style.css           # CSS styling
├── script.js           # JavaScript logic
└── README.md           # This file
```

## 🎨 UI Components

### Main Joke Display
- Clean card layout with joke text
- Color-coded answer section
- Smooth reveal animation

### Control Buttons
- **Get a Joke** - Primary action button
- **Reveal Answer** - Secondary action (for two-part jokes)
- **Share** - Share button with icon
- **Clear History** - Reset history

### Category Selector
- Dropdown menu with 4 options
- Easy switching between joke types

### Joke History
- Scrollable list of previous jokes
- Timestamps for each joke
- Individual delete buttons
- Empty state message

## 💻 API Integration

### Fetch Implementation
```javascript
const url = 'https://v2.jokeapi.dev/joke/Any?format=json';
const response = await fetch(url);
const data = await response.json();
```

### Response Types
- **Two-part Joke**: `{ setup: "", delivery: "", type: "twopart" }`
- **Single Joke**: `{ joke: "", type: "single" }`

### Error Handling
- Network errors caught with try/catch
- API errors checked with response validation
- User-friendly error messages displayed

## 🔐 Security & Performance

✅ **Security**
- No sensitive data stored
- CORS-compliant API requests
- Input sanitization via innerHTML (safe with API data)
- LocalStorage usage safe (no external dependencies)

✅ **Performance**
- Lightweight (no frameworks or dependencies)
- Efficient DOM manipulation
- Image optimization via emoji
- Lazy loading of history

## 🌐 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

- **Desktop (1920px+)** - Full layout with organized components
- **Tablet (768px - 1024px)** - Single column with adjusted spacing
- **Mobile (320px - 767px)** - Touch-friendly buttons, optimized typography

## 🎓 Learning Outcomes

This project demonstrates:
- Fetching data from external APIs using Fetch API
- Async/await for asynchronous operations
- DOM manipulation and event handling
- LocalStorage for client-side persistence
- Error handling and validation
- Responsive design with CSS Grid/Flexbox
- Modern JavaScript ES6+ features
- Web APIs (Clipboard, Web Share)

## 🔧 Customization

### Adding More Categories
Edit `getCategoryPath()` in `script.js`:
```javascript
const categories = {
    'your-category': 'CategoryName',
    'another': 'Another'
};
```

### Changing API
Replace the API URL in `fetchJoke()` method with another joke API

### Styling
Modify CSS variables in `style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... */
}
```

## 🐛 Troubleshooting

### "Failed to fetch joke"
- Check internet connection
- Verify API is accessible: https://v2.jokeapi.dev/joke/Any
- Try different category

### Jokes not showing
- Clear browser cache
- Check browser console for errors
- Ensure JavaScript is enabled

### History not saving
- Check LocalStorage is enabled
- Not available in private/incognito mode
- Browser storage quota might be full

## 📄 API Terms

- **JokeAPI** is free to use
- See [JokeAPI Terms](https://jokeapi.dev/) for full details
- No API key required
- Rate limited to 120 requests/minute

## 🎉 Demo

### Live Features
1. Click "Get a Joke" → Random joke fetched from API
2. See joke setup → Click "Reveal Answer" → See punchline
3. Click "Share" → Share on social media or copy to clipboard
4. View history → See all jokes from session
5. Switch category → Get jokes from specific category

## 📝 License

MIT License - Feel free to use and modify this project!

## 🙏 Credits

- **JokeAPI** - Joke data source
- **Web APIs** - Browser native features
- **Inspiration** - Making learning fun! 😂

---

**Enjoy laughing with the Random Joke Generator!** 🎭

Feel free to contribute, report bugs, or suggest improvements!

For more projects, visit: https://github.com/muhammadrafi162131-pixel