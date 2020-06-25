import * as Yup from 'yup';
// import { cnpj as cnpjValidator, cpf as cpfValidator } from 'cpf-cnpj-validator';

export function clientRegisterValidation() {
    const schema = Yup.object().shape({
        firstName: Yup.string().min(2, "Nome inválido").max(50, "Nome inválido").required("Nome obrigatório"),
        lastName: Yup.string().min(2, "Sobrenome inválido").max(50, "Sobrenome inválido").required("Sobrenome obrigatório"),
        password: Yup.string().min(5, "Senha muito curta").max(30, "Senha muito longa").required("Senha obrigatória"),
        age: Yup.number("Idade inválidade").moreThan(17, "Apenas maiores de idade").lessThan(120, "Idade inválida").required("Idade obrigatória"),
        email: Yup.string().min(6, "O e-mail precisa ter mais de 6 carácteres").max(90, "E-mail inválido").email("E-mail inválido").required("O e-mail é obrigatório"),
        companyName: Yup.string().min(2, "Negócio inválido").max(80, "Negócio inválido").required("Campo obrigatório"),
        city: Yup.string().min(2, "Cidade inválida").max(60, "Cidade inválida").required("Cidade obrigatória"),
        uf: Yup.string().min(2, "UF inválido").max(2, "UF inválido").required("UF obrigatório"),
    });

    return schema;
};

export function freelancerRegisterValidation() {
    const schema = Yup.object().shape({
        firstName: Yup.string().min(2, "Nome inválido").max(50, "Nome inválido").required("Nome obrigatório"),
        lastName: Yup.string().min(2, "Sobrenome inválido").max(50, "Sobrenome inválido").required("Sobrenome obrigatório"),
        password: Yup.string().min(5, "Senha muito curta").max(30, "Senha muito longa").required("Senha obrigatória"),
        age: Yup.number("Idade inválidade").moreThan(18, "Apenas maiores de idade").lessThan(120, "Idade inválida").required("Idade obrigatória"),
        email: Yup.string().min(6, "O e-mail precisa ter mais de 6 carácteres").max(90, "E-mail inválido").email("E-mail inválido").required("O e-mail é obrigatório"),
        city: Yup.string().min(2, "Cidade inválida").max(60, "Cidade inválida").required("Cidade obrigatória"),
        uf: Yup.string().min(2, "UF inválido").max(2, "UF inválido").required("UF obrigatório"),
        techs: Yup.string().max(120, "Tecnologias inválidas").required("Tecnologias obrigatórias")
    });

    return schema;
};

export function loginValidation() {
    const schema = Yup.object().shape({
        email: Yup.string().min(6, "O e-mail precisa ter mais de 6 carácteres").max(90, "E-mail inválido").email("E-mail inválido").required("O e-mail é obrigatório"),
        password: Yup.string().min(5, "Senha inválida").max(30, "Senha inválida").required("Senha obrigatória")
    });

    return schema;
};

export function passwordRecoveryValidation() {
    const schema = Yup.object().shape({
        email: Yup.string().min(6, "O e-mail precisa ter mais de 6 carácteres").max(90, "E-mail inválido").email("E-mail inválido").required("O e-mail é obrigatório"),
    });

    return schema;
};

export function ResetPasswordValidation() {
    const schema = Yup.object().shape({
        email: Yup.string().min(6, "O e-mail precisa ter mais de 6 carácteres").max(90, "E-mail inválido").email("E-mail inválido").required("O e-mail é obrigatório"),
        token: Yup.string().min(5, "Tpken inválido").max(120, "Token inválido").required("Token obrigatório"),
        new_password: Yup.string().min(5, "Senha inválida").max(30, "Senha inválida").required("Senha obrigatória")
    });

    return schema;
};

export function newProjectValidation() {
    const schema = Yup.object().shape({
        title: Yup.string().min(5, "Titulo muito curto").max(45, "Seja mais específico").required("Titulo obrigatório"),
        description: Yup.string().min(10, "Dê mais detalhes sobre seu projeto").max(300, "Seja mais objetivo na descrição de seu projeto").required("Descrição Obrigatória")
    });

    return schema;
};

export function newOfferValidation() {
    const schema = Yup.object().shape({
        description: Yup.string().min(10, "Dê mais detalhes sobre sua oferta").max(300, "Seja mais objetivo na descrição de sua oferta").required("Descrição Obrigatória"),
        price: Yup.number("Preço inválido").min(40, "O valor mínimo é 40").max(1000000, "Preço inválido").required("Preço obrigatório").typeError('Troque a virgula por ponto'),
    });

    return schema;
};

export function teamInfoValidation() {
    const schema = Yup.object().shape({
        title: Yup.string().min(2, "Digite um nome maior").max(20, "Digite um nome mais breve.").required("Nome obrigatório!"),
        description: Yup.string().min(15, "Digite uma descrição mais detalhada").max(400, "Digite uma descrição mais breve.").required("Descrição obrigatória!"),
    });

    return schema;
};

export function teamJoiningSolicitationValidation() {
    const schema = Yup.object().shape({
        message: Yup.string().min(15, "Envie uma mensagem mais elaborada").max(400, "Envie uma mensagem mais direta") // Message is not mandatory.
    });

    return schema;
};

export function bugReportValidation() {
    const schema = Yup.object().shape({
        description: Yup.string().min(10, "Por favor, forneça mais detalhes").max(500, "Por favor, descreva o erro de forma mais específica").required("A descrição do erro é obrigatória"),
        found_error_page: Yup.string().min(3, "Página inválida").max(30, "Página inválida").required("A página do erro é obrigatória")
    });

    return schema;
};

export function freelancerProfileSettingsValidation() {
    const schema = Yup.object().shape({
        name: Yup.string().min(5, "Nome inválido").max(50, "Nome inválido").required("Nome obrigatório"),
        description: Yup.string().min(30, "Forneça uma descrição mais detalhada").max(400, "Forneça uma descrição mais direta").required("A descrição é obrigatória"),
        city: Yup.string().min(2, "Cidade inválida").max(60, "Cidade inválida").required("Cidade obrigatória"),
        uf: Yup.string().min(2, "UF inválido").max(2, "UF inválido").required("UF obrigatório"),
        techs: Yup.string().max(120, "Tecnologias inválidas").required("Tecnologias obrigatórias"),
    });

    return schema;
};

export function clientProfileSettingsValidation() {
    const schema = Yup.object().shape({
        name: Yup.string().min(5, "Nome inválido").max(50, "Nome inválido").required("Nome obrigatório"),
        description: Yup.string().min(30, "Forneça uma descrição mais detalhada").max(400, "Forneça uma descrição mais direta").required("A descrição é obrigatória"),
        city: Yup.string().min(2, "Cidade inválida").max(60, "Cidade inválida").required("Cidade obrigatória"),
        uf: Yup.string().min(2, "UF inválido").max(2, "UF inválido").required("UF obrigatório"),
        company_name: Yup.string().max(80, "Nome do negócio inválido").min(2, "Nome do negócio inválido").required("Nome do negócio obrigatório"),
    });

    return schema;
};

export function onboardingStepsValidation() {
    const schema = Yup.object().shape({
        description: Yup.string().min(30, "Forneça uma descrição mais detalhada").max(400, "Forneça uma descrição mais direta").required("A descrição é obrigatória")
    });

    return schema;
}