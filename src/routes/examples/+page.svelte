<!-- src/routes/examples/+page.svelte -->
<script>
  import Slider from '../../components/slider.svelte';

  // Basic Image Gallery
  const galleryImages = [
    `<div class="gallery-slide">
      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop" alt="Mountain landscape" />
      <div class="gallery-caption">
        <h3>Mountain Vista</h3>
        <p>Breathtaking mountain landscape at sunset</p>
      </div>
    </div>`,
    `<div class="gallery-slide">
      <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop" alt="Forest path" />
      <div class="gallery-caption">
        <h3>Forest Trail</h3>
        <p>A peaceful path through ancient woods</p>
      </div>
    </div>`,
    `<div class="gallery-slide">
      <img src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=400&fit=crop" alt="Lake view" />
      <div class="gallery-caption">
        <h3>Serene Lake</h3>
        <p>Crystal clear waters reflecting the sky</p>
      </div>
    </div>`,
    `<div class="gallery-slide">
      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop" alt="Desert sunset" />
      <div class="gallery-caption">
        <h3>Desert Sunset</h3>
        <p>Golden hour in the vast desert</p>
      </div>
    </div>`
  ];

  // Product Cards
  const products = [
    `<div class="product-card">
      <div class="product-image">
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop" alt="Red sneakers" />
        <div class="product-badge">New</div>
      </div>
      <div class="product-info">
        <h4>Classic Red Sneakers</h4>
        <p class="product-price">$129.99</p>
        <div class="product-rating">
          ${'★'.repeat(5)} <span>(4.8)</span>
        </div>
      </div>
    </div>`,
    `<div class="product-card">
      <div class="product-image">
        <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=200&fit=crop" alt="Sunglasses" />
        <div class="product-badge sale">Sale</div>
      </div>
      <div class="product-info">
        <h4>Vintage Sunglasses</h4>
        <p class="product-price"><span class="original">$89.99</span> $69.99</p>
        <div class="product-rating">
          ${'★'.repeat(4)}${'☆'} <span>(4.2)</span>
        </div>
      </div>
    </div>`,
    `<div class="product-card">
      <div class="product-image">
        <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop" alt="Backpack" />
      </div>
      <div class="product-info">
        <h4>Travel Backpack</h4>
        <p class="product-price">$199.99</p>
        <div class="product-rating">
          ${'★'.repeat(4)}${'☆'} <span>(4.5)</span>
        </div>
      </div>
    </div>`,
    `<div class="product-card">
      <div class="product-image">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop" alt="Watch" />
        <div class="product-badge">Popular</div>
      </div>
      <div class="product-info">
        <h4>Smart Watch</h4>
        <p class="product-price">$299.99</p>
        <div class="product-rating">
          ${'★'.repeat(5)} <span>(4.9)</span>
        </div>
      </div>
    </div>`,
    `<div class="product-card">
      <div class="product-image">
        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop" alt="Headphones" />
      </div>
      <div class="product-info">
        <h4>Wireless Headphones</h4>
        <p class="product-price">$159.99</p>
        <div class="product-rating">
          ${'★'.repeat(4)}${'☆'} <span>(4.3)</span>
        </div>
      </div>
    </div>`
  ];

  // Testimonials
  const testimonials = [
    `<div class="testimonial-card">
      <div class="testimonial-content">
        <div class="quote-icon">❝</div>
        <blockquote>
          "Svelte Flex Slider has transformed our product showcase. The smooth animations and touch support make it perfect for mobile users. Highly recommended!"
        </blockquote>
      </div>
      <div class="testimonial-author">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" alt="John Smith" />
        <div class="author-info">
          <strong>John Smith</strong>
          <span>Frontend Developer at TechCorp</span>
        </div>
      </div>
    </div>`,
    `<div class="testimonial-card">
      <div class="testimonial-content">
        <div class="quote-icon">❝</div>
        <blockquote>
          "The customization options are incredible. We were able to match our brand perfectly and the performance is outstanding. Great work!"
        </blockquote>
      </div>
      <div class="testimonial-author">
        <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" alt="Sarah Johnson" />
        <div class="author-info">
          <strong>Sarah Johnson</strong>
          <span>UI/UX Designer at CreativeStudio</span>
        </div>
      </div>
    </div>`,
    `<div class="testimonial-card">
      <div class="testimonial-content">
        <div class="quote-icon">❝</div>
        <blockquote>
          "Easy to implement, well documented, and zero dependencies. This is exactly what we needed for our e-commerce platform."
        </blockquote>
      </div>
      <div class="testimonial-author">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="Mike Chen" />
        <div class="author-info">
          <strong>Mike Chen</strong>
          <span>Lead Engineer at ShopFlow</span>
        </div>
      </div>
    </div>`
  ];

  // Feature Cards
  const features = [
    `<div class="feature-card">
      <div class="feature-icon gradient-blue">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-width="2"/>
        </svg>
      </div>
      <h4>Lightning Fast</h4>
      <p>Optimized for 60fps performance with smooth animations and transitions.</p>
    </div>`,
    `<div class="feature-card">
      <div class="feature-icon gradient-green">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke-width="2"/>
        </svg>
      </div>
      <h4>Responsive Design</h4>
      <p>Adapts beautifully to any screen size with configurable breakpoints.</p>
    </div>`,
    `<div class="feature-card">
      <div class="feature-icon gradient-purple">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke-width="2"/>
        </svg>
      </div>
      <h4>Touch Gestures</h4>
      <p>Native touch and swipe support for mobile and tablet devices.</p>
    </div>`,
    `<div class="feature-card">
      <div class="feature-icon gradient-red">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3" stroke-width="2"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1.06 1.55V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.55-1.06H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1.06-1.55V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.06 1.55 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.55 1.06H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.55 1.06z" stroke-width="2"/>
        </svg>
      </div>
      <h4>Highly Customizable</h4>
      <p>Extensive API with over 20 configuration options to fit your needs.</p>
    </div>`
  ];

  // News/Blog Cards
  const newsCards = [
    `<div class="news-card">
      <div class="news-image">
        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop" alt="Tech news" />
        <div class="news-category">Technology</div>
      </div>
      <div class="news-content">
        <div class="news-meta">
          <span class="news-date">Dec 15, 2024</span>
          <span class="news-read-time">5 min read</span>
        </div>
        <h3>The Future of Web Components in Modern Development</h3>
        <p>Exploring how web components are revolutionizing the way we build user interfaces...</p>
        <a href="#" class="news-link">Read More →</a>
      </div>
    </div>`,
    `<div class="news-card">
      <div class="news-image">
        <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop" alt="Design trends" />
        <div class="news-category">Design</div>
      </div>
      <div class="news-content">
        <div class="news-meta">
          <span class="news-date">Dec 12, 2024</span>
          <span class="news-read-time">3 min read</span>
        </div>
        <h3>UI/UX Trends That Will Define 2025</h3>
        <p>From neumorphism to adaptive interfaces, discover the design trends shaping the future...</p>
        <a href="#" class="news-link">Read More →</a>
      </div>
    </div>`,
    `<div class="news-card">
      <div class="news-image">
        <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop" alt="Performance" />
        <div class="news-category">Performance</div>
      </div>
      <div class="news-content">
        <div class="news-meta">
          <span class="news-date">Dec 10, 2024</span>
          <span class="news-read-time">7 min read</span>
        </div>
        <h3>Optimizing React Applications for Better Performance</h3>
        <p>Learn advanced techniques to make your React apps lightning fast...</p>
        <a href="#" class="news-link">Read More →</a>
      </div>
    </div>`
  ];
