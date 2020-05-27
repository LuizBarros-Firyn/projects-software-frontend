import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import FreelancerMain from '../../components/main/FreelancerMain';
import ClientMain from '../../components/main/ClientMain';
import TeamsIntroduction from '../TeamsIntroduction';

import './styles.css';

export default function Main() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');

    const history = useHistory();

    useEffect(() => {
        if (!userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }
        
        console.log(userSession);
    }, [history, userIsAuthenticated, userSession]);

    if (!userIsAuthenticated){
        return <h1>Forbidden</h1>;
    }

    if (userSession.user_is_freelancer && userSession.user_has_team) {
        return <FreelancerMain />
    } else if (userSession.user_is_freelancer && !userSession.user_has_team) {
        return <TeamsIntroduction />
    }
    
    if (!userSession.user_is_freelancer) {
        return <ClientMain />
    }
}