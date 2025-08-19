
import React from 'react';
import { Language, LanguageCode } from '../constants';
import { useCart } from '../context/CartContext';

interface HeaderProps {
    t: (key: keyof Language) => string;
    setLang: (lang: LanguageCode) => void;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ t, setLang, onCartClick }) => {
    const { cartCount } = useCart();

    const navLinks = [
        { href: '#packages', key: 'nav.packages' },
        { href: '#products', key: 'nav.products' },
        { href: '#event-planner', key: 'nav.planner' },
        { href: '#mascots', key: 'nav.mascots' },
        { href: '#media', key: 'nav.media' },
        { href: '#permits', key: 'nav.permits' },
        { href: '#contact', key: 'nav.contact' },
    ] as const;

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className="sticky top-0 z-30 bg-[rgba(5,2,15,0.7)] backdrop-blur-md border-b border-[rgba(158,0,255,0.3)] shadow-[0_0_20px_rgba(158,0,255,0.2)]">
            <div className="container mx-auto px-4 flex items-center gap-4 py-2.5">
                <a className="logo-font flex items-center gap-2.5 font-black text-white text-xl" href="#hero">
                    <img src="/assets/party-accessoires-verhuur-logo.jpg" alt="Party Accessoires Verhuur logo" className="h-11 rounded-md" />
                    <span className="sr-only">AKCESORIA IMPREZOWE VERHUUR</span>
                </a>
                <div className="hidden md:flex items-center gap-2 flex-wrap mx-auto">
                    {navLinks.map(link => (
                        <a 
                            key={link.key} 
                            href={link.href} 
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="btn-ghost-nav !text-sm !font-semibold !border-none !bg-transparent hover:!bg-[rgba(158,0,255,0.2)] transition-colors"
                        >
                            {t(link.key)}
                        </a>
                    ))}
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                    <button onClick={() => setLang('pl')} className="btn-ghost !p-2 !rounded-lg text-sm">🇵🇱</button>
                    <button onClick={() => setLang('nl')} className="btn-ghost !p-2 !rounded-lg text-sm">🇳🇱</button>
                    <button onClick={onCartClick} className="relative btn-ghost !px-4 !py-2">
                        🛒
                        <span className="absolute -right-2 -top-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-[#05020f] text-[#d8b4fe] border border-[rgba(158,0,255,0.5)]">
                            {cartCount}
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
