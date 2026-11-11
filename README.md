# 💈 AVW Barber — Website Demonstrativo de Barbearia

Repositório da **AVW Barber**, uma *landing page* demonstrativa de alto padrão desenvolvida pela **Advanced Visual Work**. O projeto simula uma aplicação web moderna para barbearias e salões, com foco no agendamento simples de serviços por data e horário via WhatsApp.

---

## 🚀 Sobre o Projeto

O **AVW Barber** foi projetado para oferecer uma experiência ágil tanto no mobile quanto no desktop. Ele permite que clientes visualizem serviços, preços e descrições com fotos detalhadas, escolham um dia/horário disponível e enviem a solicitação formatada diretamente para o WhatsApp do estabelecimento.

### ✨ Principais Funcionalidades

* **Sistema de Agendamento Interativo:**
  * Calendário dinâmico com suporte para dias futuros configuráveis.
  * Grade de horários com bloqueio automático de horários que já passaram ou que foram reservados.
  * Validação no lado do cliente para garantir preenchimento de nome, serviço, data e horário.
* **Persistência Local (Offline-first / Demo):**
  * Armazenamento de agendamentos no `localStorage` do navegador.
  * Sincronização em tempo real entre diferentes abas abertas (`storage event`).
* **Integração com WhatsApp (`wa.me`):**
  * Geração dinâmica de mensagens prontas contendo o nome do cliente, serviço escolhido, valor, dia e horário.
* **Experiência Visual & Temática:**
  * Design escuro (*Dark Theme*) minimalista e refinado.
  * Elemento decorativo *Barber Pole* animado com CSS puro em escala de cinza.
  * Galeria responsiva de cortes/serviços com animações ao passar o mouse (`clip-path` e `transform`).
  * Barra de agendamento fixa inferior para telas móveis.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Marcação semântica com recursos de acessibilidade (`aria-pressed`, `aria-checked`, `aria-live`, `role="radiogroup"`).
* **CSS3:** Animações CSS em tempo de execução (`keyframes`), variáveis CSS (`:root`), layouts em Grid e Flexbox, e filtros de *blur*.
* **JavaScript (ES6+):** Lógica pura sem dependências (*Vanilla JS*), controle de estado local, manipulação de datas com a API `Intl.DateTimeFormat` e persistência no `localStorage`.

---

## 📂 Estrutura de Arquivos

```
.
├── index.html          # Interface principal do sistema de agendamento e galeria
├── style.css           # Estilização completa, temas escuros e animações (pole, cortes)
├── script.js           # Lógica do agendamento, estado, armazenamento e WhatsApp
└── images/             # Imagens demonstrativas dos cortes e identidade da marca
    ├── logo-mark.png
    ├── low-taper.jpg
    ├── skin-fade.jpg
    ├── fade-risca.jpg
    ├── maquina.jpg
    ├── barba.jpg
    └── penteado.jpg
```

---

## ⚙️ Configuração & Personalização

Para adaptar este modelo para uma barbearia real, edite o objeto `CONFIG` no início do arquivo `script.js`:

```javascript
const CONFIG = {
  whatsapp: "5511900000000",   // Número com DDI + DDD (ex: 5511999999999)
  openHour: 9,                 // Horário de abertura (ex: 9h)
  closeHour: 19,               // Horário de fechamento (ex: 19h)
  closedWeekdays: [0],         // Dias fechados (0 = Domingo, 1 = Segunda, etc.)
  daysAhead: 14,               // Quantidade de dias futuros disponíveis para agendar
  services: [                  // Lista de serviços, preços e imagens
    { id: "low-taper", name: "Degradê baixo", price: 45, img: "images/low-taper.jpg", ... },
    // ...
  ]
};
```

---

## 👥 Desenvolvedores & Créditos

Este modelo de demonstração foi concebido e desenvolvido pelos fundadores da **Advanced Visual Work**:

* **João Henrique**
* **Matheus**

---

## 📬 Contato Commercial

Interessado em implementar este sistema no seu negócio?

* ✉️ **E-mail:** [advancedvisualwork@gmail.com](mailto:advancedvisualwork@gmail.com)
* 📸 **Instagram:** [@advancedvisualwork](https://www.instagram.com/advancedvisualwork/)

---

## 📄 Licença

Este projeto é um modelo demonstrativo de propriedade da **Advanced Visual Work**. Todos os direitos reservados © 2026.