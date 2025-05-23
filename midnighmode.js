document.addEventListener('DOMContentLoaded', function() {
  // Comando secreto para ativar o modo noturno
  const command = "NightMode:Active:";

  // Verifica se a URL contém o comando secreto
  const urlParams = new URLSearchParams(window.location.search);
  const modeCommand = urlParams.get('mode');

  // Se o comando estiver presente na URL, ativa o modo noturno
  if (modeCommand === command) {
    document.body.classList.add('dark-mode');
    document.querySelector('.chat-container').classList.add('dark-Mode');
  }

  // Alternar o modo noturno ao pressionar um botão ou outro comando
  const toggleButton = document.createElement('button');
  toggleButton.textContent = 'Alternar Modo Noturno';
  toggleButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.chat-container').classList.toggle('dark-mode');
  });
  document.body.appendChild(toggleButton);
});
