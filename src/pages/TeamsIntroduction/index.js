import React from 'react';
import { Link, useHistory } from 'react-router-dom'

import Team from '../../assets/team.svg';
import { FiTerminal, FiPower } from 'react-icons/fi';

import './styles.css';
import { useEffect } from 'react';

export default function TeamsIntroduction() {
    const history = useHistory();
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = JSON.parse(localStorage.getItem('userIsAuthenticated'));

    useEffect(() => {
        if (userSession.user_has_team || !userIsAuthenticated) {
            history.push('/team');
        }
    });

    function handleLogout() {
        localStorage.clear();
    
        history.push('/');
    }
    
    return (
        <div className="teams-introduction-container">
           <header>
                <div className="welcome-group">
                    <FiTerminal size={40} color="#e02041" />
                    <span>Seja bem vindo ao Teams!</span>
                </div>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <div className="sections">
                <section className="intro">
                    <h1>Individuos criam, equipes inovam.</h1>
                    <img src={Team} alt="Team"/>
                </section>
                <section className="info">
                    <p>Na plataforma Projects, você pode se juntar a outros profissionais qualificados e trabalhar em conjunto para desenvolver grandes projetos.</p>
                    <Link to="/create_team" className="button">Criar sua própia equipe</Link>
                    <Link to="/teams" className="button">Entrar em uma equipe</Link>
                </section>
            </div>
        </div>
    );
}