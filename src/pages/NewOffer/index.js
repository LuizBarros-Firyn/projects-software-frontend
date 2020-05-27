import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage,  } from 'formik';
import api from '../../services/api';

import { newOfferValidation } from '../../validators/YupValidations';
import { newOfferInitialValues as initialValues } from '../../utils/constants'

import { FiArrowLeft, FiTerminal } from 'react-icons/fi';

import './styles.css'

export default function NewOffer() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');
    const projectId = localStorage.getItem('projectId');

    const history = useHistory();

    useEffect(() => {
        localStorage.removeItem('projectId');
        
        if (!userSession.user_is_freelancer || !userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }
    });
    
    async function handleNewOffer(values) {
        const data = {
            description: values.description,
            price: values.price,
            start_date: values.start_date,
            finish_date: values.finish_date
        };

        try {
            await api.post('offers', data, {
                headers: {
                    project_id: projectId,
                    team_id: userSession.user_team_id
                }
            });

            alert('Oferta realizada com sucesso');
            history.push('/main');
        } catch (error) {
            alert('Erro ao realizar a oferta, tente novamente mais tarde');
        }
    }

    return (
        <div className="new-offer-container">
            <div className="content">
                <section>
                    <div className="page-welcome">
                        <FiTerminal size={40} color="#e02041"/>
                        <h1>Realize sua oferta!</h1>
                    </div>
                    <p>Descreva e cadastre as informações sobre a sua proposta para conquistar a confiança do seu novo cliente!</p>
                    <Link className="back-link" to="/main">
                        <FiArrowLeft size={16} color="#E02041" />
                        <span>Voltar</span>
                    </Link>
                </section>
                <Formik initialValues={initialValues} onSubmit={handleNewOffer} validationSchema={newOfferValidation}>
                    { props => {
                        const {
                            touched, errors, isSubmitting
                        } = props;

                        return(
                            <Form autoComplete="off">
                                <Field placeholder="Descrição da oferta" name="description" className={errors.description && touched.description && "failed-field"} />
                                <div className="error-messages">
                                    <ErrorMessage component="span" name="description" />
                                </div>
                                <Field placeholder="Preço" name="price" className={errors.price && touched.price && "failed-field"} />
                                <div className="error-messages">
                                    <ErrorMessage component="span" name="price" />
                                </div>
                                <Field placeholder="Data de início" name="start_date" className={errors.start_date && touched.start_date && "failed-field"} />
                                <div className="error-messages">
                                    <ErrorMessage component="span" name="start_date" />
                                </div>
                                <Field placeholder="Data de entrega" name="finish_date" className={errors.finish_date && touched.finish_date && "failed-field"} />
                                <div className="error-messages">
                                    <ErrorMessage component="span" name="finish_date" />
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