import { useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'

function LandingPage() {
  return (
    <main className="auth-card">
      <h1>Trading Card App</h1>
      <p>Please choose an option to continue.</p>
      <div className="actions">
        <Link to="/signin" className="action-button">
          Sign In
        </Link>
        <Link to="/signup" className="action-button">
          Sign Up
        </Link>
      </div>
    </main>
  )
}

function SignInPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

    if (!username.trim() || !password.trim()) {
      setError('Please provide both username and password.')
      return
    }

    setError('')
    navigate('/blank')
  }

  return (
    <main className="auth-card">
      <h1>Sign In</h1>
      <form className="auth-form" onSubmit={onSubmit}>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          autoComplete="username"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          autoComplete="current-password"
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="action-button">
          Log In
        </button>
      </form>
      <Link to="/">Back to home</Link>
    </main>
  )
}

function SignUpPage() {
  return (
    <main className="auth-card">
      <h1>Sign Up</h1>
      <p>Sign up flow placeholder.</p>
      <Link to="/">Back to home</Link>
    </main>
  )
}

function BlankPage() {
  return <main className="blank-page" aria-label="blank page"></main>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/blank" element={<BlankPage />} />
    </Routes>
  )
}

export default App
