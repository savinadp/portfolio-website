// Fun Way: photo shard blast animation

document.addEventListener("DOMContentLoaded", () => {
  const shardContainer = document.getElementById("shardContainer");

  if (!shardContainer) return;

  function createPhotoShards() {
    shardContainer.innerHTML = "";

    const cols = 10;
    const rows = 12;

    const faceWidth = 270;
    const faceHeight = 340;

    const shardWidth = faceWidth / cols;
    const shardHeight = faceHeight / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const shard = document.createElement("span");
        shard.classList.add("face-shard");

        const x = col * shardWidth;
        const y = row * shardHeight;

        const centerX = x + shardWidth / 2 - faceWidth / 2;
        const centerY = y + shardHeight / 2 - faceHeight / 2;

        const angle = Math.atan2(centerY, centerX);
        const distance = 220 + Math.random() * 280;

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        const rotate = Math.random() * 720 - 360;

        shard.style.left = `${x}px`;
        shard.style.top = `${y}px`;
        shard.style.setProperty("--w", `${shardWidth + 1}px`);
        shard.style.setProperty("--h", `${shardHeight + 1}px`);
        shard.style.setProperty("--bg-x", `-${x}px`);
        shard.style.setProperty("--bg-y", `-${y}px`);
        shard.style.setProperty("--move-x", `${moveX}px`);
        shard.style.setProperty("--move-y", `${moveY}px`);
        shard.style.setProperty("--rotate", `${rotate}deg`);

        shardContainer.appendChild(shard);
      }
    }
  }

  // Create actual photo pieces right when the big face disappears
  setTimeout(createPhotoShards, 3700);
});