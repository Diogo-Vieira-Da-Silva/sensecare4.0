enseCare 2.0
Web/desktop application for patient and nurse management, featuring nurse registration, patient registration, scheduled care, alerts, local persistence, and a desktop interface powered by Electron.

New Features
Nurse registration with CPF, email, and phone validation.
Patient registration with CPF and exact-length phone validation.
Duplicate registration blocking for existing CPFs or phone numbers.
Visual on-screen error messages, removing the reliance on blocking alerts.
Registration persistence even after closing Electron, using a local data file.
Care registration and tracking with pending/completed status.
Visual alerts for care reminders.
Desktop interface using Electron and a local Express server.
Project Structure
public/index.html: login and nurse registration screen.
public/m.html: main area for patients, care, and alerts.
public/script.js: login logic and nurse form validations.
public/sensecare2.0.sql: initial database with local data.
m.js: Express server with routes for nurses, patients, and notifications.
electron-main.js: Electron initialization.
Requirements
Node.js installed
npm installed
Installation and Setup
Open the terminal in the project folder and run:

cd C:\Users\DIOGOVIEIRADASILVA\Downloads\Integrador
npm install
If you prefer to install the dependencies manually, you can also run:

Bash


npm init -y
npm install express electron nodemailer
How to Run
Web Version
Bash


node m.js
Then open it in your browser:

Plaintext


http://localhost:3000
Desktop Version with Electron
Bash


npm run electron
Quick Tests
To validate persistence:

Bash


node tests/persistence.test.js
To validate the patient duplication rule:

Bash


node tests/duplicate-patient.test.js

Notes
The system loads initial data from the public/sensecare2.0.sql file.

New registrations are saved to a local file for persistence between restarts.

The project can be used both in the browser and as a desktop application.





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
- public/sensecare2.0.sql: base inicial com dados locais.
- m.js: servidor Express com rotas de enfermeiros, pacientes e notificações.
- electron-main.js: inicialização do Electron.
 
## Requisitos

- Node.js instalado
- npm instalado

## Instalação e configuração

Abra o terminal na pasta do projeto e execute:

```bash
cd C:\Users\DIOGOVIEIRADASILVA\Downloads\Integrador
npm install
Se quiser instalar as dependências manualmente, também é possível rodar:

npm init -y
npm install express electron nodemailer
Como executar
Versão web
node m.js
Depois abra no navegador:

http://localhost:3000
Versão desktop com Electron
npm run electron
Testes rápidos
Para validar a persistência:

node tests/persistence.test.js
Para validar a regra de duplicidade de pacientes:

node tests/duplicate-patient.test.js
Observações
O sistema carrega os dados iniciais do arquivo public/sensecare2.0.sql.
Os cadastros novos são salvos em um arquivo local para persistência entre reinicializações.
O projeto pode ser usado tanto no navegador quanto como aplicativo desktop.
