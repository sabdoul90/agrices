import React, { useState} from 'react';
import "./footer.css"; // Assurez-vous que le fichier CSS est importé


function Footer() {
  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <div className="column">
          <Header />
        </div>
        <div className="column">
          <Navigation />
        </div>
        <div className="column">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function Header() {
  
  return (
    <header>
      <div className="logo-container">
        <div className="logo-text"></div>
        <div className="organization-name">
        Direction Régionale de l’Agriculture du Centre-Est
        </div>
      </div>
      <div className="contact-info">
        <div className="contact-details">
          Contact : +226 24 71 00 49
          <div className="contacts"></div>
        </div>
        <div className="email-info">E-mail : drarahces@gmail.com</div>
      </div>
    </header>
  );
}


function Navigation() {
  const navLinks = ["Accueil", "Actualités", "Informations", "Se connecter"];

  return (
    <nav>
      {navLinks.map((link, index) => (
        <div
          key={index}
          className="nav-link"
          style={{ marginTop: index > 0 ? "23px" : 0 }}
        >
          {link}
        </div>
      ))}
    </nav>
  );
}

function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch('https://shogun15ab.pythonanywhere.com/message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Message envoyé avec succès:', data);
        // Réinitialiser le formulaire après un envoi réussi
        setEmail('');
        setMessage('');
      } else {
        console.error('Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="chat-title">Chattez avec nous</div>
      <div className="form-input">
        <input
          type="email"
          id="email"
          placeholder="E-mail"
          aria-label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-input">
        <textarea
          id="message"
          placeholder="Message"
          aria-label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="card-buttons">Envoyer</button>
    </form>
  );
}

export default Footer;
