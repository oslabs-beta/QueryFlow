module.exports = {
  content: ['./src/**/*.{svelte,js,ts}'],
  daisyui: {
    themes: ['light', 'dark', 'cupcake',
      {
        mytheme: {
        
          'primary': '#641ae6',
        
          'secondary': '#d926a9',
        
          'accent': '#1fb2a6',
        
          'neutral': '#2a323c',
        
          'base-100': '#1d232a',
        
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