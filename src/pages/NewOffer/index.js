import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage,  } from 'formik';
import api from '../../services/api';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt-BR';

import { newOfferValidation } from '../../validators/YupValidations';
import { newOfferInitialValues as initialValues } from '../../utils/constants'

import { FiArrowLeft, FiTerminal } from 'react-icons/fi';

import './styles.css'

export default function NewOffer(props) {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');
    const authorization = localStorage.getItem('authorization');
    const projectId = props.match.params.project_id;
    const [startDate, setStartDate] = useState(null);
    const [finishDate, setFinishDate] = useState(null);

    const history = useHistory();
    registerLocale('pt', pt);

    useEffect(() => {
        localStorage.removeItem('projectId');
        
        if (!userSession.user_is_freelancer || !userIsAuthenticated) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }
    }, [userSession.user_is_freelancer, userIsAuthenticated, history]);
    
    async function handleNewOffer(values) {
        if (!startDate || !finishDate) {
            alert('Insira todas as datas');
            return
        }
        if (finishDate < startDate) {
            alert('A data de entrega deve ser posterior a data de início')
            return
        }

        const data = {
            description: values.description,
            price: values.price,
            start_date: startDate,
            finish_date: finishDate
        };

        try {
            await api.post('offers', data, {
                headers: {
                    project_id: projectId,
                    team_id: userSession.user_team_id,
                    authorization
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
                                <DatePicker 
                                    selected={startDate} 
                                    onChange={date => {
                                        setStartDate(date);
                                        setFinishDate(null);
                                    }}
                                    placeholderText="Data de início"
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()} 
                                    locale='pt'
                                />
                                <DatePicker 
                                    selected={finishDate} 
                                    onChange={date => setFinishDate(date)}
                                    placeholderText="Data de entrega"
                                    dateFormat="dd/MM/yyyy"
                                    minDate={startDate ? startDate : new Date()}
                                    locale='pt'
                                />
                                <button className="button" type="submit" disabled={isSubmitting}>Cadastrar</button>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>   
    );
}