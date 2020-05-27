import React from 'react';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { loginValidation } from '../../validators/YupValidations';
import { loginInitialValues as initialValues } from '../../utils/constants'

import { FiArrowLeft, FiUser } from 'react-icons/fi';

import './styles.css';

export default function Login() {
    const history = useHistory();

    async function handleLogin(values){
        const data = {
            login: values.login,
            password: values.password
        };

        try {
            const response = await api.post('sessions', data);

            if (response.data.userSession) {
                localStorage.setItem('userSession', JSON.stringify(response.data.userSession));
                localStorage.setItem('userIsAuthenticated', true);

                history.push('/main');
            } else {
                alert(`${response.data.fail_message}`);
            }
        } catch (error) {
            alert('Erro no login, tente novamente.');
        }
    }

    return (
        <div className="login-container">
            <section className="info">
            <header>
                    <Link to="/">
                        <FiArrowLeft size={30} color="#e02041" />
                        <text>Voltar</text>
                    </Link>
                </header>
            
                <section className="info-elements">
                    <div className="content">
                        <h1>Faça seu login!</h1>
                        <FiUser size={300} color="#e02041" />
                        <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={loginValidation}>
                            { props => {
                                const {
                                    touched, errors, isSubmitting
                                } = props;

                                return(
                                    <Form autoComplete="off">
                                        <Field placeholder="Login" name="login" className={errors.login && touched.login && "failed-field"} />
                                        <div className="error-messages">
                                            <ErrorMessage component="span" name="login" />
                                        </div>
                                        <Field placeholder="Senha" name="password" type="password" className={errors.password && touched.password && "failed-field"} />
                                        <div className="error-messages">
                                            <ErrorMessage component="span" name="password" />
                                        </div>
                                        <button className="button" type="submit" disabled={isSubmitting}>Login</button>
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