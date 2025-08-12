<!-- src/routes/+page.svelte -->
<script>
  import Slider from "../components/slider.svelte";

  // Hero slider images
  const heroImages = [
    `<div class="hero-slide">
      <div class="slide-content">
        <h3>Infinite Scrolling</h3>
        <p>Seamless infinite carousel with smooth transitions</p>
      </div>
      <div class="slide-visual">
        <div class="visual-infinity"></div>
      </div>
    </div>`,
    `<div class="hero-slide">
      <div class="slide-content">
        <h3>Touch & Drag Support</h3>
        <p>Native touch gestures and mouse drag interactions</p>
      </div>
      <div class="slide-visual">
        <div class="visual-touch"></div>
      </div>
    </div>`,
    `<div class="hero-slide">
      <div class="slide-content">
        <h3>Responsive Design</h3>
        <p>Adapts beautifully to any screen size</p>
      </div>
      <div class="slide-visual">
        <div class="visual-responsive"></div>
      </div>
    </div>`,
  ];

  // Feature showcase images
  const showcaseImages = [
    `<div class="showcase-card">
      <div class="card-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h4>Lightning Fast</h4>
      <p>Optimized performance with smooth 60fps animations</p>
    </div>`,
    `<div class="showcase-card">
      <div class="card-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3" stroke-width="2"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1.06 1.55V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.55-1.06H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1.06-1.55V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.06 1.55 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.55 1.06H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.55 1.06z" stroke-width="2"/>
        </svg>
      </div>
      <h4>Highly Customizable</h4>
      <p>Extensive API with dozens of configuration options</p>
    </div>`,
    `<div class="showcase-card">
      <div class="card-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h4>Production Ready</h4>
      <p>Battle-tested in production environments</p>
    </div>`,
    `<div class="showcase-card">
      <div class="card-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h4>Accessibility First</h4>
      <p>ARIA compliant with keyboard navigation support</p>
    </div>`,
    `<div class="showcase-card">
      <div class="card-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="1" y="3" width="15" height="13" stroke-width="2"/>
          <polygon points="16,8 20,8 23,11 23,16 16,16 16,8" stroke-width="2"/>
          <circle cx="5.5" cy="18.5" r="2.5" stroke-width="2"/>
          <circle cx="18.5" cy="18.5" r="2.5" stroke-width="2"/>
        </svg>
      </div>
      <h4>TypeScript Support</h4>
      <p>Full TypeScript definitions included</p>
    </div>`,
    `<div class="showcase-card">
      <div class="card-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="16" y1="8" x2="2" y2="22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="17.5" y1="15" x2="9" y2="15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h4>Zero Dependencies</h4>
      <p>Lightweight with no external dependencies</p>
    </div>`,
  ];

  let installCommand = "npm install svelte-flex-slider";
  let copySuccess = false;

  function copyInstallCommand() {
    navigator.clipboard.writeText(installCommand).then(() => {
      copySuccess = true;
      setTimeout(() => (copySuccess = false), 2000);
    });
  }
</script>

