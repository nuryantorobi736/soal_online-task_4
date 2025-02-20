const questionsLevel1 = [{
    question: "1. Apa yang selalu datang tetapi tidak pernah tiba?",
    options: ["Besok", "Hari Ini", "Kemarin"],
    answer: 0
}, {
    question: "2. Apa yang bisa terbang tanpa sayap?",
    options: ["Waktu", "Burung", "Pesawat"],
    answer: 0
}, {
    question: "3. Apa yang bisa dipecahkan tetapi tidak bisa dilihat?",
    options: ["Janji", "Telur", "Kaca"],
    answer: 0
}, {
    question: "4. Apa yang bisa berlari tetapi tidak memiliki kaki?",
    options: ["Sungai", "Kucing", "Angin"],
    answer: 0
}, {
    question: "5. Apa yang bisa berputar tetapi tidak memiliki sayap?",
    options: ["Roda", "Jam", "Bumi"],
    answer: 1
}];

const questionsLevel2 = [{
    question: "1. Apa yang memiliki banyak gigi tetapi tidak bisa menggigit?",
    options: ["Sisir", "Kunci", "Pasta Gigi"],
    answer: 0
}, {
    question: "2. Apa yang tidak pernah basah meskipun tenggelam?",
    options: ["Bayangan", "Ikan", "Kapal"],
    answer: 0
}, {
    question: "3. Apa yang selalu di depan Anda tetapi tidak bisa dilihat?",
    options: ["Masa Depan", "Hidup", "Cahaya"],
    answer: 0
}, {
    question: "4. Apa yang bisa diisi tetapi tidak bisa dituang?",
    options: ["Koper", "Wadah", "Saku"],
    answer: 2
}, {
    question: "5. Apa yang bisa terbang tanpa sayap?",
    options: ["Mimpi", "Kapal", "Pesawat"],
    answer: 0
}];

const questionsLevel3 = [{
    question: "1. Apa yang bisa Anda pegang tetapi tidak bisa dilihat?",
    options: ["Pikiran", "Uang", "Cinta"],
    answer: 0
}, {
    question: "2. Apa yang selalu bergerak tetapi tidak pernah pergi?",
    options: ["Jam", "Sungai", "Angin"],
    answer: 0
}, {
    question: "3. Apa yang bisa dipatahkan tetapi tidak bisa dipegang?",
    options: ["Janji", "Kaca", "Roti"],
    answer: 0
}, {
    question: "4. Apa yang memiliki banyak wajah tetapi hanya satu kepala?",
    options: ["Koin", "Jam", "Buku"],
    answer: 0
}, {
    question: "5. Apa yang tidak bisa dimakan sebelum dimasak?",
    options: ["Sereal", "Telur", "Daging"],
    answer: 1
}];

let userName;
let totalScore = 0;

function login() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (usernameInput && passwordInput) {
        userName = usernameInput;
        document.getElementById('loginForm').classList.add('hidden');
        showQuiz(1);
    } else {
        alert('Nama dan Password harus diisi!');
    }
}

function showQuiz(level) {
    let questions;
    let questionsDiv;
    let resultDiv;
    let nextBtn;

    switch (level) {
        case 1:
            questions = questionsLevel1;
            questionsDiv = document.getElementById('questions');
            resultDiv = document.getElementById('result');
            nextBtn = document.getElementById('nextLevelBtn');
            document.getElementById('quiz').classList.remove('hidden');
            break;
        case 2:
            questions = questionsLevel2;
            questionsDiv = document.getElementById('questionsLevel2');
            resultDiv = document.getElementById('resultLevel2');
            nextBtn = document.getElementById('nextLevelBtn2');
            document.getElementById('quizLevel2').classList.remove('hidden');
            break;
        case 3:
            questions = questionsLevel3;
            questionsDiv = document.getElementById('questionsLevel3');
            resultDiv = document.getElementById('resultLevel3');
            nextBtn = document.getElementById('finishBtn');
            document.getElementById('quizLevel3').classList.remove('hidden');
            break;
        default:
            return;
    }

    questionsDiv.innerHTML = '';
    questions.forEach((item, index) => {
        questionsDiv.innerHTML += `
            <div class="question">
                <label>${item.question}</label><br>
                ${item.options.map((option, i) => `
                    <div class="option">
                        <input type="radio" name="question${level}${index}" value="${i}" id="q${level}${index}o${i}">
                        <label for="q${level}${index}o${i}">${option}</label>
                    </div>
                `).join('')}
                <div id="answer${level}${index}" class="correct-answer hidden"></div>
            </div>
        `;
    });

    nextBtn.classList.add('hidden');
    resultDiv.classList.add('hidden');
}

function checkAnswers(level) {
    let score = 0;
    let questions;
    let resultDiv;
    let nextBtn;

    switch (level) {
        case 1:
            questions = questionsLevel1;
            resultDiv = document.getElementById('result');
            nextBtn = document.getElementById('nextLevelBtn');
            break;
        case 2:
            questions = questionsLevel2;
            resultDiv = document.getElementById('resultLevel2');
            nextBtn = document.getElementById('nextLevelBtn2');
            break;
        case 3:
            questions = questionsLevel3;
            resultDiv = document.getElementById('resultLevel3');
            nextBtn = document.getElementById('finishBtn');
            break;
    }

    resultDiv.innerHTML = '';

    questions.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name="question${level}${index}"]:checked`);
        const answerDiv = document.getElementById(`answer${level}${index}`);

        if (selectedOption && parseInt(selectedOption.value) === item.answer) {
            score++;
            answerDiv.innerHTML = `Jawaban yang benar: ${item.options[item.answer]}`;
            answerDiv.classList.remove('hidden');
            answerDiv.style.color = 'green';
        } else {
            answerDiv.innerHTML = `Jawaban yang benar: ${item.options[item.answer]}`;
            answerDiv.classList.remove('hidden');
            answerDiv.style.color = 'red';
        }
    });

    totalScore += score;
    resultDiv.innerHTML = `Skor Anda: ${score} dari ${questions.length}`;
    resultDiv.classList.remove('hidden');

    nextBtn.classList.remove('hidden');
}

function nextLevel() {
    checkAnswers(1);
    showQuiz(2);
}

function nextLevel2() {
    checkAnswers(2);
    showQuiz(3);
}

function finish() {
    checkAnswers(3);
    document.getElementById('quizLevel3').classList.add('hidden');
    document.getElementById('finalResult').classList.remove('hidden');
    document.getElementById('finalScore').innerHTML = `Total Skor Anda: ${totalScore}`;

    let award;
    if (totalScore === 15) {
        award = "Selamat! Anda adalah Juara Teka-teki!";
    } else if (totalScore >= 10) {
        award = "Bagus! Anda sangat pintar!";
    } else {
        award = "Cobalah lagi, Anda pasti bisa!";
    }
    document.getElementById('award').innerHTML = award;
}

function restart() {
    totalScore = 0; // Reset total skor
    document.getElementById('finalResult').classList.add('hidden'); // Sembunyikan hasil akhir
    document.getElementById('quiz').classList.remove('hidden'); // Tampilkan Level 1
    document.getElementById('quizLevel2').classList.add('hidden'); // Sembunyikan Level 2
    document.getElementById('quizLevel3').classList.add('hidden'); // Sembunyikan Level 3
    showQuiz(1); // Tampilkan Level 1
}

function backToMenu() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('quizLevel2').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}