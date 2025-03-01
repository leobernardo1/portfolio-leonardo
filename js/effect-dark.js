// Função para inicializar o FinisherHeader com base no tema
function initializeFinisherHeader(isDark) {
    new FinisherHeader({
        "count": 100,
        "size": {
            "min": 2,
            "max": 8,
            "pulse": 0
        },
        "speed": {
            "x": {
                "min": 0,
                "max": 0.4
            },
            "y": {
                "min": 0,
                "max": 0.6
            }
        },
        "colors": {
            "background": isDark ? "#151d2e" : "#e4edf2",
            "particles": [
                "#ff03ec", // Rosa vibrante
                "#00a5e6", // Azul claro
                "#67f0d5"  // Verde azulado
            ]
        },
        "blending": "overlay",
        "opacity": {
            "center": 1,
            "edge": 0
        },
        "skew": 0,
        "shapes": ["c"]
    });

    // Aplica a transparência ao elemento após a inicialização
    document.querySelector('.finisher-header').style.backgroundColor = isDark ? 'rgba(21, 29, 46, 0.4)' : 'rgba(228, 237, 242, 0.5)';
}

// Seleciona elementos
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const backToTopButton = document.getElementById('back-to-top');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const profileImg = document.getElementById('profile-img');

// Função para alternar o tema e a imagem do perfil
function toggleTheme() {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
        initializeFinisherHeader(false); // Tema claro
        profileImg.src = 'images/profile-light.png'; // Imagem para tema claro
    } else {
        htmlElement.classList.add('dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
        initializeFinisherHeader(true); // Tema escuro
        profileImg.src = 'images/profile-dark.png'; // Imagem para tema escuro
    }
}

// Verifica preferência salva ao carregar e inicializa o efeito e a imagem
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
        themeToggle.textContent = '☀️';
        initializeFinisherHeader(true); // Tema escuro
        profileImg.src = 'images/profile-dark.png'; // Imagem para tema escuro
    } else {
        htmlElement.classList.remove('dark');
        themeToggle.textContent = '🌙';
        initializeFinisherHeader(false); // Tema claro
        profileImg.src = 'images/profile-light.png'; // Imagem para tema claro
    }
});

// Adiciona evento ao botão de tema
themeToggle.addEventListener('click', toggleTheme);

// Mostrar/esconder botão "Voltar ao Início" ao rolar
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Aparece após rolar 300px
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Voltar ao topo ao clicar no botão
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Toggle do menu mobile
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.textContent = navLinks.classList.contains('active') ? '✖' : '☰'; // Alterna entre "☰" e "✖"
});