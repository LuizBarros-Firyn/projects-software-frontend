import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../../services/api';

import NoProjectsFound from '../../../assets/no_projects_found.svg';
import { FiTerminal, FiPower, FiArrowRight } from 'react-icons/fi';

import './styles.css';

export default function ClientMain() {
    const [projects, setProjects] = useState([]);
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');
    const authorization = localStorage.getItem('authorization');

    const history = useHistory();

    useEffect(() => {
        if (userSession.user_is_freelancer || !userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }

        api.get('projects_offers', {
            headers: {
                user_id: userSession.user_id,
                authorization
            }
        }).then(response => {
            setProjects(response.data);
        });
    }, [history, userSession.user_is_freelancer, userSession.user_id, userIsAuthenticated, authorization]);

    function handleLogout() {
        localStorage.clear();

        history.push('/login');
    }

    function sendProjectInfo(projectId, projectTitle) {
        localStorage.setItem('projectId', projectId);
        localStorage.setItem('projectTitle', projectTitle);
    }

    return(
        <div className="client-main-container">        
            <header>
                <div className="welcome-group">
                    <FiTerminal size={40} color="#e02041" />
                    <span>Bem vindo, {userSession.user_name}</span>
                </div>
                <div className="features">
                    <Link className="button" to="/ongoing_projects" >
                        Projetos em Andamento
                    </Link>
                    <Link className="button" to="/new_project" >
                        Publicar um Projeto!
                    </Link>
                    <Link className="button" to={`/profile/${userSession.user_id}`}>
                        Perfil
                    </Link>
                </div>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Projetos Publicados</h1>
            {!projects.length > 0 ?
                <div className="projects-not-found">
                    <h1>Você ainda não publicou nenhum projeto!</h1>
                    <img src={NoProjectsFound} alt="No Projects Found" />
                    <Link className="button" to="/new_project" >
                        Publicar seu primeiro projeto!
                    </Link>
                </div>
            :
                <ul>
                    {projects.map(project => (
                        <li key={project._id}>
                            <strong>NOME:</strong>
                            <p>{project.title}</p>
                            <strong>DESCRIÇÃO:</strong>
                            <p>{project.description}</p>
                            <Link to="/offers_review" onClick={() => sendProjectInfo(project._id, project.title)}>
                                <FiArrowRight size={30} color="#000" />
                                <h3>Rever {project.offers_quantity} ofertas disponíveis para este projeto</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}