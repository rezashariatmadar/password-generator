// Password Generator Class
class PasswordGenerator {
    constructor() {
        this.passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];
        this.clipboardTimeout = null;
        this.init();
    }

    init() {
        this.initEventListeners();
        this.loadPasswordHistory();
        this.updateSliderValues();
    }

    // Character sets for password generation
    getCharacterSets() {
        return {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
            ambiguous: '0oO1lI',
            consonants: 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ',
            vowels: 'aeiouAEIOU'
        };
    }

    // Common word list for passphrases
    getWordList() {
        return [
            'able', 'about', 'account', 'acid', 'across', 'addition', 'adjustment', 'advertisement', 'after', 'again',
            'against', 'agreement', 'almost', 'among', 'amount', 'amusement', 'angle', 'angry', 'animal', 'answer',
            'apparatus', 'apple', 'approval', 'arch', 'argument', 'army', 'attack', 'attempt', 'attention', 'attraction',
            'authority', 'automatic', 'awake', 'baby', 'back', 'balance', 'ball', 'band', 'base', 'basin',
            'basket', 'bath', 'beautiful', 'because', 'before', 'behaviour', 'belief', 'bell', 'bent', 'berry',
            'between', 'bird', 'birth', 'bite', 'bitter', 'black', 'blade', 'blood', 'blow', 'blue',
            'board', 'boat', 'body', 'boiling', 'bone', 'book', 'boot', 'bottle', 'brain', 'brake',
            'branch', 'brass', 'bread', 'breath', 'brick', 'bridge', 'bright', 'broken', 'brother', 'brown',
            'brush', 'bucket', 'building', 'bulb', 'burn', 'burst', 'business', 'butter', 'button', 'cake',
            'camera', 'canvas', 'card', 'care', 'carriage', 'cart', 'cause', 'certain', 'chain', 'chalk',
            'chance', 'change', 'cheap', 'cheese', 'chemical', 'chest', 'chief', 'chin', 'church', 'circle',
            'clean', 'clear', 'clock', 'cloth', 'cloud', 'coal', 'coat', 'cold', 'collar', 'colour',
            'comb', 'come', 'comfort', 'committee', 'common', 'company', 'comparison', 'competition', 'complete', 'complex',
            'condition', 'connection', 'conscious', 'control', 'cook', 'copper', 'copy', 'cord', 'cork', 'cotton',
            'cough', 'country', 'cover', 'crack', 'credit', 'crime', 'cruel', 'crush', 'current', 'curtain',
            'curve', 'cushion', 'damage', 'danger', 'dark', 'daughter', 'dead', 'dear', 'death', 'debt',
            'decision', 'deep', 'degree', 'delicate', 'dependent', 'design', 'desire', 'destruction', 'detail', 'development',
            'different', 'digestion', 'direction', 'dirty', 'discovery', 'discussion', 'disease', 'disgust', 'distance', 'distribution',
            'division', 'door', 'doubt', 'down', 'drain', 'drawer', 'dress', 'drink', 'driving', 'drop',
            'dust', 'early', 'earth', 'east', 'edge', 'education', 'effect', 'elastic', 'electric', 'engine',
            'enough', 'equal', 'error', 'even', 'event', 'ever', 'every', 'example', 'exchange', 'existence',
            'expansion', 'experience', 'expert', 'face', 'fact', 'fall', 'false', 'family', 'farm', 'father',
            'fear', 'feather', 'feeble', 'feeling', 'female', 'fertile', 'fiction', 'field', 'fight', 'finger',
            'fire', 'first', 'fish', 'fixed', 'flag', 'flame', 'flat', 'flight', 'floor', 'flower',
            'fold', 'food', 'foolish', 'foot', 'force', 'fork', 'form', 'forward', 'fowl', 'frame',
            'free', 'frequent', 'fresh', 'friend', 'front', 'fruit', 'full', 'future', 'garden', 'general',
            'girl', 'give', 'glass', 'glove', 'goat', 'gold', 'good', 'government', 'grain', 'grass',
            'great', 'green', 'grey', 'grip', 'group', 'growth', 'guide', 'hair', 'hammer', 'hand',
            'hanging', 'happy', 'harbour', 'hard', 'harmony', 'hate', 'have', 'head', 'healthy', 'hear',
            'hearing', 'heart', 'heat', 'help', 'high', 'history', 'hole', 'hollow', 'hook', 'hope',
            'horn', 'horse', 'hospital', 'hour', 'house', 'humour', 'idea', 'important', 'impulse', 'increase',
            'industry', 'insect', 'instrument', 'insurance', 'interest', 'invention', 'iron', 'island', 'jelly', 'jewel',
            'join', 'journey', 'judge', 'jump', 'keep', 'kettle', 'kick', 'kind', 'kiss', 'knee',
            'knife', 'knot', 'knowledge', 'land', 'language', 'last', 'late', 'laugh', 'lead', 'leaf',
            'learning', 'leather', 'left', 'letter', 'level', 'library', 'lift', 'light', 'limit', 'line',
            'linen', 'liquid', 'list', 'little', 'living', 'lock', 'long', 'look', 'loose', 'loss',
            'loud', 'love', 'machine', 'make', 'male', 'manager', 'mark', 'market', 'married', 'mass',
            'match', 'material', 'matter', 'meal', 'measure', 'meat', 'medical', 'meeting', 'memory', 'metal',
            'middle', 'military', 'milk', 'mind', 'mine', 'minute', 'mist', 'mixed', 'money', 'monkey',
            'month', 'moon', 'morning', 'mother', 'motion', 'mountain', 'mouth', 'move', 'much', 'muscle',
            'music', 'nail', 'name', 'narrow', 'nation', 'natural', 'near', 'necessary', 'neck', 'need',
            'needle', 'nerve', 'news', 'night', 'noise', 'normal', 'north', 'nose', 'note', 'number',
            'observation', 'offer', 'office', 'only', 'open', 'operation', 'opinion', 'opposite', 'orange', 'order',
            'organization', 'ornament', 'other', 'oven', 'over', 'owner', 'page', 'pain', 'paint', 'paper',
            'parallel', 'parcel', 'part', 'past', 'paste', 'payment', 'peace', 'pencil', 'person', 'physical',
            'picture', 'pipe', 'place', 'plane', 'plant', 'plate', 'play', 'please', 'pleasure', 'plough',
            'pocket', 'point', 'poison', 'polish', 'political', 'poor', 'porter', 'position', 'possible', 'potato',
            'powder', 'power', 'present', 'price', 'print', 'prison', 'private', 'probable', 'process', 'produce',
            'profit', 'property', 'prose', 'protest', 'public', 'pull', 'pump', 'punishment', 'purpose', 'push',
            'quality', 'question', 'quick', 'quiet', 'quite', 'rail', 'rain', 'range', 'rate', 'reaction',
            'reading', 'ready', 'reason', 'receipt', 'record', 'regret', 'regular', 'relation', 'religion', 'representative',
            'request', 'respect', 'responsible', 'rest', 'reward', 'rhythm', 'rice', 'rich', 'right', 'ring',
            'river', 'road', 'roll', 'roof', 'room', 'root', 'rough', 'round', 'rule', 'safe',
            'sail', 'salt', 'same', 'sand', 'scale', 'school', 'science', 'scissors', 'screw', 'seat',
            'second', 'secret', 'secretary', 'seed', 'seem', 'selection', 'self', 'send', 'sense', 'separate',
            'serious', 'servant', 'shade', 'shake', 'shame', 'sharp', 'sheep', 'shelf', 'ship', 'shirt',
            'shock', 'shoe', 'short', 'shut', 'side', 'sign', 'silk', 'silver', 'simple', 'sister',
            'size', 'skin', 'skirt', 'sleep', 'slip', 'slope', 'slow', 'small', 'smash', 'smell',
            'smile', 'smoke', 'smooth', 'snake', 'sneeze', 'snow', 'soap', 'society', 'sock', 'soft',
            'solid', 'some', 'song', 'sort', 'sound', 'soup', 'south', 'space', 'spade', 'special',
            'sponge', 'spoon', 'spring', 'square', 'stage', 'stamp', 'star', 'start', 'statement', 'station',
            'steam', 'steel', 'stem', 'step', 'stick', 'sticky', 'stiff', 'still', 'stitch', 'stocking',
            'stomach', 'stone', 'stop', 'store', 'story', 'straight', 'strange', 'street', 'stretch', 'strong',
            'structure', 'substance', 'such', 'sudden', 'sugar', 'suggestion', 'summer', 'support', 'surprise', 'sweet',
            'swim', 'system', 'table', 'tail', 'take', 'talk', 'tall', 'taste', 'teaching', 'tendency',
            'test', 'than', 'that', 'thick', 'thin', 'thing', 'this', 'thought', 'thread', 'throat',
            'through', 'thumb', 'thunder', 'ticket', 'tight', 'till', 'time', 'tired', 'together', 'tomorrow',
            'tongue', 'tooth', 'touch', 'town', 'trade', 'train', 'transport', 'tray', 'tree', 'trick',
            'trouble', 'true', 'turn', 'twist', 'umbrella', 'under', 'unit', 'value', 'verse', 'very',
            'vessel', 'view', 'violent', 'voice', 'waiting', 'walk', 'wall', 'warm', 'wash', 'waste',
            'watch', 'water', 'wave', 'weather', 'week', 'weight', 'well', 'west', 'wheel', 'when',
            'where', 'while', 'whip', 'whistle', 'white', 'wide', 'will', 'wind', 'window', 'wine',
            'wing', 'winter', 'wire', 'wise', 'with', 'woman', 'wood', 'wool', 'word', 'work',
            'worm', 'wound', 'writing', 'wrong', 'year', 'yellow', 'yesterday', 'young'
        ];
    }

    // Initialize event listeners
    initEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });

        // Slider updates
        document.getElementById('passwordLength').addEventListener('input', this.updateSliderValues.bind(this));
        document.getElementById('passphraseWords').addEventListener('input', this.updateSliderValues.bind(this));
        document.getElementById('pronounceableLength').addEventListener('input', this.updateSliderValues.bind(this));
        document.getElementById('batchCount').addEventListener('input', this.updateSliderValues.bind(this));

        // Generation buttons
        document.getElementById('generateBtn').addEventListener('click', this.generatePassword.bind(this));
        document.getElementById('batchBtn').addEventListener('click', this.toggleBatchGeneration.bind(this));

        // Copy button
        document.getElementById('copyBtn').addEventListener('click', this.copyToClipboard.bind(this));

        // Policy template change
        document.getElementById('policyTemplate').addEventListener('change', this.applyPolicyTemplate.bind(this));

        // History controls
        document.getElementById('clearHistoryBtn').addEventListener('click', this.clearHistory.bind(this));
        document.getElementById('exportBtn').addEventListener('click', this.showExportModal.bind(this));
        document.getElementById('historySearch').addEventListener('input', this.searchHistory.bind(this));

        // Modal controls
        document.getElementById('closeExportModal').addEventListener('click', this.hideExportModal.bind(this));
        document.getElementById('confirmExport').addEventListener('click', this.exportHistory.bind(this));

        // Real-time password strength checking
        document.getElementById('generatedPassword').addEventListener('input', this.checkPasswordStrength.bind(this));

        // Generate initial password
        this.generatePassword();
    }

    // Update slider value displays
    updateSliderValues() {
        const lengthSlider = document.getElementById('passwordLength');
        const wordsSlider = document.getElementById('passphraseWords');
        const pronounceableSlider = document.getElementById('pronounceableLength');
        const batchSlider = document.getElementById('batchCount');

        document.getElementById('lengthValue').textContent = lengthSlider.value;
        document.getElementById('wordsValue').textContent = wordsSlider.value;
        document.getElementById('pronounceableLengthValue').textContent = pronounceableSlider.value;
        document.getElementById('batchCountValue').textContent = batchSlider.value;
    }

    // Switch between generation tabs
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    // Apply password policy templates
    applyPolicyTemplate() {
        const template = document.getElementById('policyTemplate').value;
        const policies = {
            basic: {
                length: 8,
                uppercase: true,
                lowercase: true,
                numbers: false,
                symbols: false,
                excludeAmbiguous: false
            },
            corporate: {
                length: 12,
                uppercase: true,
                lowercase: true,
                numbers: true,
                symbols: true,
                excludeAmbiguous: true
            },
            banking: {
                length: 16,
                uppercase: true,
                lowercase: true,
                numbers: true,
                symbols: true,
                excludeAmbiguous: true
            },
            'high-security': {
                length: 20,
                uppercase: true,
                lowercase: true,
                numbers: true,
                symbols: true,
                excludeAmbiguous: true
            }
        };

        if (policies[template]) {
            const policy = policies[template];
            document.getElementById('passwordLength').value = policy.length;
            document.getElementById('includeUppercase').checked = policy.uppercase;
            document.getElementById('includeLowercase').checked = policy.lowercase;
            document.getElementById('includeNumbers').checked = policy.numbers;
            document.getElementById('includeSymbols').checked = policy.symbols;
            document.getElementById('excludeAmbiguous').checked = policy.excludeAmbiguous;
            this.updateSliderValues();
        }
    }

    // Generate secure random password
    generateRandomPassword() {
        const length = parseInt(document.getElementById('passwordLength').value);
        const includeUppercase = document.getElementById('includeUppercase').checked;
        const includeLowercase = document.getElementById('includeLowercase').checked;
        const includeNumbers = document.getElementById('includeNumbers').checked;
        const includeSymbols = document.getElementById('includeSymbols').checked;
        const excludeAmbiguous = document.getElementById('excludeAmbiguous').checked;
        const customChars = document.getElementById('customChars').value;

        const charSets = this.getCharacterSets();
        let charset = '';

        if (includeUppercase) charset += charSets.uppercase;
        if (includeLowercase) charset += charSets.lowercase;
        if (includeNumbers) charset += charSets.numbers;
        if (includeSymbols) charset += charSets.symbols;
        if (customChars) charset += customChars;

        if (excludeAmbiguous) {
            charSets.ambiguous.split('').forEach(char => {
                charset = charset.replace(new RegExp(char, 'g'), '');
            });
        }

        if (!charset) {
            alert('Please select at least one character type.');
            return '';
        }

        // Use crypto.getRandomValues for secure randomness
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset[array[i] % charset.length];
        }

        return password;
    }

    // Generate passphrase
    generatePassphrase() {
        const wordCount = parseInt(document.getElementById('passphraseWords').value);
        const separator = document.getElementById('wordSeparator').value;
        const capitalize = document.getElementById('capitalizeWords').checked;
        const includeNumbers = document.getElementById('includeNumbers2').checked;

        const words = this.getWordList();
        const selectedWords = [];

        // Use crypto.getRandomValues for secure word selection
        const array = new Uint32Array(wordCount);
        crypto.getRandomValues(array);

        for (let i = 0; i < wordCount; i++) {
            let word = words[array[i] % words.length];
            if (capitalize) {
                word = word.charAt(0).toUpperCase() + word.slice(1);
            }
            selectedWords.push(word);
        }

        let passphrase = selectedWords.join(separator);

        if (includeNumbers) {
            const numberArray = new Uint32Array(2);
            crypto.getRandomValues(numberArray);
            passphrase += (numberArray[0] % 1000).toString().padStart(3, '0');
        }

        return passphrase;
    }

    // Generate pronounceable password
    generatePronounceablePassword() {
        const length = parseInt(document.getElementById('pronounceableLength').value);
        const includeNumbers = document.getElementById('includeNumbersPronounce').checked;
        const includeSymbols = document.getElementById('includeSymbolsPronounce').checked;

        const charSets = this.getCharacterSets();
        let password = '';
        let isVowelNext = Math.random() > 0.5;

        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            if (includeNumbers && i > 2 && array[i] % 10 === 0) {
                password += (array[i] % 10).toString();
            } else if (includeSymbols && i > 2 && array[i] % 15 === 0) {
                password += charSets.symbols[array[i] % charSets.symbols.length];
            } else {
                const chars = isVowelNext ? charSets.vowels : charSets.consonants;
                password += chars[array[i] % chars.length];
                isVowelNext = !isVowelNext;
            }
        }

        return password;
    }

    // Main password generation function
    generatePassword() {
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
        let password = '';

        switch (activeTab) {
            case 'password':
                password = this.generateRandomPassword();
                break;
            case 'passphrase':
                password = this.generatePassphrase();
                break;
            case 'pronounceable':
                password = this.generatePronounceablePassword();
                break;
        }

        if (password) {
            document.getElementById('generatedPassword').value = password;
            this.checkPasswordStrength();
            this.addToHistory(password, activeTab);
        }
    }

    // Check password strength
    checkPasswordStrength() {
        const password = document.getElementById('generatedPassword').value;
        const strength = this.calculatePasswordStrength(password);
        
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');

        // Remove all strength classes
        strengthBar.className = 'strength-bar';
        
        if (strength < 30) {
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Weak';
            strengthText.style.color = '#ff4757';
        } else if (strength < 60) {
            strengthBar.classList.add('medium');
            strengthText.textContent = 'Medium';
            strengthText.style.color = '#ffa502';
        } else if (strength < 80) {
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Strong';
            strengthText.style.color = '#2ed573';
        } else {
            strengthBar.classList.add('very-strong');
            strengthText.textContent = 'Very Strong';
            strengthText.style.color = '#5352ed';
        }
    }

    // Calculate password strength score
    calculatePasswordStrength(password) {
        let score = 0;
        
        // Length bonus
        score += Math.min(password.length * 4, 40);
        
        // Character variety bonus
        if (/[a-z]/.test(password)) score += 5;
        if (/[A-Z]/.test(password)) score += 5;
        if (/[0-9]/.test(password)) score += 5;
        if (/[^A-Za-z0-9]/.test(password)) score += 10;
        
        // Length penalties and bonuses
        if (password.length < 8) score -= 20;
        if (password.length > 12) score += 10;
        if (password.length > 16) score += 10;
        
        // Pattern penalties
        if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters
        if (/123|abc|qwe/i.test(password)) score -= 10; // Sequential characters
        
        // Entropy bonus for mixed case
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        
        const varietyCount = [hasLower, hasUpper, hasNumbers, hasSpecial].filter(Boolean).length;
        score += varietyCount * 5;
        
        return Math.max(0, Math.min(100, score));
    }

    // Toggle batch generation
    toggleBatchGeneration() {
        const batchSection = document.getElementById('batchSection');
        const isHidden = batchSection.classList.contains('hidden');
        
        if (isHidden) {
            batchSection.classList.remove('hidden');
            this.generateBatch();
        } else {
            batchSection.classList.add('hidden');
        }
    }

    // Generate batch of passwords
    generateBatch() {
        const count = parseInt(document.getElementById('batchCount').value);
        const batchResults = document.getElementById('batchResults');
        batchResults.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
            let password = '';

            switch (activeTab) {
                case 'password':
                    password = this.generateRandomPassword();
                    break;
                case 'passphrase':
                    password = this.generatePassphrase();
                    break;
                case 'pronounceable':
                    password = this.generatePronounceablePassword();
                    break;
            }

            if (password) {
                this.createBatchPasswordElement(password, batchResults);
            }
        }
    }

    // Create batch password element
    createBatchPasswordElement(password, container) {
        const div = document.createElement('div');
        div.className = 'batch-password';
        
        div.innerHTML = `
            <span class="batch-password-text">${password}</span>
            <button class="batch-copy-btn" onclick="passwordGen.copyText('${password}')">
                <i class="fas fa-copy"></i>
            </button>
        `;
        
        container.appendChild(div);
    }

    // Copy to clipboard functionality
    copyToClipboard() {
        const password = document.getElementById('generatedPassword').value;
        if (password) {
            this.copyText(password);
        }
    }

    // Copy any text to clipboard
    copyText(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showCopyNotification();
            this.autoClipboardClear(text);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showCopyNotification();
            this.autoClipboardClear(text);
        });
    }

    // Show copy notification
    showCopyNotification() {
        const notification = document.getElementById('copyNotification');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    // Auto clear clipboard after 30 seconds
    autoClipboardClear(originalText) {
        if (this.clipboardTimeout) {
            clearTimeout(this.clipboardTimeout);
        }
        
        this.clipboardTimeout = setTimeout(() => {
            navigator.clipboard.readText().then(clipboardText => {
                if (clipboardText === originalText) {
                    navigator.clipboard.writeText('');
                }
            }).catch(() => {
                // Ignore errors for security reasons
            });
        }, 30000);
    }

    // Add password to history
    addToHistory(password, type) {
        const historyItem = {
            id: Date.now().toString(),
            password: password,
            type: type,
            strength: this.calculatePasswordStrength(password),
            date: new Date().toISOString(),
            notes: ''
        };

        this.passwordHistory.unshift(historyItem);
        
        // Limit history to 100 items
        if (this.passwordHistory.length > 100) {
            this.passwordHistory = this.passwordHistory.slice(0, 100);
        }
        
        this.savePasswordHistory();
        this.loadPasswordHistory();
    }

    // Save password history to localStorage
    savePasswordHistory() {
        localStorage.setItem('passwordHistory', JSON.stringify(this.passwordHistory));
    }

    // Load and display password history
    loadPasswordHistory() {
        const historyList = document.getElementById('historyList');
        
        if (this.passwordHistory.length === 0) {
            historyList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clock"></i>
                    <p>No passwords generated yet</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = '';
        
        this.passwordHistory.forEach(item => {
            this.createHistoryItem(item, historyList);
        });
    }

    // Create history item element
    createHistoryItem(item, container) {
        const div = document.createElement('div');
        div.className = 'history-item animate-fadeIn';
        div.dataset.id = item.id;
        
        const strengthText = this.getStrengthText(item.strength);
        const strengthColor = this.getStrengthColor(item.strength);
        const formattedDate = new Date(item.date).toLocaleDateString() + ' ' + 
                             new Date(item.date).toLocaleTimeString();
        
        div.innerHTML = `
            <div class="history-password">${item.password}</div>
            <div class="history-meta">
                <div class="history-date">${formattedDate}</div>
                <div class="history-strength" style="color: ${strengthColor}">${strengthText}</div>
                <div class="history-type">${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</div>
            </div>
            <div class="history-actions">
                <button class="history-copy-btn" onclick="passwordGen.copyText('${item.password}')">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="history-delete-btn" onclick="passwordGen.deleteHistoryItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        container.appendChild(div);
    }

    // Get strength text from score
    getStrengthText(score) {
        if (score < 30) return 'Weak';
        if (score < 60) return 'Medium';
        if (score < 80) return 'Strong';
        return 'Very Strong';
    }

    // Get strength color from score
    getStrengthColor(score) {
        if (score < 30) return '#ff4757';
        if (score < 60) return '#ffa502';
        if (score < 80) return '#2ed573';
        return '#5352ed';
    }

    // Delete history item
    deleteHistoryItem(id) {
        this.passwordHistory = this.passwordHistory.filter(item => item.id !== id);
        this.savePasswordHistory();
        this.loadPasswordHistory();
    }

    // Clear all history
    clearHistory() {
        if (confirm('Are you sure you want to clear all password history?')) {
            this.passwordHistory = [];
            this.savePasswordHistory();
            this.loadPasswordHistory();
        }
    }

    // Search history
    searchHistory() {
        const searchTerm = document.getElementById('historySearch').value.toLowerCase();
        const historyItems = document.querySelectorAll('.history-item');
        
        historyItems.forEach(item => {
            const password = item.querySelector('.history-password').textContent.toLowerCase();
            const isVisible = password.includes(searchTerm);
            item.style.display = isVisible ? 'flex' : 'none';
        });
    }

    // Show export modal
    showExportModal() {
        const modal = document.getElementById('exportModal');
        modal.classList.add('show');
    }

    // Hide export modal
    hideExportModal() {
        const modal = document.getElementById('exportModal');
        modal.classList.remove('show');
    }

    // Export password history
    exportHistory() {
        const format = document.querySelector('input[name="exportFormat"]:checked').value;
        let content = '';
        let filename = '';
        let mimeType = '';

        switch (format) {
            case 'json':
                content = JSON.stringify(this.passwordHistory, null, 2);
                filename = 'password-history.json';
                mimeType = 'application/json';
                break;
            case 'csv':
                content = this.generateCSV();
                filename = 'password-history.csv';
                mimeType = 'text/csv';
                break;
            case 'txt':
                content = this.generateTXT();
                filename = 'password-history.txt';
                mimeType = 'text/plain';
                break;
        }

        this.downloadFile(content, filename, mimeType);
        this.hideExportModal();
    }

    // Generate CSV format
    generateCSV() {
        const headers = ['Password', 'Type', 'Strength', 'Date', 'Notes'];
        const rows = [headers.join(',')];
        
        this.passwordHistory.forEach(item => {
            const row = [
                `"${item.password}"`,
                item.type,
                this.getStrengthText(item.strength),
                new Date(item.date).toISOString(),
                `"${item.notes || ''}"`
            ];
            rows.push(row.join(','));
        });
        
        return rows.join('\n');
    }

    // Generate TXT format
    generateTXT() {
        let content = 'Password History Export\n';
        content += '='.repeat(50) + '\n\n';
        
        this.passwordHistory.forEach((item, index) => {
            content += `${index + 1}. Password: ${item.password}\n`;
            content += `   Type: ${item.type}\n`;
            content += `   Strength: ${this.getStrengthText(item.strength)}\n`;
            content += `   Date: ${new Date(item.date).toLocaleString()}\n`;
            if (item.notes) content += `   Notes: ${item.notes}\n`;
            content += '\n';
        });
        
        return content;
    }

    // Download file
    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// Initialize the password generator when the page loads
let passwordGen;
document.addEventListener('DOMContentLoaded', () => {
    passwordGen = new PasswordGenerator();
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('exportModal');
    if (e.target === modal) {
        passwordGen.hideExportModal();
    }
});

// Keyboard shortcuts for power users
document.addEventListener('keydown', (e) => {
    // Ctrl+G to generate password
    if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        passwordGen.generatePassword();
    }
    
    // Ctrl+C to copy when password field is focused
    if (e.ctrlKey && e.key === 'c' && document.activeElement.id === 'generatedPassword') {
        passwordGen.copyToClipboard();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        passwordGen.hideExportModal();
    }
}); 