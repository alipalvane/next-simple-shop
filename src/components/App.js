'use client'

import Navbar from './Navbar'

function App({ children }) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <main>{children}</main>
    </div>
  )
}

export default App
