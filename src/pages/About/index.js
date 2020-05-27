import React from 'react';
import { Link } from 'react-router-dom';

import { FiTerminal, FiArrowLeft } from 'react-icons/fi';
import { FaFacebookSquare, FaInstagram, FaWhatsapp } from 'react-icons/fa';

import './styles.css';

export default function About() {
    return (
        <div className="about-container">    
            <section className="logo">
            <header>
                <Link to="/">
                    <FiArrowLeft size={30} color="#e02041" />
                    <text>Voltar</text>
                </Link>
            </header>
                <section className="logo-element">
                    <div className="logo-style">
                        <FiTerminal size={80} color="#000" />
                        <strong>Projects</strong>
                    </div>
                </section>
                
            </section>

            <section className="info">
                <section className="info-elements">
                    <strong>Freelancing. Reformulado.</strong>
                    <p>Faça parte do revolucionário sistema de freelancing
                        que está mundando a maneira que os profissionais autonomos
                        trabalham. Na plataforma Projects, você pode formar sua
                        equipe com outros programadores e dominar o mercado!
                    </p>
                    <text className="company-email">emaildaplataforma@gmail.com</text>
                    <text className="company-phone">(43) 98989-9797</text>
                    <div className="social-media">
                        <FaFacebookSquare className="first-icon" size={30} color="#FFF"/>
                        <FaInstagram size={30} color="#FFF"/>
                        <FaWhatsapp size={30} color="#FFF"/>
                    </div>
                </section>
            </section>
        </div>
    );
}