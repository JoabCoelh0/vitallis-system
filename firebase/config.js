// VITALLIS - Configuração Firebase

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

if (firebase) {
    firebase.initializeApp(firebaseConfig);
    console.log('✓ Firebase inicializado com sucesso');
} else {
    console.error('✗ Erro: Firebase não foi carregado');
}

const auth = firebase.auth ? firebase.auth() : null;
const database = firebase.database ? firebase.database() : null;

// API Firebase
function firebaseLogin(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('✓ Login realizado:', userCredential.user.email);
            return userCredential.user;
        })
        .catch(error => {
            console.error('✗ Erro no login:', error.message);
            throw error;
        });
}

function firebaseLogout() {
    return auth.signOut()
        .then(() => console.log('✓ Logout realizado'))
        .catch(error => {
            console.error('✗ Erro no logout:', error.message);
            throw error;
        });
}

function firebaseSaveData(path, data) {
    return database.ref(path).set(data)
        .then(() => console.log('✓ Dados salvos em:', path))
        .catch(error => {
            console.error('✗ Erro ao salvar dados:', error.message);
            throw error;
        });
}

function firebaseReadData(path) {
    return database.ref(path).once('value')
        .then(snapshot => snapshot.val())
        .catch(error => {
            console.error('✗ Erro ao ler dados:', error.message);
            throw error;
        });
}

window.firebaseAPI = {
    login: firebaseLogin,
    logout: firebaseLogout,
    saveData: firebaseSaveData,
    readData: firebaseReadData
};