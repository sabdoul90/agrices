import React, { useState } from 'react';
import './connexion_page.css';
import Image from '../image_slider';
import Home from '../home';
import Footer from '../footer';
import { useNavigate } from 'react-router-dom';

function Connexion() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification du username et du password
    if (username === 'agriculture' && password === 'agriculture') {
      navigate('/ajout'); // Redirection vers une autre interface
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div>
      <Home />
      <Image />
      <div className="containerses">
        <h1 className="tile">Bienvenue Administrateur</h1>
        <h2 className="subtile">Entrez vos identifiants</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="visually-hidden"></label>
          <input 
            type="text" 
            id="username" 
            className="input-field" 
            placeholder="Nom d'utilisateur ou email" 
            aria-label="Nom d'utilisateur ou email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password" className="visually-hidden"></label>
          <input 
            type="password" 
            id="password" 
            className="password-field" 
            placeholder="Mot de passe" 
            aria-label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">S'identifier</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Connexion;
