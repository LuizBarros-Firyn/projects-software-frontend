import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiTerminal, FiPower } from 'react-icons/fi';
import goals from '../../assets/goals.svg'

import './styles.css';

export default function Gamification() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');

    const history = useHistory();

    useEffect(() => {
        if (!userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }
    }, [history, userIsAuthenticated, userSession]);

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="gamification-container">
            <header>
                <div className="welcome-group">
                    <FiTerminal size={40} color="#e02041" />
                    <span>Bem vindo(a), {userSession.user_name}</span>
                </div>
                <Link className="button" to="/main" >
                    Home
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <div className="sections-container">
                <section className="info-elements">
                    <div className="logo-style">
                        <FiTerminal size={80} color="#e02041" />
                        <strong>Projects</strong>
                    </div>
                    <strong>Seja bem vindo ao sistema de gamification!</strong>
                    <p>O sistema projects te agradece por suas boas ações na plataforma, e em retorno, te da bonificações!</p>
                    <div className="options">
                        <Link className="button" to={`/gamifications_bonuses`}>
                            Minhas bonificações
                        </Link>
                    </div>
                </section>
                <img src={goals} alt="goals" />
            </div>
        </div>
    );
}