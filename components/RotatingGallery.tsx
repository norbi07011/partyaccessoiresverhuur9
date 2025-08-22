import React from 'react';
import { Language, MASCOTS } from '../constants';

interface RotatingGalleryProps {
    t: (key: keyof Language) => string;
}

const RotatingGallery: React.FC<RotatingGalleryProps> = ({ t }) => {
    // We'll use 8 mascots for an even 45-degree distribution.
    const displayMascots = MASCOTS.slice(0, 8);

    return (
        <>
            <section id="mascots" className="gallery-section">
                <div className="container mx-auto px-4 flex flex-col items-center">
                     <h2 className="logo-font text-3xl font-bold text-center mb-16">{t('mascots.title')}</h2>
                    <div className="gallery-box">
                        {displayMascots.map((mascot, index) => (
                            <span key={index} style={{ '--i': index + 1 } as React.CSSProperties}>
                                <div className="mascot-card">
                                    <img src={mascot.img} alt={mascot.alt} className="card-bg" loading="lazy" />
                                    {/* Używamy tylko jednego obrazu, ponieważ characterImg może nie być dostępne */}
                                    <div className="card-info">
                                        <h3 className="card-title">{mascot.name}</h3>
                                        <p className="card-subtitle">{mascot.subtitle}</p>
                                    </div>
                                </div>
                            </span>
                        ))}
                    </div>
                </div>
            </section>
            <style>{`
                /* --- Section setup --- */
                .gallery-section {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 80vh;
                    padding: 4rem 0;
                    overflow: hidden;
                }

                /* --- Main rotating container --- */
                .gallery-box {
                    position: relative;
                    width: 250px;
                    height: 350px;
                    transform-style: preserve-3d;
                    animation: animate-rotation 30s linear infinite;
                }
                
                /* --- Pause animation on hover --- */
                .gallery-box:hover {
                    animation-play-state: paused;
                }

                @media (min-width: 768px) {
                    .gallery-box {
                        width: 300px;
                        height: 420px;
                    }
                }

                @keyframes animate-rotation {
                    0%   { transform: perspective(1500px) rotateY(0deg); }
                    100% { transform: perspective(1500px) rotateY(360deg); }
                }

                /* --- Individual rotating card holders (spans) --- */
                .gallery-box span {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    transform-origin: center;
                    transform-style: preserve-3d;
                    transform: rotateY(calc(var(--i) * 45deg)) translateZ(400px);
                    transition: transform 0.5s ease-in-out;
                }
                
                @media (max-width: 767px) {
                   .gallery-box span {
                     transform: rotateY(calc(var(--i) * 45deg)) translateZ(280px);
                   }
                }
                
                /* Zoom in the focused card on hover */
                .gallery-box span:hover {
                    transform: rotateY(calc(var(--i) * 45deg)) translateZ(400px) scale(1.1);
                }
                 @media (max-width: 767px) {
                   .gallery-box span:hover {
                     transform: rotateY(calc(var(--i) * 45deg)) translateZ(280px) scale(1.15);
                   }
                }

                /* --- The 3D Card itself --- */
                .mascot-card {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    border: 1px solid var(--c-border);
                    transform-style: preserve-3d;
                    transition: transform 0.5s ease;
                }
                
                /* Tilt the card on hover */
                .gallery-box span:hover .mascot-card {
                    transform: rotateY(10deg) rotateX(-5deg);
                    box-shadow: 0 15px 40px rgba(158, 0, 255, 0.4);
                }

                /* --- Card Layers --- */
                .card-bg, .card-info {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                
                .card-bg {
                    object-fit: cover;
                    border-radius: 16px;
                    transition: transform 0.5s ease;
                }
                
                /* Zoom effect on hover */
                .gallery-box span:hover .card-bg {
                    transform: scale(1.05);
                }

                .card-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 1.5rem;
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent 70%);
                    color: white;
                    transform: translateZ(30px);
                    transition: transform 0.5s ease;
                    z-index: 10;
                }
                
                /* Lift card info on hover for 3D effect */
                .gallery-box span:hover .card-info {
                    transform: translateZ(50px);
                }
                
                .card-title {
                    font-family: 'Cinzel', serif;
                    font-size: 1.5rem;
                    font-weight: 800;
                    text-shadow: 0 2px 5px rgba(0,0,0,0.8);
                    margin: 0;
                }
                
                .card-subtitle {
                    font-size: 0.9rem;
                    margin: 0;
                    color: rgba(255,255,255,0.8);
                    text-shadow: 0 1px 3px rgba(0,0,0,0.7);
                }
            `}</style>
        </>
    );
};

export default RotatingGallery;