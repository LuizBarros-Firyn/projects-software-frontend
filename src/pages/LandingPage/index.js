import React from 'react';
import { Link } from 'react-router-dom'

import { FiTerminal } from 'react-icons/fi';
import officeWoman from '../../assets/woman_working.svg'
import { FaFacebookSquare, FaGithub, FaLinkedin } from 'react-icons/fa';

import './styles.css';

export default function Home() {
    return (
        <div className="landing-page-container">
            <header>
                <div className="header-links">
                    <Link className="button" to="/about">
                        Sobre
                    </Link>
                    <Link className="button" to="/bug_report">
                        Relatar erro
                    </Link>
                </div>
                <div className="header-buttons">
                    <Link className="button" to="/register">
                        Registre-se
                    </Link>
                    <Link className="button" to="/login">
                        Login
                    </Link>
                </div>
            </header>
            <div className="sections-container">
                <section className="info-elements">
                    <div className="logo-style">
                        <FiTerminal size={80} color="#e02041" />
                        <strong>Projects</strong>
                    </div>
                    <strong>Freelancing, reimaginado.</strong>
                    <p>Faça parte do revolucionário sistema de freelancing
                        que está mudando a maneira que os profissionais autônomos
                        trabalham. Na plataforma Projects, você pode contratar ou formar sua
                        equipe com programadores e dominar o mercado!
                    </p>
                    <text className="company-email">luizbarros.incode@gmail.com</text>
                    <text className="company-phone">(43) 99999-9999</text>
                    <div className="social-media">
                        <a href="https://www.facebook.com/luiz.dsfiry">
                            <FaFacebookSquare size={30} color="#e02041"/>
                        </a>
                        <a href="https://github.com/LuizBarros-Firyn">
                            <FaGithub size={30} color="#e02041"/>
                        </a>
                        <a href="https://www.linkedin.com/in/luiz-barros-aa734b1a9">
                            <FaLinkedin size={30} color="#e02041"/>
                        </a>
                    </div>
                </section>
                <img src={officeWoman} alt="Group" />
            </div>
        </div>
    );
}