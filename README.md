# SenseCare 2.0

A web/desktop application for managing patients and nurses, featuring nurse and patient registration, scheduled care tasks, alerts, local data persistence, and a desktop interface built with Electron.

## New Features

- Nurse registration with CPF (Brazilian tax ID), email, and phone number validation.
- Patient registration with CPF and phone number validation (exact length).
- Prevention of duplicate registrations for existing CPFs or phone numbers.
- On-screen error messages (no blocking browser alerts).
- Data persistence after closing the Electron app, using a local data file.
- Registration and tracking of care tasks with pending/completed statuses.
- Visual alerts for care reminders.
- Desktop interface using Electron and a local Express server.

## Project Structure

- public/index.html: Login and nurse registration screen.
- public/m.html: Main dashboard for patients, care tasks, and alerts.
- public/script.js: Login logic and nurse form validation.
- public/sensecare2.0.sql: Initial database with local data. #the sql is litelocal
- m.js: Express server with routes for nurses, patients, and notifications.
- electron-main.js: Electron initialization. ## Requirements

- Node.js installed
- npm installed

## Installation and setup

Open the terminal in the project folder and run:

```bash
cd C:\Users\DIOGOVIEIRADASILVA\Downloads\Integrador #Or other name that you used on the folder
npm install
```

If you prefer to install dependencies manually, you can also run:

```bash
npm init -y
npm install express electron nodemailer
```

## How to run

### Web version

```bash
node m.js
```

Then open in your browser:

```text
http://localhost:3000
```

### Desktop version with Electron

```bash
npm run electron
```

## Quick tests

To validate persistence:

```bash
node tests/persistence.test.js
```

To validate the duplicate patient rule:

```bash
node tests/duplicate-patient.test.js
```

## Methods and commands used

### Common commands

```powershell
npm install
npm run electron
node m.js
```

### Temporary backend test on a different port

```powershell
$env:PORT='3100'; node m.js
```

### API examples

- Fetch a nurse's patients:

```powershell
Invoke-RestMethod -Uri 'http://localhost:3100/pacientes?nurse_id=1'
```

- Add a patient:

```powershell
$body = @{ nurse_id='1'; primeiroNome='Teste'; sobrenome='Silva'; dataNascimento='1990-01-01'; cpf='11122233344'; endereco='Rua Teste'; telefone='11999998888'; nomeResponsavel=''; telefoneResponsavel=''; procedimento='Consulta'; historicoDoencas=''; medicacoes=''; sexo='masculino'; prioridade='alta'; risco='nada'; alergias=''; especificacoes='' } |
``` ConvertTo-Json
Invoke-RestMethod -Method Post -Uri 'http://localhost:3100/pacientes' -ContentType 'application/json' -Body $body
```

## Notes
The system loads initial data from the `public/sensecare2.0.sql` file.
New records are saved to a local file to ensure persistence across restarts.
The project can be used either in a web browser or as a desktop application.



----------------------------------------------------------------Tradução------------------------------------------------------------------




# SenseCare 2.0

Aplicação web/desktop para gerenciamento de pacientes e enfermeiros, com cadastro de enfermeiros, cadastro de pacientes, cuidados agendados, alertas, persistência local e interface desktop com Electron.

## Novas funcionalidades

- Cadastro de enfermeiros com validação de CPF/e-mail e telefone.
- Cadastro de pacientes com validação de CPF e telefone com tamanho exato.
- Bloqueio de cadastro duplicado para CPF ou telefone já existentes.
- Mensagens de erro visuais na tela, sem depender de alerts bloqueantes.
- Persistência dos cadastros mesmo após fechar o Electron, utilizando um arquivo local de dados.
- Cadastro e acompanhamento de cuidados com status pendente/concluído.
- Alertas visuais para lembretes de cuidados.
- Interface desktop com Electron e servidor local Express.

## Estrutura do projeto

- public/index.html: tela de login e cadastro de enfermeiro.
- public/m.html: área principal de pacientes, cuidados e alertas.
- public/script.js: lógica de login e validações do formulário de enfermeiro.
- public/sensecare2.0.sql: base inicial com dados locais. #o sql é litelocal
- m.js: servidor Express com rotas de enfermeiros, pacientes e notificações.
- electron-main.js: inicialização do Electron.
 
## Requisitos

- Node.js instalado
- npm instalado

## Instalação e configuração

Abra o terminal na pasta do projeto e execute:

```bash
cd C:\Users\DIOGOVIEIRADASILVA\Downloads\Integrador #ou outro nome que usou na pasta
npm install
```

Se quiser instalar as dependências manualmente, também é possível rodar:

```bash
npm init -y
npm install express electron nodemailer
```

## Como executar

### Versão web

```bash
node m.js
```

Depois abra no navegador:

```text
http://localhost:3000
```

### Versão desktop com Electron

```bash
npm run electron
```

## Testes rápidos

Para validar a persistência:

```bash
node tests/persistence.test.js
```

Para validar a regra de duplicidade de pacientes:

```bash
node tests/duplicate-patient.test.js
```

## Métodos e comandos usados

### Comandos comuns

```powershell
npm install
npm run electron
node m.js
```

### Teste temporário do backend em outra porta

```powershell
$env:PORT='3100'; node m.js
```

### Exemplos de API

- Buscar pacientes de um enfermeiro:

```powershell
Invoke-RestMethod -Uri 'http://localhost:3100/pacientes?nurse_id=1'
```

- Adicionar um paciente:

```powershell
$body = @{ nurse_id='1'; primeiroNome='Teste'; sobrenome='Silva'; dataNascimento='1990-01-01'; cpf='11122233344'; endereco='Rua Teste'; telefone='11999998888'; nomeResponsavel=''; telefoneResponsavel=''; procedimento='Consulta'; historicoDoencas=''; medicacoes=''; sexo='masculino'; prioridade='alta'; risco='nada'; alergias=''; especificacoes='' } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri 'http://localhost:3100/pacientes' -ContentType 'application/json' -Body $body
```

## Observações
O sistema carrega os dados iniciais do arquivo public/sensecare2.0.sql.
Os cadastros novos são salvos em um arquivo local para persistência entre reinicializações.
O projeto pode ser usado tanto no navegador quanto como aplicativo desktop.
