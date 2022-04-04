import React from 'react'
import './styles/login.css'

export default function Register() {
  return (
    <div className="login">
      <h1>Login</h1>
      <form method="post">
        <input
          type="text"
          name="u"
          placeholder="Username"
          required="required"
        />
        <input
          type="password"
          name="p"
          placeholder="Password"
          required="required"
        />
        <button type="submit" class="btn btn-primary btn-block btn-large">
          Login
        </button>
      </form>
    </div>
  )
}