</script>

<svelte:head>
  <title>Examples - Svelte Flex Slider</title>
  <meta name="description" content="Explore interactive examples of Svelte Flex Slider in action. See different use cases and implementations." />
</svelte:head>

<div class="examples-page">
  <div class="page-header">
    <div class="container">
      <h1>Live Examples</h1>
      <p>Explore different implementations and use cases of Svelte Flex Slider</p>
    </div>
  </div>

  <div class="container">
    <!-- Image Gallery Example -->
    <section class="example-section">
      <div class="example-header">
        <div class="example-info">
          <h2>Image Gallery</h2>
          <p>Full-width image gallery with captions and smooth transitions</p>
        </div>
        <div class="example-config">
          <span class="config-tag">autoplay: true</span>
          <span class="config-tag">interval: 4000</span>
          <span class="config-tag">infinity: true</span>
        </div>
      </div>
      <div class="example-demo">
        <Slider 
          cards={galleryImages}
          autoplay={true}
          interval={4000}
          visibleCards={{ default: 1 }}
          showIndicators={true}
          showNavButtons={true}
          infinity={true}
          pauseOnHover={true}
        />
      </div>
      <details class="example-code">
        <summary>View Code</summary>
        <div class="code-content">
          <pre><code>&lt;Slider 
  cards={galleryImages}
  autoplay={true}
  interval={4000}
  visibleCards={{ default: 1 }}
  showIndicators={true}
  showNavButtons={true}
  infinity={true}
  pauseOnHover={true}
