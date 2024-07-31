import React from 'react'
import TikTakToe from '../../../components/tilTakToe/tikTakToe'
import AiChatBox from '../../../components/aiChatBot/aiChatBox'

export default function Game() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" >
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <h1>Game Page</h1>
            < TikTakToe />
            < AiChatBox />
        </div>
    </main>
  )
}
