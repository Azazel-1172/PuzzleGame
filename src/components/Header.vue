<template>
  <div class="card">
    <div class="ticker">
      <div class="content">
        <h4>開源祭集點遊戲</h4>
        <h4>科技征途：無硝煙的自由戰</h4>
        <h4>開源運動在臺灣</h4>
        <h4>OCF 十週年特展</h4>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  margin: 1rem auto;
  padding: 2rem 1rem;
  width: 86%;
  height: 1rem;
  background: #1c1f2b;
  text-align: center;
  border-radius: 10px;
  position: relative;
}

.ticker {
  height: 1.7rem;
  overflow: hidden;
  position: relative;
}

.content {
  display: flex;
  flex-direction: column;
  height: 300%; /* Height should be 3 times the height of .card */
  animation: scroll 9s linear infinite;
}

h4 {
  line-height: 1.5rem;
  margin: auto;
  font-size: 1.5rem;
  color: lightgray;
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.card::after,
.card::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: conic-gradient(
    from var(--angle),
    #ff4545,
    #00ff99,
    #006aff,
    #ff0095,
    #ff4545
  );
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: -1;
  padding: 3px;
  border-radius: 10px;
  animation: 3s spin linear infinite;
}

.card::before {
  filter: blur(1.5rem);
  opacity: 0.5;
}

@keyframes spin {
  from {
    --angle: 0deg;
  }
  to {
    --angle: 360deg;
  }
}

@keyframes scroll {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  25% {
    transform: translateY(-33.3%);
    opacity: 1;
  }
  50% {
    transform: translateY(-66.6%);
    opacity: 1;
  }
  75% {
    transform: translateY(-100%);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}
</style>
