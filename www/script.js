function abrirCamera() {
  if (navigator.camera && navigator.camera.getPicture) {
    navigator.camera.getPicture(
      function(imageData) {
        const image = document.getElementById("myImage");
        image.src = "data:image/jpeg;base64," + imageData;
      },
      function(message) {
        alert("Erro ao acessar a câmera: " + message);
      },
      {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
      }
    );
  } else {
    alert("Plugin da câmera não disponível neste ambiente.");
  }
}


function verFotos() {
  alert("Plugin de galeria ainda não integrado.");
  // Aqui pode usar armazenamento local ou plugin de galeria
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
