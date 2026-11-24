import './App.css'

export default function App({ text = "Your custom centered text here" }) {
  return (
    <main className="centered-stage">
      <p className="centered-italic-text">{text}</p>
    </main>
  )
}
