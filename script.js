// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header transparente/sólido no scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(42, 63, 84, 0.98)';
    } else {
        header.style.background = 'rgba(42, 63, 84, 0.95)';
    }
});

// Filtro do Portfólio
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active de todos os botões
        filterBtns.forEach(b => b.classList.remove('active'));
        // Adiciona active ao botão clicado
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Formulário de Contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Pegar dados do formulário
    const formData = new FormData(contactForm);
    const nome = formData.get('nome');
    const email = formData.get('email');
    const telefone = formData.get('telefone');
    const servico = formData.get('servico');
    const mensagem = formData.get('mensagem');
    
    // Criar mensagem para WhatsApp
    const whatsappMessage = `Olá! Gostaria de solicitar um orçamento:\n\n` +
        `Nome: ${nome}\n` +
        `E-mail: ${email}\n` +
        `Telefone: ${telefone}\n` +
        `Serviço: ${servico}\n` +
        `Mensagem: ${mensagem}`;
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Abrir WhatsApp
    window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank');
    
    // Limpar formulário
    contactForm.reset();
    
    // Mostrar mensagem de sucesso
    alert('Redirecionando para o WhatsApp...');
});

// Animação de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de elementos ao entrar na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.servico-card, .portfolio-item, .depoimento').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Contador de números (se você quiser adicionar estatísticas)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Adicionar ao script.js

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fechar todos os outros
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir o clicado se não estava ativo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Validação de CEP
document.getElementById('cep')?.addEventListener('blur', async function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (!data.erro) {
                console.log('CEP válido:', data.localidade, data.uf);
            }
        } catch (error) {
            console.log('Erro ao validar CEP');
        }
    }
});

// Loading screen
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hide');
        setTimeout(() => loading.remove(), 500);
    }
});

// Contador de caracteres para textarea
const textarea = document.getElementById('mensagem');
if (textarea) {
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = '0/500';
    textarea.parentNode.appendChild(counter);
    
    textarea.addEventListener('input', function() {
        const length = this.value.length;
        counter.textContent = `${length}/500`;
        if (length > 450) {
            counter.style.color = '#F4A261';
        } else {
            counter.style.color = '#666';
        }
    });
}