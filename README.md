# 🔐 Strong Password Generator

A modern, feature-rich password generator with advanced customization options, built with vanilla JavaScript and a beautiful dark theme UI.

## ✨ Features

### 🎯 Core Generation Types
- **Random Passwords** - Fully customizable with multiple character sets
- **Passphrases** - Memorable word-based passwords with customizable separators
- **Pronounceable Passwords** - Easy-to-remember passwords using phonetic patterns

### 🔧 Advanced Customization
- **Length Control** - Generate passwords from 4 to 128 characters
- **Character Set Options** - Uppercase, lowercase, numbers, symbols, custom characters
- **Ambiguous Character Exclusion** - Remove confusing characters (0oO1lI)
- **Password Policy Templates** - Predefined settings for different security requirements:
  - Basic (8+ chars, mixed case)
  - Corporate (12+ chars, all types)
  - Banking (16+ chars, complex)
  - High Security (20+ chars, maximum entropy)

### 📊 Security Features
- **Real-time Strength Indicator** - Visual feedback on password strength
- **Cryptographically Secure** - Uses `crypto.getRandomValues()` for true randomness
- **Password Strength Testing** - Comprehensive scoring algorithm
- **Auto-Clipboard Clear** - Automatically clears clipboard after 30 seconds

### 📱 User Experience
- **Modern Dark Theme UI** - Beautiful gradient design with smooth animations
- **One-Click Copy** - Copy passwords to clipboard with visual confirmation
- **Batch Generation** - Generate multiple passwords at once (2-20 passwords)
- **Tab-Based Interface** - Easy switching between generation types

### 💾 History Management
- **Local Storage** - Saves password history in browser (up to 100 passwords)
- **Search Functionality** - Find passwords by content
- **Export Options** - Download history as JSON, CSV, or plain text
- **Individual Actions** - Copy or delete specific passwords from history
- **Metadata Tracking** - Stores generation date, type, and strength

### 🚀 Additional Features
- **Keyboard Shortcuts** - Ctrl+G to generate, Escape to close modals
- **Copy Notifications** - Visual feedback when passwords are copied
- **Responsive Design** - Works on all screen sizes
- **No Dependencies** - Pure vanilla JavaScript, no external libraries

## 🎮 Usage

### Getting Started
1. Open `index.html` in your web browser
2. Choose your preferred generation type (Random, Passphrase, or Pronounceable)
3. Customize the options based on your needs
4. Click "Generate Password" to create a new password
5. Click the copy button to copy to clipboard

### Generation Types

#### Random Passwords
- Set desired length (4-128 characters)
- Choose character types: uppercase, lowercase, numbers, symbols
- Add custom characters if needed
- Exclude ambiguous characters for better readability

#### Passphrases
- Select number of words (3-8)
- Choose word separator (hyphen, underscore, space, period, or none)
- Option to capitalize first letters
- Include numbers at the end

#### Pronounceable Passwords
- Set length (6-32 characters)
- Uses alternating consonant-vowel patterns
- Optional numbers and symbols integration
- Easier to remember and type

### Policy Templates
Quick-start with predefined security policies:
- **Basic**: 8+ characters, mixed case
- **Corporate**: 12+ characters, all character types
- **Banking**: 16+ characters, complex requirements
- **High Security**: 20+ characters, maximum entropy

### Batch Generation
- Toggle batch mode with the "Generate Batch" button
- Select quantity (2-20 passwords)
- All passwords use current settings
- Individual copy buttons for each password

### History Management
- All generated passwords are automatically saved
- Search through history using the search box
- Copy passwords directly from history
- Delete individual passwords or clear all history
- Export history in multiple formats

## 🔒 Security

### Cryptographic Security
- Uses `crypto.getRandomValues()` for cryptographically secure randomness
- No predictable patterns or pseudo-random generators
- Entropy calculation based on character set size and length

### Privacy
- All data stored locally in browser
- No server communication
- Passwords never transmitted over network
- Auto-clear clipboard feature for sensitive data

### Password Strength Calculation
The strength indicator considers:
- Password length (longer = stronger)
- Character variety (uppercase, lowercase, numbers, symbols)
- Pattern detection (repeated characters, sequences)
- Entropy calculation based on character space

## 🛠️ Technical Details

### File Structure
```
├── index.html          # Main HTML structure
├── styles.css          # Dark theme CSS with animations
├── script.js           # Core JavaScript functionality
└── README.md          # This documentation
```

### Browser Compatibility
- Modern browsers with ES6+ support
- Chrome 49+, Firefox 44+, Safari 10.1+, Edge 79+
- Requires support for `crypto.getRandomValues()` and `navigator.clipboard`

### Local Storage
- Passwords stored as JSON in `localStorage`
- Maximum 100 passwords in history
- Automatic cleanup of old entries
- Data persists between browser sessions

## 🎨 Customization

### Themes
The application uses a dark theme by default with:
- Gradient backgrounds
- Smooth animations and transitions
- Modern UI components with backdrop blur effects
- Color-coded strength indicators

### Modifying Character Sets
Edit the `getCharacterSets()` method in `script.js` to customize:
- Available symbols
- Character exclusions
- Language-specific characters

### Adding New Policy Templates
Extend the `policies` object in `applyPolicyTemplate()` to add new presets.

## 📋 Keyboard Shortcuts

- **Ctrl+G** - Generate new password
- **Ctrl+C** - Copy password (when password field is focused)
- **Escape** - Close modal dialogs

## 🔧 Development

### Setup
1. Clone or download the files
2. Open `index.html` in a web browser
3. No build process required - pure HTML/CSS/JS

### Testing
- Test all generation types with various settings
- Verify strength indicator accuracy
- Check clipboard functionality
- Test history management features
- Validate export functionality

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for improvements.

---

**Built with ❤️ using vanilla JavaScript for maximum performance and compatibility.** 