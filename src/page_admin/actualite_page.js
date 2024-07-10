import React, { useState, useEffect } from "react";
import './actualite_page.css';
import Home from "../home";
import Image from "../image_slider";
import Footer from "../footer";

function Actualites() {
    const [newsData, setNewsData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActualites = async () => {
            try {
                const response = await fetch("https://shogun15ab.pythonanywhere.com/actualites/", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setNewsData(data);
                } else {
                    const errorMessage = response.status === 500 
                        ? 'Erreur interne du serveur. Veuillez réessayer plus tard.' 
                        : 'Vous n\'êtes pas autorisé à voir ces actualités.';
                    setError(errorMessage);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des actualités :", error);
                setError('Une erreur s\'est produite lors de la récupération des actualités.');
            }
        };

        fetchActualites();
    }, []);

    return (
        <div>
            <Home />
            <Image />
            <section className="news-sections">
                <header className="news-headers">ACTUALITES</header>
                {error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    newsData.map((item, index) => (
                        <article className="news-articles" key={index}>
                            <img className="news-images" loading="lazy" src={item.image} alt="" />
                            <div className="news-contents">
                                <h2 className="news-titles">{item.texte}</h2>
                                <p className="news-details">{item.details}</p>
                                <time className="news-dates">{formatDate(item.date)}</time>
                            </div>
                        </article>
                    ))
                )}
            </section>
            <Footer />
        </div>
    );
}

// Fonction pour formater la date au format "YYYY-MM-DD"
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ajoute un zéro devant si le mois est < 10
    const day = ('0' + date.getDate()).slice(-2); // Ajoute un zéro devant si le jour est < 10
    return `${year}-${month}-${day}`;
}

export default Actualites;
