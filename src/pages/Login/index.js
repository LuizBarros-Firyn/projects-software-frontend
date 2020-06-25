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
            email: values.email,
            password: values.password
        };

        try {
            const response = await api.post('sessions', data);

            if (response.data.userSession && response.data.authorization) {
                localStorage.setItem('userSession', JSON.stringify(response.data.userSession));
                localStorage.setItem('userIsAuthenticated', true);
                localStorage.setItem('authorization', 'Bearer ' + response.data.authorization);

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
                        <Link className={"password-recovery"} to="/password_recovery">Esqueceu sua senha?</Link>
                        <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={loginValidation}>
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