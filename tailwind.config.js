module.exports = {
  content: ['./src/**/*.{svelte,js,ts}'],
  daisyui: {
    themes: ['light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      {
        mytheme: {
        
          'primary': '#1245a8',
        
          'secondary': '#1f5eda',
        
          'accent': '#1fb2a6',
        
          'neutral': '#2a323c',
        
          'base-100': 'white',
        
          'info': '#3abff8',
        
          'success': '#36d399',
        
          'warning': '#fbbd23',
        
          'error': '#f87272',
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
};