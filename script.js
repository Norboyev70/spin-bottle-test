const tg = window.Telegram.WebApp;
    if(tg) tg.expand();

    const table = document.getElementById('table');
    const bottle = document.getElementById('bottle');
    let currentRotation = 0;
    let isSpinning = false;

    // Ismlar va profillar
    const players = [
      { name: 'ANAKONDA, 21', avatar: 'https://i.pravatar.cc/100?img=1' },
      { name: 'Ubaydulla, 24', avatar: 'https://i.pravatar.cc/100?img=3' },
      { name: 'Luna, 27', avatar: 'https://i.pravatar.cc/100?img=5' },
      { name: 'No name, 27', avatar: 'https://i.pravatar.cc/100?img=8' },
      { name: 'CCCR, 22', avatar: 'https://i.pravatar.cc/100?img=11' },
      { name: 'Mr SKROM, 23', avatar: 'https://i.pravatar.cc/100?img=12' },
      { name: 'ФВО', avatar: 'https://i.pravatar.cc/100?img=15' },
      { name: 'Norboyev', avatar: 'https://i.pravatar.cc/100?img=18' }
    ];

    function renderPlayers() {
      const radius = 130;
      const total = players.length;

      players.forEach((player, index) => {
        const angle = (index / total) * (2 * Math.PI) - (Math.PI / 2);
        const x = radius * Math.cos(angle) + 149;
        const y = radius * Math.sin(angle) + 149;

        const div = document.createElement('div');
        div.className = 'player-slot';
        div.id = `player-${index}`;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.style.backgroundImage = `url('${player.avatar}')`;

        const nameTag = document.createElement('div');
        nameTag.className = 'player-name';
        nameTag.innerText = player.name;
        div.appendChild(nameTag);

        table.appendChild(div);
      });
    }

    // Butilkani aylantirish funksiyasi
    function spinBottle() {
      if (isSpinning) return;
      isSpinning = true;

      document.querySelectorAll('.player-slot').forEach(el => el.classList.remove('active'));

      const randomDegree = Math.floor(Math.random() * 360);
      const totalSpins = 360 * 6 + randomDegree;
      currentRotation += totalSpins;

      bottle.style.transform = `rotate(${currentRotation}deg)`;

      setTimeout(() => {
        isSpinning = false;
        const normalizedDegree = (currentRotation % 360 + 360) % 360;
        const playerIndex = Math.floor((normalizedDegree / 360) * players.length);
        
        const selectedPlayer = players[playerIndex];
        const playerEl = document.getElementById(`player-${playerIndex}`);
        if (playerEl) playerEl.classList.add('active');

        if (tg && tg.showAlert) {
          tg.showAlert(`🍾 Butilka ${selectedPlayer.name} ga to'xtadi!`);
        }
      }, 3500);
    }

    // 🎯 BUTILKAGA TEGINDANDA (TOUCH/CLICK) AYLANISH KODI
    bottle.addEventListener('click', spinBottle);
    bottle.addEventListener('touchstart', function(e) {
      e.preventDefault(); // Senso'r ortiqcha harakatini to'sadi
      spinBottle();
    });

    renderPlayers();
