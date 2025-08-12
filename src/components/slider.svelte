<script>
  import { onMount, afterUpdate } from "svelte";

  /**
   * @type {any[]}
   */
  export let cards = [];
  export let autoplay = true;
  export let interval = 1000;
  export let loop = true;
  export let visibleCards = { default: 3 };
  export let showNavButtons = true;
  export let showIndicators = true;
  export let infinity = true;
  export let enableTouchGestures = true;
  export let enableMouseDrag = true;
  export let pauseOnHover = true;

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

  /**
   * @type {any[]}
   */
  let clone_cards = [];
  $: if (cards.length > 0 && clone_cards.length === 0) {
    clone_cards = [...cards];
  }

  $: totalCards = infinity ? clone_cards.length : cards.length;
  // @ts-ignore
  $: displayedCards = infinity
    ? clone_cards.slice(currentIndex, currentIndex + currentVisibleCards)
    : cards.slice(currentIndex, currentIndex + currentVisibleCards);
  $: indicatorCount = infinity
    ? currentVisibleCards > 0
      ? cards.length
      : 0
    : currentVisibleCards > 0
      ? cards.length - currentVisibleCards + 1
      : 0;

  // New variables for enhanced functionality
  /**
   * @type {number | null}
   */
  let autoplayInterval = null;
  let isPaused = false;
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let dragDistance = 0;
  let dragThreshold = 50;

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
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (!isTransitioning && !isPaused && !isDragging) {
        next();
      }
    }, interval);
  }

  function pauseAutoplay() {
    isPaused = true;
  }

  function resumeAutoplay() {
    isPaused = false;
  }

  function next() {
    if (infinity) {
      // Infinite mode: seamless forward navigation
      currentIndex++;
      // If we're getting close to the end, add more cards
      if (currentIndex + currentVisibleCards >= clone_cards.length) {
        clone_cards = [...clone_cards, ...cards];
      }
    } else {
      // Normal mode: loop back to start
      if (currentIndex < cards.length - currentVisibleCards) {
        currentIndex++;
      } else if (loop) {
        currentIndex = 0;
      }
    }

    smoothTransition();
  }

  function prev() {
    if (infinity) {
      // Infinite mode: seamless backward navigation
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        // When at the beginning, prepend cards and adjust index
        clone_cards = [...cards, ...clone_cards];
        currentIndex = cards.length - 1;
      }
    } else {
      // Normal mode: existing logic
      if (currentIndex > 0) {
        currentIndex--;
      } else if (loop) {
        const maxIndex = cards.length - currentVisibleCards;
        currentIndex = maxIndex;
      }
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
    if (infinity) {
      // For infinity mode, we need to ensure we have enough cards and position correctly
      const targetPosition = index;
      // Make sure we have enough cards in clone_cards
      while (clone_cards.length < cards.length * 3) {
        clone_cards = [...clone_cards, ...cards];
      }
      // Find the correct position that corresponds to the target slide
      currentIndex = targetPosition;
    } else {
      // Normal mode: set to the position index directly
      currentIndex = index;
      if (currentIndex > cards.length - currentVisibleCards) {
        currentIndex = cards.length - currentVisibleCards;
      }
    }
    smoothTransition();
  }

  // Touch and mouse event handlers
  /**
   * @param {MouseEvent | TouchEvent} event
   */
  function handleStart(event) {
    if (!enableTouchGestures && event.type.startsWith('touch')) return;
    if (!enableMouseDrag && event.type.startsWith('mouse')) return;
    
    isDragging = true;
    const clientX = event.type === 'mousedown' ? (/** @type {MouseEvent} */ (event)).clientX : (/** @type {TouchEvent} */ (event)).touches[0].clientX;
    startX = clientX;
    currentX = clientX;
    dragDistance = 0;
  }

  /**
   * @param {MouseEvent | TouchEvent} event
   */
  function handleMove(event) {
    if (!isDragging) return;
    if (!enableTouchGestures && event.type.startsWith('touch')) return;
    if (!enableMouseDrag && event.type.startsWith('mouse')) return;
    
    event.preventDefault();
    const clientX = event.type === 'mousemove' ? (/** @type {MouseEvent} */ (event)).clientX : (/** @type {TouchEvent} */ (event)).touches[0].clientX;
    currentX = clientX;
    dragDistance = currentX - startX;
  }

  function handleEnd() {
    if (!isDragging) return;
    isDragging = false;

    if (Math.abs(dragDistance) > dragThreshold) {
      if (dragDistance > 0) {
        prev();
      } else {
        next();
      }
    }
    
    dragDistance = 0;
  }

  // Mouse event handlers
  /**
   * @param {MouseEvent} event
   */
  function handleMouseDown(event) {
    if (!enableMouseDrag) return;
    handleStart(event);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseUp() {
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleMouseUp);
    handleEnd();
  }

  /**
   * @param {KeyboardEvent} event
   */
  function handleKeydown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    }
  }

  function handleMouseEnter() {
    if (pauseOnHover) pauseAutoplay();
  }

  function handleMouseLeave() {
    if (pauseOnHover) resumeAutoplay();
  }

    // Touch and mouse event handlers
  /**
   * @param {MouseEvent | TouchEvent} event
   */

  function handleTouchStart(event) {
    if (!enableTouchGestures) return;
    handleStart(event);
  }

    // Touch and mouse event handlers
  /**
   * @param {MouseEvent | TouchEvent} event
   */
  function handleTouchMove(event) {
    if (!enableTouchGestures) return;
    handleMove(event);
  }

  function handleTouchEnd() {
    if (!enableTouchGestures) return;
    handleEnd();
  }
