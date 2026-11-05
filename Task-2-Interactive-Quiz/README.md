# Task 2 - Interactive Quiz Website

## Features

- Multiple-choice questions stored in a JavaScript question bank.
- Category labels, progress indicator and real-time score.
- Instant correct/incorrect feedback with explanations.
- Locks answers after one selection to prevent duplicate submissions.
- Results summary with correct, incorrect and accuracy counts.
- Restart without reloading the page; responsive, touch-friendly interface.

## Tech stack

HTML5, CSS3 and Vanilla JavaScript ES6+.

## Run locally

Open this folder in VS Code and run `index.html` with Live Server, or open the file directly in a browser. The questions are stored in `script.js`.

## State logic

`bank` stores JSON questions; `index` tracks the current question; `score` counts correct answers; `answered` locks the current question after one selection. `render()` draws a question, `choose()` checks the answer and updates the UI, `results()` shows the final summary, and Restart resets the state without a reload.

## Question format

Each question object has `id`, `category`, `question`, `options`, `answer` (zero-based index) and `explanation`. Add or edit question objects in the `bank` array at the top of `script.js`.
