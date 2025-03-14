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
                "#ff03ec",
                "#00a5e6",
                "#67f0d5"
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

    document.querySelector('.finisher-header').style.backgroundColor = isDark ? 'rgba(21, 29, 46, 0.4)' : 'rgba(228, 237, 242, 0.5)';
}

// Seleciona elementos
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const backToTopButton = document.getElementById('back-to-top');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const profileImg = document.getElementById('profile-img');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// Função para alternar o tema e a imagem do perfil
function toggleTheme() {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
        initializeFinisherHeader(false);
        profileImg.src = 'images/profile-light.png';
    } else {
        htmlElement.classList.add('dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
        initializeFinisherHeader(true);
        profileImg.src = 'images/profile-dark.png';
    }
}

// Verifica preferência salva ao carregar e inicializa o efeito e a imagem
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
        themeToggle.textContent = '☀️';
        initializeFinisherHeader(true);
        profileImg.src = 'images/profile-dark.png';
    } else {
        htmlElement.classList.remove('dark');
        themeToggle.textContent = '🌙';
        initializeFinisherHeader(false);
        profileImg.src = 'images/profile-light.png';
    }

    // Adiciona scroll suave aos links da navbar e do footer
    const allNavLinks = document.querySelectorAll('.nav-links a, .footer-links a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.textContent = '☰';
            }
        });
    });

    // Envio do formulário via AJAX
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão

        const formData = new FormData(contactForm);
        formData.append('_subject', 'Nova mensagem do portfólio'); // Assunto do e-mail
        formData.append('_captcha', 'false'); // Desativa CAPTCHA

        fetch('https://formsubmit.co/leo.bernardo.3@gmail.com', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#079bf1'; // Azul claro pra sucesso
                formMessage.textContent = 'Mensagem enviada com sucesso!';
                contactForm.reset(); // Limpa o formulário
                setTimeout(() => {
                    formMessage.style.display = 'none'; // Esconde a mensagem após 3s
                }, 3000);
            } else {
                throw new Error('Erro ao enviar');
            }
        })
        .catch(error => {
            formMessage.style.display = 'block';
            formMessage.style.color = '#ff0000'; // Vermelho pra erro
            formMessage.textContent = 'Erro ao enviar a mensagem. Tente novamente.';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 3000);
        });
    });
});

// Adiciona evento ao botão de tema
themeToggle.addEventListener('click', toggleTheme);

// Mostrar/esconder botão "Voltar ao Início" ao rolar
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
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
    mobileMenu.textContent = navLinks.classList.contains('active') ? '✖' : '☰';
});
