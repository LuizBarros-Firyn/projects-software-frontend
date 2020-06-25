import React from 'react';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { ResetPasswordValidation } from '../../validators/YupValidations';
import { resetPasswordInitialValues as initialValues } from '../../utils/constants'

import { FiArrowLeft, FiUser } from 'react-icons/fi';

import './styles.css';

export default function PasswordReset() {
    const history = useHistory();

    async function handlePasswordReset(values){
        const data = {
            email: values.email,
            token: values.token,
            password: values.new_password
        };

        try {
            await api.put('reset_password', data).then(async response => {
                if (response.data.error) {
                    alert(`${response.data.error}`);
                    return
                }

                alert('Senha resetada com sucesso!');
                history.push('/login')
            });     
        } catch (error) {
            alert('Erro ao resetar senha, tente novamente.');
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
                        <Formik initialValues={initialValues} onSubmit={handlePasswordReset} validationSchema={ResetPasswordValidation}>
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
                                        <Field placeholder="Token de recuperação" name="token" className={errors.token && touched.token && "failed-field"} />
                                        <div className="error-messages">
                                            <ErrorMessage component="span" name="token" />
                                        </div>
                                        <Field placeholder="Nova senha" name="new_password" type="password" className={errors.new_password && touched.new_password && "failed-field"} />
                                        <div className="error-messages">
                                            <ErrorMessage component="span" name="new_password" />
                                        </div>
                                        <button className="button" type="submit" disabled={isSubmitting}>Recuperar senha</button>
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