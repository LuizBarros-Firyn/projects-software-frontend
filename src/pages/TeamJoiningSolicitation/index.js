import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage,   } from 'formik';
import api from '../../services/api';

import { teamJoiningSolicitationValidation } from '../../validators/YupValidations';
import { teamJoiningSolicitationInitialValues as initialValues } from '../../utils/constants'

import { FiArrowLeft, FiTerminal } from 'react-icons/fi';

import './styles.css';

export default function CreateTeam() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');
    const teamId = localStorage.getItem('teamId');
    const teamOwner = localStorage.getItem('teamOwner');
    const teamTitle = localStorage.getItem('teamTitle');

    const history = useHistory();

    useEffect(() => {
        if (!userIsAuthenticated || !userSession.user_is_freelancer) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }
    });
    
    async function handleTeamJoiningSolicitation(values) {
        const data = {
            message: values.message
        };

        try {
            await api.post('team_joining_solicitations', data, {
                headers: {
                    user_id: userSession.user_id,
                    team_id: teamId,
                    team_owner: teamOwner
                }
            });

            alert('Solicitação enviada com sucesso, aguarde a resposta!');

            history.push('/teams');
        } catch (error) {
            alert('Erro ao solicitar entrada na equipe, tente novamente mais tarde!');
        }
    }

    return (
        <div className="create-team-container">
            <div className="content">
                <section>
                    <div className="page-welcome">
                        <FiTerminal size={40} color="#e02041"/>
                        <h1>Faça sua solicitação !</h1>
                    </div>
                    <p>Faça sua solicitação para ingressar na equipe {teamTitle} e desenvolva grandes projetos em equipe!</p>
                    <Link className="back-link" to="/main">
                        <FiArrowLeft size={16} color="#E02041" />
                        <span>Voltar</span>
                    </Link>
                </section>
                <Formik initialValues={initialValues} onSubmit={handleTeamJoiningSolicitation} validationSchema={teamJoiningSolicitationValidation}>
                    { props => {
                        const {
                            touched, errors, isSubmitting
                        } = props;

                        return(
                            <Form autoComplete="off">
                                <Field component="textarea" placeholder="Envie uma mensagem ao dono da equipe" name="message" className={errors.message && touched.message && "failed-field"} />
                                <div className="error-messages">
                                    <ErrorMessage component="span" name="message" />
                                </div>
                                <button className="button" type="submit" disabled={isSubmitting}>Enviar solicitação</button>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>   
    );
}