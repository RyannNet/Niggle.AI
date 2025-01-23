// Função para simular navegação no menu
  document.querySelectorAll('nav').forEach((navItem, index) => {
    navItem.addEventListener('click', () => {
      alert(`Você clicou no menu: ${navItem.innerText}. (Opção ${index + 1})`);
    });
  });

  // Função para alterar o texto do botão ao clicar
  const button = document.querySelector('button');
  button.addEventListener('click', () => {
    button.innerText = 'Registrado!';
    button.disabled = true;
    button.style.backgroundColor = '#AAA';
    alert('Pré-registro realizado com sucesso!');
  });

  // Função para alternar entre modos claro e escuro (Exemplo adicional)
  let isDarkMode = true;
  const body = document.body;

  function toggleTheme() {
    if (isDarkMode) {
      body.style.background = '#FFFFFF';
      body.style.color = '#000000';
    } else {
      body.style.background = 'linear-gradient(90deg, #080011, #02002C)';
      body.style.color = '#FFFFFF';
    }
    isDarkMode = !isDarkMode;
  }

  // Adiciona evento ao pressionar a tecla "T" para alternar tema
  document.addEventListener('keydown', (event) => {
    if (event.key === 't' || event.key === 'T') {
      toggleTheme();
    }
  });

  // Função para exibir mensagem ao passar o mouse sobre os ícones de plataformas
  const plataformaIcon = document.querySelector('.plataformas img');
  if (plataformaIcon) {
    plataformaIcon.addEventListener('mouseover', () => {
      plataformaIcon.style.border = '2px solid #FFD404';
      alert('Em breve disponível na plataforma!');
    });

    plataformaIcon.addEventListener('mouseout', () => {
      plataformaIcon.style.border = 'none';
    });
  }
  // Bloquear teclas F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, etc.
document.addEventListener('keydown', (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
    (e.ctrlKey && e.key === 'U') ||
    (e.ctrlKey && e.key === 'S')
  ) {
    e.preventDefault();
    alert("Alguma organização ou aplicativo não permite captura de imagens.");
  }
});

// Desativar o botão direito do mouse
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  alert("Alguma organização ou aplicativo não permite captura de imagens.");
});

// Prevenir métodos de depuração
(function() {
  const devtools = /./;
  devtools.toString = function() {
    alert("Alguma organização ou aplicativo não permite captura de imagens.");
    return "Inspeção bloqueada!";
  };

  setInterval(() => {
    console.log('%c', devtools);
  }, 1000);
})();