</script>

<div 
  class="slider-container" 
  bind:this={container}
  role="button"
  tabindex="0"
  aria-label="Interactive carousel - use arrow keys or swipe to navigate"
  data-mouse-drag={enableMouseDrag}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:mousedown={handleMouseDown}
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
  on:keydown={handleKeydown}
>
  {#if cardWidth && containerWidth}
    <div
      class="slider-wrapper"
      style="transform: translateX({-currentIndex * cardWidth + (isDragging ? dragDistance * 0.3 : 0)}px); transition: {isDragging ? 'none' : 'transform 0.3s ease'};"
    >
      {#each infinity ? clone_cards : cards as card, index}
        <div class="card" style="width: {cardWidth}px;">
          {#if infinity && card !== card}
            <!-- This checks for NaN in infinity mode -->
            <div style="visibility: hidden;"></div>
          {:else}
            {@html card}
          {/if}
        </div>
      {/each}
    </div>
    {#if showNavButtons}
      <button
        on:click={prev}
        class="nav-button prev"
        aria-label="Previous slide"
        disabled={!loop && currentIndex === 0}>&#8249;</button
      >
      <button
        on:click={next}
        class="nav-button next"
        aria-label="Next slide"
        disabled={!loop &&
          currentIndex ===
            (infinity
              ? clone_cards.length - currentVisibleCards
              : cards.length - currentVisibleCards)}>&#8250;</button
      >
    {/if}
    {#if showIndicators}
      <div class="indicators">
        {#each Array(indicatorCount) as _, index}
          <button
            class="indicator"
            class:active={infinity ? (currentIndex % cards.length === index) : (currentIndex === index)}
            aria-label="Go to slide {index + 1}"
            aria-pressed={infinity ? (currentIndex % cards.length === index) : (currentIndex === index)}
            on:click={() => goToSlide(index)}
          ></button>
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style>
  .slider-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .slider-container:active {
    cursor: grabbing;
  }

  /* Conditional cursor styles based on enableMouseDrag */
  .slider-container[data-mouse-drag="false"] {
    cursor: default;
  }

  .slider-container[data-mouse-drag="false"]:active {
    cursor: default;
  }

  .slider-wrapper {
    display: flex;
    transition: transform 0.3s ease;
    will-change: transform;
  }

  .card {
    flex-shrink: 0;
    /* padding: - */
    box-sizing: border-box;
    pointer-events: none;
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
    pointer-events: auto;
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
    pointer-events: auto;
  }

  .indicator.active {
    background-color: white;
  }
</style>