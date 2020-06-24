import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiTerminal, FiPower, FiCheck } from 'react-icons/fi';
import Trophy from '../../assets/trophy.svg';
import Baby from '../../assets/baby.svg';
import TeamSquare from '../../assets/team_square.svg';
import HandShake from '../../assets/handshake.svg';
import Medal from '../../assets/medal.svg';
import Gears from '../../assets/gears.svg';

import './styles.css';

export default function Gamification() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');
    const authorization = localStorage.getItem('authorization');
    const [userGamificationStatus, setUserGamificationStatus] = useState();

    const history = useHistory();

    useEffect(() => {
        if (!userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }

        api.get('user_gamification_status', {
            headers: {
                user_id: userSession.user_id,
                authorization
            }
        }).then(response => {setUserGamificationStatus(response.data); console.log(response.data)});
    }, [history, userSession.user_is_freelancer, userSession.user_id, userIsAuthenticated, authorization]);

    async function handleRedeemBonification(bonification) {
        try {
            await api.put('redeem_bonification', {}, {
                headers: {
                    user_id: userSession.user_id,
                    bonification,
                    authorization
                }
            });

            alert('Recompensa resgatada com sucesso!');
        } catch (error) {
            alert('Falha ao resgatar sua recompensa, tente novamente mais tarde!');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/login');
    }

    return(
        <div className="gamification-container">        
            <header>
                <div className="welcome-group">
                    <FiTerminal size={40} color="#e02041" />
                    <span>Bem vindo, {userSession.user_name}</span>
                </div>
                <Link className="button" to="/main">
                    Home
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Bonificações</h1>
            <ul>
                <li key='1' className={userGamificationStatus && userGamificationStatus.three_successful_projects_streak ? "achieved" : "not-achieved"}>
                    <div className="content">
                        <div className="texts">
                            <strong>TRÊS PROJETOS BEM-SUCEDIDOS</strong>
                            <p>Juntamente com a sua equipe, entregue três bons projetos dentro do prazo!</p>
                        </div>
                        <img src={Trophy} alt="Trophy" />
                    </div>
                    <button className="button" 
                        disabled={userGamificationStatus && userGamificationStatus.three_successful_projects_streak ? false : true} 
                        onClick={() => handleRedeemBonification(3)}>Resgatar recompensa
                    </button>
                </li>
                <li key='2' className={userGamificationStatus && userGamificationStatus.five_successful_projects_streak ? "achieved" : "not-achieved"}>
                    <div className="content">
                        <div className="texts">
                            <strong>CINCO PROJETOS BEM-SUCEDIDOS</strong>
                            <p>Juntamente com a sua equipe, entregue cinco bons projetos dentro do prazo!</p>
                        </div>
                        <img src={Trophy} alt="Trophy" />
                    </div>
                    <button className="button"
                        disabled={userGamificationStatus && userGamificationStatus.five_successful_projects_streak ? false : true} 
                        onClick={() => handleRedeemBonification(5)}>Resgatar recompensa</button>
                </li>
            </ul>
            <h1>Conquistas</h1>
            <ul>
                <li key='1' className={userGamificationStatus && userGamificationStatus.onboardingSteps ? "achieved" : "not-achieved"} >
                    <div className="content">
                        <div className="texts">
                            <header>
                                <strong>PRIMEIROS PASSOS</strong>
                                <FiCheck className="check-icon" />
                            </header>
                            <p>Adicione uma foto de perfil e descrição para que outros usuários lhe conheçam melhor!</p>
                        </div>
                        <img src={Baby} alt="Trophy" />
                    </div>
                </li>
                <li key='2'className={userGamificationStatus && userGamificationStatus.team ? "achieved" : "not-achieved"} >
                    <div className="content">
                        <div className="texts">
                            <header>
                                <strong>A IRMANDADE</strong>
                                <FiCheck className="check-icon" />
                            </header>
                            <p>Ninguém vive bem sem ter amigos! Junte-se a uma equipe!</p>
                        </div>
                        <img src={TeamSquare} alt="Trophy" />
                    </div>
                </li>
                <li key='3'className={userGamificationStatus && userGamificationStatus.finishedProjects >= 1 ? "achieved" : "not-achieved"} >
                    <div className="content">
                        <div className="texts">
                            <header>
                                <strong>O PRIMEIRO DE MUITOS</strong>
                                <FiCheck className="check-icon" />
                            </header>
                            <p>Juntamente com sua equipe, complete seu primeiro projeto na plataforma!</p>
                        </div>
                        <img src={HandShake} alt="Trophy" />
                    </div>
                </li>
                <li key='4'className={userGamificationStatus && userGamificationStatus.finishedProjects >= 3 ? "achieved" : "not-achieved"} >
                    <div className="content">
                        <div className="texts">
                            <header>
                                <strong>TRÍPLICE SUCESSO</strong>
                                <FiCheck className="check-icon" />
                            </header>
                            <p>Complete três projetos dentro da plataforma!</p>
                        </div>
                        <img src={Medal} alt="Trophy" />
                    </div>
                </li>
                <li key='5'className={userGamificationStatus && userGamificationStatus.finishedProjects >= 5 ? "achieved" : "not-achieved"} >
                    <div className="content">
                        <div className="texts">
                            <header>
                                <strong>CINCO ESTRELAS</strong>
                                <FiCheck className="check-icon" />
                            </header>
                            <p>Complete cinco projetos dentro da plataforma!</p>
                        </div>
                        <img src={Medal} alt="Trophy" />
                    </div>
                </li>
                <li key='6'className={userGamificationStatus && userGamificationStatus.finishedProjects >= 10 ? "achieved" : "not-achieved"} >
                    <div className="content">
                        <div className="texts">
                            <header>
                                <strong>NOTA 10</strong>
                                <FiCheck className="check-icon" />
                            </header>
                            <p>Complete dez projetos dentro da plataforma!</p>
                        </div>
                        <img src={Medal} alt="Trophy" />
                    </div>
                </li>
                <li key='7'className={userGamificationStatus && userGamificationStatus.finishedProjects >= 10 ? "achieved" : "not-achieved"} >
                    <div className="content">
                        <div className="texts">
                            <header>
                                <strong>JÁ ATÉ PERDI AS CONTAS...</strong>
                                <FiCheck className="check-icon" />
                            </header>
                            <p>Complete vinte e cinco projetos dentro da plataforma!</p>
                        </div>
                        <img src={Medal} alt="Trophy" />
                    </div>
                </li>
                <li key='8'className={userGamificationStatus && userGamificationStatus.finishedProjects >= 50 ? "achieved" : "not-achieved"} >
                    <div className="content">
                        <div className="texts">
                            <header>
                                <strong>CINQUENTINHA</strong>
                                <FiCheck className="check-icon" />
                            </header>
                            <p>Complete cinquenta projetos dentro da plataforma!</p>
                        </div>
                        <img src={Medal} alt="Trophy" />
                    </div>
                </li>
                <li key='9'className={userGamificationStatus && userGamificationStatus.finishedProjects >= 100 ? "achieved" : "not-achieved"} >
                    <div className="content">
                        <div className="texts">
                            <header>
                                <strong>MAGO SUPREMO</strong>
                                <FiCheck className="check-icon" />
                            </header>
                            <p>Complete cem projetos dentro da plataforma!</p>
                        </div>
                        <img src={Medal} alt="Trophy" />
                    </div>
                </li>
                <li key='10'className={userGamificationStatus && userGamificationStatus.fiveTechs ? "achieved" : "not-achieved"} >
                    <div className="content">
                        <div className="texts">
                            <header>
                                <strong>TECHIE</strong>
                                <FiCheck className="check-icon" />
                            </header>
                            <p>Domine mais de cinco tecnologias!</p>
                        </div>
                        <img src={Gears} alt="Trophy" />
                    </div>
                </li>
            </ul>
        </div>
    );
}