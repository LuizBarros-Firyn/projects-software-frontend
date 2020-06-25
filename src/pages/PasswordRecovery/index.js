import React from 'react';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { passwordRecoveryValidation } from '../../validators/YupValidations';
import { passwordRecoveryInitialValues as initialValues } from '../../utils/constants'

import { FiArrowLeft, FiUser } from 'react-icons/fi';

import './styles.css';

export default function PasswordRecovery() {
    const history = useHistory();

    async function handlePasswordRecovery(values){
        const data = {
            userEmail: values.email,
        };

        try {
            await api.post('password_recovery', data).then(async response => {
                if (response.data.error) {
                    alert(`${response.data.error}`);
                    return
                }

                alert('Cheque seu e-mail!');
                history.push('/password_reset')
            });     
        } catch (err) {
            alert('Nenhum usuário encontrado ou serviço temporariamente indisponível');
        }
    }

    return (
        <div className="password-recovery-container">
            <section className="info">
                <header>
                    <Link to="/">
                        <FiArrowLeft size={30} color="#e02041" />
                        <text>Voltar</text>
                    </Link>
                </header>
            
                <section className="info-elements">
                    <div className="content">
                        <h1>Digite seu e-mail</h1>
                        <FiUser size={300} color="#e02041" />
                        <Formik initialValues={initialValues} onSubmit={handlePasswordRecovery} validationSchema={passwordRecoveryValidation}>
                            { props => {
                                const {
                                    touched, errors, isSubmitting
                                } = props;

                                return(
                                    <Form autoComplete="off">
                                        <Field placeholder="Email" name="email" className={errors.email && touched.email && "failed-field"} />
                                        <div className="error-messages">
                                            <ErrorMessage component="span" name="email" />
                                        </div>
                                        <button className="button" type="submit" disabled={isSubmitting}>Confirmar</button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </section>
            </section>
        </div>
    );
}