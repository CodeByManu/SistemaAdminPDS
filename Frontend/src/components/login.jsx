import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSuccess = (response) => {
    fetch('/auth/google_oauth2/callback', {
      method: 'POST',
      body: JSON.stringify({ token: response.credential }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Login Successful:', data);
        // Redirige o actualiza el estado de la aplicación
      });
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    // Implementa la lógica para login con email y contraseña
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      
      {/* Formulario de Login */}
      <form onSubmit={handleEmailLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log in with Email</button>
      </form>

      {/* Opción para loguearse con Google */}
      <div>
        <p>Or log in with:</p>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </div>
  );
};

export default Login;
