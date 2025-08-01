const plugin = require('tailwindcss/plugin');

const withAlphaValue = (variable) => ({ opacityValue }) => {
  if (opacityValue === undefined) {
    return `hsl(var(${variable}))`;
  }
  return `hsl(var(${variable}) / ${opacityValue})`;
};

module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: withAlphaValue('--border'),
        input: withAlphaValue('--input'),
        ring: withAlphaValue('--ring'),
        background: withAlphaValue('--background'),
        foreground: withAlphaValue('--foreground'),
        primary: {
          DEFAULT: withAlphaValue('--primary'),
          foreground: withAlphaValue('--primary-foreground'),
        },
        secondary: {
          DEFAULT: withAlphaValue('--secondary'),
          foreground: withAlphaValue('--secondary-foreground'),
        },
        destructive: {
          DEFAULT: withAlphaValue('--destructive'),
          foreground: withAlphaValue('--destructive-foreground'),
        },
        muted: {
          DEFAULT: withAlphaValue('--muted'),
          foreground: withAlphaValue('--muted-foreground'),
        },
        accent: {
          DEFAULT: withAlphaValue('--accent'),
          foreground: withAlphaValue('--accent-foreground'),
        },
        popover: {
          DEFAULT: withAlphaValue('--popover'),
          foreground: withAlphaValue('--popover-foreground'),
        },
        card: {
          DEFAULT: withAlphaValue('--card'),
          foreground: withAlphaValue('--card-foreground'),
        },
      },
      borderColor: {
        border: withAlphaValue('--border'),
      },
      borderRadius: {
        lg: 'var(--radius)',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
