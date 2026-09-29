// =========================================================
// ALIEN SKILL SHOOTER
// Mouse Crosshair Shooting Version
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  const aliens = document.querySelectorAll(".alien");

  const scoreText =
    document.getElementById("scoreText");

  const detailPopup =
    document.getElementById("detailPopup");

  const detailTitle =
    document.getElementById("detailTitle");

  const detailText =
    document.getElementById("detailText");

  const closePopup =
    document.getElementById("closePopup");

  const missionComplete =
    document.getElementById("missionComplete");

  const spaceScene =
    document.getElementById("spaceScene");

  const mouseCrosshair =
    document.getElementById("mouseCrosshair");


  let score = 0;

  const totalAliens =
    aliens.length;


  // =======================================================
  // MOUSE CROSSHAIR MOVEMENT
  // =======================================================

  spaceScene.addEventListener("mousemove", (event) => {

    if (!mouseCrosshair) return;

    const sceneRect =
      spaceScene.getBoundingClientRect();

    const mouseX =
      event.clientX - sceneRect.left;

    const mouseY =
      event.clientY - sceneRect.top;

    mouseCrosshair.style.left =
      `${mouseX}px`;

    mouseCrosshair.style.top =
      `${mouseY}px`;

    mouseCrosshair.classList.add("active");
  });


  spaceScene.addEventListener("mouseleave", () => {

    if (!mouseCrosshair) return;

    mouseCrosshair.classList.remove("active");
  });


  // =======================================================
  // SHOOT ALIENS
  // =======================================================

  aliens.forEach((alien) => {

    alien.addEventListener("click", (event) => {

      event.preventDefault();
      event.stopPropagation();

      if (alien.classList.contains("zapped")) {
        return;
      }


      // Get exact mouse click position
      const sceneRect =
        spaceScene.getBoundingClientRect();

      const shotX =
        event.clientX - sceneRect.left;

      const shotY =
        event.clientY - sceneRect.top;


      // Get portfolio information
      const title =
        alien.dataset.title;

      const info =
        alien.dataset.info;


      // Update score
      score++;

      scoreText.textContent =
        `${score} / ${totalAliens}`;


      // Shooting effects
      animateCrosshair();

      createShotFlash(
        shotX,
        shotY
      );

      createZapEffect(
        shotX,
        shotY
      );

      createHitParticles(
        shotX,
        shotY
      );


      // Stop alien exactly where it was hit
      freezeAndRemoveAlien(alien);


      // Show information popup
      setTimeout(() => {

        detailTitle.textContent =
          title;

        detailText.textContent =
          info;

        detailPopup.classList.remove("show");

        void detailPopup.offsetWidth;

        detailPopup.classList.add("show");

      }, 200);


      // Mission completed
      if (score === totalAliens) {

        setTimeout(() => {

          detailPopup.classList.remove("show");

          missionComplete.classList.add("show");

          mouseCrosshair.classList.remove("active");

        }, 1000);
      }

    });

  });


  // =======================================================
  // CLOSE DETAIL POPUP
  // =======================================================

  closePopup.addEventListener("click", (event) => {

    event.stopPropagation();

    detailPopup.classList.remove("show");
  });


  // =======================================================
  // CROSSHAIR SHOOT ANIMATION
  // =======================================================

  function animateCrosshair() {

    if (!mouseCrosshair) return;

    mouseCrosshair.classList.remove("shoot");

    void mouseCrosshair.offsetWidth;

    mouseCrosshair.classList.add("shoot");
  }


  // =======================================================
  // FLASH EXACTLY WHERE MOUSE CLICKED
  // =======================================================

  function createShotFlash(x, y) {

    const flash =
      document.createElement("div");

    flash.classList.add("shot-flash");

    flash.style.left =
      `${x}px`;

    flash.style.top =
      `${y}px`;

    spaceScene.appendChild(flash);


    setTimeout(() => {
      flash.remove();
    }, 250);
  }


  // =======================================================
  // ZAP RING
  // =======================================================

  function createZapEffect(x, y) {

    const zap =
      document.createElement("div");

    zap.classList.add("zap-effect");

    zap.style.left =
      `${x - 50}px`;

    zap.style.top =
      `${y - 50}px`;

    spaceScene.appendChild(zap);


    setTimeout(() => {
      zap.remove();
    }, 500);
  }


  // =======================================================
  // HIT PARTICLES
  // =======================================================

  function createHitParticles(x, y) {

    const numberOfParticles = 18;


    for (
      let i = 0;
      i < numberOfParticles;
      i++
    ) {

      const particle =
        document.createElement("span");

      particle.classList.add("hit-particle");


      const angle =
        Math.random() *
        Math.PI *
        2;


      const distance =
        35 +
        Math.random() * 90;


      const moveX =
        Math.cos(angle) *
        distance;

      const moveY =
        Math.sin(angle) *
        distance;


      particle.style.left =
        `${x}px`;

      particle.style.top =
        `${y}px`;


      particle.style.setProperty(
        "--particle-x",
        `${moveX}px`
      );

      particle.style.setProperty(
        "--particle-y",
        `${moveY}px`
      );


      spaceScene.appendChild(particle);


      setTimeout(() => {
        particle.remove();
      }, 650);
    }
  }


  // =======================================================
  // FREEZE ALIEN THEN REMOVE
  // =======================================================

  function freezeAndRemoveAlien(alien) {

    // Get alien's exact current transformed position
    const style =
      window.getComputedStyle(alien);

    const currentTransform =
      style.transform;


    // Stop forward movement
    alien.style.animation = "none";

    // Keep it at the exact position it was hit
    alien.style.transform =
      currentTransform;


    // Stop body-part running animation
    const rig =
      alien.querySelector(".runner-rig");

    if (rig) {
      rig.style.animationPlayState = "paused";
    }


    const parts =
      alien.querySelectorAll(".runner-part");

    parts.forEach((part) => {
      part.style.animationPlayState = "paused";
    });


    // Trigger disappear animation
    requestAnimationFrame(() => {

      alien.classList.add("zapped");

    });
  }

});