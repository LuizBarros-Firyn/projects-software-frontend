import React, { useEffect, useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import NoProjectsFound from '../../assets/no_projects_found.svg';
import { FiTerminal, FiPower, FiArrowRight } from 'react-icons/fi';

import './styles.css';

export default function OngoingProjects() {
    const [projects, setProjects] = useState([]);
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');

    const history = useHistory();

    useEffect(() => {
        if (!userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }
        
        api.get('ongoing_projects', {
            headers: userSession.user_is_freelancer ? 
                {
                    team_id: userSession.user_team_id
                }
                :
                {
                    user_id: userSession.user_id
                }
            }
        ).then(response => {
            setProjects(response.data);
        });
    }, [history, userIsAuthenticated, userSession.user_is_freelancer, userSession.user_id, userSession.user_team_id]);

    function handleLogout() {
        localStorage.clear();

        history.push('/login');
    }

    function sendProjectInfo(projectId, projectTitle) {
        localStorage.setItem('projectId', projectId);
        localStorage.setItem('projectTitle', projectTitle);
    }

    return(
        <div className="ongoing-projects-container">        
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
            <h1>Projetos Publicados</h1>
            {projects.length <= 0 &&
                <div className="projects-not-found">
                    <h1>Ainda não há projetos em andamento! =(</h1>
                    <img src={NoProjectsFound} alt="No Projects Found" />
                    <h1>Faça propostas aos projetos e aguarde até que suas ofertas sejam aceitas!</h1>
                </div>
            }
            <ul>
                {projects.map(project => (
                    <li key={project._id}>
                        <strong>NOME:</strong>
                        <p>{project.title}</p>
                        {userSession.user_is_freelancer ?
                            <Fragment>
                                <strong>CLIENTE:</strong>
                                <p>{project.user.name}</p>
                            </Fragment>
                        :
                            <Fragment>
                                <strong>EQUIPE:</strong>
                                <p>{project.team.title}</p>
                            </Fragment>
                        }   
                        <Link to="/project_development" onClick={() => sendProjectInfo(project._id, project.title)}>
                            <FiArrowRight size={30} color="#000" />
                            <h3>Acompanhar o desenvolvimento deste projeto</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}