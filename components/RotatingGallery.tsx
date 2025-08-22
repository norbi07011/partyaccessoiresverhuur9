import React from 'react';
import { Language, MASCOTS } from '../constants';

interface RotatingGalleryProps {
    t: (key: keyof Language) => string;
}

const RotatingGallery: React.FC<RotatingGalleryProps> = ({ t }) => {
    // We'll use 8 mascots for an even 45-degree distribution.
    const displayMascots = MASCOTS.slice(0, 8);
    
    // Stan do kontrolowania manualnej rotacji galerii
    const [rotationDegree, setRotationDegree] = React.useState<number | null>(null);
    const [isAutoRotating, setIsAutoRotating] = React.useState(true);
    
    // Funkcje do przesuwania galerii w lewo i w prawo
    const rotateLeft = () => {
        setIsAutoRotating(false);
        setRotationDegree(prev => (prev === null ? -45 : prev - 45));
    };
    
    const rotateRight = () => {
        setIsAutoRotating(false);
        setRotationDegree(prev => (prev === null ? 45 : prev + 45));
    };
    
    // Funkcja do resetowania rotacji i włączenia automatycznej animacji
    const resetRotation = () => {
        setRotationDegree(null);
        setIsAutoRotating(true);
    };

    return (
        <>
            <section id="mascots" className="gallery-section">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <h2 className="logo-font text-3xl font-bold text-center mb-16">{t('mascots.title')}</h2>
                    <div className="gallery-controls">
                        <button 
                            className="gallery-control-btn left" 
                            onClick={rotateLeft} 
                            aria-label="Przewiń w lewo"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className={`gallery-box ${isAutoRotating ? 'auto-rotate' : ''}`} 
                             style={rotationDegree !== null ? { transform: `rotateY(${rotationDegree}deg)` } : undefined}>
                            {displayMascots.map((mascot, index) => (
                                <span key={index} style={{ '--i': index + 1 } as React.CSSProperties}>
                                    <div className="mascot-card">
                                        <img src={mascot.img} alt={mascot.alt} className="card-bg" loading="lazy" />
                                        <div className="card-info">
                                            <div className="flex-1"></div>
                                            <div>
                                                <h3 className="card-title">{mascot.name.split(' ').map((word, i) => (
                                                    <React.Fragment key={i}>
                                                        {word}
                                                        {i < mascot.name.split(' ').length - 1 && <br />}
                                                    </React.Fragment>
                                                ))}</h3>
                                                <p className="card-subtitle">{mascot.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            ))}
                        </div>
                        <button 
                            className="gallery-control-btn right" 
                            onClick={rotateRight} 
                            aria-label="Przewiń w prawo"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    
                    {!isAutoRotating && (
                        <button 
                            className="gallery-reset-btn mt-6" 
                            onClick={resetRotation}
                            aria-label="Resetuj i włącz automatyczną rotację"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1 inline">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Auto-rotacja</span>
                        </button>
                    )}
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

                /* --- Gallery Controls Container --- */
                .gallery-controls {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 0 20px;
                }
                
                /* --- Navigation Buttons --- */
                .gallery-control-btn {
                    position: relative;
                    z-index: 10;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: rgba(158, 0, 255, 0.2);
                    border: 1px solid rgba(158, 0, 255, 0.5);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 15px rgba(158, 0, 255, 0.3);
                }
                
                .gallery-control-btn:hover {
                    background: rgba(158, 0, 255, 0.4);
                    box-shadow: 0 0 20px rgba(158, 0, 255, 0.5);
                    transform: scale(1.1);
                }
                
                .gallery-control-btn.left {
                    margin-right: 20px;
                }
                
                .gallery-control-btn.right {
                    margin-left: 20px;
                }
                
                /* --- Reset button --- */
                .gallery-reset-btn {
                    background: rgba(158, 0, 255, 0.2);
                    border: 1px solid rgba(158, 0, 255, 0.5);
                    color: white;
                    border-radius: 16px;
                    padding: 8px 16px;
                    font-size: 0.9rem;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 10px rgba(158, 0, 255, 0.3);
                }
                
                .gallery-reset-btn:hover {
                    background: rgba(158, 0, 255, 0.4);
                    box-shadow: 0 0 15px rgba(158, 0, 255, 0.5);
                    transform: scale(1.05);
                }
                
                /* --- Main rotating container --- */
                .gallery-box {
                    position: relative;
                    width: 280px;
                    height: 400px;
                    transform-style: preserve-3d;
                    transition: transform 0.5s ease;
                }
                
                /* Auto rotation class */
                .gallery-box.auto-rotate {
                    animation: animate-rotation 30s linear infinite;
                }
                
                /* --- Pause animation on hover --- */
                .gallery-box.auto-rotate:hover {
                    animation-play-state: paused;
                }

                @media (min-width: 768px) {
                    .gallery-box {
                        width: 320px;
                        height: 450px;
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
                     transform: rotateY(calc(var(--i) * 45deg)) translateZ(220px);
                   }
                }
                
                /* Zoom in the focused card on hover */
                .gallery-box span:hover {
                    transform: rotateY(calc(var(--i) * 45deg)) translateZ(400px) scale(1.1);
                }
                 @media (max-width: 767px) {
                   .gallery-box span:hover {
                     transform: rotateY(calc(var(--i) * 45deg)) translateZ(220px) scale(1.15);
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
                    background: linear-gradient(to top, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.7) 60%, transparent 90%);
                    color: white;
                    transform: translateZ(30px);
                    transition: transform 0.5s ease;
                    z-index: 10;
                    height: 100%;
                }
                
                /* Lift card info on hover for 3D effect */
                .gallery-box span:hover .card-info {
                    transform: translateZ(50px);
                }
                
                .card-title {
                    font-family: 'Cinzel', serif;
                    font-size: 1.4rem;
                    font-weight: 800;
                    text-shadow: 0 2px 5px rgba(0,0,0,0.8);
                    margin: 0 0 0.5rem 0;
                    line-height: 1.2;
                    text-align: center;
                    word-break: break-word;
                    hyphens: auto;
                }
                
                .card-subtitle {
                    font-size: 0.9rem;
                    margin: 0;
                    color: rgba(255,255,255,0.9);
                    text-shadow: 0 1px 3px rgba(0,0,0,0.7);
                    text-align: center;
                    padding-bottom: 0.5rem;
                }
            `}</style>
        </>
    );
};

export default RotatingGallery;