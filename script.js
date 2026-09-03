function playGuessingGame() {
    let playAgain = true;

    while (playAgain) {
        // 1. สุ่มตัวเลขระหว่าง 0 ถึง 10
        const randomNumber = Math.floor(Math.random() * 11);
        let guessedCorrectly = false;

        // 2. ลูปทายตัวเลขไปเรื่อยๆ จนกว่าจะถูก
        while (!guessedCorrectly) {
            let userGuess = prompt("Guess a number between 0 and 10:");

            // ถ้าผู้ใช้กด Cancel
            if (userGuess === null) {
                alert("Game cancelled.");
                return;
            }

            userGuess = Number(userGuess);

            // 3. ตรวจสอบเงื่อนไขตามโจทย์
            if (userGuess === randomNumber) {
                alert("Yeah, you guessed it");
                guessedCorrectly = true;
            } else if (userGuess < randomNumber) {
                alert("too low, try again");
            } else if (userGuess > randomNumber) {
                alert("too high, try again");
            } else {
                alert("Please enter a valid number!");
            }
        }

        // 4. ถามผู้เล่นว่าจะเล่นต่อหรือเลิก (Play again or quit)
        let choice = confirm("Do you want to play again?");
        if (!choice) {
            playAgain = false;
            alert("Thanks for playing!");
        }
    }
}

// เรียกใช้งานฟังก์ชันเริ่มเกม
playGuessingGame();