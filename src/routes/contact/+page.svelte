<!-- src/routes/contact/+page.svelte -->
<script>
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: 'general'
  };
  
  let isSubmitting = false;
  let submitStatus = null; // null, 'success', 'error'

  async function handleSubmit(event) {
    event.preventDefault();
    isSubmitting = true;
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In a real app, you'd send the form data to your backend
      console.log('Form submitted:', formData);
      submitStatus = 'success';
      
      // Reset form
      formData = {
        name: '',
        email: '',
        subject: '',
        message: '',
        projectType: 'general'
      };
    } catch (error) {
      submitStatus = 'error';
    } finally {
      isSubmitting = false;
      setTimeout(() => {
        submitStatus = null;
      }, 3000);
    }
  }

  const projectTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'support', label: 'Technical Support' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'other', label: 'Other' }
  ];

  const contactMethods = [
    {
      icon: 'github',
      title: 'GitHub',
      description: 'Report bugs, request features, or contribute',
      link: 'https://github.com/nakxa/svelte-flex-slider',
      action: 'View Repository'
    },
    {
      icon: 'npm',
      title: 'NPM Package',
      description: 'Download and install the latest version',
      link: 'https://www.npmjs.com/package/svelte-flex-slider',
      action: 'View Package'
    },
    {
      icon: 'linkedin',
      title: 'LinkedIn',
      description: 'Connect with me professionally',
      link: 'https://www.linkedin.com/in/nakxa/',
      action: 'Connect'
    },
    {
      icon: 'portfolio',
      title: 'Portfolio',
      description: 'Check out my other projects',
      link: 'https://nakxa.site',
      action: 'Visit Portfolio'
    }
  ];

  const faqs = [
    {
      question: 'How do I report a bug?',
      answer: 'You can report bugs by creating an issue on our GitHub repository. Please include a detailed description, steps to reproduce, and your environment details.'
    },
    {
      question: 'Can I contribute to the project?',
      answer: 'Absolutely! We welcome contributions. Please check our contributing guidelines on GitHub, fork the repository, and submit a pull request.'
    },
    {
      question: 'Is there commercial support available?',
      answer: 'For commercial support, custom features, or consulting services, please reach out through the contact form with details about your project.'
    },
    {
      question: 'What\'s the best way to get help?',
      answer: 'For quick questions, check the documentation first. For bugs, use GitHub issues. For general questions or support, use the contact form below.'
    }
  ];
</script>

<svelte:head>
  <title>Contact Us - Svelte Flex Slider</title>
  <meta name="description" content="Get in touch with the Svelte Flex Slider team. Report bugs, request features, or collaborate on improving the component." />
</svelte:head>

