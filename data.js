// Data Teka-Teki Silang - Sejarah Pendudukan Jepang di Indonesia

const finalCrossword = {
    width: 11,
    height: 10,
    grid: [
        [null, null, 'B', 'E', 'L', 'A', 'N', 'D', 'A', null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        ['P', 'E', 'N', 'J', 'A', 'J', 'A', 'H', null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        ['M', 'E', 'R', 'D', 'E', 'K', 'A', null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        ['J', 'E', 'P', 'A', 'N', 'G', null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        ['S', 'O', 'E', 'K', 'A', 'R', 'N', 'O', null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null]
    ],
    clues: {
        across: [
            { number: 1, clue: 'Penjajah Indonesia sebelum Jepang', answer: 'BELANDA', row: 0, col: 2, length: 7 },
            { number: 3, clue: 'Orang yang menguasai negara lain', answer: 'PENJAJAH', row: 2, col: 0, length: 8 },
            { number: 5, clue: 'Keadaan bebas dari penjajahan', answer: 'MERDEKA', row: 4, col: 0, length: 7 },
            { number: 7, clue: 'Negara penguduk Indonesia 1942-1945', answer: 'JEPANG', row: 6, col: 0, length: 6 },
            { number: 9, clue: 'Presiden pertama Indonesia', answer: 'SOEKARNO', row: 8, col: 0, length: 8 }
        ],
        down: [
            { number: 1, clue: 'Badan persiapan kemerdekaan Indonesia (singkat)', answer: 'BPUPKI', row: 0, col: 2 },
            { number: 2, clue: 'Bulan proklamasi kemerdekaan', answer: 'AGUSTUS', row: 0, col: 5 },
            { number: 3, clue: 'Pasukan militer era Jepang', answer: 'PETA', row: 2, col: 0 },
            { number: 4, clue: 'Wakil presiden Indonesia pertama', answer: 'HATTA', row: 2, col: 3 },
            { number: 6, clue: 'Perang dunia ketika Jepang menguasai Indonesia', answer: 'WWII', row: 6, col: 0 }
        ]
    }
};

// Export data
window.crosswordData = finalCrossword;