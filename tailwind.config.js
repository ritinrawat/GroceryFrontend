/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#0A3D3F',
      secondary: '#F4F8F4',
      accent: '#FBAA29',
      success: '#1ABC9C',
      textPrimary: '#1E1E1E',
      textSecondary: '#6B7280',
      white: '#FFFFFF',
      black: '#000000',
      gray: {
        100: '#f3f4f6',
        500: '#6b7280',
        600: '#4b5563',
      },
      green: {
        500: '#10b981',
        600: '#059669',
      },
      blue: {
        600: '#2563eb',
        700: '#1d4ed8',
      },
      yellow: {
        400: '#fbbf24',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
      'slide-up': 'slideUp 0.3s ease-out',
      'bounce-subtle': 'bounceSubtle 1s infinite',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      bounceSubtle: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-5px)' },
      },
    },
  },
  plugins: [],
}
