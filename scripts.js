// Animações ao scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observa todas as seções para animação
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Inicializa o contador de visitas Firebase quando a página carrega
  initializeVisitCounter();
});

// Função para abrir WhatsApp
function abrirWhatsApp() {
  const telefone = '5544999999999'; // Substitua pelo número real com código do país e DDD
  const mensagem = 'Olá! Vi seu catálogo e gostaria de agendar um horário. ✨';
  const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, '_blank');
}

function abrirInstagram() {
  window.open('https://www.instagram.com/fabiolafmelo/?hl=en', '_blank'); // Substitua pelo link do Instagram real
}

// Função para abrir Google Maps
function abrirGoogleMaps() {
  const endereco = 'Av. João Gualberto, 1881 - sala 1403 - Alto da Glória, Curitiba - PR, 80030-001'; // Substitua pelo endereço real
  const link = `https://www.google.com/maps/search/${encodeURIComponent(endereco)}`;
  window.open(link, '_blank');
}

// Função para abrir Waze
function abrirWaze() { 
  const latitude = -25.411820723752843; // Substitua pela latitude real
  const longitude = -49.258000450197386; // Substitua pela longitude real
  const link = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
  window.open(link, '_blank');
}

// Smooth scroll para navegação interna (caso adicione links de menu)
function smoothScrollTo(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Adiciona efeito de hover nas imagens da galeria
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
});

// Função para validar e formatar número de telefone (útil para futuras melhorias)
function formatarTelefone(telefone) {
  // Remove todos os caracteres não numéricos
  const cleaned = telefone.replace(/\D/g, '');
  
  // Aplica a formatação (11) 99999-9999
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return telefone;
}

// Função para detectar dispositivo móvel
function isMobile() {
  return window.innerWidth <= 768;
}

// Ajusta comportamento em dispositivos móveis
window.addEventListener('resize', function() {
  if (isMobile()) {
    // Ajustes específicos para mobile podem ser feitos aqui
    console.log('Visualização mobile ativa');
  }
});

// Efeito de typing para texto do header (opcional)
function typingEffect(element, text, speed = 100) {
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// Função para criar confetti (efeito decorativo opcional)
function createConfetti() {
  const colors = ['#ec4899', '#be185d', '#7c3aed', '#f3e8ff'];
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.width = '10px';
  confetti.style.height = '10px';
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  confetti.style.left = Math.random() * window.innerWidth + 'px';
  confetti.style.top = '-10px';
  confetti.style.pointerEvents = 'none';
  confetti.style.zIndex = '9999';
  
  document.body.appendChild(confetti);
  
  const animation = confetti.animate([
    { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
    { transform: `translateY(${window.innerHeight + 10}px) rotate(360deg)`, opacity: 0 }
  ], {
    duration: 3000,
    easing: 'ease-in'
  });
  
  animation.onfinish = () => confetti.remove();
}

// Ativa confetti quando o usuário clica no botão do WhatsApp (opcional)
document.addEventListener('DOMContentLoaded', function() {
  const whatsappBtn = document.querySelector('.whatsapp-btn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
      for (let i = 0; i < 20; i++) {
        setTimeout(() => createConfetti(), i * 100);
      }
    });
  }
});

// ==================== FIREBASE CONFIGURATION ====================
// Esta configuração deve ser movida para o HTML principal
// Aqui fica apenas como referência comentada

/*
// Firebase - Configuração movida para o HTML
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

// Configuração do Firebase (usar Realtime Database ao invés de Firestore)
const firebaseConfig = {
  apiKey: "AIzaSyBmFRGKsSK9vkID6fiLvGWCPuH-UPZLD9g",
  authDomain: "visita-em-tempo-real.firebaseapp.com",
  databaseURL: "https://visita-em-tempo-real-default-rtdb.firebaseio.com",
  projectId: "visita-em-tempo-real",
  storageBucket: "visita-em-tempo-real.firebasestorage.app",
  messagingSenderId: "314640996523",
  appId: "1:314640996523:web:296070e250bee4616effee",
  measurementId: "G-NYSFS5TTYS"
};

// Função para inicializar o contador de visitas (versão Realtime Database)
async function initializeVisitCounter() {
  try {
    // Inicializa Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const countRef = ref(db, 'visits/count');

    // Incrementa a visita de forma segura
    await runTransaction(countRef, (currentValue) => {
      return (currentValue || 0) + 1;
    });

    // Atualiza o contador em tempo real
    onValue(countRef, (snapshot) => {
      const visitas = snapshot.val() || 0;
      const contadorEl = document.getElementById("Visitas");
      if (contadorEl) {
        contadorEl.innerText = visitas;
      }
    });

  } catch (error) {
    console.error("Erro ao inicializar contador de visitas:", error);
    const contadorEl = document.getElementById("Visitas");
    if (contadorEl) {
      contadorEl.innerText = "Erro";
    }
  }
}
*/

// Função placeholder para o contador (caso o Firebase não esteja configurado no HTML)
function initializeVisitCounter() {
  const contadorEl = document.getElementById("Visitas");
  if (contadorEl && contadorEl.innerText === "Carregando...") {
    // Se ainda estiver "Carregando...", significa que o Firebase não está funcionando
    setTimeout(() => {
      if (contadorEl.innerText === "Carregando...") {
        contadorEl.innerText = "Firebase não configurado";
      }
    }, 3000);
  }
}

// Função utilitária para debug
function debugInfo() {
  console.log('Scripts carregados com sucesso!');
  console.log('Funções disponíveis:', {
    abrirWhatsApp: typeof abrirWhatsApp,
    abrirInstagram: typeof abrirInstagram,
    abrirGoogleMaps: typeof abrirGoogleMaps,
    abrirWaze: typeof abrirWaze
  });
}