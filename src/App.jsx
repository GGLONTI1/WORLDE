import './App.css'
import { useEffect, useState } from 'react';


function App() {

  const [solution, setSolution] = useState("WORLD")
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentGuess] = useState("")
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    const handleType = (event) => {
      if (isGameOver) {
        return;
      }
      if (event.key === "Enter") {
        if (currentGuess.length !== 5) {
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex(value => value == null)] = currentGuess;
        setGuesses(newGuesses)
        setCurrentGuess("")

        const isCorrect = solution.toUpperCase() === currentGuess.toUpperCase();
        if (isCorrect) {
          setIsGameOver(true);
        }

      }

      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1))
        return;
      }
      if (currentGuess.length >= 5) {
        return;
      }
      const isLetter = event.key.match(/^[a-z]$/) != null;
      if (isLetter) {
        setCurrentGuess(prevGuess => prevGuess + event.key);
      }
    }
    window.addEventListener("keydown", handleType)

    return () => window.removeEventListener("keydown", handleType)

  }, [currentGuess, isGameOver, solution, guesses])



  return (
    <div className='board'>
      {
        guesses.map((guess, index) => {
          const isCurrentGuess = index === guesses.findIndex(value => value == null)
          return (
            <Line
              key={index}
              guess={isCurrentGuess ? currentGuess : guess ?? ""}
              isFinal={!currentGuess && guess != null}
              solution={solution}
            />
          )
        })
      }
      {currentGuess}
    </div>
  )
}

export default App

function Line({ guess, solution, isFinal }) {
  const tiles = []

  for (let i = 0; i < 5; i++) {

    const char = guess[i];
    let className = "tile";
    if (isFinal) {
      if (char.toUpperCase() === solution[i]) {
        className += " correct"
      } else if (
        solution.includes(char.toUpperCase())
      ) {
        className += " close"
      } else {
        className += " incorrect"
      }
    }
    
    tiles.push(
      <div
        key={i}
        className={className}>{char}
      </div>
    )
  }
  return (
    <div className='line'>{tiles}</div>
  )
}

