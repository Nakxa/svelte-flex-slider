import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // This is key for client-side routing
      precompress: false,
      strict: true
    })
  }
};