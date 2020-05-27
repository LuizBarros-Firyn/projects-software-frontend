import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FiTerminal, FiPower, FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

import { teamInfoValidation } from '../../validators/YupValidations';
import { teamInfoInitialValues as initialValues } from '../../utils/constants';

import './styles.css';

export default function TeamSettings() {
    const [team, setTeam] = useState([]);
    const [isHiring, setIsHiring] = useState([]);
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');

    const history = useHistory();

    useEffect(() => {
        if (!userIsAuthenticated || !userSession.user_has_team) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }

        api.get('team_owner_verifications', {
            headers: {
                team_id: userSession.user_team_id,
                user_id: userSession.user_id
            }
        }).then(response => {
            if (!response.data.user_is_team_owner)
                history.push('/main');
        });

        api.get(`team_settings/${userSession.user_team_id}`, {
            headers: {
                user_id: userSession.user_id
            }
        }).then(response => {
            setTeam(response.data);
            setIsHiring(response.data.is_hiring)
        });

    }, [userIsAuthenticated, userSession.user_team_id, userSession.user_has_team, userSession.user_id, history]);

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    async function handleUpdateTeam(values) {
        const data = {
            title: values.title,
            description: values.description,
            is_hiring: isHiring
        };

        try {
            await api.put(`team_settings/${userSession.user_team_id}`, data, {
                headers: {
                    user_id: userSession.user_id
                }
            }).then(async response => setTeam(response.data));

            alert('Informações da equipe atualizadas com sucesso!');
        } catch (error) {
            alert('Erro ao atualizar sua equipe, tente novamente mais tarde!');
        }
    }

    return(
        <div className="team-settings-container">        
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
            
            <div className="content">
                <div className="content-elements">
                    <section>
                        <div className="page-welcome">
                            <FiTerminal size={40} color="#e02041"/>
                            <h1>Edite suas configurações de equipe</h1>
                        </div>
                        <p>Aqui você pode sempre editar suas configurações de equipe!
                        </p>
                        <Link className="back-link" to="/main">
                            <FiArrowLeft size={16} color="#E02041" />
                            <span>Voltar</span>
                        </Link>
                    </section>
                    <Formik initialValues={initialValues} onSubmit={handleUpdateTeam} validationSchema={teamInfoValidation}>
                        { props => {
                            const {
                                touched, errors, isSubmitting
                            } = props;

                            return(
                                <Form autoComplete="off">
                                    <strong>NOME:</strong>
                                    <Field placeholder={team.title} name="title" className={errors.title && touched.title && "failed-field"} />
                                    <div className="error-messages">
                                        <ErrorMessage component="span" name="title" />
                                    </div>
                                    <strong>DESCRIÇÃO:</strong>
                                    <Field component="textarea" placeholder={team.description} name="description" className={errors.description && touched.description && "failed-field"} />
                                    <div className="error-messages">
                                        <ErrorMessage component="span" name="description" />
                                    </div>
                                    <select className="dropdown" value={isHiring} onChange={e => setIsHiring(e.target.value)}>
                                        <option value={true}>Receber solicitações de entrada na equipe</option>
                                        <option value={false}>Não receber solicitações de entrada na equipe</option>
                                    </select>
                                    <button className="button" type="submit" disabled={isSubmitting}>Atualizar informações</button>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div> 
        </div>
    );
}