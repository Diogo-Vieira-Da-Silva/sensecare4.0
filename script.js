const API_BASE_URL = 'http://localhost:3000';

async function fetchJson(url, options) {
    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type') || '';

    if (!response.ok) {
        const errorText = contentType.includes('application/json')
            ? JSON.stringify(await response.json())
            : await response.text();
        throw new Error(errorText || `HTTP ${response.status}`);
    }

    if (contentType.includes('application/json')) {
        return response.json();
    }

    return response.text();
}

  function initPasswordToggle() {
    const passwordField = document.getElementById('passwordField');
    const toggleButton = document.getElementById('togglePassword');
    const toggleText = document.getElementById('toggleText');

    if (!passwordField || !toggleButton || !toggleText) {
        return; // silenciosamente retorna; não há toggle nesta página
    }

    toggleButton.addEventListener('click', function () {
        const currentType = passwordField.getAttribute('type');
        const newType = (currentType === 'password' ? 'text' : 'password');
        passwordField.setAttribute('type', newType);
        toggleText.textContent = newType === 'text' ? 'Ocultar' : 'Mostrar';
        localStorage.setItem('passwordVisible', newType === 'text');
    });
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordToggle);
} else {
    initPasswordToggle();
}

// Carregar dados salvos no localStorage de forma defensiva
window.addEventListener('load', function () {
    const saved = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Loaded user data:', saved);

    if (saved) {
        const mapping = [
            ['id', 'id'],
            ['nome', 'nome'],
            ['sobrenome', 'sobrenome'],
            ['email', 'cpfEmail'],
            ['telefone', 'telefone'],
            ['passwordField', 'senha'],
            ['sexo', 'sexo'],
            ['dataContratacao', 'dataContratacao'],
            ['dataNascimento', 'dataNascimento'],
            ['diploma', 'diploma'],
            ['cargo', 'cargo'],
            ['complementos', 'complementos']
        ];

        mapping.forEach(function (pair) {
            const el = document.getElementById(pair[0]);
            if (el) el.value = saved[pair[1]] || '';
        });
    }

    // Aplicar estado do toggle se existirem elementos
    const passwordVisible = localStorage.getItem('passwordVisible') === 'true';
    const passwordField = document.getElementById('passwordField');
    const toggleText = document.getElementById('toggleText');
    if (passwordVisible && passwordField && toggleText) {
        passwordField.setAttribute('type', 'text');
        toggleText.textContent = 'Ocultar';
    }
});

function showLoginFeedback(message, type = 'danger') {
    const feedback = document.getElementById('loginFeedback');
    if (!feedback) return;

    feedback.textContent = message;
    feedback.className = `alert alert-${type} mt-2`;
    feedback.classList.remove('d-none');

    clearTimeout(showLoginFeedback.timeoutId);
    showLoginFeedback.timeoutId = setTimeout(() => {
        feedback.classList.add('d-none');
        feedback.textContent = '';
    }, 4000);
}

function focusField(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.focus();
        if (typeof element.select === 'function') {
            element.select();
        }
    }
}

// Validação do formulário e binding somente quando o formulário existir
(function () {
    const form = document.getElementById('loginForm');
    if (!form) return; // Página atual não tem formulário de login

    const submitButton = form.querySelector('button[type="submit"], button:not([type])');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (form.dataset.submitting === 'true') {
            return;
        }

        const isExisting = document.getElementById('existingMode').checked;
        const id = document.getElementById('id').value.trim();

        if (!id) {
            showLoginFeedback('Preencha o ID.');
            focusField('id');
            return;
        }

        form.dataset.submitting = 'true';
        if (submitButton) {
            submitButton.disabled = true;
        }
        showLoginFeedback('');

        if (isExisting) {
            // Login with existing ID
            fetchJson(API_BASE_URL + '/enfermeiros/' + id)
            .then(existingNurse => {
                if (existingNurse) {
                    console.log('Enfermeiro existente encontrado:', existingNurse);
                    localStorage.setItem('currentUser', JSON.stringify(existingNurse));
                    window.location.href = 'm.html';
                } else {
                    showLoginFeedback('ID não encontrado.');
                    focusField('id');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar enfermeiro:', error);
                showLoginFeedback('Erro ao fazer login.');
                focusField('id');
            })
            .finally(() => {
                form.dataset.submitting = 'false';
                if (submitButton) {
                    submitButton.disabled = false;
                }
            });
        } else {
            // Register new nurse
            if (!form.checkValidity()) {
                showLoginFeedback('Preencha todos os campos obrigatórios.');
                focusField('nome');
                form.dataset.submitting = 'false';
                if (submitButton) {
                    submitButton.disabled = false;
                }
                return;
            }

            const cpfEmailField = document.getElementById('email');
            const value = cpfEmailField.value.trim();
            const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
            const cpfRegex = /^\d{11}$/;

            if (!emailRegex.test(value) && !cpfRegex.test(value)) {
                showLoginFeedback('CPF deve ter exatamente 11 números ou e-mail deve ser no formato usuario@gmail.com');
                focusField('email');
                form.dataset.submitting = 'false';
                if (submitButton) {
                    submitButton.disabled = false;
                }
                return;
            }

            const telefoneEl = document.getElementById('telefone');
            const telefone = telefoneEl ? telefoneEl.value : '';
            if (!/^\d{13}$/.test(telefone)) {
                showLoginFeedback('Telefone deve ter exatamente 13 números.');
                focusField('telefone');
                form.dataset.submitting = 'false';
                if (submitButton) {
                    submitButton.disabled = false;
                }
                return;
            }

            // Coletar dados de forma defensiva
            const getVal = id => {
                const el = document.getElementById(id);
                return el ? el.value : '';
            };

            const data = {
                id: id,
                nome: getVal('nome'),
                sobrenome: getVal('sobrenome'),
                email: value,
                telefone: telefone,
                passwordField: getVal('passwordField'),
                sexo: getVal('sexo'),
                dataContratacao: getVal('dataContratacao'),
                dataNascimento: getVal('dataNascimento'),
                diploma: getVal('diploma'),
                cargo: getVal('cargo'),
                complementos: getVal('complementos')
            };

            console.log(data);

            // Enviar dados para o servidor
            fetchJson(API_BASE_URL + '/enfermeiros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(result => {
                console.log('Enfermeiro adicionado:', result);
                localStorage.setItem('currentUser', JSON.stringify(data));
                console.log('Dados salvos localmente:', data);
                window.location.href = 'm.html';
            })
            .catch(error => {
                console.error('Erro ao adicionar enfermeiro:', error);
                showLoginFeedback('Erro ao salvar dados.');
                focusField('email');
            })
            .finally(() => {
                form.dataset.submitting = 'false';
                if (submitButton) {
                    submitButton.disabled = false;
                }
            });
        }
    });
})();

// regex para validar o email (utilitária, se necessário)
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
}