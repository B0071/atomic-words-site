import './App.css'

export default function App({ text = "Atomic Words — coming soon." }) {
  return (
    <main className="centered-stage">
      <p className="centered-italic-text">{text}</p>
    </main>
  )
}
