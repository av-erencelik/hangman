import React, { useEffect, useRef, useState } from "react";
import Button from "../button/Button";

const Game = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [remainingGuesses, setRemainingGuesses] = useState(7);
  const [isGameStart, setIsGameStart] = useState(false);
  const [word, setWord] = useState("");
  const [renderedWord, setRenderedWord] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [isRestartGame, setIsRestartGame] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState<HTMLButtonElement[]>(
    []
  );
  function drawHangman() {
    const ctx: CanvasRenderingContext2D | null | undefined = canvas.current
      ? canvas.current.getContext("2d")
      : null;
    if (ctx == null) {
      return;
    }
    ctx.strokeStyle = "#000";
    if (remainingGuesses <= 7) {
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(175, 225);
      ctx.lineTo(5, 225);
      ctx.moveTo(40, 225);
      ctx.stroke();
    }
    if (remainingGuesses <= 6) {
      ctx.lineTo(25, 5);
      ctx.lineTo(100, 5);
      ctx.lineTo(100, 25);
      ctx.stroke();
    }
    if (remainingGuesses <= 5) {
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(100, 50, 25, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.stroke();
    }
    if (remainingGuesses <= 4) {
      ctx.beginPath();
      ctx.moveTo(100, 75);
      ctx.lineTo(100, 140);
      ctx.stroke();
    }
    if (remainingGuesses <= 3) {
      ctx.beginPath();
      ctx.moveTo(100, 85);
      ctx.lineTo(60, 100);
      ctx.stroke();
    }
    if (remainingGuesses <= 2) {
      ctx.beginPath();
      ctx.moveTo(100, 85);
      ctx.lineTo(140, 100);
      ctx.stroke();
    }
    if (remainingGuesses <= 1) {
      ctx.beginPath();
      ctx.moveTo(100, 140);
      ctx.lineTo(80, 190);
      ctx.stroke();
    }
    if (remainingGuesses <= 0) {
      ctx.beginPath();
      ctx.moveTo(100, 140);
      ctx.lineTo(125, 190);
      ctx.stroke();
    }
  }
  function handleSelectLetter(e: React.MouseEvent<HTMLButtonElement>) {
    const button: HTMLButtonElement = e.currentTarget;
    button.disabled = true;
    let copyDisabledButtons = disabledButtons.slice();
    let copyWordArray = renderedWord.slice();
    copyDisabledButtons.push(button);
    setDisabledButtons(copyDisabledButtons);
    let isWordContainsLetter = false;
    word.split("").map((letter, index) => {
      if (letter === button.innerHTML) {
        copyWordArray[index] = button.innerHTML;
        isWordContainsLetter = true;
      }
    });
    if (isWordContainsLetter) {
      setRenderedWord(() => copyWordArray);
    } else {
      setRemainingGuesses((prev) => prev - 1);
    }
  }
  function checkGameOver() {
    if (renderedWord == word.split("")) {
      setGameStatus("You guessed the correct word!");
      setShowModal(true);
    } else if (remainingGuesses <= 0) {
      setGameStatus(
        `You couldn't guess correct word! Correct word was "${word}"`
      );
      setShowModal(true);
    }
  }
  function restartGame() {
    const ctx: CanvasRenderingContext2D | null | undefined = canvas.current
      ? canvas.current.getContext("2d")
      : null;
    ctx?.clearRect(0, 0, 200, 250);
    disabledButtons.map((button) => (button.disabled = false));
    setDisabledButtons([]);
    setShowModal(false);
    setRenderedWord([]);
    setWord("");
    setRemainingGuesses(7);
    setIsRestartGame((prev) => !prev);
  }
  useEffect(() => {
    drawHangman();
  }, [remainingGuesses, canvas, isGameStart]);
  useEffect(() => {
    const getWord = async () => {
      const response = await fetch(
        `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=0&minLength=5&maxLength=15&api_key=${
          import.meta.env.VITE_WORDNIK_API_KEY
        }`
      );
      const data = await response.json();
      const returnedWord: string = data.word
        .toUpperCase()
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
      setWord(returnedWord);
      setRenderedWord(() => returnedWord.split("").map(() => ""));
    };
    if (isGameStart || isRestartGame) {
      getWord();
    }
  }, [isGameStart, isRestartGame]);
  useEffect(() => {
    checkGameOver();
  }, [remainingGuesses, renderedWord]);
  return (
    <div className="flex-1 bg-cyan-300 flex justify-center items-center flex-col gap-5 p-5">
      {!isGameStart ? (
        <button
          className="bg-black text-cyan-300 p-2 px-5 rounded-sm hover:bg-cyan-300 hover:text-black transition-all border-2 border-black font-semibold"
          onClick={() => setIsGameStart(true)}
        >
          START
        </button>
      ) : (
        <>
          <div className="flex-col items-center justify-center md:flex-row flex gap-5">
            <div className="">
              <canvas
                ref={canvas}
                width="200"
                height="250"
                className=" z-20"
              ></canvas>
            </div>

            <div className="w-[300px] h-[200px] flex gap-3 flex-wrap justify-center items-center">
              <Button onClick={handleSelectLetter}>A</Button>
              <Button onClick={handleSelectLetter}>B</Button>
              <Button onClick={handleSelectLetter}>C</Button>
              <Button onClick={handleSelectLetter}>D</Button>
              <Button onClick={handleSelectLetter}>E</Button>
              <Button onClick={handleSelectLetter}>F</Button>
              <Button onClick={handleSelectLetter}>G</Button>
              <Button onClick={handleSelectLetter}>H</Button>
              <Button onClick={handleSelectLetter}>I</Button>
              <Button onClick={handleSelectLetter}>J</Button>
              <Button onClick={handleSelectLetter}>K</Button>
              <Button onClick={handleSelectLetter}>L</Button>
              <Button onClick={handleSelectLetter}>M</Button>
              <Button onClick={handleSelectLetter}>N</Button>
              <Button onClick={handleSelectLetter}>O</Button>
              <Button onClick={handleSelectLetter}>P</Button>
              <Button onClick={handleSelectLetter}>Q</Button>
              <Button onClick={handleSelectLetter}>R</Button>
              <Button onClick={handleSelectLetter}>S</Button>
              <Button onClick={handleSelectLetter}>T</Button>
              <Button onClick={handleSelectLetter}>U</Button>
              <Button onClick={handleSelectLetter}>V</Button>
              <Button onClick={handleSelectLetter}>W</Button>
              <Button onClick={handleSelectLetter}>X</Button>
              <Button onClick={handleSelectLetter}>Y</Button>
              <Button onClick={handleSelectLetter}>Z</Button>
            </div>
          </div>
          <div className="flex gap-5 md:w-[500px] w-[300px] justify-center flex-wrap">
            {renderedWord.map((letter, index) => {
              return (
                <div
                  key={index}
                  className="w-[40px] h-[40px] font-bold text-3xl border-b-2 border-black text-center"
                >
                  {letter}
                </div>
              );
            })}
          </div>
          {showModal && (
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative my-6 mx-auto w-auto max-w-3xl">
                  <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                    <div className="relative flex-auto p-6 flex items-center flex-col">
                      <p className="my-4 p-1 text-lg leading-relaxed text-gray-800">
                        {gameStatus}
                      </p>
                      <button
                        onClick={restartGame}
                        className="bg-black text-cyan-300 p-2 rounded-sm border-2 border-black hover:bg-cyan-300 hover:text-black transition-all font-medium"
                      >
                        New Game
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Game;
