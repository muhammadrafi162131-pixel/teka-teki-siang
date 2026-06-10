class CrosswordGame {
    constructor(data) {
        this.data = data;
        this.grid = [];
        this.words = [];
        this.currentCell = null;
        this.currentDirection = 'across';
        this.correctCount = 0;
        this.wrongCount = 0;
        this.hints = new Map();
        this.init();
    }

    init() {
        this.setupGrid();
        this.renderCrossword();
        this.renderClues();
        this.setupEventListeners();
        this.mapWords();
    }

    setupGrid() {
        this.grid = this.data.grid.map(row => [...row]);
    }

    mapWords() {
        this.data.clues.across.forEach(clue => {
            const word = {
                number: clue.number,
                clue: clue.clue,
                answer: clue.answer,
                direction: 'across',
                row: clue.row,
                col: clue.col,
                length: clue.length || clue.answer.length,
                cells: []
            };
            this.words.push(word);
        });

        this.data.clues.down.forEach(clue => {
            const word = {
                number: clue.number,
                clue: clue.clue,
                answer: clue.answer,
                direction: 'down',
                row: clue.row,
                col: clue.col,
                length: clue.answer.length,
                cells: []
            };
            this.words.push(word);
        });

        this.words.forEach(word => {
            word.cells = [];
            for (let i = 0; i < word.answer.length; i++) {
                const row = word.direction === 'across' ? word.row : word.row + i;
                const col = word.direction === 'across' ? word.col + i : word.col;
                word.cells.push({ row, col });
            }
        });
    }

    renderCrossword() {
        const grid = document.getElementById('crosswordGrid');
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${this.data.width}, 40px)`;

        for (let row = 0; row < this.data.height; row++) {
            for (let col = 0; col < this.data.width; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                if (this.data.grid[row][col] === null) {
                    cell.classList.add('black');
                    cell.style.pointerEvents = 'none';
                } else {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = '1';
                    input.dataset.row = row;
                    input.dataset.col = col;
                    input.addEventListener('input', (e) => this.handleInput(e));
                    input.addEventListener('click', (e) => this.selectCell(e));
                    input.addEventListener('keydown', (e) => this.handleKeyboard(e));
                    cell.appendChild(input);

                    const cellNumber = this.getCellNumber(row, col);
                    if (cellNumber) {
                        const numberSpan = document.createElement('div');
                        numberSpan.className = 'cell-number';
                        numberSpan.textContent = cellNumber;
                        cell.appendChild(numberSpan);
                    }
                }

                grid.appendChild(cell);
            }
        }
    }

    getCellNumber(row, col) {
        let number = null;
        const acrossWord = this.words.find(w => w.direction === 'across' && w.row === row && w.col === col);
        if (acrossWord) number = acrossWord.number;
        const downWord = this.words.find(w => w.direction === 'down' && w.row === row && w.col === col);
        if (downWord) number = number || downWord.number;
        return number;
    }

    renderClues() {
        const acrossContainer = document.getElementById('acrossClues');
        const downContainer = document.getElementById('downClues');

        acrossContainer.innerHTML = '';
        downContainer.innerHTML = '';

        this.data.clues.across.forEach(clue => {
            const clueDiv = document.createElement('div');
            clueDiv.className = 'clue';
            clueDiv.dataset.number = clue.number;
            clueDiv.dataset.direction = 'across';
            clueDiv.innerHTML = `<span class="clue-number">${clue.number}.</span><span class="clue-text">${clue.clue}</span>`;
            clueDiv.addEventListener('click', () => this.selectClue(clue.number, 'across'));
            acrossContainer.appendChild(clueDiv);
        });

        this.data.clues.down.forEach(clue => {
            const clueDiv = document.createElement('div');
            clueDiv.className = 'clue';
            clueDiv.dataset.number = clue.number;
            clueDiv.dataset.direction = 'down';
            clueDiv.innerHTML = `<span class="clue-number">${clue.number}.</span><span class="clue-text">${clue.clue}</span>`;
            clueDiv.addEventListener('click', () => this.selectClue(clue.number, 'down'));
            downContainer.appendChild(clueDiv);
        });
    }

    selectClue(number, direction) {
        const word = this.words.find(w => w.number === number && w.direction === direction);
        if (word) {
            const firstCell = word.cells[0];
            const input = document.querySelector(`input[data-row="${firstCell.row}"][data-col="${firstCell.col}"]`);
            if (input) {
                input.focus();
                this.highlightWord(word);
            }
        }
    }

    selectCell(e) {
        const input = e.target;
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        const wordDirection = this.getWordDirection(row, col);
        if (wordDirection) {
            this.currentDirection = wordDirection;
            this.currentCell = { row, col };
            const word = this.getWordAtCell(row, col, wordDirection);
            if (word) {
                this.highlightWord(word);
                this.highlightClue(word.number, word.direction);
            }
        }
    }

    getWordDirection(row, col) {
        const acrossWord = this.words.find(w => w.direction === 'across' && w.row === row && w.col <= col && w.col + w.length > col);
        const downWord = this.words.find(w => w.direction === 'down' && w.col === col && w.row <= row && w.row + w.length > row);
        if (acrossWord && downWord) {
            return this.currentDirection === 'down' ? 'down' : 'across';
        }
        return downWord ? 'down' : 'across';
    }

    getWordAtCell(row, col, direction) {
        return this.words.find(w => w.direction === direction && 
            ((direction === 'across' && w.row === row && w.col <= col && w.col + w.length > col) ||
             (direction === 'down' && w.col === col && w.row <= row && w.row + w.length > row)));
    }

    highlightWord(word) {
        document.querySelectorAll('.cell.active').forEach(cell => {
            cell.classList.remove('active');
        });
        word.cells.forEach(({ row, col }) => {
            const cell = document.querySelector(`div.cell[data-row="${row}"][data-col="${col}"]`);
            if (cell) cell.classList.add('active');
        });
    }

    highlightClue(number, direction) {
        document.querySelectorAll('.clue.active').forEach(clue => {
            clue.classList.remove('active');
        });
        const clue = document.querySelector(`.clue[data-number="${number}"][data-direction="${direction}"]`);
        if (clue) clue.classList.add('active');
    }

    handleInput(e) {
        const input = e.target;
        input.value = input.value.toUpperCase();
        if (input.value.length > 0) {
            const row = parseInt(input.dataset.row);
            const col = parseInt(input.dataset.col);
            this.moveToNextCell(row, col);
        }
    }

    moveToNextCell(row, col) {
        let nextRow, nextCol;
        if (this.currentDirection === 'across') {
            nextCol = col + 1;
            nextRow = row;
            while (nextCol < this.data.width && this.data.grid[nextRow][nextCol] === null) {
                nextCol++;
            }
            if (nextCol >= this.data.width) return;
        } else {
            nextRow = row + 1;
            nextCol = col;
            while (nextRow < this.data.height && this.data.grid[nextRow][nextCol] === null) {
                nextRow++;
            }
            if (nextRow >= this.data.height) return;
        }
        const nextInput = document.querySelector(`input[data-row="${nextRow}"][data-col="${nextCol}"]`);
        if (nextInput) nextInput.focus();
    }

    handleKeyboard(e) {
        const input = e.target;
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.currentDirection = 'across';
            const nextCol = col + 1;
            if (nextCol < this.data.width && this.data.grid[row][nextCol] !== null) {
                const nextInput = document.querySelector(`input[data-row="${row}"][data-col="${nextCol}"]`);
                if (nextInput) nextInput.focus();
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.currentDirection = 'across';
            const prevCol = col - 1;
            if (prevCol >= 0 && this.data.grid[row][prevCol] !== null) {
                const prevInput = document.querySelector(`input[data-row="${row}"][data-col="${prevCol}"]`);
                if (prevInput) prevInput.focus();
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.currentDirection = 'down';
            const nextRow = row + 1;
            if (nextRow < this.data.height && this.data.grid[nextRow][col] !== null) {
                const nextInput = document.querySelector(`input[data-row="${nextRow}"][data-col="${col}"]`);
                if (nextInput) nextInput.focus();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.currentDirection = 'down';
            const prevRow = row - 1;
            if (prevRow >= 0 && this.data.grid[prevRow][col] !== null) {
                const prevInput = document.querySelector(`input[data-row="${prevRow}"][data-col="${col}"]`);
                if (prevInput) prevInput.focus();
            }
        } else if (e.key === 'Backspace') {
            if (input.value === '') {
                e.preventDefault();
                if (this.currentDirection === 'across') {
                    const prevCol = col - 1;
                    if (prevCol >= 0 && this.data.grid[row][prevCol] !== null) {
                        const prevInput = document.querySelector(`input[data-row="${row}"][data-col="${prevCol}"]`);
                        if (prevInput) {
                            prevInput.focus();
                            prevInput.value = '';
                        }
                    }
                } else {
                    const prevRow = row - 1;
                    if (prevRow >= 0 && this.data.grid[prevRow][col] !== null) {
                        const prevInput = document.querySelector(`input[data-row="${prevRow}"][data-col="${col}"]`);
                        if (prevInput) {
                            prevInput.focus();
                            prevInput.value = '';
                        }
                    }
                }
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.moveToNextCell(row, col);
        }
    }

    checkAnswers() {
        let correct = 0;
        let incorrect = 0;
        const feedback = document.getElementById('feedback');

        this.words.forEach(word => {
            let userAnswer = '';
            word.cells.forEach(({ row, col }) => {
                const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
                userAnswer += input.value || '_';
            });

            if (userAnswer === word.answer) {
                correct++;
                word.cells.forEach(({ row, col }) => {
                    const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
                    input.parentElement.classList.add('correct');
                    input.parentElement.classList.remove('incorrect');
                });
            } else if (userAnswer.includes('_')) {
                word.cells.forEach(({ row, col }) => {
                    const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
                    if (input.value) {
                        input.parentElement.classList.remove('correct', 'incorrect');
                    }
                });
            } else {
                incorrect++;
                word.cells.forEach(({ row, col }) => {
                    const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
                    input.parentElement.classList.add('incorrect');
                    input.parentElement.classList.remove('correct');
                });
            }
        });

        this.correctCount = correct;
        this.wrongCount = incorrect;
        document.getElementById('correctCount').textContent = correct;
        document.getElementById('wrongCount').textContent = incorrect;
        feedback.className = 'feedback success';
        feedback.innerHTML = `✓ Jawaban Benar: <strong>${correct}</strong> | ✗ Jawaban Salah: <strong>${incorrect}</strong>`;
    }

    getHint() {
        const feedback = document.getElementById('feedback');
        const inputs = document.querySelectorAll('input:focus');
        if (inputs.length === 0) {
            feedback.className = 'feedback hint';
            feedback.innerHTML = 'Pilih kotak terlebih dahulu untuk mendapatkan petunjuk!';
            return;
        }
        const input = inputs[0];
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        const word = this.getWordAtCell(row, col, this.currentDirection);

        if (word) {
            feedback.className = 'feedback hint';
            feedback.innerHTML = `💡 <strong>Petunjuk:</strong> ${word.clue}<br><strong>Jawaban:</strong> ${word.answer}`;
            word.cells.forEach(({ row: r, col: c }, index) => {
                const inp = document.querySelector(`input[data-row="${r}"][data-col="${c}"]`);
                if (inp) {
                    inp.value = word.answer[index];
                    inp.parentElement.classList.add('correct');
                }
            });
        }
    }

    reset() {
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
            input.parentElement.classList.remove('correct', 'incorrect');
        });
        this.correctCount = 0;
        this.wrongCount = 0;
        document.getElementById('correctCount').textContent = '0';
        document.getElementById('wrongCount').textContent = '0';
        document.getElementById('feedback').innerHTML = '';
        document.getElementById('feedback').className = 'feedback';
    }

    setupEventListeners() {
        document.getElementById('checkBtn').addEventListener('click', () => this.checkAnswers());
        document.getElementById('hintBtn').addEventListener('click', () => this.getHint());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new CrosswordGame(window.crosswordData);
});