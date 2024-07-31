"use client";

import React from 'react';
import './App.css';
import Board from './Components/Board';
import { createBoard } from './Engine';

function App() {
  const board = createBoard();
  return (
    <main>
       <Board board={board} className="content"></Board>
    </main>

  );
}

export default App;
