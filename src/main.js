// VITALLIS - Sistema de Gestão Terapêutica - Arquivo Principal

const appState = {
    currentUser: null,
    currentPage: 'home',
    patients: [],
    settings: {}
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Vitallis iniciado');
    initializeNavigation();
    initializeEventListeners();
    checkUserAuthentication();
});

// Navegação
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            navigateTo(page);
        });
    });
}

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });

    const pageElement = document.getElementById(`${page}-page`);
    if (pageElement) {
        pageElement.classList.add('active');
        pageElement.style.display = 'block';
        appState.currentPage = page;
        loadPageData(page);
    }
}

function loadPageData(page) {
    switch(page) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'patients':
            loadPatients();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

function initializeEventListeners() {
    const btnGetStarted = document.getElementById('btnGetStarted');
    if (btnGetStarted) {
        btnGetStarted.addEventListener('click', () => {
            navigateTo('dashboard');
        });
    }
}

function loadDashboard() {
    console.log('Carregando Dashboard...');
}

function loadPatients() {
    console.log('Carregando Pacientes...');
    const patientsList = document.getElementById('patientsList');
    if (patientsList) {
        patientsList.innerHTML = '<p>Carregando pacientes...</p>';
        fetchPatientsFromFirebase();
    }
}

function loadSettings() {
    console.log('Carregando Configurações...');
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.innerHTML = `
            <div class="form-group">
                <label for="appName">Nome da Aplicação</label>
                <input type="text" id="appName" placeholder="Vitallis">
            </div>
            <button type="submit" class="btn btn-primary">Salvar Configurações</button>
        `;
    }
}

// Firebase
function checkUserAuthentication() {
    if (typeof firebase !== 'undefined') {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                appState.currentUser = user;
                console.log('✓ Usuário autenticado:', user.email);
            } else {
                console.log('ℹ Nenhum usuário autenticado');
            }
        });
    }
}

function fetchPatientsFromFirebase() {
    if (typeof firebase !== 'undefined' && firebase.database()) {
        const ref = firebase.database().ref('patients');
        ref.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                appState.patients = Object.values(data);
                renderPatients();
            }
        }, (error) => {
            console.error('Erro ao buscar pacientes:', error);
        });
    }
}

function renderPatients() {
    const patientsList = document.getElementById('patientsList');
    if (patientsList && appState.patients.length > 0) {
        patientsList.innerHTML = appState.patients.map((patient) => `
            <div class="patient-card" style="border: 1px solid #e5e7eb; padding: 1rem; margin-bottom: 1rem; border-radius: 6px;">
                <h3>${patient.name || 'Sem nome'}</h3>
                <p><strong>ID:</strong> ${patient.id || 'N/A'}</p>
                <p><strong>Email:</strong> ${patient.email || 'N/A'}</p>
            </div>
        `).join('');
    } else if (patientsList) {
        patientsList.innerHTML = '<p>Nenhum paciente encontrado.</p>';
    }
}

window.vitallis = {
    navigateTo,
    getCurrentUser: () => appState.currentUser,
    isUserAuthenticated: () => appState.currentUser !== null,
    appState
};