import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import NoResults from '../../assets/no_results.svg';
import { FiTerminal, FiPower, FiArrowRight } from 'react-icons/fi';

import './styles.css';

export default function Teams() {
    const [teams, setTeams] = useState([]);
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');

    const history = useHistory();

    useEffect(() => {
        console.log(userSession.user_has_team);
        console.log(userIsAuthenticated);
        if (userSession.user_has_team || !userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }

        api.get('teams').then(response => {
            setTeams(response.data);
        }); 
    }, [userSession.user_has_team, userIsAuthenticated, history]);

    function handleLogout() {
        localStorage.clear();

        history.push('/login');
    }

    function sendTeamInfo(teamId, teamTitle, teamOwner) {
        localStorage.setItem('teamId', teamId);
        localStorage.setItem('teamTitle', teamTitle);
        localStorage.setItem('teamOwner', teamOwner);
    }

    return(
        <div className="teams-container">        
            <header>
                <div className="welcome-group">
                    <FiTerminal size={40} color="#e02041" />
                    <span>Bem vindo, {userSession.user_name}</span>
                </div>
                <Link className="button" to="/main" >
                    Home
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Equipes contratando</h1>
            {teams.length <= 0 &&
                <div className="no-results">
                    <h1>Ainda não há nenhuma equipe contratando!</h1>
                    <img src={NoResults} alt="No Projects Found" />
                    <h1>Tente voltar mais tarde!</h1>
                </div>
            }
            <ul>
                {teams.map(team => (
                    <li key={team._id}>
                        <strong>NOME:</strong>
                        <p>{team.title}</p>
                        <strong>DESCRIÇÃO DA EQUIPE</strong>
                        <p>{team.description}</p>
                        <Link to="/team_joining_solicitation" onClick={() => sendTeamInfo(team._id, team.title, team.owner)}>
                            <FiArrowRight size={30} color="#000" />
                            <h3>Solicitar entrada nesta equipe</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}