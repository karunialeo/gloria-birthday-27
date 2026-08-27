// Expanded Message
const message = `Selamat ulang tahun ke-27, ayaaanggg! 🎉\n\nSelamat memasuki usia yang baru ya, sayang. Di usia yang baru ini, doa aku semoga kamu semakin dewasa, semakin berhikmat, dan Tuhan terus berikan hati yang penuh kasih. Semoga Tuhan selalu lindungi langkah-langkah kamu, dan berkat-Nya tercurah melimpah buat hidup ayang setiap hari. 🤗\n\nTetap berpegang teguh sama janji Tuhan ya, sayang. Tetap setia, tetap berpengharapan, karena aku yakin banget masa depan yang luar biasa indah udah menanti kamu di depan. ✨\n\nDaaannn... Selamat memperingati 1 tahun pertemuan kita juga! Kalau aja tahun lalu aku nggak iseng coba main Bumble, jujur aku nggak kebayang gimana rasanya hidup aku sekarang tanpa ayang. Makasih yaaa udah hadir dan ngasih warna yang luar biasa indah dalam hidup aku selama setahun ini.\n\nI'm so grateful for you, and I'm looking forward to our greater journey together. Kita lewatin banyak hal bareng-bareng ke depannya ya! 🥰\n\nSekali lagi, selamat ulang tahun yang ke-27, ayaaanggg! 🎉 Tuhan Yesus memberkati kamu berlimpah-limpah.\n\nLove ayang so muchh! ❤️`;

// Generate Polaroid Elements
const marqueeTrack = document.getElementById("marquee-track");
let polaroidHTML = "";

// Looping 19 foto
for (let i = 1; i <= 19; i++) {
  // Format number to 01, 02... 19
  let num = i.toString().padStart(2, "0");
  // Randomize rotation slightly for organic look
  let rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-3",
    "-rotate-3",
    "rotate-1",
    "-rotate-1",
  ];
  let randomRot = rotations[Math.floor(Math.random() * rotations.length)];

  polaroidHTML += `
            <div class="polaroid shrink-0 w-64 p-3 bg-white shadow-md mx-4 my-4 ${randomRot} rounded-sm">
                <!-- Ganti path gambar di sini kalau perlu -->
                <img src="assets/img/gloria-birthday-${num}.jpeg" alt="Memories with Gloria" class="w-full h-72 object-cover rounded-sm bg-gray-100">
                
            </div>
        `;
}

// Duplicate for seamless infinite marquee scroll
marqueeTrack.innerHTML = polaroidHTML + polaroidHTML;

// Interaction Logic
const btn = document.getElementById("cta-btn");
const hero = document.getElementById("hero");
const main = document.getElementById("main-content");
const typingEl = document.getElementById("typing-text");
const sigEl = document.getElementById("signature");
const audio = document.getElementById("bg-music");

btn.addEventListener("click", () => {
  // 1. Hide Hero
  hero.style.opacity = "0";
  setTimeout(() => {
    hero.classList.add("hidden");

    // 2. Show Main Content
    main.classList.remove("hidden");
    setTimeout(() => {
      main.classList.remove("opacity-0");
      main.classList.add("opacity-100");
    }, 50);

    // 3. Play BGM
    audio.play().catch((err) => console.log("Audio autoplay prevented:", err));

    // 4. Confetti Animation
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#fbcfe8", "#f9a8d4", "#be185d"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#fbcfe8", "#f9a8d4", "#be185d"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // 5. Start Floating Elements
    startFloatingHearts();

    // 6. Start Typing Effect (tunggu sebentar biar smooth)
    setTimeout(() => {
      typeWriter(message, 0);
    }, 1000);
  }, 1000); // Wait for hero fade out
});

// Typing effect logic
function typeWriter(text, i) {
  if (i < text.length) {
    if (text.charAt(i) === "\n") {
      typingEl.innerHTML += "<br>";
    } else {
      typingEl.innerHTML += text.charAt(i);
    }

    // Variasi speed ngetik biar natural
    let speed = Math.random() * 30 + 30;
    setTimeout(() => typeWriter(text, i + 1), speed);
  } else {
    // Remove cursor blink after finish and show signature
    document.querySelector(".cursor").style.display = "none";
    sigEl.classList.remove("opacity-0");
  }
}

// Floating Hearts Logic
function startFloatingHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");

    // Randomize heart types/colors
    const hearts = ["🤍", "🌸", "✨", "💖"];
    heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

    // Random position & animation duration
    heart.style.left = Math.random() * 100 + "vw";
    const duration = Math.random() * 5 + 5; // 5 to 10 seconds
    heart.style.animationDuration = duration + "s";

    document.body.appendChild(heart);

    // Cleanup DOM
    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }, 800); // Spawn rate
}
