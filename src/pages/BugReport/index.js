import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage,  } from 'formik';
import api from '../../services/api';

import { bugReportValidation } from '../../validators/YupValidations';
import { bugReportInitialValues as initialValues } from '../../utils/constants'

import { FiArrowLeft, FiTerminal } from 'react-icons/fi';

import './styles.css'

export default function BugReport() {
    const [bugType, setBugType] = useState('')
    const [bugIntensity, setBugIntensity] = useState();
    
    async function handleSubmitBugReport(values) {
        if (!bugType || !bugIntensity) {
            alert('Por favor, escolha todos so campos de seleção');
            return;
        }

        const data = {
            description: values.description,
            found_error_page: values.found_error_page,
            bug_type: bugType,
            bug_intensity: bugIntensity
        }

        try {
            await api.post('bug_reports', data);

            alert('Relatório enviado com sucesso, obrigado!');
        } catch (error) {
            alert('Erro ao enviar relatório, tente novamente mais tarde');
        }
    }

    return (
        <div className="bug-report-container">
            <div className="content">
                <section>
                    <div className="page-welcome">
                        <FiTerminal size={40} color="#e02041"/>
                        <h1>Relatório de bugs</h1>
                    </div>
                    <p>Caso encontre algum bug, falha de funcionamento ou falha de segurança,
                        por favor, utilize este relatório para enviar informações sobre o acontecido. 
                        O desenvolvedor resolverá o problema assim que possível!
                    </p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        <span>Voltar</span>
                    </Link>
                </section>
                <Formik initialValues={initialValues} onSubmit={handleSubmitBugReport} validationSchema={bugReportValidation}>
                    { props => {
                        const {
                            touched, errors, isSubmitting
                        } = props;

                        return(
                            <Form autoComplete="off">
                                <Field placeholder="Descrição da falha encontrada" name="description" className={errors.description && touched.description && "failed-field"} />
                                <div className="error-messages">
                                    <ErrorMessage component="span" name="description" />
                                </div>
                                <Field placeholder="Página do erro encontrado" name="found_error_page" className={errors.found_error_page && touched.found_error_page && "failed-field"} />
                                <div className="error-messages">
                                    <ErrorMessage component="span" name="found_error_page" />
                                </div>
                                <select className="dropdown" value={bugType} onChange={e => setBugType(e.target.value)}>
                                    <option className='placeholder'>Tipo de erro</option>
                                    <option value='Visual'>Visual</option>
                                    <option value='Funcional'>Funcional</option>
                                    <option value='Seguranca'>Segurança</option>
                                </select>
                                <select placeholder="Intensidade do erro" className="dropdown" value={bugIntensity} onChange={e => setBugIntensity(e.target.value)}>
                                    <option className='placeholder'>Intensidade do erro</option>
                                    <option value='1'>Leve</option>
                                    <option value='2'>Moderada</option>
                                    <option value='3'>Grave</option>
                                    <option value='4'>Gravíssima</option>
                                </select>
                                <button className="button" type="submit" disabled={isSubmitting}>Cadastrar</button>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>   
    );
}