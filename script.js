function abrirCamera() {
  document.getElementById('inputCamera').click(); // Ativa o input da câmera
}

function mostrarFoto(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('preview').src = e.target.result; // Mostra a imagem
    };
    reader.readAsDataURL(input.files[0]);
  }
}

  
  function verFotos() {
    document.getElementById("seletorGaleria").click();
  }
  
  function mostrarImagemSelecionada(event) {
    const arquivo = event.target.files[0];
    if (arquivo) {
      const leitor = new FileReader();
      leitor.onload = function(e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.maxWidth = "100%";
        document.getElementById("galeria").innerHTML = "";
        document.getElementById("galeria").appendChild(img);
      };
      leitor.readAsDataURL(arquivo);
    }
  }
  
  
  function atualizarClima() {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      
      // Open-Meteo API gratuita e sem autenticação
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  
      fetch(url)
        .then(res => res.json())
        .then(data => {
          const temp = data.current_weather.temperature;
          const vento = data.current_weather.windspeed;
          document.getElementById("clima").innerText = `Temperatura: ${temp}°C | Vento: ${vento} km/h`;
        })
        .catch(() => {
          document.getElementById("clima").innerText = "Erro ao obter clima.";
        });
    }, () => {
      document.getElementById("clima").innerText = "Localização negada.";
    });
  }
  
  function enviarNotificacao() {
    if (Notification.permission === 'granted') {
      new Notification("Notificação do app multifuncional!");
    } else {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          new Notification("Notificação do app multifuncional!");
        }
      });
    }
  }
  
  function vibrar() {
    if ("vibrate" in navigator) {
      navigator.vibrate([500, 300, 500]);
    } else {
      alert("Dispositivo não suporta vibração.");
    }
  }
  
  