<div class="contact-page">
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>Get in Touch</h1>
        <p>Have questions, suggestions, or want to collaborate? We'd love to hear from you!</p>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="contact-grid">
      <!-- Contact Form -->
      <section class="contact-form-section">
        <div class="form-header">
          <h2>Send us a Message</h2>
          <p>Fill out the form below and we'll get back to you as soon as possible.</p>
        </div>

        <form on:submit={handleSubmit} class="contact-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Name *</label>
              <input 
                type="text" 
                id="name" 
                bind:value={formData.name}
                required 
                placeholder="Your name"
              />
            </div>
            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                bind:value={formData.email}
                required 
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="projectType">Project Type</label>
            <select id="projectType" bind:value={formData.projectType}>
              {#each projectTypes as type}
                <option value={type.value}>{type.label}</option>
              {/each}
            </select>
          </div>

          <div class="form-group">
            <label for="subject">Subject *</label>
            <input 
              type="text" 
              id="subject" 
              bind:value={formData.subject}
              required 
              placeholder="Brief description of your inquiry"
            />
          </div>

          <div class="form-group">
            <label for="message">Message *</label>
            <textarea 
              id="message" 
              bind:value={formData.message}
              required 
              rows="6"
              placeholder="Provide details about your question, bug report, or feature request..."
            ></textarea>
          </div>

          <button type="submit" class="submit-btn" disabled={isSubmitting}>
            {#if isSubmitting}
              <div class="spinner"></div>
              Sending...
            {:else}
              Send Message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="22" y1="2" x2="11" y2="13" stroke-width="2"/>
                <polygon points="22,2 15,22 11,13 2,9 22,2" stroke-width="2"/>
              </svg>
            {/if}
          </button>

          {#if submitStatus === 'success'}
            <div class="status-message success">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20,6 9,17 4,12" stroke-width="2"/>
              </svg>
              Message sent successfully! We'll get back to you soon.
            </div>
          {/if}

          {#if submitStatus === 'error'}
            <div class="status-message error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-width="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke-width="2"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke-width="2"/>
              </svg>
              Something went wrong. Please try again or contact us directly.
            </div>
          {/if}
        </form>
      </section>

      <!-- Contact Methods -->
      <section class="contact-methods">
        <div class="methods-header">
          <h2>Other Ways to Connect</h2>
          <p>Prefer a different way to reach out? Here are some alternatives.</p>
        </div>

        <div class="methods-grid">
          {#each contactMethods as method}
            <a href={method.link} target="_blank" rel="noopener noreferrer" class="method-card">
              <div class="method-icon">
                {#if method.icon === 'github'}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                {:else if method.icon === 'npm'}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 7v10h6.5V9.5h1V17H9V7H0zm8 10h2V9h3v8h2V9h3v8h2V7H8v10z"/>
                  </svg>
                {:else if method.icon === 'linkedin'}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                {:else if method.icon === 'portfolio'}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke-width="2"/>
                    <line x1="8" y1="21" x2="16" y2="21" stroke-width="2"/>
                    <line x1="12" y1="17" x2="12" y2="21" stroke-width="2"/>
                  </svg>
                {/if}
              </div>
              <div class="method-content">
                <h3>{method.title}</h3>
                <p>{method.description}</p>
                <span class="method-action">{method.action} →</span>
              </div>
            </a>
          {/each}
        </div>
      </section>
    </div>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>Quick answers to common questions about Svelte Flex Slider.</p>
      </div>

      <div class="faq-grid">
        {#each faqs as faq, index}
          <details class="faq-item">
            <summary class="faq-question">
              {faq.question}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="6,9 12,15 18,9" stroke-width="2"/>
              </svg>
            </summary>
            <div class="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </details>
        {/each}
      </div>

      <div class="faq-cta">
        <p>Still have questions? <a href="#contact-form" class="cta-link">Get in touch</a></p>
      </div>
    </section>

    <!-- Response Time Info -->
    <section class="response-info">
      <div class="info-card">
        <div class="info-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <polyline points="12,6 12,12 16,14" stroke-width="2"/>
          </svg>
        </div>
        <div class="info-content">
          <h3>Response Time</h3>
          <p>We typically respond within 24-48 hours. For urgent issues, please mention it in your message subject line.</p>
        </div>
      </div>
      <div class="info-card">
        <div class="info-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke-width="2"/>
          </svg>
        </div>
        <div class="info-content">
          <h3>Best Practices</h3>
          <p>Include code examples, error messages, and browser/environment details for technical issues to help us assist you faster.</p>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .contact-page {
    min-height: calc(100vh - 4rem);
    background: #fafafa;
  }

  .hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 0;
    text-align: center;
  }

  .hero h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  .hero p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    margin: 4rem 0;
  }

  .contact-form-section {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }

  .form-header {
    margin-bottom: 2rem;
  }

  .form-header h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .form-header p {
    color: #6b7280;
    line-height: 1.5;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    background: white;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #eb4f27;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
  }

  .submit-btn {
    background: #eb4f27;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .submit-btn:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .status-message {
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;
  }

  .status-message.success {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
  }

  .status-message.error {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }

  .contact-methods {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .methods-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .methods-header p {
    color: #6b7280;
    line-height: 1.5;
  }

  .methods-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .method-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    text-decoration: none;
    transition: all 0.2s ease;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .method-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .method-icon {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    background: #f3f4f6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #eb4f27;
  }

  .method-content h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
  }

  .method-content p {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  }

  .method-action {
    color: #eb4f27;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .faq-section {
    background: white;
    border-radius: 16px;
    padding: 3rem;
    margin: 3rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }

  .faq-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .faq-header h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .faq-header p {
    color: #6b7280;
    font-size: 1.125rem;
  }

  .faq-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .faq-item {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
  }

  .faq-question {
    padding: 1.25rem 1.5rem;
    cursor: pointer;
    font-weight: 600;
    color: #1f2937;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.2s ease;
    user-select: none;
  }

  .faq-question:hover {
    background: #f3f4f6;
  }

  .faq-question svg {
    transition: transform 0.2s ease;
    color: #6b7280;
  }

  .faq-item[open] .faq-question svg {
    transform: rotate(180deg);
  }

  .faq-answer {
    padding: 1.5rem;
    background: white;
  }

  .faq-answer p {
    color: #4b5563;
    line-height: 1.6;
    margin: 0;
  }

  .faq-cta {
    text-align: center;
    padding: 2rem;
    background: #f9fafb;
    border-radius: 12px;
  }

  .faq-cta p {
    color: #6b7280;
    font-size: 1.125rem;
  }

  .cta-link {
    color: #eb4f27;
    font-weight: 600;
    text-decoration: none;
  }

  .cta-link:hover {
    text-decoration: underline;
  }

  .response-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 3rem 0;
  }

  .info-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .info-icon {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    background: #eff6ff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #eb4f27;
  }

  .info-content h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .info-content p {
    color: #6b7280;
    line-height: 1.5;
    font-size: 0.9rem;
  }

  @media (max-width: 1024px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .faq-grid {
      grid-template-columns: 1fr;
    }

    .response-info {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2.5rem;
    }

    .hero p {
      font-size: 1.125rem;
    }

    .contact-form-section {
      padding: 2rem;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .faq-section {
      padding: 2rem;
    }

    .info-card {
      padding: 1.5rem;
    }
  }

  @media (max-width: 640px) {
    .hero {
      padding: 3rem 0;
    }

    .hero h1 {
      font-size: 2rem;
    }

    .contact-form-section {
      padding: 1.5rem;
    }

    .faq-section {
      padding: 1.5rem;
    }

    .method-card {
      padding: 1.25rem;
    }

    .info-card {
      padding: 1.25rem;
    }
  }
</style>