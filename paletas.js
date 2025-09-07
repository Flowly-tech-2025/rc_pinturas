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

// Variáveis globais
let paletaSelecionada = null;
let dadosCalculadora = {};

// Seleção de paletas
document.addEventListener('DOMContentLoaded', function() {
    const paletaCards = document.querySelectorAll('.paleta-card');
    const paletaSelecionadaDiv = document.getElementById('paletaSelecionada');
    const coresSelecionadasDiv = document.getElementById('coresSelecionadas');
    const descricaoSelecionada = document.getElementById('descricaoSelecionada');

    paletaCards.forEach(card => {
        const btnSelecionar = card.querySelector('.btn-selecionar');
        
        btnSelecionar.addEventListener('click', function() {
            // Remove seleção anterior
            paletaCards.forEach(c => c.classList.remove('selecionada'));
            
            // Adiciona seleção atual
            card.classList.add('selecionada');
            
            // Pega dados da paleta
            const nomePaleta = card.querySelector('h3').textContent;
            const descricao = card.querySelector('.paleta-desc').textContent;
            const cores = card.querySelectorAll('.cor-circulo');
            
            // Atualiza paleta selecionada
            paletaSelecionada = {
                nome: nomePaleta,
                descricao: descricao,
                cores: Array.from(cores).map(cor => ({
                    hex: cor.dataset.cor,
                    nome: cor.title
                }))
            };
            
            // Mostra paleta selecionada
            coresSelecionadasDiv.innerHTML = '';
            paletaSelecionada.cores.forEach(cor => {
                const circulo = document.createElement('div');
                circulo.className = 'cor-circulo';
                circulo.style.backgroundColor = cor.hex;
                circulo.title = cor.nome;
                coresSelecionadasDiv.appendChild(circulo);
            });
            
            descricaoSelecionada.textContent = `${nomePaleta}: ${descricao}`;
            paletaSelecionadaDiv.style.display = 'block';
            
            // Scroll suave para a paleta selecionada
            paletaSelecionadaDiv.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Calculadora de tinta
function calcularTinta() {
    const largura = parseFloat(document.getElementById('largura').value) || 0;
    const comprimento = parseFloat(document.getElementById('comprimento').value) || 0;
    const altura = parseFloat(document.getElementById('altura').value) || 0;
    const portas = parseInt(document.getElementById('portas').value) || 0;
    const janelas = parseInt(document.getElementById('janelas').value) || 0;
    const demãos = parseInt(document.getElementById('demãos').value) || 2;
    const rendimentoTinta = parseInt(document.getElementById('tipoTinta').value) || 18;
    
    // Validação
    if (largura <= 0 || comprimento <= 0 || altura <= 0) {
        alert('Por favor, preencha todas as dimensões do ambiente.');
        return;
    }
    
    // Cálculos
    const areaParedes = 2 * (largura * altura) + 2 * (comprimento * altura);
    const areaPortas = portas * 2.1 * 0.9; // Porta padrão: 2.1m x 0.9m
    const areaJanelas = janelas * 1.2 * 1.0; // Janela padrão: 1.2m x 1.0m
    const areaTotal = areaParedes;
    const areaPintar = areaParedes - areaPortas - areaJanelas;
    const areaPintarComDemãos = areaPintar * demãos;
    const litrosNecessarios = areaPintarComDemãos / rendimentoTinta;
    const litrosComMargem = litrosNecessarios * 1.1; // 10% de margem
    const latasNecessarias = Math.ceil(litrosComMargem / 3.6); // Lata padrão 3.6L
    
    // Armazenar dados para orçamento
    dadosCalculadora = {
        largura,
        comprimento,
        altura,
        portas,
        janelas,
        demãos,
        areaTotal: areaTotal.toFixed(2),
        areaPintar: areaPintar.toFixed(2),
        litros: litrosComMargem.toFixed(2),
        latas: latasNecessarias,
        tipoTinta: document.getElementById('tipoTinta').selectedOptions[0].text
    };
    
    // Mostrar resultados
    document.getElementById('areaTotal').textContent = `${areaTotal.toFixed(2)} m²`;
    document.getElementById('areaPintar').textContent = `${areaPintar.toFixed(2)} m²`;
    document.getElementById('quantidadeTinta').textContent = `${litrosComMargem.toFixed(2)} L`;
    document.getElementById('latasNecessarias').textContent = `${latasNecessarias} latas de 3,6L`;
    
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
}

// Solicitar orçamento via WhatsApp
function solicitarOrcamento() {
    let mensagem = `🎨 *Solicitação de Orçamento - RC Pinturas*\n\n`;
    
    if (paletaSelecionada) {
        mensagem += `🎨 *Paleta Escolhida:* ${paletaSelecionada.nome}\n`;
        mensagem += `📝 *Descrição:* ${paletaSelecionada.descricao}\n\n`;
    }
    
    if (dadosCalculadora.largura) {
        mensagem += `📐 *Dados do Ambiente:*\n`;
        mensagem += `• Largura: ${dadosCalculadora.largura}m\n`;
        mensagem += `• Comprimento: ${dadosCalculadora.comprimento}m\n`;
        mensagem += `• Altura: ${dadosCalculadora.altura}m\n`;
        mensagem += `• Portas: ${dadosCalculadora.portas}\n`;
        mensagem += `• Janelas: ${dadosCalculadora.janelas}\n`;
        mensagem += `• Demãos: ${dadosCalculadora.demãos}\n\n`;
        
        mensagem += `📊 *Cálculo de Tinta:*\n`;
        mensagem += `• Área total: ${dadosCalculadora.areaTotal} m²\n`;
        mensagem += `• Área a pintar: ${dadosCalculadora.areaPintar} m²\n`;
        mensagem += `• Quantidade de tinta: ${dadosCalculadora.litros} L\n`;
        mensagem += `• Latas necessárias: ${dadosCalculadora.latas}\n`;
        mensagem += `• Tipo de tinta: ${dadosCalculadora.tipoTinta}\n\n`;
    }
    
    mensagem += `💬 Gostaria de receber um orçamento detalhado para este projeto!`;
    
    const numeroWhatsApp = '5511999999999';
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, '_blank');
}

// Scroll suave para seções
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