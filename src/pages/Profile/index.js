import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { FiTerminal, FiPower} from 'react-icons/fi';
import api from '../../services/api';

import Avatar from '../../assets/female_avatar.svg';
import NoCommentsFound from '../../assets/no_results.svg'
import './styles.css';

export default function Profile(props) {
    const [profileData, setProfileData] = useState([]);
    const [profileComments, setProfileComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');
    const authorization = localStorage.getItem('authorization');

    const history = useHistory();

    useEffect(() => {
        if (!userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }

        api.get(`users/${props.match.params.user_id}`, {
            headers: {
                authorization
            }
        }).then(response => {
            setProfileData(response.data);
        });

        api.get('profile_comments', {
            headers:{
                    profile_id: props.match.params.user_id,
                    authorization
            }            
        }).then(response => {
            setProfileComments(response.data);
        });
    }, [userIsAuthenticated, history, props.match.params.user_id, authorization]);

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    async function handleNewComment() {
        if (newComment.length > 400) {
            alert("Por favor, reduza o numero de caracteres do comentário");
            return;
        }

        const data = {
            message: newComment
        }

        try {
            await api.post('profile_comments', data, {
                headers: {
                    maker_id: userSession.user_id,
                    profile_id: props.match.params.user_id,
                    authorization
                }
            }).then(response => {
                setProfileComments([...profileComments, response.data]);
            })
        } catch (error) {
            alert('Erro ao enviar o comentário, tente novamente mais tarde');
        }

        setNewComment('');
    }

    function renderFreelancerTechs(techs) {
        if (techs) { // checks if the parameters have already been set
            return(
                techs.map(tech => (
                    <span key={tech} className="freelancer-techs">{tech}</span>
                ))
            );
        }
    }

    return(
        <div className="profile-container">        
            <header>
                <div className="welcome-group">
                    <FiTerminal size={40} color="#e02041" />
                    <span>Bem vindo, {userSession.user_name}</span>
                </div>
                {userSession.user_id === props.match.params.user_id && userSession.user_is_freelancer &&
                    <h2>Meu saldo: {profileData && profileData.wallet_balance}</h2>
                }
                {userSession.user_id === props.match.params.user_id &&
                    <Link className="button" to={ userSession.user_is_freelancer ? "/freelancer_profile_settings" :"/client_profile_settings"}>
                        Editar Perfil
                    </Link>
                }
                <Link className="button" to="/main" >
                    Home
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            
            <div className="content">
                <div className="user-info">
                    <img className={profileData.photo && 'has-own-photo'} src={
                        profileData.photo ? 
                            `${process.env.REACT_APP_API_URL}/files/${profileData.photo}` 
                        : 
                            Avatar
                        }
                        alt="avatar"
                    />
                    <div className="texts">
                        <h1>{profileData.name}.</h1>
                        <p>{profileData.description}</p>
                        <h1>{profileData.is_freelancer ? "Técnologias Dominadas" : "Nome do negócio"}</h1>
                        <p className={ profileData.is_freelancer ? 'freelancer-techs-div' : ''}>
                            { profileData.is_freelancer ? renderFreelancerTechs(profileData.techs)  : profileData.company_name }
                        </p>
                    </div>
                </div>
                <h1 style={{marginBottom: 20}} >Comentários</h1>
                {profileComments.length <= 0 &&
                    <div className="comments-not-found">
                        <h1>Ainda não há comentários! =(</h1>
                        <img src={NoCommentsFound} alt="No Comments Found" />
                    </div>
                }
                <div className="comments">
                    <ul>
                        {profileComments.map(comment => (
                            <li key={comment._id}>
                                <div className="comment">
                                <img src={comment.maker.photo ? `${process.env.REACT_APP_API_URL}/files/${comment.maker.photo}` : Avatar} alt="avatar"/>
                                <div className="texts">
                                    <h3>{comment.maker.name}.</h3>
                                    <p>{comment.message}</p>
                                </div>
                            </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="new-comment">
                    <input 
                        placeholder="Digite seu comentário"
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                    />
                    <button className="button" onClick={() => handleNewComment()} style={{ backgroundColor: "#e02041" }}>Enviar</button>
                </div>
            </div> 
        </div>
    );
}