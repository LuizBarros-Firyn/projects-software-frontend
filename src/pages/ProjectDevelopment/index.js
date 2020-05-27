import React, { useEffect, useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiTerminal, FiPower } from 'react-icons/fi';

import './styles.css';

export default function ProjectDevelopment() {
    const [project, setProject] = useState([]);
    const [projectMessages, setProjectMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');
    const projectId = localStorage.getItem('projectId');

    const history = useHistory();

    useEffect(() => {
        if (!userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }
        
        async function fetchPageData() {
            await api.get(`ongoing_projects/${projectId}`, {
                headers:
                    {
                        request_owner: userSession.user_is_freelancer ? userSession.user_team_id : userSession.user_id
                    }            
                }   
            ).then(response => {
                setProject(response.data);
            });
    
            await api.get(`project_messages/${projectId}`, {
                headers: {
                        sender_id: userSession.user_is_freelancer ? userSession.user_team_id : userSession.user_id
                }            
            }).then(response => {
                setProjectMessages(response.data);
            });
        }

        fetchPageData();
    }, [history, userIsAuthenticated, userSession.user_is_freelancer, userSession.user_id, userSession.user_team_id, projectId]);

    async function handleNewMessage() {
        if (newMessage.length > 400) {
            alert("Por favor, reduza o numero de caracteres ou divida a mensagem em duas.");
            return;
        }

        const data = {
            message: newMessage
        }

        try {
            await api.post('project_messages', data, {
                headers: {
                    project_id: projectId,
                    sender_id: userSession.user_is_freelancer ? userSession.user_team_id : userSession.user_id
                }
            }).then(response => {
                setProjectMessages([...projectMessages, response.data]);
            })
        } catch (error) {
            alert('Erro ao enviar a mensagem, tente novamente mais tarde');
        }

        setNewMessage('');
    }
    
    async function handleSendToApproval() {
        try {
            await api.put(`project_approval_state/${project._id}`).then(response => {
                setProject(response.data);
            });

            alert('Enviado com sucesso!');
        } catch (error) {
            alert('Erro ao enviar para aprovação, tente mais tarde');
        }
    }

    async function handleApprove() {
        try {
            await api.put(`ongoing_projects/${project._id}`);

            alert('Aprovado com sucesso! Agradecemos por fazer negócios em nossa plataforma!');

            history.push('/main');
        } catch (error) {
            alert("Erro ao aprovar projeto, tente mais tarde");
        }
    }

    async function handleRefuse() {
        try {
            await api.delete(`project_approval_state/${project._id}`).then(response => {
                setProject(response.data);
            });

            alert('Projeto recusado!');
        } catch (error) {
            alert('Erro ao recusar projeto, tente mais tarde');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/login');
    }

    function renderButtons() {
        if (!project.is_sent_for_approval && userSession.user_is_freelancer) {
            return (
                <Fragment>
                    <button className="button" onClick={handleSendToApproval} >
                        Marcar como entregue
                    </button>
                </Fragment>
            );
        } else if (project.is_sent_for_approval && !userSession.user_is_freelancer) {
            return (
                <Fragment>
                    <button className="button" onClick={handleApprove} >
                        Aprovar
                    </button>
                    <button className="button" onClick={handleRefuse} style={{ marginLeft: "15" }} >
                        Recusar
                    </button>
                </Fragment>
            );
        }
    }

    return(
        <div className="project-development-container">        
            <header>
                <div className="welcome-group">
                    <FiTerminal size={40} color="#e02041" />
                    <span>Bem vindo, {userSession.user_name}</span>
                </div>
                <div className="features">
                    { renderButtons() }
                    <Link className="button" to="/main" >
                        Home
                    </Link>
                </div>
                <button className="logout" onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>{project.title}</h1>
            <div className="chat-container">
                <div className="messages">
                    <ul>
                        {projectMessages.map(projectMessage => (
                            <li key={projectMessage._id}>
                                {userSession.user_is_freelancer ?
                                    projectMessage.sender === userSession.user_team_id ?
                                        <Fragment>
                                            <div className="session-user-messages">
                                                <strong>{project.team.title}</strong>
                                                <p>{projectMessage.message}</p>
                                            </div>
                                        </Fragment>
                                    :
                                        <Fragment>
                                            <div className="interlocutor-messages">
                                                <strong>{project.user.name}</strong>
                                                <p>{projectMessage.message}</p>
                                            </div>
                                        </Fragment>
                                :
                                    projectMessage.sender === userSession.user_id ?
                                        <Fragment>
                                            <div className="session-user-messages">
                                                <strong>{project.user.name}</strong>
                                                <p>{projectMessage.message}</p>
                                            </div>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <div className="interlocutor-messages">
                                                <strong>{project.team.title}</strong>
                                                <p>{projectMessage.message}</p>
                                            </div>
                                        </Fragment>            
                                }
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="new-message">
                    <input 
                        placeholder="Digite sua mensagem"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                    />
                    <button className="button" onClick={() => handleNewMessage()} style={{ backgroundColor: "#e02041" }}>Enviar</button>
                </div>
            </div>
        </div>
    );
}