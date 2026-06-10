// Joke Generator using JokeAPI (https://jokeapi.dev)

class JokeGenerator {
    constructor() {
        this.currentJoke = null;
        this.jokeCount = 0;
        this.jokeHistory = JSON.parse(localStorage.getItem('jokeHistory')) || [];
        this.selectedCategory = 'random';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderHistory();
        this.updateJokeCount();
    }

    setupEventListeners() {
        document.getElementById('getJokeBtn').addEventListener('click', () => this.fetchJoke());
        document.getElementById('revealBtn').addEventListener('click', () => this.revealAnswer());
        document.getElementById('shareBtn').addEventListener('click', () => this.shareJoke());
        document.getElementById('categorySelect').addEventListener('change', (e) => {
            this.selectedCategory = e.target.value;
        });
        document.getElementById('clearHistoryBtn').addEventListener('click', () => this.clearHistory());
    }

    async fetchJoke() {
        const loading = document.getElementById('loading');
        const errorMessage = document.getElementById('errorMessage');
        const getJokeBtn = document.getElementById('getJokeBtn');

        loading.style.display = 'flex';
        errorMessage.style.display = 'none';
        getJokeBtn.disabled = true;

        try {
            // JokeAPI endpoint
            const baseUrl = 'https://v2.jokeapi.dev/joke/';
            const category = this.selectedCategory === 'random' ? 'Any' : this.getCategoryPath();
            const url = `${baseUrl}${category}?format=json`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch joke');
            }

            const data = await response.json();

            // Check if API returns a joke
            if (data.error) {
                throw new Error(data.message || 'Could not fetch joke');
            }

            // Handle different joke formats
            this.currentJoke = {
                setup: data.setup || '',
                delivery: data.delivery || '',
                joke: data.joke || '',
                type: data.type, // 'twopart' or 'single'
                category: data.category,
                safe: data.safe
            };

            this.displayJoke();
            this.addToHistory();
            this.jokeCount++;
            this.updateJokeCount();

        } catch (error) {
            this.showError('Error fetching joke: ' + error.message);
            console.error('Error:', error);
        } finally {
            loading.style.display = 'none';
            getJokeBtn.disabled = false;
        }
    }

    getCategoryPath() {
        const categories = {
            'programming': 'Programming',
            'knock-knock': 'Knock-Knock',
            'general': 'General'
        };
        return categories[this.selectedCategory] || 'Any';
    }

    displayJoke() {
        const jokeText = document.getElementById('jokeText');
        const jokeAnswer = document.getElementById('jokeAnswer');
        const revealBtn = document.getElementById('revealBtn');
        const shareBtn = document.getElementById('shareBtn');

        if (this.currentJoke.type === 'twopart') {
            jokeText.textContent = this.currentJoke.setup;
            jokeAnswer.textContent = this.currentJoke.delivery;
            jokeAnswer.style.display = 'none';
            revealBtn.style.display = 'flex';
            revealBtn.textContent = '🎉 Reveal Answer';
        } else {
            jokeText.textContent = this.currentJoke.joke;
            jokeAnswer.style.display = 'none';
            revealBtn.style.display = 'none';
        }

        shareBtn.style.display = 'flex';
    }

    revealAnswer() {
        const jokeAnswer = document.getElementById('jokeAnswer');
        const revealBtn = document.getElementById('revealBtn');

        if (jokeAnswer.style.display === 'none') {
            jokeAnswer.style.display = 'block';
            revealBtn.textContent = '🙈 Hide Answer';
        } else {
            jokeAnswer.style.display = 'none';
            revealBtn.textContent = '🎉 Reveal Answer';
        }
    }

    shareJoke() {
        if (!this.currentJoke) return;

        let jokeText = '';
        if (this.currentJoke.type === 'twopart') {
            jokeText = `${this.currentJoke.setup}\n\n${this.currentJoke.delivery}`;
        } else {
            jokeText = this.currentJoke.joke;
        }

        // Check if Web Share API is available
        if (navigator.share) {
            navigator.share({
                title: '😂 Random Joke',
                text: jokeText,
                url: window.location.href
            }).catch(err => console.error('Share error:', err));
        } else {
            // Fallback: Copy to clipboard
            const fullText = `${jokeText}\n\n🎭 Shared from Random Joke Generator`;
            navigator.clipboard.writeText(fullText).then(() => {
                this.showSuccess('Joke copied to clipboard!');
            }).catch(err => {
                console.error('Copy error:', err);
            });
        }
    }

    addToHistory() {
        if (!this.currentJoke) return;

        let jokeText = '';
        if (this.currentJoke.type === 'twopart') {
            jokeText = `${this.currentJoke.setup} — ${this.currentJoke.delivery}`;
        } else {
            jokeText = this.currentJoke.joke;
        }

        this.jokeHistory.unshift({
            text: jokeText,
            category: this.currentJoke.category,
            timestamp: new Date().toLocaleTimeString()
        });

        // Keep only last 20 jokes
        if (this.jokeHistory.length > 20) {
            this.jokeHistory.pop();
        }

        localStorage.setItem('jokeHistory', JSON.stringify(this.jokeHistory));
        this.renderHistory();
    }

    renderHistory() {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';

        if (this.jokeHistory.length === 0) {
            historyList.innerHTML = '<div class="empty-history">No jokes yet. Start laughing! 😂</div>';
            return;
        }

        this.jokeHistory.forEach((joke, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-text">
                    <strong>${joke.category}</strong> • ${joke.timestamp}
                    <p>${joke.text}</p>
                </div>
                <button class="history-delete" onclick="jokeGenerator.deleteHistoryItem(${index})">Delete</button>
            `;
            historyList.appendChild(historyItem);
        });
    }

    deleteHistoryItem(index) {
        this.jokeHistory.splice(index, 1);
        localStorage.setItem('jokeHistory', JSON.stringify(this.jokeHistory));
        this.renderHistory();
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all joke history?')) {
            this.jokeHistory = [];
            localStorage.setItem('jokeHistory', JSON.stringify(this.jokeHistory));
            this.renderHistory();
            this.showSuccess('History cleared!');
        }
    }

    updateJokeCount() {
        document.getElementById('jokeCount').textContent = this.jokeCount;
    }

    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    showSuccess(message) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = '✓ ' + message;
        errorMessage.style.display = 'block';
        errorMessage.style.background = '#c6f6d5';
        errorMessage.style.borderColor = '#48bb78';
        errorMessage.style.color = '#276749';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
}

// Initialize joke generator
let jokeGenerator;
document.addEventListener('DOMContentLoaded', () => {
    jokeGenerator = new JokeGenerator();
});