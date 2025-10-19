// อ่านข้อมูลจากแป้นพิมพ์ใน Terminal
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin, //รับข้อมูลจากแป้นพิมพ์
  output: process.stdout //แสดงข้อความออกหน้าจอ
});

//ใช้ Infinity เพื่อให้ค่าที่เล็กกว่าแทนที่ได้ภายหลัง
let highScore = Infinity;

function startGame() {
  console.log("\n=== Number Guessing Game ===");

  rl.question("Select difficulty (easy / medium / hard): ", (level) => {
    let maxNumber, maxAttempts;

    switch (level.toLowerCase()) {
      case "easy":
        maxNumber = 50;
        maxAttempts = 15;
        break;
      case "hard":
        maxNumber = 200;
        maxAttempts = 7;
        break;
      default:
        maxNumber = 100;
        maxAttempts = 10;
        break;
    }
    //ค่าที่สุ่มให้ผู้ที่เล่นทาย
    const target = Math.floor(Math.random() * maxNumber) + 1;
    let attempts = 0;

    console.log(`I'm thinking of a number between 1 and ${maxNumber}`);
    console.log(`You have ${maxAttempts} attempts to guess it!`);

    //ฟังก์ชันสำหรับรับคำตอบจากผู้เล่น
    function askGuess() {
      if (attempts >= maxAttempts) {
        console.log(`\n You've used all ${maxAttempts} attempts. You lose!`);
        console.log(`The number was: ${target}`);
        return playAgain();
      }

      rl.question(`\nAttempt ${attempts + 1}/${maxAttempts}\nEnter your guess: `, (input) => {
        const guess = Number(input);

        //ตรวจสอบความถูกต้องของข้อมูล
        //ค่าที่กรอกจะต้องเป็นตัวเลข
        if (isNaN(guess)) {
          console.log("Invalid input! Please enter a number.");
          return askGuess();
        }
        //ต้องอยู่ในช่วงที่กำหนดไว้
        if (guess < 1 || guess > maxNumber) {
          console.log(`Out of range! Please enter a number between 1 and ${maxNumber}.`);
          return askGuess();
        }

        attempts++;
        //ถ้าทายถูกให้แสดงจำนวนครั้งที่ทาย
        if (guess === target) {
          console.log(`Congratulations! You guessed the number in ${attempts} attempts!`);
          //ถ้าทายได้น้อยบันทึกเป็น high score
          if (attempts < highScore) {
            highScore = attempts;
            console.log(`New High Score: ${highScore} attempts!`);
          } else {
            console.log(`Best Score: ${highScore} attempts.`);
          }
          return playAgain();
          //ถ้าทายผิดจะให้บอกว่ามากหรือน้อยกว่า
        } else if (guess < target) {
          console.log("Too low! Try a higher number.");
        } else {
          console.log("Too high! Try a lower number.");
        }

        //hint เมื่อทายผิด 5 ครั้ง
        if (attempts === 5) {
          const rangeLow = Math.max(1, target - 10);
          const rangeHigh = Math.min(maxNumber, target + 10);
          console.log(`Hint: The number is between ${rangeLow} and ${rangeHigh}`);
        }

        console.log(`Attempts left: ${maxAttempts - attempts}`);
        askGuess();
      });
    }

    askGuess();
  });
}

//ฟังก์ชันหลังจบเกมจะถามว่าอยากเล่นอีกรอบหรือไม่
function playAgain() {
  rl.question("\nPlay again? (yes/no): ", (answer) => {
    if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
      startGame();
    } else {
      console.log("Thanks for playing! Goodbye!");
      rl.close();
    }
  });
}

startGame();
