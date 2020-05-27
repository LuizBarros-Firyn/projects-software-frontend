import React, { useEffect, useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../../services/api';

import NoProjectsFound from '../../../assets/no_projects_found.svg';
import { FiTerminal, FiPower, FiChevronDown } from 'react-icons/fi';

import './styles.css';

export default function FreelancerMain() {
    const [projects, setProjects] = useState([]);
    const [isUserTeamOwner, setIsUserTeamOwner] = useState();
    const userSession = JSON.parse(localStorage.getItem('userSession'));

    const history = useHistory();

    useEffect(() => {
        if (!userSession.user_is_freelancer) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }

        api.get('available_projects').then(response => {
            setProjects(response.data);
        });
        
        api.get('team_owner_verifications', {
            headers: {
                team_id: userSession.user_team_id,
                user_id: userSession.user_id
            }
        }).then(response => {
            setIsUserTeamOwner(response.data.user_is_team_owner);
        });
    }, [history, userSession.user_is_freelancer, userSession.user_team_id, userSession.user_id]);

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    function sendProjectId(projectId) {
        localStorage.setItem('projectId', projectId);
    }

    return(
        <div className="freelancer-main-container">        
            <header>
                <div className="welcome-group">
                    <FiTerminal size={40} color="#e02041" />
                    <span>Bem vindo, {userSession.user_name}</span>
                </div>
                <div className="features">
                    <Link className="button" to="/ongoing_projects" >
                        Projetos em Andamento
                    </Link>
                    {isUserTeamOwner ?
                        <Fragment>
                            <div className="dropdown">
                                <Link className="button button-dropdown">
                                    Equipe <FiChevronDown size={20} color="#000"/>
                                </Link>
                                <ul className="dropdown-options">
                                    <li>
                                        <Link to="/team">
                                            Chat da equipe
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/team_settings">
                                            Configurações da equipe
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/joining_solicitations_review">
                                            Solicitações de entrada
                                        </Link>
                                    </li>
                                    <li>
                                        <Link>
                                            Membros da equipe
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Fragment>
                    :
                        <Link className="button" to="/team">
                            Equipe
                        </Link>
                    }
                </div>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Projetos disponíveis</h1>
            {projects.length <= 0 &&
                <div className="projects-not-found">
                    <h1>Ainda não há projetos publicados! =(</h1>
                    <img src={NoProjectsFound} alt="No Projects Found" />
                    <h1>Ajude a compartilhar a plataforma para que novos clientes publiquem projetos!</h1>
                </div>
            }
            <ul>
                {projects.map(project => (
                    <li key={project._id}>
                        <strong>TITULO:</strong>
                        <p>{project.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{project.description}</p>
                        <Link className="button" to="/new_offer" onClick={() => sendProjectId(project._id)}>
                            Fazer proposta
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}