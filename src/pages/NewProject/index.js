import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage,  } from 'formik';
import api from '../../services/api';

import { newProjectValidation } from '../../validators/YupValidations';
import { newProjectInitialValues as initialValues } from '../../utils/constants'

import { FiArrowLeft, FiTerminal } from 'react-icons/fi';

import './styles.css'

export default function NewProject() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');

    const history = useHistory();

    useEffect(() => {
        if (userSession.user_is_freelancer || !userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }
    });
    
    async function handleNewProject(values) {
        const data = {
            title: values.title,
            description: values.description,
        };

        try {
            await api.post('projects', data, {
                headers: {
                    user_id: userSession.user_id
                }
            });

            alert('Projeto cadastrado com sucesso');
            history.push('/main');
        } catch (error) {
            alert('Erro ao cadastrar o projeto, tente novamente mais tarde');
        }
    }

    return (
        <div className="new-project-container">
            <div className="content">
                <section>
                    <div className="page-welcome">
                        <FiTerminal size={40} color="#e02041"/>
                        <h1>Cadastrar novo projeto</h1>
                    </div>
                    <p>Descreva o projeto detalhadamente para encontrar a equipe perfeita para o desenvolvimento do seu software!</p>
                    <Link className="back-link" to="/main">
                        <FiArrowLeft size={16} color="#E02041" />
                        <span>Voltar</span>
                    </Link>
                </section>
                <Formik initialValues={initialValues} onSubmit={handleNewProject} validationSchema={newProjectValidation}>
                    { props => {
                        const {
                            touched, errors, isSubmitting
                        } = props;

                        return(
                            <Form autoComplete="off">
                                <Field placeholder="Titulo" name="title" className={errors.title && touched.title && "failed-field"} />
                                <div className="error-messages">
                                    <ErrorMessage component="span" name="title" />
                                </div>
                                <Field component="textarea" placeholder="Descrição do projeto" name="description" className={errors.description && touched.description && "failed-field"} />
                                <div className="error-messages">
                                    <ErrorMessage component="span" name="description" />
                                </div>
                                <button className="button" type="submit" disabled={isSubmitting}>Cadastrar</button>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>   
    );
}