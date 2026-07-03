export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pitch: '#000000',
        pitchDark: '#09090B',
        crimson: '#E50914',
        crimsonSoft: '#D30A14',
        platinum: '#A1A1AA'
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      boxShadow: {
        glow: '0 0 120px rgba(229,9,20,0.18)',
        soft: '0 0 26px rgba(255,255,255,0.08)'
      }
    }
  },
  plugins: []
};
