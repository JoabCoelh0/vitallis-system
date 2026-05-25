# Arquitetura Vitallis - MVC

## Visão Geral

O Vitallis utiliza o padrão de arquitetura **MVC (Model-View-Controller)** para manter o código organizado, modular e fácil de manter.

## Padrão MVC

### Model (Modelo)
Representa a estrutura e lógica dos dados:
- Define as propriedades dos objetos
- Valida dados
- Representa entidades do domínio

**Exemplo: Patient Model**
```javascript
class Patient {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    
    validate() {
        // Validações
    }
}
```

### View (Visualização)
Responsável pela apresentação e interface com o usuário:
- Renderiza templates HTML
- Captura eventos do usuário
- Não contém lógica de negócio

**Exemplo: Patient View**
```javascript
class PatientView {
    render(patients) {
        // Renderizar lista de pacientes
    }
    
    bindAddPatient(handler) {
        // Bind evento de adicionar paciente
    }
}
```

### Controller (Controlador)
Coordenada Model e View:
- Captura eventos da View
- Chama métodos do Model
- Atualiza a View

**Exemplo: Patient Controller**
```javascript
class PatientController {
    constructor(patientModel, patientView) {
        this.model = patientModel;
        this.view = patientView;
    }
    
    addPatient(name, email) {
        const patient = this.model.create(name, email);
        this.view.render(this.model.getAll());
    }
}
```

## Fluxo de Dados

```
User Input
    ↓
View (captura evento)
    ↓
Controller (processa lógica)
    ↓
Model (manipula dados)
    ↓
Firebase (persiste dados)
    ↓
View (atualiza UI)
```

## Estrutura de Diretórios Detalhada

### src/models/
```
models/
├── Patient.js       # Modelo de Paciente
├── User.js          # Modelo de Usuário
├── Treatment.js     # Modelo de Tratamento
└── index.js         # Exportações dos modelos
```

### src/views/
```
views/
├── PatientView.js      # View de Pacientes
├── DashboardView.js    # View do Dashboard
├── FormView.js         # Componente reutilizável de Formulário
├── components/
│   ├── Header.js
│   ├── NavBar.js
│   └── Modal.js
└── templates/
    ├── patientList.html
    └── patientForm.html
```

### src/controllers/
```
controllers/
├── PatientController.js     # Controller de Pacientes
├── AuthController.js        # Controller de Autenticação
├── DashboardController.js   # Controller do Dashboard
└── index.js                 # Exportações dos controllers
```

### src/services/
```
services/
├── AuthService.js           # Serviço de Autenticação
├── DataService.js           # Serviço de Acesso a Dados
├── NotificationService.js   # Serviço de Notificações
├── ValidationService.js     # Serviço de Validação
└── Utils.js                 # Funções utilitárias
```

## Benefícios da Arquitetura MVC

✅ **Separação de Responsabilidades** - Cada componente tem uma responsabilidade clara
✅ **Reutilização de Código** - Models e Services podem ser reutilizados
✅ **Testabilidade** - Componentes podem ser testados independentemente
✅ **Manutenibilidade** - Código organizado é mais fácil de manter
✅ **Escalabilidade** - Fácil adicionar novas features
✅ **Colaboração** - Múltiplos desenvolvedores podem trabalhar em paralelo

## Melhores Práticas

1. **Models** - Manter simples, só lógica de dados
2. **Views** - Apenas renderizar e capturar eventos
3. **Controllers** - Orquestrar comunicação entre Model e View
4. **Services** - Centralizar chamadas de API e dados externos
5. **Naming** - Nomes descritivos para classes e métodos
6. **Separation** - Cada arquivo deve ter uma classe/responsabilidade
