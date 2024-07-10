import React, { useState, useEffect } from "react";
import './actualite_page.css';
import Home from "../home";
import Image from "../image_slider";
import Footer from "../footer";

function Informations() {
    const [newsData, setNewsData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInformations = async () => {
            const token = localStorage.getItem('access_token');

            if (!token) {
                setError('Vous devez être connecté pour voir les informations.');
                return;
            }

            try {
                const response = await fetch("https://shogun15ab.pythonanywhere.com/informations/", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setNewsData(data);
                } else {
                    setError('Vous n\'êtes pas autorisé à voir ces informations.');
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des informations :", error);
                setError('Une erreur s\'est produite lors de la récupération des informations.');
            }
        };

        fetchInformations();
    }, []);

    return (
        <div>
            <Home />
            <Image />
            <section className="news-sections">
                <header className="news-headers">INFORMATIONS</header>
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

export default Informations;
