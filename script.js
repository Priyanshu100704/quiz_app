// Quiz App JavaScript

class QuizApp {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedCategory = null;
        this.selectedDifficulty = 'easy';
        this.questions = [];
        this.timer = null;
        this.timeLeft = 30;
        this.totalTime = 0;
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.loadQuestions();
    }

    setupEventListeners() {
        // Category selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                this.selectCategory(card);
            });
        });

        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectDifficulty(btn);
            });
        });

        // Start quiz button
        document.getElementById('start-quiz').addEventListener('click', () => {
            this.startQuiz();
        });

        // Option selection
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', () => {
                this.selectOption(option);
            });
        });

        // Next button
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextQuestion();
        });

        // Results screen buttons
        document.getElementById('retry-btn').addEventListener('click', () => {
            this.retryQuiz();
        });

        document.getElementById('new-category-btn').addEventListener('click', () => {
            this.showWelcomeScreen();
        });

        document.getElementById('share-btn').addEventListener('click', () => {
            this.shareScore();
        });
    }

    selectCategory(card) {
        // Remove previous selection
        document.querySelectorAll('.category-card').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Select new category
        card.classList.add('selected');
        this.selectedCategory = card.dataset.category;
        
        // Enable start button if category is selected
        this.updateStartButton();
    }

    selectDifficulty(btn) {
        // Remove previous selection
        document.querySelectorAll('.difficulty-btn').forEach(b => {
            b.classList.remove('active');
        });
        
        // Select new difficulty
        btn.classList.add('active');
        this.selectedDifficulty = btn.dataset.difficulty;
    }

    updateStartButton() {
        const startBtn = document.getElementById('start-quiz');
        if (this.selectedCategory) {
            startBtn.disabled = false;
        } else {
            startBtn.disabled = true;
        }
    }

    loadQuestions() {
        // Sample questions for each category
        this.questionsData = {
            general: {
                easy: [
                    {
                        question: "What is the capital of France?",
                        options: ["London", "Berlin", "Paris", "Madrid"],
                        correct: 2
                    },
                    {
                        question: "Which planet is known as the Red Planet?",
                        options: ["Venus", "Mars", "Jupiter", "Saturn"],
                        correct: 1
                    },
                    {
                        question: "What is the largest ocean on Earth?",
                        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
                        correct: 3
                    },
                    {
                        question: "Who painted the Mona Lisa?",
                        options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
                        correct: 1
                    },
                    {
                        question: "What is the chemical symbol for gold?",
                        options: ["Ag", "Au", "Fe", "Cu"],
                        correct: 1
                    }
                ],
                medium: [
                    {
                        question: "In which year did World War II end?",
                        options: ["1943", "1944", "1945", "1946"],
                        correct: 2
                    },
                    {
                        question: "What is the largest mammal in the world?",
                        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
                        correct: 1
                    },
                    {
                        question: "Which country is home to the kangaroo?",
                        options: ["New Zealand", "South Africa", "Australia", "India"],
                        correct: 2
                    },
                    {
                        question: "What is the main component of the sun?",
                        options: ["Liquid Lava", "Molten Iron", "Hot Gases", "Solid Rock"],
                        correct: 2
                    },
                    {
                        question: "How many continents are there on Earth?",
                        options: ["5", "6", "7", "8"],
                        correct: 2
                    }
                ],
                hard: [
                    {
                        question: "What is the speed of light in vacuum?",
                        options: ["299,792 km/s", "199,792 km/s", "399,792 km/s", "499,792 km/s"],
                        correct: 0
                    },
                    {
                        question: "Which element has the chemical symbol 'O'?",
                        options: ["Osmium", "Oxygen", "Oganesson", "Osmium"],
                        correct: 1
                    },
                    {
                        question: "What is the largest desert in the world?",
                        options: ["Sahara", "Antarctic", "Arabian", "Gobi"],
                        correct: 1
                    },
                    {
                        question: "In which year was the first iPhone released?",
                        options: ["2005", "2006", "2007", "2008"],
                        correct: 2
                    },
                    {
                        question: "What is the smallest prime number?",
                        options: ["0", "1", "2", "3"],
                        correct: 2
                    }
                ]
            },
            science: {
                easy: [
                    {
                        question: "What is the hardest natural substance on Earth?",
                        options: ["Steel", "Diamond", "Iron", "Platinum"],
                        correct: 1
                    },
                    {
                        question: "What is the chemical formula for water?",
                        options: ["H2O", "CO2", "O2", "N2"],
                        correct: 0
                    },
                    {
                        question: "Which gas do plants absorb from the air?",
                        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                        correct: 1
                    },
                    {
                        question: "What is the closest planet to the Sun?",
                        options: ["Venus", "Mercury", "Earth", "Mars"],
                        correct: 1
                    },
                    {
                        question: "What is the study of fossils called?",
                        options: ["Biology", "Paleontology", "Geology", "Archaeology"],
                        correct: 1
                    }
                ],
                medium: [
                    {
                        question: "What is the atomic number of carbon?",
                        options: ["4", "6", "8", "12"],
                        correct: 1
                    },
                    {
                        question: "Which organ pumps blood through the body?",
                        options: ["Liver", "Heart", "Lungs", "Brain"],
                        correct: 1
                    },
                    {
                        question: "What is the largest organ in the human body?",
                        options: ["Heart", "Brain", "Liver", "Skin"],
                        correct: 3
                    },
                    {
                        question: "What is the chemical symbol for sodium?",
                        options: ["S", "Na", "So", "Sa"],
                        correct: 1
                    },
                    {
                        question: "Which planet has the most moons?",
                        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                        correct: 1
                    }
                ],
                hard: [
                    {
                        question: "What is the speed of sound in air at room temperature?",
                        options: ["343 m/s", "300 m/s", "400 m/s", "250 m/s"],
                        correct: 0
                    },
                    {
                        question: "What is the molecular formula for glucose?",
                        options: ["C6H12O6", "C12H22O11", "C6H6", "CH4"],
                        correct: 0
                    },
                    {
                        question: "Which element is most abundant in the Earth's crust?",
                        options: ["Iron", "Oxygen", "Silicon", "Aluminum"],
                        correct: 1
                    },
                    {
                        question: "What is the pH of pure water?",
                        options: ["5", "6", "7", "8"],
                        correct: 2
                    },
                    {
                        question: "What is the largest known star in the universe?",
                        options: ["Betelgeuse", "UY Scuti", "VY Canis Majoris", "Antares"],
                        correct: 1
                    }
                ]
            },
            history: {
                easy: [
                    {
                        question: "Who was the first President of the United States?",
                        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
                        correct: 2
                    },
                    {
                        question: "In which year did Columbus discover America?",
                        options: ["1490", "1492", "1495", "1500"],
                        correct: 1
                    },
                    {
                        question: "Which ancient wonder was located in Alexandria?",
                        options: ["Colossus", "Lighthouse", "Temple", "Pyramid"],
                        correct: 1
                    },
                    {
                        question: "Who was the first Emperor of Rome?",
                        options: ["Julius Caesar", "Augustus", "Nero", "Caligula"],
                        correct: 1
                    },
                    {
                        question: "In which year did World War I begin?",
                        options: ["1914", "1915", "1916", "1917"],
                        correct: 0
                    }
                ],
                medium: [
                    {
                        question: "Which empire was ruled by Genghis Khan?",
                        options: ["Roman", "Mongol", "Ottoman", "Persian"],
                        correct: 1
                    },
                    {
                        question: "What was the name of the ship that sank in 1912?",
                        options: ["Lusitania", "Titanic", "Britannic", "Olympic"],
                        correct: 1
                    },
                    {
                        question: "Who was the first female Prime Minister of Britain?",
                        options: ["Margaret Thatcher", "Theresa May", "Elizabeth I", "Victoria"],
                        correct: 0
                    },
                    {
                        question: "Which war ended in 1945?",
                        options: ["World War I", "World War II", "Korean War", "Vietnam War"],
                        correct: 1
                    },
                    {
                        question: "What was the Berlin Wall?",
                        options: ["A river", "A wall", "A bridge", "A monument"],
                        correct: 1
                    }
                ],
                hard: [
                    {
                        question: "In which year did the French Revolution begin?",
                        options: ["1789", "1799", "1804", "1815"],
                        correct: 0
                    },
                    {
                        question: "Who was the last Tsar of Russia?",
                        options: ["Nicholas II", "Alexander III", "Peter III", "Catherine II"],
                        correct: 0
                    },
                    {
                        question: "What was the name of the first computer?",
                        options: ["ENIAC", "UNIVAC", "IBM 360", "Apple I"],
                        correct: 0
                    },
                    {
                        question: "Which dynasty ruled China for over 400 years?",
                        options: ["Ming", "Qing", "Han", "Tang"],
                        correct: 1
                    },
                    {
                        question: "What was the main cause of the American Civil War?",
                        options: ["Taxation", "Slavery", "Trade", "Territory"],
                        correct: 1
                    }
                ]
            },
            technology: {
                easy: [
                    {
                        question: "What does CPU stand for?",
                        options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Computer Processing Unit"],
                        correct: 0
                    },
                    {
                        question: "Which company created the iPhone?",
                        options: ["Samsung", "Apple", "Google", "Microsoft"],
                        correct: 1
                    },
                    {
                        question: "What does HTML stand for?",
                        options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
                        correct: 0
                    },
                    {
                        question: "Which social media platform uses a blue bird logo?",
                        options: ["Facebook", "Instagram", "Twitter", "LinkedIn"],
                        correct: 2
                    },
                    {
                        question: "What is the main function of RAM?",
                        options: ["Storage", "Processing", "Memory", "Graphics"],
                        correct: 2
                    }
                ],
                medium: [
                    {
                        question: "What year was the first iPhone released?",
                        options: ["2005", "2006", "2007", "2008"],
                        correct: 2
                    },
                    {
                        question: "Which programming language was created by Google?",
                        options: ["Python", "Java", "Go", "C++"],
                        correct: 2
                    },
                    {
                        question: "What does VPN stand for?",
                        options: ["Virtual Private Network", "Very Personal Network", "Virtual Public Network", "Very Private Network"],
                        correct: 0
                    },
                    {
                        question: "Which company owns YouTube?",
                        options: ["Google", "Facebook", "Microsoft", "Amazon"],
                        correct: 0
                    },
                    {
                        question: "What is the most popular programming language?",
                        options: ["Python", "JavaScript", "Java", "C++"],
                        correct: 1
                    }
                ],
                hard: [
                    {
                        question: "What does API stand for?",
                        options: ["Application Programming Interface", "Advanced Programming Interface", "Application Process Interface", "Advanced Process Interface"],
                        correct: 0
                    },
                    {
                        question: "Which year was the World Wide Web invented?",
                        options: ["1989", "1991", "1993", "1995"],
                        correct: 0
                    },
                    {
                        question: "What is the largest cryptocurrency by market cap?",
                        options: ["Ethereum", "Bitcoin", "Cardano", "Solana"],
                        correct: 1
                    },
                    {
                        question: "Which company developed React?",
                        options: ["Google", "Facebook", "Microsoft", "Apple"],
                        correct: 1
                    },
                    {
                        question: "What does AI stand for?",
                        options: ["Artificial Intelligence", "Advanced Internet", "Automated Information", "Artificial Internet"],
                        correct: 0
                    }
                ]
            }
        };
    }

    startQuiz() {
        if (!this.selectedCategory) {
            this.showNotification('Please select a category first!', 'error');
            return;
        }

        // Load questions for selected category and difficulty
        this.questions = this.questionsData[this.selectedCategory][this.selectedDifficulty];
        
        // Reset quiz state
        this.currentQuestion = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.totalTime = 0;
        
        // Show loading screen
        this.showScreen('loading-screen');
        
        // Simulate loading
        setTimeout(() => {
            this.showQuizScreen();
            this.loadQuestion();
        }, 1500);
    }

    showQuizScreen() {
        this.showScreen('quiz-screen');
        this.updateProgress();
        this.startTimer();
    }

    loadQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.endQuiz();
            return;
        }

        const question = this.questions[this.currentQuestion];
        
        // Update question text
        document.getElementById('question-text').textContent = question.question;
        
        // Update options
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            const optionText = option.querySelector('.option-text');
            optionText.textContent = question.options[index];
            
            // Reset option state
            option.classList.remove('selected', 'correct', 'incorrect');
            option.style.pointerEvents = 'auto';
        });
        
        // Reset next button
        document.getElementById('next-btn').disabled = true;
        
        // Update progress
        this.updateProgress();
    }

    selectOption(option) {
        // Prevent multiple selections
        if (option.classList.contains('selected') || option.classList.contains('correct') || option.classList.contains('incorrect')) {
            return;
        }

        const selectedIndex = parseInt(option.dataset.index);
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.option');
        
        // Mark selected option
        option.classList.add('selected');
        
        // Disable all options
        options.forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        
        // Check if answer is correct
        if (selectedIndex === question.correct) {
            option.classList.add('correct');
            this.score++;
            this.correctAnswers++;
            this.showNotification('Correct! +1 point', 'success');
        } else {
            option.classList.add('incorrect');
            this.incorrectAnswers++;
            this.showNotification('Incorrect!', 'error');
            
            // Show correct answer
            options[question.correct].classList.add('correct');
        }
        
        // Update score display
        document.getElementById('current-score').textContent = this.score;
        
        // Enable next button
        document.getElementById('next-btn').disabled = false;
        
        // Stop timer for this question
        this.stopTimer();
    }

    nextQuestion() {
        this.currentQuestion++;
        this.loadQuestion();
        this.startTimer();
    }

    startTimer() {
        this.timeLeft = 30;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.totalTime++;
            this.updateTimerDisplay();
            
            // Add warning classes
            if (this.timeLeft <= 10) {
                document.querySelector('.timer').classList.add('warning');
            }
            if (this.timeLeft <= 5) {
                document.querySelector('.timer').classList.add('danger');
            }
            
            if (this.timeLeft <= 0) {
                this.stopTimer();
                this.timeUp();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        document.querySelector('.timer').classList.remove('warning', 'danger');
    }

    timeUp() {
        this.incorrectAnswers++;
        this.showNotification('Time\'s up!', 'error');
        
        // Show correct answer
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.option');
        options[question.correct].classList.add('correct');
        
        // Disable all options
        options.forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        
        // Enable next button
        document.getElementById('next-btn').disabled = false;
    }

    updateTimerDisplay() {
        document.getElementById('time-left').textContent = this.timeLeft;
    }

    updateProgress() {
        document.getElementById('current-question').textContent = this.currentQuestion + 1;
        document.getElementById('total-questions').textContent = this.questions.length;
    }

    endQuiz() {
        this.stopTimer();
        this.showResults();
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        // Update results
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('total-score').textContent = this.questions.length;
        document.getElementById('score-percentage').textContent = percentage + '%';
        document.getElementById('correct-answers').textContent = this.correctAnswers;
        document.getElementById('incorrect-answers').textContent = this.incorrectAnswers;
        document.getElementById('total-time').textContent = this.totalTime;
        
        // Set performance message
        this.setPerformanceMessage(percentage);
        
        this.showScreen('results-screen');
    }

    setPerformanceMessage(percentage) {
        const title = document.getElementById('performance-title');
        const message = document.getElementById('performance-message');
        
        if (percentage >= 90) {
            title.textContent = 'Excellent!';
            message.textContent = 'Outstanding performance! You really know your stuff!';
        } else if (percentage >= 70) {
            title.textContent = 'Great Job!';
            message.textContent = 'Well done! You have a good understanding of this topic.';
        } else if (percentage >= 50) {
            title.textContent = 'Good Effort!';
            message.textContent = 'Not bad! Keep learning and you\'ll improve.';
        } else {
            title.textContent = 'Keep Learning!';
            message.textContent = 'Don\'t worry! Practice makes perfect. Try again!';
        }
    }

    retryQuiz() {
        this.startQuiz();
    }

    showWelcomeScreen() {
        // Reset selections
        document.querySelectorAll('.category-card').forEach(c => {
            c.classList.remove('selected');
        });
        this.selectedCategory = null;
        this.updateStartButton();
        
        this.showScreen('welcome-screen');
    }

    shareScore() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const text = `I scored ${this.score}/${this.questions.length} (${percentage}%) on the Quiz Master app! Can you beat my score?`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Quiz Master Score',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Score copied to clipboard!', 'success');
            });
        }
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.add('active');
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const messageElement = document.getElementById('notification-message');
        
        messageElement.textContent = message;
        notification.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

// Console welcome message
console.log(`
%cWelcome to Quiz Master! 🧠
%c
%cTest your knowledge across multiple categories
%cBuilt with HTML5, CSS3, and Vanilla JavaScript
%c
%cFeatures:
%c- Multiple categories (General, Science, History, Technology)
%c- Three difficulty levels
%c- Real-time scoring and timer
%c- Responsive design
%c- Interactive animations
`, 
'color: #667eea; font-size: 20px; font-weight: bold;',
'',
'color: #6b7280; font-size: 14px;',
'color: #10b981; font-size: 12px;',
'',
'color: #f59e0b; font-size: 12px;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;'
); 