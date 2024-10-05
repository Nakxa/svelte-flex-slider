<script>
    import { onMount, afterUpdate } from "svelte";
  
    /**
   * @type {any[]}
   */
     export let cards = [];
    export let autoplay = true;
    export let interval = 3000;
    export let loop = true;
    export let visibleCards = { default: 3 };
  
    let currentIndex = 0;
    /**
   * @type {number}
   */
    let containerWidth;
    /**
   * @type {number}
   */
    let cardWidth;
    /**
   * @type {HTMLDivElement}
   */
    let container;
    let isTransitioning = false;
    /**
   * @type {number}
   */
    let currentVisibleCards;
  
    $: totalCards = cards.length;
   // @ts-ignore
     $: displayedCards = cards.slice(currentIndex, currentIndex + currentVisibleCards);
    $: indicatorCount = Math.ceil(totalCards / currentVisibleCards);
  
    onMount(() => {
      updateDimensions();
      if (autoplay) startAutoplay();
      window.addEventListener("resize", updateDimensions);
    });
  
    afterUpdate(() => {
      updateDimensions();
    });
  
    function updateDimensions() {
      if (container) {
        containerWidth = container.offsetWidth;
        currentVisibleCards = getVisibleCards(document.body.clientWidth);
        cardWidth = containerWidth / currentVisibleCards;
      }
    }
  
    /**
   * @param {number} width
   */
    function getVisibleCards(width) {
      const breakpoints = Object.keys(visibleCards)
        .map(Number)
        .sort((a, b) => b - a);
      
      for (let breakpoint of breakpoints) {
        if (width >= breakpoint) {
          // @ts-ignore
          return visibleCards[breakpoint];
        }
      }
      return visibleCards.default;
    }
  
    function startAutoplay() {
      setInterval(() => {
        if (!isTransitioning) {
          next();
        }
      }, interval);
    }
  
    function next() {
      if (currentIndex < totalCards - currentVisibleCards) {
        currentIndex++;
      } else if (loop) {
        currentIndex = 0;
      }
      smoothTransition();
    }
  
    function prev() {
      if (currentIndex > 0) {
        currentIndex--;
      } else if (loop) {
        currentIndex = totalCards - currentVisibleCards;
      }
      smoothTransition();
    }
  
    function smoothTransition() {
      isTransitioning = true;
      setTimeout(() => {
        isTransitioning = false;
      }, 100);
    }
  
    /**
   * @param {number} index
   */
    function goToSlide(index) {
      currentIndex = index * currentVisibleCards;
      if (currentIndex > totalCards - currentVisibleCards) {
        currentIndex = totalCards - currentVisibleCards;
      }
      smoothTransition();
    }
  </script>
  
  <div class="slider-container" bind:this={container}>
    {#if cardWidth && containerWidth}
      <div
        class="slider-wrapper"
        style="transform: translateX(-{currentIndex * cardWidth}px); transition: transform 0.3s ease;"
      >
        {#each cards as card, index}
          <div class="card" style="width: {cardWidth}px;">
            {@html card}
          </div>
        {/each}
      </div>
      <button
        on:click={prev}
        class="nav-button prev"
        disabled={!loop && currentIndex === 0}>&#8249;</button
      >
      <button
        on:click={next}
        class="nav-button next"
        disabled={!loop && currentIndex === totalCards - currentVisibleCards}
        >&#8250;</button
      >
      <div class="indicators">
        {#each Array(indicatorCount) as _, index}
          <button
            class="indicator"
            class:active={Math.floor(currentIndex / currentVisibleCards) === index}
            on:click={() => goToSlide(index)}
          ></button>
        {/each}
      </div>
    {/if}
  </div>
  
  <style>
    .slider-container {
      width: 100%;
      overflow: hidden;
      position: relative;
    }
  
    .slider-wrapper {
      display: flex;
      transition: transform 0.3s ease;
    }
  
    .card {
      flex-shrink: 0;
      /* padding: - */
      box-sizing: border-box;
    }
  
    .nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      background: #1f29374d;
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
      font-size: 24px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .nav-button.prev {
      left: 0px;
    }
  
    .nav-button.next {
      right: 0px;
    }
  
    .nav-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  
    .indicators {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
    }
  
    .indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      border: none;
      padding: 0;
      cursor: pointer;
    }
  
    .indicator.active {
      background-color: white;
    }
  </style>