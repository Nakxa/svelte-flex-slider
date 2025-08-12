<!-- src/routes/documentation/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  
  let activeSection = '';
  
  const sections = [
    { id: 'installation', title: 'Installation' },
    { id: 'basic-usage', title: 'Basic Usage' },
    { id: 'props', title: 'Props' },
    { id: 'styling', title: 'Styling' },
    { id: 'events', title: 'Events' },
    { id: 'examples', title: 'Examples' }
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -66% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  });

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
</script>

<svelte:head>
  <title>Documentation - Svelte Flex Slider</title>
  <meta name="description" content="Complete documentation for Svelte Flex Slider - learn how to install, configure, and customize your carousel component." />
</svelte:head>

<div class="docs">
  <div class="docs-container">
    <!-- Sidebar Navigation -->
    <nav class="docs-nav">
      <div class="nav-header">
        <h3>Documentation</h3>
      </div>
      <ul class="nav-list">
        {#each sections as section}
          <li>
            <button 
              class="nav-item"
              class:active={activeSection === section.id}
              on:click={() => scrollToSection(section.id)}
            >
              {section.title}
            </button>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Main Content -->
    <main class="docs-content">
      <div class="docs-header">
        <h1>Documentation</h1>
        <p>Everything you need to know to get started with Svelte Flex Slider.</p>
      </div>

      <!-- Installation -->
      <section id="installation" class="docs-section">
        <h2>Installation</h2>
        <p>Install Svelte Flex Slider via npm or yarn:</p>
        
        <div class="code-block">
          <div class="code-header">
            <span>Terminal</span>
          </div>
          <div class="code-content">
            <pre><code># npm
npm install svelte-flex-slider

# yarn  
yarn add svelte-flex-slider

# pnpm
pnpm add svelte-flex-slider</code></pre>
          </div>
        </div>
      </section>

      <!-- Basic Usage -->
      <section id="basic-usage" class="docs-section">
        <h2>Basic Usage</h2>
        <p>Import the component and start using it with your content:</p>
        
        <div class="code-block">
          <div class="code-header">
            <span>App.svelte</span>
          </div>
          <div class="code-content">
            <pre><code>{`&lt;script&gt;
  import Slider from 'svelte-flex-slider';
  
  const cards = [
    '&lt;img src="image1.jpg" alt="Slide 1" /&gt;',
    '&lt;img src="image2.jpg" alt="Slide 2" /&gt;',
    '&lt;img src="image3.jpg" alt="Slide 3" /&gt;'
  ];
&lt;/script&gt;

&lt;Slider {cards} /&gt;`}</code></pre>
          </div>
        </div>

        <div class="note">
          <div class="note-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2"/>
              <path d="M12 16v-4M12 8h.01" stroke-width="2"/>
            </svg>
          </div>
          <div class="note-content">
            <strong>Note:</strong> The <code>cards</code> prop accepts an array of HTML strings. Each string represents the content of a single slide.
          </div>
        </div>
      </section>

      <!-- Props -->
      <section id="props" class="docs-section">
        <h2>Props</h2>
        <p>Configure the slider behavior with these props:</p>

        <div class="props-table">
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>cards</code></td>
                <td><code>string[]</code></td>
                <td><code>[]</code></td>
                <td>Array of HTML strings representing slide content</td>
              </tr>
              <tr>
                <td><code>autoplay</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Enable automatic slide progression</td>
              </tr>
              <tr>
                <td><code>interval</code></td>
                <td><code>number</code></td>
                <td><code>1000</code></td>
                <td>Autoplay interval in milliseconds</td>
              </tr>
              <tr>
                <td><code>loop</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Enable looping when reaching the end</td>
              </tr>
              <tr>
                <td><code>visibleCards</code></td>
                <td><code>object</code></td>
                <td><code>{"{ default: 3 }"}</code></td>
                <td>Number of visible slides per breakpoint</td>
              </tr>
              <tr>
                <td><code>showNavButtons</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Show previous/next navigation buttons</td>
              </tr>
              <tr>
                <td><code>showIndicators</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Show dot indicators</td>
              </tr>
              <tr>
                <td><code>infinity</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Enable infinite scrolling</td>
              </tr>
              <tr>
                <td><code>enableTouchGestures</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Enable touch/swipe gestures</td>
              </tr>
              <tr>
                <td><code>enableMouseDrag</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Enable mouse drag interactions</td>
              </tr>
              <tr>
                <td><code>pauseOnHover</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Pause autoplay on hover</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Responsive Configuration</h3>
        <p>The <code>visibleCards</code> prop allows responsive configuration:</p>
        
        <div class="code-block">
          <div class="code-header">
            <span>Responsive Example</span>
          </div>
          <div class="code-content">
            <pre><code>{`&lt;Slider 
  {cards}
  visibleCards={{
    default: 1,    // Mobile (default)
    640: 2,        // Tablet (≥640px)
    1024: 3,       // Desktop (≥1024px)
    1280: 4        // Large desktop (≥1280px)
  }}
/&gt;`}</code></pre>
          </div>
        </div>
      </section>

      <!-- Styling -->
      <section id="styling" class="docs-section">
        <h2>Styling</h2>
        <p>Customize the slider appearance with CSS:</p>

        <h3>CSS Classes</h3>
        <div class="styling-table">
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>.slider-container</code></td>
                <td>Main container element</td>
              </tr>
              <tr>
                <td><code>.slider-wrapper</code></td>
                <td>Inner wrapper containing slides</td>
              </tr>
              <tr>
                <td><code>.card</code></td>
                <td>Individual slide container</td>
              </tr>
              <tr>
                <td><code>.nav-button</code></td>
                <td>Navigation button styling</td>
              </tr>
              <tr>
                <td><code>.nav-button.prev</code></td>
                <td>Previous button</td>
              </tr>
              <tr>
                <td><code>.nav-button.next</code></td>
                <td>Next button</td>
              </tr>
              <tr>
                <td><code>.indicators</code></td>
                <td>Indicator container</td>
              </tr>
              <tr>
                <td><code>.indicator</code></td>
                <td>Individual indicator</td>
              </tr>
              <tr>
                <td><code>.indicator.active</code></td>
                <td>Active indicator</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Custom Styling Example</h3>
        <div class="code-block">
          <div class="code-header">
            <span>Custom.svelte</span>
          </div>
          <div class="code-content">
            <pre><code>{`&lt;style&gt;
  :global(.slider-container) {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  :global(.nav-button) {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  :global(.nav-button:hover) {
    background: white;
    transform: scale(1.1);
  }

  :global(.indicator) {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  :global(.indicator.active) {
    background: white;
    transform: scale(1.2);
  }
&lt;/style&gt;`}</code></pre>
          </div>
        </div>
      </section>

      <!-- Events -->
      <section id="events" class="docs-section">
        <h2>Events</h2>
        <p>The slider dispatches custom events you can listen to:</p>

        <div class="code-block">
          <div class="code-header">
            <span>Event Handling</span>
          </div>
          <div class="code-content">
            <pre><code>{`&lt;script&gt;
  function handleSlideChange(event) {
    console.log('Current slide:', event.detail.currentIndex);
    console.log('Previous slide:', event.detail.previousIndex);
  }

  function handleAutoplayStart() {
    console.log('Autoplay started');
  }

  function handleAutoplayPause() {
    console.log('Autoplay paused');
  }
&lt;/script&gt;

&lt;Slider 
  {cards}
  on:slideChange={handleSlideChange}
  on:autoplayStart={handleAutoplayStart}
  on:autoplayPause={handleAutoplayPause}
/&gt;`}</code></pre>
          </div>
        </div>

        <div class="events-table">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Detail</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>slideChange</code></td>
                <td><code>{ `currentIndex, previousIndex` }</code></td>
                <td>Fired when the active slide changes</td>
              </tr>
              <tr>
                <td><code>autoplayStart</code></td>
                <td><code>null</code></td>
                <td>Fired when autoplay begins</td>
              </tr>
              <tr>
                <td><code>autoplayPause</code></td>
                <td><code>null</code></td>
                <td>Fired when autoplay is paused</td>
              </tr>
              <tr>
                <td><code>dragStart</code></td>
                <td><code>{ `startX` }</code></td>
                <td>Fired when drag interaction starts</td>
              </tr>
              <tr>
                <td><code>dragEnd</code></td>
                <td><code>{ "distance" }</code></td>
                <td>Fired when drag interaction ends</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Examples -->
      <section id="examples" class="docs-section">
        <h2>Examples</h2>
        
        <h3>Image Gallery</h3>
        <div class="code-block">
          <div class="code-header">
            <span>ImageGallery.svelte</span>
          </div>
          <div class="code-content">
            <pre><code>{`&lt;script&gt;
  import Slider from 'svelte-flex-slider';
  
  const images = [
    '&lt;img src="photo1.jpg" alt="Photo 1" style="width: 100%; height: 400px; object-fit: cover;" /&gt;',
    '&lt;img src="photo2.jpg" alt="Photo 2" style="width: 100%; height: 400px; object-fit: cover;" /&gt;',
    '&lt;img src="photo3.jpg" alt="Photo 3" style="width: 100%; height: 400px; object-fit: cover;" /&gt;'
  ];
&lt;/script&gt;

&lt;div class="gallery"&gt;
  &lt;Slider 
    cards={images}
    autoplay={false}
    visibleCards={{ default: 1 }}
    showIndicators={true}
    enableTouchGestures={true}
  /&gt;
&lt;/div&gt;`}</code></pre>
          </div>
        </div>

        <h3>Product Showcase</h3>
        <div class="code-block">
          <div class="code-header">
            <span>ProductShowcase.svelte</span>
          </div>
          <div class="code-content">
            <pre><code>{`&lt;script&gt;
  import Slider from 'svelte-flex-slider';
  
  const products = [
    &lt;div class="product-card"&gt;
      &lt;img src="product1.jpg" alt="Product 1" /&gt;
      &lt;h3&gt;Amazing Product&lt;/h3&gt;
      &lt;p&gt;$99.99&lt;/p&gt;
    &lt;/div&gt;,
    &lt;div class="product-card"&gt;
      &lt;img src="product2.jpg" alt="Product 2" /&gt;
      &lt;h3&gt;Cool Gadget&lt;/h3&gt;
      &lt;p&gt;$149.99&lt;/p&gt;
    &lt;/div&gt;,
    // ... more products
  ];
&lt;/script&gt;

&lt;Slider 
  cards={products}
  autoplay={true}
  interval={3000}
  visibleCards={{ default: 1, 768: 2, 1024: 3 }}
  pauseOnHover={true}
/&gt;`}</code></pre>
          </div>
        </div>

        <h3>Testimonials Carousel</h3>
        <div class="code-block">
          <div class="code-header">
            <span>Testimonials.svelte</span>
          </div>
          <div class="code-content">
            <pre><code>{`&lt;script&gt;
  import Slider from 'svelte-flex-slider';
  
  const testimonials = [
    &lt;div class="testimonial"&gt;
      &lt;blockquote&gt;"This slider is amazing! Easy to use and highly customizable."&lt;/blockquote&gt;
      &lt;cite&gt;- John Doe, Developer&lt;/cite&gt;
    &lt;/div&gt;,
    &lt;div class="testimonial"&gt;
      &lt;blockquote&gt;"Perfect for our product showcase. Great performance!"&lt;/blockquote&gt;
      &lt;cite&gt;- Jane Smith, Designer&lt;/cite&gt;
    &lt;/div&gt;
  ];
&lt;/script&gt;

&lt;Slider 
  cards={testimonials}
  autoplay={true}
  interval={5000}
  visibleCards={{ default: 1 }}
  showNavButtons={false}
  infinity={true}
/&gt;`}</code></pre>
          </div>
        </div>

        <div class="tip">
          <div class="tip-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 11H1l8-8 8 8h-8l8 8-8-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="tip-content">
            <strong>Pro Tip:</strong> For better performance with large datasets, consider implementing virtual scrolling or pagination.
          </div>
        </div>
      </section>

      <!-- Next Steps -->
      <div class="next-steps">
        <h2>What's Next?</h2>
        <div class="next-steps-grid">
          <a href="/examples" class="next-card">
            <div class="next-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" stroke-width="2"/>
              </svg>
            </div>
            <div class="next-content">
              <h3>Live Examples</h3>
              <p>See the slider in action with interactive demos</p>
            </div>
          </a>
          <a href="https://github.com/nakxa/svelte-flex-slider" target="_blank" rel="noopener" class="next-card">
            <div class="next-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div class="next-content">
              <h3>GitHub Repository</h3>
              <p>Contribute, report issues, or star the project</p>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</div>

<style>
  .docs {
    min-height: calc(100vh - 4rem);
    background: #fafafa;
  }

  .docs-container {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2rem;
    padding: 2rem 1rem;
  }

  .docs-nav {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    height: fit-content;
    position: sticky;
    top: 6rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .nav-header h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1.5rem;
  }

  .nav-list {
    list-style: none;
  }

  .nav-item {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    color: #6b7280;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 0.25rem;
  }

  .nav-item:hover {
    background: #f3f4f6;
    color: #1f2937;
  }

  .nav-item.active {
    background: #eb4f27;
    color: white;
  }

  .docs-content {
    background: white;
    border-radius: 12px;
    padding: 3rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .docs-header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #f3f4f6;
  }

  .docs-header h1 {
    font-size: 3rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .docs-header p {
    font-size: 1.25rem;
    color: #6b7280;
    line-height: 1.6;
  }

  .docs-section {
    margin-bottom: 4rem;
    scroll-margin-top: 120px;
  }

  .docs-section h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .docs-section h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin: 2rem 0 1rem 0;
  }

  .docs-section p {
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .code-block {
    background: #1f2937;
    border-radius: 12px;
    overflow: hidden;
    margin: 1.5rem 0;
    border: 1px solid #374151;
  }

  .code-header {
    background: #111827;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #374151;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .code-header span {
    color: #d1d5db;
    font-weight: 600;
    font-size: 0.875rem;
  }

  .code-content {
    padding: 1.5rem;
    overflow-x: auto;
  }

  .code-content pre {
    margin: 0;
  }

  .code-content code {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    font-size: 0.875rem;
    line-height: 1.6;
    color: #e5e7eb;
  }

  .props-table, .styling-table, .events-table {
    overflow-x: auto;
    margin: 1.5rem 0;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .props-table table, .styling-table table, .events-table table {
    width: 100%;
    border-collapse: collapse;
    background: white;
  }

  .props-table th, .styling-table th, .events-table th,
  .props-table td, .styling-table td, .events-table td {
    text-align: left;
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
  }

  .props-table th, .styling-table th, .events-table th {
    background: #f9fafb;
    font-weight: 600;
    color: #1f2937;
  }

  .props-table td code, .styling-table td code, .events-table td code {
    background: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    font-size: 0.875rem;
    color: #1f2937;
  }

  .note, .tip {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 12px;
    padding: 1rem;
    margin: 1.5rem 0;
    display: flex;
    gap: 0.75rem;
  }

  .tip {
    background: #f0fdf4;
    border-color: #bbf7d0;
  }

  .note-icon, .tip-icon {
    flex-shrink: 0;
    color: #eb4f27;
  }

  .tip-icon {
    color: #16a34a;
  }

  .note-content, .tip-content {
    color: #1e40af;
  }

  .tip-content {
    color: #166534;
  }

  .note-content code, .tip-content code {
    background: rgba(59, 130, 246, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    font-size: 0.875rem;
  }

  .next-steps {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 2px solid #f3f4f6;
  }

  .next-steps h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 2rem;
  }

  .next-steps-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .next-card {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: #f9fafb;
    border-radius: 12px;
    text-decoration: none;
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease;
  }

  .next-card:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .next-icon {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    background: #eb4f27;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .next-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 0.5rem 0;
  }

  .next-content p {
    color: #6b7280;
    margin: 0;
    font-size: 0.9rem;
  }

  @media (max-width: 1024px) {
    .docs-container {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .docs-nav {
      position: static;
      margin-bottom: 1rem;
      display: none;
    }

    .nav-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .nav-item {
      margin-bottom: 0;
      flex-shrink: 0;
    }

    .docs-content {
      padding: 2rem;
    }

    .docs-header h1 {
      font-size: 2.5rem;
    }

    .next-steps-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .docs-content {
      padding: 1.5rem;
    }

    .props-table, .styling-table, .events-table {
      font-size: 0.875rem;
    }

    .props-table th, .styling-table th, .events-table th,
    .props-table td, .styling-table td, .events-table td {
      padding: 0.75rem;
    }
  }
</style>