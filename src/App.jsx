
import { PianoBoard } from "./components/PianoBoard/PianoBoard.jsx";

import "./App.css";

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1>88-Key Polyphonic Piano</h1>
        <p>
          React 19 · Memoization · Concurrent FIFO Audio
        </p>
      </header>

      <section className="app__piano">
        <PianoBoard />
      </section>
    </main>
  );
}

export default App;
