document.addEventListener("DOMContentLoaded", function () {
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        
        name = name.trim().replace(/[<>]/g, "");
        email = email.trim().replace(/[<>]/g, "");
        message = message.trim().replace(/[<>]/g, "");

        
        const contactData = {
            name: name,
            email: email,
            message: message
        };

        console.log("ข้อมูลที่เก็บไว้:", contactData);
        alert(`ขอบคุณครับคุณ ${name}\nระบบได้รับข้อความเรียบร้อยแล้ว!`);

        contactForm.reset();
    });
}

    // 2. สร้างปุ่ม Scroll to Top แบบไดนามิก
    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.innerHTML = "↑";
    scrollTopBtn.id = "scrollTopBtn";
    scrollTopBtn.title = "Go to top";
    document.body.appendChild(scrollTopBtn);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
        let visitorCount = localStorage.getItem("visitorCount");

    if (visitorCount === null) {
    visitorCount = 1;
    } else {
    visitorCount = Number(visitorCount) + 1;
    }

        localStorage.setItem("visitorCount", visitorCount);

    const visitorCountElement = document.getElementById("visitorCount");  // ← ต้องมีตัวแปร
    if (visitorCountElement) {
        visitorCountElement.textContent = visitorCount;
    }

    const burgerBtn = document.getElementById("burgerBtn");
    const navMenu = document.getElementById("navMenu");

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }

});

// ==============================
//  Number Guessing Game
// ==============================

function playGuessingGame() {
    let wantToPlay = true;

    while (wantToPlay) {
        playOneRound();
        wantToPlay = askToPlayAgain();
    }

    alert("Thanks for playing!");
}

function playOneRound() {
    const secretNumber = generateRandomNumber();
    let isCorrect = false;
    let attempts = 0;

    while (!isCorrect) {
        const guess = getUserGuess();

        if (guess === null) {
            alert("Game cancelled.");
            return;
        }

        attempts++;
        isCorrect = checkGuess(guess, secretNumber, attempts);
    }
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 11);
}

function getUserGuess() {
    let input = prompt("Guess a number between 0 and 10:");

    if (input === null) return null;

    input = input.trim();
    if (input === "" || isNaN(input)) {
        alert("Please enter a valid number!");
        return getUserGuess();
    }

    return Number(input);
}

function checkGuess(guess, secretNumber, attempts) {
    if (guess === secretNumber) {
        alert(`Yeah, you guessed it! (Total tries: ${attempts})`);
        return true;
    }

    if (guess < secretNumber) {
        alert("too low, try again");
    } else {
        alert("too high, try again");
    }

    return false;
}

function askToPlayAgain() {
    return confirm("Do you want to play again?");
}

let carGameAnimation;
let carGameKeyHandler;

function openCarGame() {
    const modal = document.getElementById("carGameModal");
    const canvas = document.getElementById("carGameCanvas");
    const context = canvas.getContext("2d");
    let carX = canvas.width / 2 - 18;
    let obstacleY = -60;
    let obstacleX = Math.random() * (canvas.width - 36);
    let gameOver = false;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    carGameKeyHandler = function (event) {
        if (event.key === "ArrowLeft") carX = Math.max(10, carX - 18);
        if (event.key === "ArrowRight") carX = Math.min(canvas.width - 46, carX + 18);
    };
    document.addEventListener("keydown", carGameKeyHandler);

    function drawGame() {
        context.fillStyle = "#263238";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#eceff1";
        for (let lineY = 0; lineY < canvas.height; lineY += 70) {
            context.fillRect(canvas.width / 2 - 3, lineY, 6, 35);
        }

        context.fillStyle = "#2ecc71";
        context.fillRect(carX, canvas.height - 70, 36, 55);
        context.fillStyle = "#e74c3c";
        context.fillRect(obstacleX, obstacleY, 36, 45);

        if (!gameOver) {
            obstacleY += 5;
            if (obstacleY > canvas.height) {
                obstacleY = -60;
                obstacleX = Math.random() * (canvas.width - 36);
            }

            const hit = obstacleY + 45 > canvas.height - 70 && obstacleY < canvas.height - 15 &&
                obstacleX < carX + 36 && obstacleX + 36 > carX;
            if (hit) {
                gameOver = true;
                context.fillStyle = "#ffffff";
                context.font = "bold 24px sans-serif";
                context.textAlign = "center";
                context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
            }
        }

        carGameAnimation = requestAnimationFrame(drawGame);
    }

    drawGame();
}

function closeCarGame() {
    const modal = document.getElementById("carGameModal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    cancelAnimationFrame(carGameAnimation);
    if (carGameKeyHandler) {
        document.removeEventListener("keydown", carGameKeyHandler);
    }
}

let ticTacToeBoard = ["", "", "", "", "", "", "", "", ""];
let ticTacToePlayer = "X";
let ticTacToeFinished = false;

function openTicTacToe() {
    const modal = document.getElementById("ticTacToeModal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    resetTicTacToe();
}

function closeTicTacToe() {
    const modal = document.getElementById("ticTacToeModal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
}

function resetTicTacToe() {
    ticTacToeBoard = ["", "", "", "", "", "", "", "", ""];
    ticTacToePlayer = "X";
    ticTacToeFinished = false;
    renderTicTacToe();
}

function renderTicTacToe() {
    const boardElement = document.getElementById("ticTacToeBoard");
    const statusElement = document.getElementById("ticTacToeStatus");
    boardElement.innerHTML = "";

    ticTacToeBoard.forEach(function (value, index) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "tic-tac-toe-cell";
        cell.textContent = value;
        cell.addEventListener("click", function () {
            playTicTacToeCell(index);
        });
        boardElement.appendChild(cell);
    });

    statusElement.textContent = ticTacToeFinished
        ? statusElement.textContent
        : `Player ${ticTacToePlayer}'s turn`;
}

function playTicTacToeCell(index) {
    if (ticTacToeFinished || ticTacToeBoard[index] !== "") return;

    ticTacToeBoard[index] = ticTacToePlayer;
    const winner = getTicTacToeWinner();
    const statusElement = document.getElementById("ticTacToeStatus");

    if (winner) {
        ticTacToeFinished = true;
        statusElement.textContent = `Player ${winner} wins!`;
    } else if (ticTacToeBoard.every(Boolean)) {
        ticTacToeFinished = true;
        statusElement.textContent = "It's a draw!";
    } else {
        ticTacToePlayer = ticTacToePlayer === "X" ? "O" : "X";
    }

    renderTicTacToe();
}

function getTicTacToeWinner() {
    const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const line of winningLines) {
        const [first, second, third] = line;
        if (ticTacToeBoard[first] &&
            ticTacToeBoard[first] === ticTacToeBoard[second] &&
            ticTacToeBoard[first] === ticTacToeBoard[third]) {
            return ticTacToeBoard[first];
        }
    }

    return null;
}

// ==============================
//  Carousel / Slideshow
// ==============================
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("carousel-slide");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

