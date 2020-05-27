import React, { useEffect, useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiTerminal, FiPower } from 'react-icons/fi';

import './styles.css';

export default function Team() {
    const [teamMessages, setTeamMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [teamTitle, setTeam] = useState('');
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = JSON.parse(localStorage.getItem('userIsAuthenticated'));

    const history = useHistory();

    useEffect(() => {
        if (!userIsAuthenticated || !userSession.user_has_team) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }
    
        api.get(`team_messages/${userSession.user_team_id}`).then(response => {
            setTeamMessages(response.data);
        });

        api.get(`teams/${userSession.user_team_id}`).then(response => {
            setTeam(response.data.title);
        });
    }, [history, userIsAuthenticated, userSession.user_has_team, userSession.user_team_id]);

    async function handleNewMessage() {
        if (newMessage.length > 400) {
            alert("Por favor, reduza o numero de caracteres ou divida a mensagem em duas.");
            return;
        }

        const data = {
            message: newMessage
        }

        try {
            await api.post('team_messages', data, {
                headers: {
                    sender_id: userSession.user_id,
                    team_id: userSession.user_team_id
                }
            }).then(response => {
                setTeamMessages([...teamMessages, response.data]);
            })
        } catch (error) {
            alert('Erro ao enviar a mensagem, tente novamente mais tarde');
        }

        setNewMessage('');
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/login');
    }

    return(
        <div className="team-container">        
            <header>
                <div className="welcome-group">
                    <FiTerminal size={40} color="#e02041" />
                    <span>Bem vindo, {userSession.user_name}</span>
                </div>
                <div className="features">
                    <Link className="button" to="/main" >
                        Home
                    </Link>
                </div>
                <button className="logout" onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
                <h1>Chat da equipe {teamTitle}</h1>
            <div className="chat-container">
                <div className="messages">
                    <ul>
                        {teamMessages.map(teamMessage => (
                            <li key={teamMessage._id}>
                                { teamMessage.sender._id === userSession.user_id ?
                                    <Fragment>
                                        <div className="session-user-messages">
                                            <strong>{teamMessage.sender.name}</strong>
                                            <p>{teamMessage.message}</p>
                                        </div>
                                    </Fragment>
                                :
                                    <Fragment>
                                        <div className="interlocutors-messages">
                                            <strong>{teamMessage.sender.name}</strong>
                                            <p>{teamMessage.message}</p>
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