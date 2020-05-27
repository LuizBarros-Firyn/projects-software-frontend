import React from 'react'
import { Link } from 'react-router-dom'

import { FiArrowLeft, FiCheck, FiUser } from 'react-icons/fi';

import './styles.css'

export default function Register() {
    return (
        <div className="register-container">
            <section className="info">
                <header>
                    <Link to="/">
                        <FiArrowLeft size={30} color="#e02041" />
                        <text>Voltar</text>
                    </Link>
                </header>

                <section className="boxes">
                    <section className="client-register">
                        <div className="content">
                            <h1 className="client-h1">Registro de Cliente</h1>
                            <FiUser size={300} color="#e02041" />
                            <div className="item">
                                <FiCheck size={18} color="#e02041" />
                                <h3>Tenha acesso aos profissionais mais qualificados do mercado</h3>
                            </div>
                            <div className="item">
                                <FiCheck size={18} color="#e02041" />
                                <h3>Receba o melhor software no menor tempo possível</h3>
                            </div>
                            <div className="item">
                                <FiCheck size={18} color="#e02041" />
                                <h3>Contrate equipes profissionalizadas para seus projetos</h3>
                            </div>
                            <Link className="button btn-client" to="/register_client">
                                Cadastrar-se como Cliente
                            </Link>
                        </div>
                    </section>

                    <section className="freelancer-register">
                    <div className="content">
                            <h1 className="freelancer-h1">Registro de Freelancer</h1>
                            <FiUser size={300} color="#0dc6ff" />
                            <div className="item">
                                <FiCheck size={18} color="#0dc6ff" />
                                <h3>Trabalhe nos maiores projetos, ganhe experiencia e se destaque</h3>
                            </div>
                            <div className="item">
                                <FiCheck size={18} color="#0dc6ff" />
                                <h3>Crie ou faça parte das melhores equipes de desenvolvimento</h3>
                            </div>
                            <div className="item">
                                <FiCheck size={18} color="#0dc6ff" />
                                <h3>Seja recompensado por um poderoso sistema de bonificação</h3>
                            </div>
                            <Link className="button btn-freelancer" to="/register_freelancer">
                                Cadastrar-se como Freelancer
                            </Link>
                        </div>
                    </section>
                </section>
            </section>
        </div>
    );
}