/&gt;</code></pre>
        </div>
      </details>
    </section>

    <!-- Product Showcase -->
    <section class="example-section">
      <div class="example-header">
        <div class="example-info">
          <h2>Product Showcase</h2>
          <p>E-commerce product cards with responsive grid layout</p>
        </div>
        <div class="example-config">
          <span class="config-tag">responsive: 1→2→3</span>
          <span class="config-tag">touch: enabled</span>
          <span class="config-tag">autoplay: false</span>
        </div>
      </div>
      <div class="example-demo">
        <Slider 
          cards={products}
          autoplay={false}
          visibleCards={{ default: 1, 640: 2, 1024: 3 }}
          showIndicators={false}
          showNavButtons={true}
          infinity={false}
          enableTouchGestures={true}
          enableMouseDrag={true}
        />
      </div>
      <details class="example-code">
        <summary>View Code</summary>
        <div class="code-content">
          <pre><code>&lt;Slider 
  cards={products}
  autoplay={false}
  visibleCards={{ default: 1, 640: 2, 1024: 3 }}
  showIndicators={false}
  showNavButtons={true}
  infinity={false}
  enableTouchGestures={true}
  enableMouseDrag={true}
/&gt;</code></pre>
        </div>
      </details>
    </section>

    <!-- Testimonials -->
    <section class="example-section">
      <div class="example-header">
        <div class="example-info">
          <h2>Customer Testimonials</h2>
          <p>Clean testimonial carousel with author information</p>
        </div>
        <div class="example-config">
          <span class="config-tag">single slide</span>
          <span class="config-tag">no nav buttons</span>
          <span class="config-tag">indicators only</span>
        </div>
      </div>
      <div class="example-demo testimonials-demo">
        <Slider 
          cards={testimonials}
          autoplay={true}
          interval={6000}
          visibleCards={{ default: 1 }}
          showIndicators={true}
          showNavButtons={false}
          infinity={true}
          pauseOnHover={true}
        />
      </div>
      <details class="example-code">
        <summary>View Code</summary>
        <div class="code-content">
          <pre><code>&lt;Slider 
  cards={testimonials}
  autoplay={true}
  interval={6000}
  visibleCards={{ default: 1 }}
  showIndicators={true}
  showNavButtons={false}
  infinity={true}
  pauseOnHover={true}
/&gt;</code></pre>
        </div>
      </details>
    </section>

    <!-- Feature Grid -->
    <section class="example-section">
      <div class="example-header">
        <div class="example-info">
          <h2>Feature Highlights</h2>
          <p>Interactive feature cards with gradient icons</p>
        </div>
        <div class="example-config">
          <span class="config-tag">drag enabled</span>
          <span class="config-tag">responsive grid</span>
          <span class="config-tag">no autoplay</span>
        </div>
      </div>
      <div class="example-demo">
        <Slider 
          cards={features}
          autoplay={false}
          visibleCards={{ default: 1, 768: 2, 1200: 4 }}
          showIndicators={false}
          showNavButtons={true}
          infinity={false}
          enableMouseDrag={true}
          enableTouchGestures={true}
        />
      </div>
      <details class="example-code">
        <summary>View Code</summary>
        <div class="code-content">
          <pre><code>&lt;Slider 
  cards={features}
  autoplay={false}
  visibleCards={{ default: 1, 768: 2, 1200: 4 }}
  showIndicators={false}
  showNavButtons={true}
  infinity={false}
  enableMouseDrag={true}
  enableTouchGestures={true}
