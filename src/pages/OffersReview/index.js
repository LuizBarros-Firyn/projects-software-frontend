import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import NoResults from '../../assets/no_results.svg';
import { FiTerminal, FiPower } from 'react-icons/fi';

import './styles.css';

export default function OffersReview() {
    const [offers, setOffers] = useState([]);
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const projectId = localStorage.getItem('projectId');
    const projectTitle = localStorage.getItem('projectTitle');
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');
    const authorization = localStorage.getItem('authorization');

    const history = useHistory();

    useEffect(() => {
        if (userSession.user_is_freelancer || !userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }

        api.get('offers', {
            headers: {
                user_id: userSession.user_id,
                project_id: projectId,
                authorization
            }
        }).then(response => {
            setOffers(response.data);
        });
    }, [history, projectId, userIsAuthenticated, userSession.user_id, userSession.user_is_freelancer, authorization]);

    function handleLogout() {
        localStorage.clear();

        history.push('/login');
    }

    async function handleDeleteOffer(id) {
        try {
            await api.delete(`offers/${id}`, {
                headers: {
                    user_id: userSession.user_id,
                    authorization
                }
            });

            setOffers(offers.filter(offers => offers._id !== id));
        } catch {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    async function handleAcceptOffer(offer) {
        const data = {
            price: offer.price,
            start_date: offer.start_date,
            finish_date: offer.finish_date
        }

        try {
            await api.put(`assign_project_team/${offer.project}`, data, {
                headers: {
                    user_id: userSession.user_id,
                    team_id: offer.team._id,
                    authorization
                }
            });

            history.push('/ongoing_projects');
        } catch {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString('pt-BR',options);
    }

    return(
        <div className="offers-review-container">        
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
            <h1>Propostas referentes ao projeto: {projectTitle}</h1>
            {offers.length <= 0 &&
                <div className="no-results">
                    <h1>Ainda não foi feita nenhuma oferta para este projeto!</h1>
                    <img src={NoResults} alt="No Projects Found" />
                    <h1>Tente voltar mais tarde!</h1>
                </div>
            }
            <ul>
                {offers.map(offer => (
                    <li key={offer._id}>
                        <strong>NOME DA EQUIPE:</strong>
                        <Link className="team-link" to={`/team_profile/${offer.team._id}`}>{offer.team.title}</Link>
                        <strong>DESCRIÇÃO DA PROPOSTA:</strong>
                        <p>{offer.description}</p>
                        <strong>DATA DE INICIO:</strong>
                        <p>{formatDate(offer.start_date)}</p>
                        <strong>DATA DE ENTREGA:</strong>
                        <p>{formatDate(offer.finish_date)}</p>
                        <strong>PREÇO:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(offer.price)}</p>
                        <div className="choice-buttons">
                            <button className="button" onClick={() => handleDeleteOffer(offer._id)} style={{backgroundColor: "#e02041"}}>
                                Recusar
                            </button>
                            <button className="button" onClick={() => handleAcceptOffer(offer)} style={{backgroundColor: "#e02041"}}>
                                Aceitar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}