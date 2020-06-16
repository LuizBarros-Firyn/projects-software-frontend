import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiTerminal } from 'react-icons/fi';
import profile from '../../assets/profile.svg'

import './styles.css';

export default function OnboardingSteps() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');

    const history = useHistory();

    useEffect(() => {
        if (!userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }
    }, [history, userIsAuthenticated, userSession]);

    return (
        <div className="onboarding-steps-container">
            <header>
                <Link className="button" to="/main">
                    Home
                </Link>
            </header>
            <div className="sections-container">
                <section className="info-elements">
                    <div className="logo-style">
                        <FiTerminal size={80} color="#e02041" />
                        <strong>Projects</strong>
                    </div>
                    <strong>Seja bem vindo(a), {userSession.user_name}</strong>
                    <p>Agora é a hora de personalizar seu perfil para deixa-lo com a sua cara!
                        Adicione uma foto de perfil e uma descrição personalizada!
                    </p>
                    <div className="options">
                        <Link className="button" to={ userSession.user_is_freelancer ? "/freelancer_profile_settings" : "/client_profile_settings"}>
                            Personalizar agora!
                        </Link>
                        <Link className="button" to="/main">
                            Pular
                        </Link>
                    </div>
                </section>
                <img src={profile} alt="profile" />
            </div>
        </div>
    );
}