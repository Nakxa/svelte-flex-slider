<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let sidebarOpen = false;

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/documentation', label: 'Documentation' },
    { href: '/examples', label: 'Examples' },
    { href: '/contact', label: 'Contact' }
  ];

  onMount(() => {
    // Close sidebar on route change
    return page.subscribe(() => {
      sidebarOpen = false;
    });
  });

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }

  function closeSidebar() {
    sidebarOpen = false;
  }
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Svelte Flex Slider - Modern Carousel Component</title>
  <meta name="description" content="A powerful, flexible, and modern carousel slider component for Svelte applications" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" >
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</svelte:head>

<div class="app">
  <!-- Sidebar Overlay -->
  {#if sidebarOpen}
    <div class="sidebar-overlay" on:click={closeSidebar}></div>
  {/if}

  <!-- Sidebar -->
  <aside class="sidebar" class:sidebar-open={sidebarOpen}>
    <div class="sidebar-header">
      <div class="logo">
        <div class="logo-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#sidebarGradient)" />
            <path d="M8 12h16l-8 8-8-8z" fill="white" opacity="0.9" />
            <defs>
              <linearGradient id="sidebarGradient" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stop-color="#eb4f27" />
                <stop offset="100%" stop-color="#cc4522" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="logo-text">Svelte Flex Slider</span>
      </div>
      <button class="sidebar-close" on:click={closeSidebar}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <nav class="sidebar-nav">
      <ul class="sidebar-menu">
        {#each navItems as item}
          <li>
            <a 
              href={item.href} 
              class="sidebar-link"
              class:active={$page.url.pathname === item.href}
              on:click={closeSidebar}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
      
      <div class="sidebar-footer">
        <a 
          href="https://www.npmjs.com/package/svelte-flex-slider" 
          class="sidebar-external-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/>
          </svg>
          NPM Package
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </nav>
  </aside>

  <header class="header">
    <nav class="nav">
      <div class="nav-container">
        <div class="nav-brand">
          <button class="sidebar-toggle" on:click={toggleSidebar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 12h18M3 6h18M3 18h18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <a href="/" class="logo">
            <div class="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="url(#gradient)" />
                <path d="M8 12h16l-8 8-8-8z" fill="white" opacity="0.9" />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stop-color="#eb4f27" />
                    <stop offset="100%" stop-color="#cc4522" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span class="logo-text">Svelte Flex Slider</span>
          </a>
        </div>

        <div class="nav-links">
          {#each navItems as item}
            <a 
              href={item.href} 
              class="nav-link"
              class:active={$page.url.pathname === item.href}
            >
              {item.label}
            </a>
          {/each}
          <a 
            href="https://www.npmjs.com/package/svelte-flex-slider" 
            class="nav-link-external"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  </header>

  <main class="main">
    <slot />
  </main>

  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <div class="logo-icon">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="url(#footerGradient)" />
                <path d="M8 12h16l-8 8-8-8z" fill="white" opacity="0.9" />
                <defs>
                  <linearGradient id="footerGradient" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stop-color="#eb4f27" />
                    <stop offset="100%" stop-color="#cc4522" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span class="logo-text">Svelte Flex Slider</span>
          </div>
          <p class="footer-description">
            A modern, flexible carousel component for Svelte applications with infinite scrolling, touch gestures, and responsive design.
          </p>
        </div>

        <div class="footer-links">
          <div class="footer-section">
            <h4>Navigation</h4>
            <ul>
              {#each navItems as item}
                <li><a href={item.href}>{item.label}</a></li>
              {/each}
            </ul>
          </div>

          <div class="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://www.npmjs.com/package/svelte-flex-slider" target="_blank" rel="noopener">NPM Package</a></li>
              <li><a href="https://github.com/nakxa/svelte-flex-slider" target="_blank" rel="noopener">GitHub Repository</a></li>
              <li><a href="/examples">Live Examples</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Connect</h4>
            <div class="social-links">
              <a href="https://www.linkedin.com/in/nakxa/" target="_blank" rel="noopener" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com/nakxa" target="_blank" rel="noopener" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://nakxa.site" target="_blank" rel="noopener" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke-width="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" stroke-width="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" stroke-width="2"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2025 Svelte Flex Slider. Built with ❤️ for the Svelte community.</p>
      </div>
    </div>
  </footer>
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    line-height: 1.6;
    color: #1f2937;
    background-color: #ffffff;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /* Sidebar Styles */
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    background: #ffffff;
    border-right: 1px solid #e5e7eb;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 300;
    display: flex;
    flex-direction: column;
  }

  .sidebar-open {
    transform: translateX(0);
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .sidebar-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
    padding: 0.5rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
  }

  .sidebar-close:hover {
    background: #f3f4f6;
    color: #1f2937;
  }

  .sidebar-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
  }

  .sidebar-menu {
    list-style: none;
    flex: 1;
  }

  .sidebar-menu li {
    margin-bottom: 0.25rem;
  }

  .sidebar-link {
    display: block;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    color: #6b7280;
    font-weight: 500;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;
  }

  .sidebar-link:hover {
    color: #eb4f27;
    background: #f8fafc;
  }

  .sidebar-link.active {
    color: #eb4f27;
    background: #eff6ff;
    border-left-color: #eb4f27;
  }

  .sidebar-footer {
    padding: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .sidebar-external-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: #f3f4f6;
    border-radius: 0.5rem;
    text-decoration: none;
    color: #4b5563;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .sidebar-external-link:hover {
    background: #e5e7eb;
    color: #1f2937;
  }

  .sidebar-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
    padding: 0.5rem;
    border-radius: 0.375rem;
    margin-right: 1rem;
    transition: all 0.2s ease;
  }

  .sidebar-toggle:hover {
    background: #f3f4f6;
    color: #1f2937;
  }

  /* Header Styles */
  .header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav {
    padding: 0 1rem;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
  }

  .nav-brand {
    display: flex;
    align-items: center;
  }

  .nav-brand .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: #1f2937;
  }

  .logo-icon {
    flex-shrink: 0;
  }

  .logo-text {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link, .nav-link-external {
    text-decoration: none;
    color: #6b7280;
    font-weight: 500;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .nav-link:hover, .nav-link-external:hover {
    color: #eb4f27;
  }

  .nav-link.active {
    color: #eb4f27;
  }

  .nav-link-external {
    background: #f3f4f6;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: #4b5563;
    font-size: 0.875rem;
  }

  .nav-link-external:hover {
    background: #e5e7eb;
    color: #1f2937;
  }

  .main {
    flex: 1;
  }

  .footer {
    background: #f9fafb;
    border-top: 1px solid #e5e7eb;
    margin-top: 4rem;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1rem 1rem;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    margin-bottom: 2rem;
  }

  .footer-brand .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .footer-description {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.5;
    max-width: 300px;
  }

  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .footer-section h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .footer-section ul {
    list-style: none;
  }

  .footer-section ul li {
    margin-bottom: 0.5rem;
  }

  .footer-section ul li a {
    color: #6b7280;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s ease;
  }

  .footer-section ul li a:hover {
    color: #eb4f27;
  }

  .social-links {
    display: flex;
    gap: 1rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: #f3f4f6;
    border-radius: 0.5rem;
    color: #6b7280;
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .social-link:hover {
    background: #eb4f27;
    color: white;
    transform: translateY(-2px);
  }

  .footer-bottom {
    border-top: 1px solid #e5e7eb;
    padding: 1.5rem 0;
    text-align: center;
  }

  .footer-bottom p {
    color: #6b7280;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .sidebar-toggle {
      display: block;
    }

    .nav-links {
      display: none;
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .footer-links {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>