<svelte:head>
  <title>Svelte Flex Slider - Modern Carousel Component</title>
  <meta
    name="description"
    content="A powerful, flexible, and modern carousel slider component for Svelte applications with infinite scrolling, touch support, and responsive design."
  />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="hero-container">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">
          Modern <span class="gradient-text">Carousel</span> Component for Svelte
        </h1>
        <p class="hero-description">
          A powerful, flexible, and beautiful slider component with infinite
          scrolling, touch gestures, responsive design, and extensive
          customization options.
        </p>
        <div class="hero-actions">
          <a href="/documentation" class="btn btn-primary">
            Get Started
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
          <a href="/examples" class="btn btn-secondary"> View Examples </a>
        </div>
        <div class="install-section">
          <div class="install-command">
            <code>{installCommand}</code>
            <button class="copy-btn" on:click={copyInstallCommand}>
              {#if copySuccess}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <polyline
                    points="20,6 9,17 4,12"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              {:else}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect
                    x="9"
                    y="9"
                    width="13"
                    height="13"
                    rx="2"
                    ry="2"
                    stroke-width="2"
                  />
                  <path
                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                    stroke-width="2"
                  />
                </svg>
              {/if}
            </button>
          </div>
        </div>
      </div>
      <div class="hero-slider">
        <Slider
          cards={heroImages}
          autoplay={true}
          interval={4000}
          visibleCards={{ default: 1 }}
          showNavButtons={false}
          showIndicators={true}
          infinity={true}
          pauseOnHover={true}
        />
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="features">
  <div class="section-container">
    <div class="section-header">
      <h2 class="section-title">Everything you need in a slider</h2>
      <p class="section-description">
        Built with modern web standards and best practices to deliver
        exceptional user experiences.
      </p>
    </div>
    <div class="features-slider">
      <Slider
        cards={showcaseImages}
        autoplay={false}
        visibleCards={{ default: 1, 640: 2, 1024: 3 }}
        showNavButtons={true}
        showIndicators={false}
        infinity={false}
        enableMouseDrag={true}
        enableTouchGestures={true}
      />
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="stats">
  <div class="section-container">
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-number">15KB</div>
        <div class="stat-label">Minified Size</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">0</div>
        <div class="stat-label">Dependencies</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">20+</div>
        <div class="stat-label">Configuration Options</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">100%</div>
        <div class="stat-label">TypeScript Support</div>
      </div>
    </div>
  </div>
</section>

<!-- Code Preview Section -->
<section class="code-preview">
  <div class="section-container">
    <div class="section-header">
      <h2 class="section-title">Simple to use, powerful to customize</h2>
      <p class="section-description">
        Get started with just a few lines of code, then customize every aspect
        to fit your needs.
      </p>
    </div>
    <div class="code-examples">
      <div class="code-example">
        <div class="code-header">
          <div class="code-title">Basic Usage</div>
          <div class="code-language">Svelte</div>
        </div>
        <div class="code-content">
          <pre><code
              >{`<script>
  import Slider from 'svelte-flex-slider';
  
  const images = [
    '<img src="image1.jpg" alt="Slide 1" />',
    '<img src="image2.jpg" alt="Slide 2" />',
    '<img src="image3.jpg" alt="Slide 3" />'
  ];
</script>

<Slider 
  cards={images}
  autoplay={true}
  visibleCards={{ default: 1, 768: 2, 1024: 3 }}
/>`}</code
            ></pre>
        </div>
      </div>

      <div class="code-example">
        <div class="code-header">
          <div class="code-title">Advanced Configuration</div>
          <div class="code-language">Svelte</div>
        </div>
        <div class="code-content">
          <pre><code
              >{`<Slider 
  cards={cards}
  autoplay={true}
  interval={3000}
  infinity={true}
  loop={true}
  visibleCards={{ default: 1, 640: 2, 1024: 3 }}
  showNavButtons={true}
  showIndicators={true}
  enableTouchGestures={true}
  enableMouseDrag={true}
  pauseOnHover={true}
/>`}</code
            ></pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="cta">
  <div class="section-container">
    <div class="cta-content">
      <h2 class="cta-title">Ready to get started?</h2>
      <p class="cta-description">
        Join thousands of developers who trust Svelte Flex Slider for their
        carousel needs.
      </p>
      <div class="cta-actions">
        <a href="/documentation" class="btn btn-primary btn-large">
          Read Documentation
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <a
          href="https://github.com/nakxa/svelte-flex-slider"
          target="_blank"
          rel="noopener"
          class="btn btn-outline btn-large"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    background: linear-gradient(135deg, #ffffff 0%, #e3e3e3 100%);
    background-size: 400% 400%;
    animation: s-y_bCXRrkrYfP-gradientShift 15s ease infinite;
    padding: 6rem 1rem 4rem;
    color: #101828;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .hero-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }

  .gradient-text {
    background: linear-gradient(45deg, #e54826, #e54826);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: 1.25rem;
    line-height: 1.6;
    margin-bottom: 2.5rem;
    color: #3c3f45;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

  .btn-primary {
    background: #eb4f27;
    color: white;
  }

  .btn-primary:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }

  .btn-secondary {
    background: #fff;
    border: 1px solid #ebe6e7;
    color: #3c3f45;
    backdrop-filter: blur(10px);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  .btn-outline {
    background: transparent;
    color: #eb4f27;
    border: 2px solid #eb4f27;
  }

  .btn-outline:hover {
    background: #eb4f27;
    color: white;
    transform: translateY(-2px);
  }

  .btn-large {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }

  .install-section {
    margin-top: 2rem;
  }

  .install-command {
    display: inline-flex;
    align-items: center;
    background: #fff;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    backdrop-filter: blur(10px);
    border: 1px solid #ebe6e7;
    color: #3c3f45;
  }

  .install-command code {
    color: #3c3f45;
    font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas,
      "Courier New", monospace;
    font-size: 0.9rem;
    margin-right: 0.75rem;
  }

  .copy-btn {
    background: none;
    border: none;
    color: #3c3f45;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    transition: color 0.2s ease;
  }

  .copy-btn:hover {
    color: #3c3f45;
  }

  .hero-slider {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    backdrop-filter: blur(20px);
    border: 1px solid #0000001a;
    overflow: hidden;
  }

  :global(.hero-slide) {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-height: 300px;
    justify-content: center;
  }

  :global(.slide-content h3) {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #3c3f45;
  }

  :global(.slide-content p) {
    color: #3c3f45;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  :global(.slide-visual) {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.visual-infinity) {
    width: 60px;
    height: 30px;
    border: 3px solid #60a5fa;
    border-radius: 50px;
    position: relative;
  }

  :global(.indicator) {
    background-color: #eb4f27 !important;
  }
  :global(.indicator.active) {
    background-color: #dddddd !important;
  }

  :global(.visual-infinity::after) {
    content: "";
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    border: 3px solid #34d399;
    border-radius: 50%;
  }

  :global(.visual-touch) {
    width: 50px;
    height: 50px;
    border: 3px solid #60a5fa;
    border-radius: 50%;
    position: relative;
  }

  :global(.visual-touch::after) {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: #34d399;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.7;
    }
  }

  :global(.visual-responsive) {
    display: flex;
    gap: 4px;
  }

  :global(.features-slider>.slider-container>.slider-wrapper>.card ) {
    padding: 0px 10px;
    /* border: 10px solid greenyellow !important; */
  }

  :global(.visual-responsive::before),
  :global(.visual-responsive::after) {
    content: "";
    background: #60a5fa;
    border-radius: 2px;
  }

  :global(.visual-responsive::before) {
    width: 30px;
    height: 40px;
  }

  :global(.visual-responsive::after) {
    width: 20px;
    height: 30px;
    background: #34d399;
  }

  .features {
    padding: 6rem 1rem;
    background: #f9fafb;
  }

  .section-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .section-description {
    font-size: 1.25rem;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  :global(.showcase-card) {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :global(.showcase-card:hover) {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  :global(.card-icon) {
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, #eb4f27, #cc4522);
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: white;
  }

  :global(.showcase-card h4) {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.75rem;
  }

  :global(.showcase-card p) {
    color: #6b7280;
    line-height: 1.5;
  }

  .stats {
    padding: 4rem 1rem;
    background: white;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .stat-item {
    text-align: center;
    padding: 1.5rem;
  }

  .stat-number {
    font-size: 3rem;
    font-weight: 800;
    color: #eb4f27;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #6b7280;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
  }

  .code-preview {
    padding: 6rem 1rem;
    background: #1f2937;
    color: white;
  }

  .code-preview .section-title {
    color: white;
  }

  .code-preview .section-description {
    color: #d1d5db;
  }

  .code-examples {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .code-example {
    background: #111827;
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid #374151;
  }

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: #1f2937;
    border-bottom: 1px solid #374151;
  }

  .code-title {
    font-weight: 600;
    color: white;
  }

  .code-language {
    font-size: 0.75rem;
    color: #9ca3af;
    background: #374151;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }

  .code-content {
    padding: 1.5rem;
    overflow-x: auto;
  }

  .code-content pre {
    margin: 0;
  }

  .code-content code {
    font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas,
      "Courier New", monospace;
    font-size: 0.875rem;
    line-height: 1.6;
    color: #e5e7eb;
  }

  .cta {
    padding: 6rem 1rem;
    background: #f9fafb;
    color: white;
    text-align: center;
  }

  .cta-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: #3c3f45;
  }

  .cta-description {
    font-size: 1.25rem;
   color: #3c3f45;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .hero-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .hero-title {
      font-size: 2.5rem;
    }

    .section-title {
      font-size: 2rem;
    }

    .hero-actions {
      flex-direction: column;
      align-items: flex-start;
    }

    .code-examples {
      grid-template-columns: 1fr;
    }

    .cta-actions {
      flex-direction: column;
      align-items: center;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
