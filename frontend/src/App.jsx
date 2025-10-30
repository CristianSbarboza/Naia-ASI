import React from 'react'
import MainRouter from './routers/MainRouter'
import { StoryProvider } from "./context/StoryContext";

const App = () => {
  return (
    <StoryProvider>
      <MainRouter/>
    </StoryProvider>

  )
}

export default App