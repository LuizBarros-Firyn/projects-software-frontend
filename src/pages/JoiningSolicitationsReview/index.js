import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import NoProjectsFound from '../../assets/no_projects_found.svg';
import { FiTerminal, FiPower } from 'react-icons/fi';

import './styles.css';

export default function JoiningSolicitationsReview() {
    const [solicitations, setSolicitations] = useState([]);
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');

    const history = useHistory();

    useEffect(() => {
        if (!userSession.user_has_team || !userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }

        try {
            api.get('team_owner_verifications', {
                headers: {
                    team_id: userSession.user_team_id,
                    user_id: userSession.user_id
                }
            }).then(response => {
                if (!response.data.user_is_team_owner)
                    history.push('/main');
            });

            api.get('team_joining_solicitations', {
                headers: {
                    team_id: userSession.user_team_id,
                    user_id: userSession.user_id
                }
            }).then(response => {
                setSolicitations(response.data);
            });
        } catch (error) {
            alert("Não foi possível acessar, tente novamente mais tarde");

            history.push('/main');
        }
    }, [history, userIsAuthenticated, userSession.user_has_team, userSession.user_id, userSession.user_team_id]);

    function handleLogout() {
        localStorage.clear();

        history.push('/login');
    }

    async function handleDeleteSolicitation(id) {
        try {
            await api.delete(`team_joining_solicitations/${id}`, {
                headers: {
                    user_id: userSession.user_id,
                }
            });

            setSolicitations(solicitations.filter(solicitations => solicitations._id !== id));
        } catch {
            alert('Erro ao deletar solicitação, tente novamente mais tarde');
        }
    }

    async function handleAcceptSolicitation(solicitation) {
        try {
            await api.post('team_joinings', null, {
                headers: {
                    new_member_id: solicitation.user._id,
                    team_id: solicitation.team
                }
            });

            setSolicitations(solicitations.filter(solicitations => solicitations._id !== solicitation._id));

            alert('Candidato aceito com sucesso!');
        } catch {
            alert('Erro ao aceitar o candidato, tente novamente mais tarde');
        }
    }

    function renderFreelancerTechs(techs) {
        return(
            techs.map(tech => (
                <span key={tech} className="freelancer-techs">{tech}</span>
            ))
        );
    }

    return(
        <div className="joining-solicitations-review-container">        
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
            <h1>Solicitações de entrada na equipe</h1>
            {solicitations.length <= 0 &&
                <div className="solicitations-not-found">
                    <h1>Ainda não há solicitações! =(</h1>
                    <img src={NoProjectsFound} alt="No Projects Found" />
                    <h1>Ajude a compartilhar a plataforma para que novos programadores solicitem a entrada!</h1>
                </div>
            }
            <ul>
                {solicitations.map(solicitation => (
                    <li key={solicitation._id}>
                        <strong>NOME DO FREELANCER:</strong>
                        <p>{solicitation.user.name}</p>
                        <strong>IDADE DO FREELANCER:</strong>
                        <p>{solicitation.user.age}</p>
                        <strong>PRINCIPAIS TÉCNOLOGIAS:</strong>
                        <p className="techs-field">{renderFreelancerTechs(solicitation.user.techs)}</p>
                        <strong>MENSAGEM DE SOLICITAÇÃO:</strong>
                        <p>{solicitation.message}</p>
                        <div className="choice-buttons">
                            <button className="button" onClick={() => handleDeleteSolicitation(solicitation._id)} style={{backgroundColor: "#e02041"}}>
                                Recusar
                            </button>
                            <button className="button" onClick={() => handleAcceptSolicitation(solicitation)} style={{backgroundColor: "#e02041"}}>
                                Aceitar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}