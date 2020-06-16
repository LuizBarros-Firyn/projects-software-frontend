import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { FiTerminal, FiPower} from 'react-icons/fi';
import api from '../../services/api';

import Avatar from '../../assets/female_avatar.svg';
import NoCommentsFound from '../../assets/no_results.svg'
import './styles.css';

export default function TeamProfile(props) {
    const [teamProfileData, setTeamProfileData] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamProfileComments, setTeamProfileComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');

    const history = useHistory();

    useEffect(() => {
        if (!userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }

        console.log(props.match.params.team_id);

        api.get(`teams/${props.match.params.team_id}`).then(response => {
            setTeamProfileData(response.data);
        });

        api.get('team_members', {
            headers:{
                    team_id: props.match.params.team_id
            }            
        }).then(response => {
            setTeamMembers(response.data);
        });

        api.get('team_profile_comments', {
            headers:{
                    team_profile_id: props.match.params.team_id
            }            
        }).then(response => {
            setTeamProfileComments(response.data);
        });
    }, [userIsAuthenticated, history, props.match.params.team_id]);

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
            await api.post('team_profile_comments', data, {
                headers: {
                    maker_id: userSession.user_id,
                    team_profile_id: props.match.params.team_id
                }
            }).then(response => {
                setTeamProfileComments([...teamProfileComments, response.data]);
            })
        } catch (error) {
            alert('Erro ao enviar o comentário, tente novamente mais tarde');
        }

        setNewComment('');
    }

    return(
        <div className="team-profile-container">        
            <header>
                <div className="welcome-group">
                    <FiTerminal size={40} color="#e02041" />
                    <span>Bem vindo, {userSession.user_name}</span>
                </div>
                {userSession.user_id === teamProfileData.owner &&
                    <Link className="button" to="/team_settings">
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
                    <img className={teamProfileData.photo && 'has-own-photo'} src={
                        teamProfileData.photo ? 
                            `${process.env.REACT_APP_API_URL}/files/${teamProfileData.photo}` 
                        : 
                            Avatar
                        }
                        alt="avatar"
                    />
                    <div className="texts">
                        <h1>Equipe {teamProfileData.title}.</h1>
                        <p>{teamProfileData.description}</p>
                    </div>
                </div>
                <h1 style={{marginBottom: 20}} >Membros</h1>
                <div className="members">
                    <ul>
                        {teamMembers.map(teamMember => (
                            <li key={teamMember._id}>
                                <div className="member">
                                    <Link to={`/profile/${teamMember._id}`}>
                                    <img src={teamMember.photo ? `${process.env.REACT_APP_API_URL}/files/${teamMember.photo}` : Avatar} alt="avatar"/>
                                    <div className="texts">
                                        <h3>{teamMember.name}</h3>
                                    </div>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <h1 style={{marginBottom: 20}} >Comentários</h1>
                {teamProfileComments.length <= 0 &&
                    <div className="comments-not-found">
                        <h1>Ainda não há comentários! =(</h1>
                        <img src={NoCommentsFound} alt="No Comments Found" />
                    </div>
                } 
                <div className="comments">
                    <ul>
                        {teamProfileComments.map(comment => (
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