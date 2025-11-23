/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Deep Olive / Forest Green (trust, natural, B2B)
        primary: {
          DEFAULT: '#3a5a40',
          dark: '#2d4632',
          light: '#588157',
        },
        // Secondary: Warm Gold / Sand (premium, quality)
        secondary: {
          DEFAULT: '#dda15e',
          dark: '#bc6c25',
          light: '#fefae0',
        },
        // Background: Warm Cream / Off-white (clean, minimal)
        bg: {
          DEFAULT: '#fefae0',
          surface: '#f8f4e8',
          card: '#ffffff',
        },
        // Accent: Dark Paprika Red (appetizing highlights)
        accent: {
          DEFAULT: '#c1121f',
          dark: '#780000',
          light: '#ff6b6b',
        },
        // Text colors
        text: {
          DEFAULT: '#2c3e50',
          heading: '#1a1a1a',
          muted: '#64748b',
          light: '#94a3b8',
        },
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h4': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.75', letterSpacing: '0', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.04)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      maxWidth: {
        'container': '1280px',
      },
    },
  },
  plugins: [],
}
