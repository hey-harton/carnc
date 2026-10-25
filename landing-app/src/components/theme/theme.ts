/**
 * CarNC design tokens ("Clean Forest Minimalist").
 *
 * Mirrors the CSS custom properties defined in `theme.css`.
 */

export const theme = {
  colors: {
    // Backgrounds
    background: '#f8faf9',
    backgroundSurface: '#ffffff',
    backgroundMuted: '#f0fdf4',
    backgroundCard: '#ffffff',

    // Brand
    primary: '#047857',
    primaryHover: '#065f46',
    primaryActive: '#064e3b',
    primaryLight: '#d1fae5',
    primaryVibrant: '#10b981',

    // Header and text
    headerDark: '#0b1612',
    headerHover: '#162720',
    textHeading: '#0f172a',
    textBody: '#334155',
    textMuted: '#64748b',
    textInverse: '#ffffff',

    // Borders
    borderSubtle: '#e2e8f0',
    borderGreen: '#a7f3d0',
    borderFocus: '#047857',

    // Status
    success: '#10b981',
    successBg: '#ecfdf5',
    error: '#ef4444',
    errorBg: '#fef2f2',
  },

  fonts: {
    primary: "'Outfit', 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
    cardHover: '0 10px 15px -3px rgba(4, 120, 87, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
    result: '0 10px 25px -5px rgba(4, 120, 87, 0.25)',
  },

  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
} as const;

/** Type of the {@link theme} token object. */
export type Theme = typeof theme;
