import React, { useEffect, useState, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FiTerminal, FiPower, FiArrowLeft, FiCamera} from 'react-icons/fi';
import api from '../../services/api';

import { clientProfileSettingsValidation } from '../../validators/YupValidations';
import { clientProfileSettingsInitialValues as initialValues } from '../../utils/constants';

import './styles.css';

export default function ClientProfileSettings() {
    const [user, setUser] = useState([]);
    const [photo, setPhoto] = useState(null);
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');

    const history = useHistory();

    useEffect(() => {
        if (!userIsAuthenticated || userSession.user_is_freelancer) {
            alert('Acesso não autorizado.');
            history.push('/login');
        }

        api.get(`users/${userSession.user_id}`).then(response => {
            setUser(response.data);
        });
    }, [userIsAuthenticated, userSession.user_id, history, userSession.user_is_freelancer]);

    const preview = useMemo(() => {
        return photo ? URL.createObjectURL(photo) : null;
    }, [photo]);

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    async function handleUpdateUser(values) {
        const data = new FormData();

        data.append('photo', photo);
        data.append('name', values.name);
        data.append('description', values.description);
        data.append('city', values.city);
        data.append('uf', values.uf);
        data.append('company_name', values.company_name);
        data.append('user_is_freelancer', userSession.user_is_freelancer);

        try {
            await api.put('users', data, {
                headers: {
                    user_id: userSession.user_id,
                }
            });

            history.push(`/profile/${userSession.user_id}`)

            alert('Informações de usuário atualizadas com sucesso!');
        } catch (error) {
            alert('Erro ao atualizar seu perfil, tente novamente mais tarde!');
        }
    }

    return(
        <div className="client-profile-settings-container">        
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
                            <h1>Edite suas configurações de perfil</h1>
                        </div>
                        <p>Aqui você pode sempre editar suas configurações de perfil!
                        </p>
                        <Link className="back-link" to="/main">
                            <FiArrowLeft size={16} color="#E02041" />
                            <span>Voltar</span>
                        </Link>
                    </section>
                    <Formik initialValues={initialValues} onSubmit={handleUpdateUser} validationSchema={clientProfileSettingsValidation}>
                        { props => {
                            const {
                                touched, errors, isSubmitting
                            } = props;

                            return(
                                <Form autoComplete="off">
                                    <div className="img">
                                        <label id="photo" style={{ backgroundImage: `url(${preview})`}} className={photo && 'has-thumbnail'}>
                                            <input type="file" accept="image/png, image/jpeg" onChange={e => setPhoto(e.target.files[0])} />
                                            <FiCamera size={30} color="#737373" />
                                        </label>
                                    </div>
                                    <strong>NOME:</strong>
                                    <Field placeholder={user.name} name="name" className={errors.name && touched.name && "failed-field"} />
                                    <div className="error-messages">
                                        <ErrorMessage component="span" name="name" />
                                    </div>
                                    <strong>DESCRIÇÃO:</strong>
                                    <Field component="textarea" placeholder={user.description} name="description" className={errors.description && touched.description && "failed-field"} />
                                    <div className="error-messages">
                                        <ErrorMessage component="span" name="description" />
                                    </div>
                                    <strong>CIDADE E ESTADO:</strong>
                                    <div className="input-group">
                                        <Field placeholder={user.city} name="city" className={errors.city && touched.city && "failed-field"} />
                                        <Field placeholder={user.uf} style={{ width: 80 }} name="uf" className={errors.uf && touched.uf && "failed-field"} />
                                    </div>
                                    <div className="error-messages">
                                        <div className="left-field-message">
                                            <ErrorMessage component="span" name="city" />
                                        </div>
                                        <div className="right-error-message">
                                            <ErrorMessage component="span" name="uf" />
                                        </div>
                                    </div>
                                    <strong>NOME DO SEU NEGÓCIO</strong>
                                    <Field placeholder={user.company_name} name="company_name" className={errors.company_name && touched.company_name && "failed-field"} />
                                    <div className="error-messages">
                                        <ErrorMessage component="span" name="company_name" />
                                    </div>
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