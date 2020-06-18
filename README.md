# Projects-Software
Este projeto esta sendo desenvolvido como TCC para o curso Análise e Desenvolvimento de Sistemas na Universidade Positivo em Londrina. O objetivo é construir uma plataforma online de freelancing com foco em grandes projetos, auxiliada por um forte mecanismo de gamificação. 

![projects-software-landing](https://user-images.githubusercontent.com/62821319/85045597-8a666100-b165-11ea-9708-8596c5b5deba.png)


## Getting Started

Estas instruções lhe auxiliarão a conseguir um clone funcional do projeto na sua máquina! Todos os commits entregam incrementações completas do sistema.

### Pré-requisitos

Para rodar o projeto, você precisa ter o node na versão 12.16.3 (LTS) ou superior instalado em seu computador. É recomendável instalar o Node através do Chocolatey.

### Instalando para Windows

1 - Inicie o PowerShell como administrador e rode o  comando: 'Get-ExecutionPolicy' (sem aspas). Caso este comando retorne 'Restricted', execute 'Set-ExecutionPolicy AllSigned' (sem aspas).

2 - Instale o chocolatey executando o comando: 'Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))' (sem aspas).

3 - Instale o Node executando o comando: 'cinst nodejs-lts' (sem aspas).

4 - Instale o Yarn utilizando o comando 'npm install -g yarn' (sem aspas).

5 - Reinicialize seu terminal PowerShell como administrador.

6 - Clone o projeto em seu computador.

7 - Vá até a pasta do projeto e execute 'yarn add' para adicionar as dependências do projeto.

8 - Vá até a pasta backend/src, acesse o arquivo app.js e adicione uma URL de conexão com banco MongoDB. Por motivos de segurança, a URL de conexão com o banco original do projeto é privada. 

### Inicializando

1 - Pelo PowerShell, vá até a pasta backend do projeto e execute o comando 'yarn dev' (sem aspas) para inicializar o backend da aplicação.

2 - Por outra instância do PowerShell, vá até a pasta frontend e execute o comando: 'yarn start' (sem aspas).

## Tecnologias Utilizadas

1 - JavaScript

2 - NodeJs

3 - API RESTFUL

4 - MongoDB(noSQL Server)

5 - ReactJs

6 - React-Native(futuramente)

7 - HTML

8 - CSS

## Metodologia

O desacoplamento de código possui vários benifícios comprovados, entre eles está a melhor organização de código e a facilidade de adicionar novos recursos e realizar a manutenção do sistema.

O código esta sendo desenvolvido de maneira que o backend e o frontend estejam desacoplados. Permitindo que seus dados sejam consumidos por vários possíveis fronts diferentes.

Esta metodologia permite que tanto a versão web quanto a versão mobile utilizem a mesma API, sendo necessárias apenas mudanças de frontend. Desta forma, concedendo agilidade e flexibilidade a aplicação.