/&gt;</code></pre>
        </div>
      </details>
    </section>

    <!-- News/Blog Cards -->
    <section class="example-section">
      <div class="example-header">
        <div class="example-info">
          <h2>News & Blog Posts</h2>
          <p>Article cards with images, categories, and metadata</p>
        </div>
        <div class="example-config">
          <span class="config-tag">slow autoplay</span>
          <span class="config-tag">pause on hover</span>
          <span class="config-tag">responsive</span>
        </div>
      </div>
      <div class="example-demo">
        <Slider 
          cards={newsCards}
          autoplay={true}
          interval={8000}
          visibleCards={{ default: 1, 768: 2, 1024: 3 }}
          showIndicators={true}
          showNavButtons={true}
          infinity={true}
          pauseOnHover={true}
        />
      </div>
      <details class="example-code">
        <summary>View Code</summary>
        <div class="code-content">
          <pre><code>&lt;Slider 
  cards={newsCards}
  autoplay={true}
  interval={8000}
  visibleCards={{ default: 1, 768: 2, 1024: 3 }}
  showIndicators={true}
  showNavButtons={true}
  infinity={true}
  pauseOnHover={true}
/&gt;</code></pre>
        </div>
      </details>
    </section>

    <!-- Configuration Guide -->
    <section class="config-guide">
      <h2>Configuration Tips</h2>
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2"/>
              <polyline points="12,6 12,12 16,14" stroke-width="2"/>
            </svg>
          </div>
          <h3>Performance</h3>
          <p>Use shorter intervals (1000-3000ms) for promotional content, longer intervals (5000-8000ms) for reading material.</p>
        </div>
        <div class="tip-card">
          <div class="tip-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke-width="2"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke-width="2"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke-width="2"/>
            </svg>
          </div>
          <h3>Responsive Design</h3>
          <p>Always test your breakpoints. Consider content readability when setting visibleCards for different screen sizes.</p>
        </div>
        <div class="tip-card">
          <div class="tip-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 11H1l8-8 8 8h-8l8 8-8-8z" stroke-width="2"/>
            </svg>
          </div>
          <h3>User Experience</h3>
          <p>Enable pauseOnHover for content users might want to read. Disable autoplay for interactive content.</p>
        </div>
        <div class="tip-card">
          <div class="tip-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke-width="2"/>
            </svg>
          </div>
          <h3>Accessibility</h3>
          <p>Keep navigation visible for accessibility. Use semantic HTML inside your card content.</p>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .examples-page {
    min-height: calc(100vh - 4rem);
    background: #fafafa;
  }

  .page-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 0;
    text-align: center;
  }

  .page-header h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  .page-header p {
    font-size: 1.25rem;
    opacity: 0.9;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .example-section {
    background: white;
    border-radius: 16px;
    margin: 3rem 0;
    padding: 2.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }

  .example-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    gap: 1rem;
  }

  .example-info h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .example-info p {
    color: #6b7280;
    line-height: 1.5;
  }

  .example-config {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .config-tag {
    background: #f3f4f6;
    color: #374151;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .example-demo {
    margin-bottom: 1.5rem;
    border-radius: 12px;
    overflow: hidden;
  }

  .testimonials-demo {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    padding: 2rem;
  }

  .example-code {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #f9fafb;
  }
.example-code summary {
    padding: 1rem 1.5rem;
    cursor: pointer;
    font-weight: 600;
    color: #374151;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    user-select: none;
  }

  .example-code summary:hover {
    background: #f3f4f6;
  }

  .example-code .code-content {
    padding: 1.5rem;
    background: #1f2937;
    overflow-x: auto;
  }

  .example-code pre {
    margin: 0;
  }

  .example-code code {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    font-size: 0.875rem;
    line-height: 1.6;
    color: #e5e7eb;
  }

  /* Gallery Styles */
  :global(.gallery-slide) {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
  }

  :global(.gallery-slide img) {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  :global(.gallery-caption) {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    color: white;
    padding: 3rem 2rem 2rem;
  }

  :global(.gallery-caption h3) {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  :global(.gallery-caption p) {
    opacity: 0.9;
    margin: 0;
  }

  /* Product Card Styles */
  :global(.product-card) {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    margin: 0 0.75rem;
    border: 1px solid #f3f4f6;
  }

  :global(.product-card:hover) {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  :global(.product-image) {
    position: relative;
    overflow: hidden;
  }

  :global(.product-image img) {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  :global(.product-card:hover .product-image img) {
    transform: scale(1.05);
  }

  :global(.product-badge) {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    background: #eb4f27;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  :global(.product-badge.sale) {
    background: #ef4444;
  }

  :global(.product-info) {
    padding: 1.5rem;
  }

  :global(.product-info h4) {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  :global(.product-price) {
    font-size: 1.25rem;
    font-weight: 700;
    color: #eb4f27;
    margin-bottom: 0.75rem;
  }

  :global(.product-price .original) {
    text-decoration: line-through;
    color: #9ca3af;
    font-size: 1rem;
    font-weight: 400;
    margin-right: 0.5rem;
  }

  :global(.product-rating) {
    color: #fbbf24;
    font-size: 0.875rem;
  }

  :global(.product-rating span) {
    color: #6b7280;
    margin-left: 0.25rem;
  }

  /* Testimonial Styles */
  :global(.testimonial-card) {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    margin: 0 1rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  :global(.testimonial-content) {
    margin-bottom: 2rem;
  }

  :global(.quote-icon) {
    font-size: 3rem;
    color: #eb4f27;
    margin-bottom: 1rem;
    line-height: 1;
  }

  :global(.testimonial-content blockquote) {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #374151;
    font-style: italic;
    margin: 0;
  }

  :global(.testimonial-author) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  :global(.testimonial-author img) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  :global(.author-info strong) {
    display: block;
    color: #1f2937;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  :global(.author-info span) {
    color: #6b7280;
    font-size: 0.875rem;
  }

  /* Feature Card Styles */
  :global(.feature-card) {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    margin: 0 0.75rem;
    border: 1px solid #f3f4f6;
    transition: all 0.3s ease;
  }

  :global(.feature-card:hover) {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  :global(.feature-icon) {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: white;
  }

  :global(.gradient-blue) {
    background: linear-gradient(135deg, #eb4f27, #cc4522);
  }

  :global(.gradient-green) {
    background: linear-gradient(135deg, #10b981, #047857);
  }

  :global(.gradient-purple) {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  }

  :global(.gradient-red) {
    background: linear-gradient(135deg, #ef4444, #dc2626);
  }

  :global(.feature-card h4) {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  :global(.feature-card p) {
    color: #6b7280;
    line-height: 1.5;
  }

  /* News Card Styles */
  :global(.news-card) {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    margin: 0 0.75rem;
    border: 1px solid #f3f4f6;
    transition: all 0.3s ease;
  }

  :global(.news-card:hover) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  :global(.news-image) {
    position: relative;
    overflow: hidden;
  }

  :global(.news-image img) {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  :global(.news-card:hover .news-image img) {
    transform: scale(1.02);
  }

  :global(.news-category) {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(59, 130, 246, 0.9);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    backdrop-filter: blur(4px);
  }

  :global(.news-content) {
    padding: 1.5rem;
  }

  :global(.news-meta) {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #6b7280;
  }

  :global(.news-content h3) {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }

  :global(.news-content p) {
    color: #6b7280;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  :global(.news-link) {
    color: #eb4f27;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  :global(.news-link:hover) {
    color: #cc4522;
  }

  /* Configuration Guide */
  .config-guide {
    background: white;
    border-radius: 16px;
    padding: 3rem;
    margin: 4rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }

  .config-guide h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 2rem;
    text-align: center;
  }

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .tip-card {
    background: #f9fafb;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid #f3f4f6;
    transition: all 0.3s ease;
  }

  .tip-card:hover {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .tip-icon {
    width: 3rem;
    height: 3rem;
    background: #eb4f27;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: 1rem;
  }

  .tip-card h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.75rem;
  }

  .tip-card p {
    color: #6b7280;
    line-height: 1.5;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .page-header h1 {
      font-size: 2.5rem;
    }

    .example-section {
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .example-header {
      flex-direction: column;
      gap: 1rem;
    }

    .example-config {
      justify-content: flex-start;
    }

    .config-guide {
      padding: 2rem;
    }

    .tips-grid {
      grid-template-columns: 1fr;
    }

    :global(.gallery-caption) {
      padding: 2rem 1.5rem 1.5rem;
    }

    :global(.gallery-caption h3) {
      font-size: 1.25rem;
    }

    :global(.testimonial-card) {
      padding: 2rem;
      margin: 0 0.5rem;
    }

    :global(.feature-card) {
      margin: 0 0.5rem;
    }

    :global(.news-card) {
      margin: 0 0.5rem;
    }

    :global(.product-card) {
      margin: 0 0.5rem;
    }
  }

  @media (max-width: 640px) {
    .page-header {
      padding: 3rem 0;
    }

    .page-header h1 {
      font-size: 2rem;
    }

    .example-section {
      padding: 1rem;
    }

    .config-guide {
      padding: 1.5rem;
    }
  }
</style>