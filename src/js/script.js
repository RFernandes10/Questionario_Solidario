document.addEventListener("DOMContentLoaded", () => {
  // Animações de Entrada
  const perguntas = document.querySelectorAll(".pergunta");
  if (perguntas.length > 0) {
    perguntas.forEach((pergunta, index) => {
      setTimeout(() => {
        pergunta.style.opacity = "1";
        pergunta.style.transform = "translateY(0)";
      }, index * 300);
    });
  }

  // Modo Escuro
  const toggleButton = document.getElementById("darkModeToggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      toggleButton.innerText = document.body.classList.contains("dark-mode")
        ? "Modo Claro"
        : "Modo Escuro";
    });
  }

  // Scroll Suave + Toggle de Respostas e Reprodução de Áudio
  window.scrollToSection = (id) => {
    try {
      const pergunta = document.getElementById(id);
      if (!pergunta) return;

      const resposta = pergunta.querySelector("p");
      const audio = pergunta.querySelector("audio");

      // Toggle resposta
      if (resposta) {
        resposta.classList.toggle("show");
      }

      // Pausa todos os áudios antes de reproduzir o atual
      document.querySelectorAll("audio").forEach((a) => {
        a.pause();
        a.currentTime = 0;
      });

      // Reproduz o áudio da seção atual se a resposta estiver visível
      if (audio && resposta && resposta.classList.contains("show")) {
        audio.play();
      }

      // Scroll suave
      pergunta.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } catch (error) {
      console.error("Erro ao rolar para a seção:", error);
    }
  };

  // Formulário de Feedback
  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Verifica se todos os campos foram preenchidos
      const inputs = feedbackForm.querySelectorAll("input, textarea");
      let isValid = true;

      inputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          isValid = false;
          input.style.borderColor = "red";
        } else {
          input.style.borderColor = "";
        }
      });

      if (isValid) {
        feedbackForm.style.display = "none";
        document.getElementById("mensagemSucesso").style.display = "block";

        // Limpa os campos do formulário
        feedbackForm.reset();

        // Opcional: esconder a mensagem de sucesso após alguns segundos
        setTimeout(() => {
          document.getElementById("mensagemSucesso").style.display = "none";
          feedbackForm.style.display = "flex";
        }, 5000);
      }
    });
  }
});
