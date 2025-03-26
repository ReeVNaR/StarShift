export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-custom': 'pulse 2s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'title-glow': 'title-glow 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out',
        'fade-in-delayed': 'fade-in 0.8s ease-out 0.3s forwards',
        'bounce-in': 'bounce-in 0.8s ease-out 0.6s forwards',
        'pulse-glow': 'pulse-glow 2s infinite',
        'slide-in': 'slide-in 2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'nav-pulse': 'nav-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'navbar-glow': 'navbar-glow 2s ease-in-out infinite',
        'neon-text': 'neon-text 1.5s ease-in-out infinite',
        'neon-line': 'neon-line 2s ease-in-out infinite',
        'neon-icon': 'neon-icon 3s ease-in-out infinite',
        'rgb-shift': 'rgb-shift 10s linear infinite',
        'rgb-text': 'rgb-text 8s linear infinite',
        'rgb-border': 'rgb-border 6s linear infinite',
        'random-color': 'random-color 8s linear infinite',
        'random-text': 'random-text 6s linear infinite',
        'float-to-cart': 'float-to-cart 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'pop-in': 'pop-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-left': 'slide-left 0.5s ease-out forwards',
        'slide-right': 'slide-right 0.5s ease-out forwards',
        'carousel-slide-left': 'carouselSlideLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'carousel-slide-right': 'carouselSlideRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'title-glow': {
          '0%, 100%': {
            textShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
            transform: 'scale(1)'
          },
          '50%': {
            textShadow: '0 0 30px rgba(59, 130, 246, 0.8)',
            transform: 'scale(1.02)'
          }
        },
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        'bounce-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3)'
          },
          '50%': {
            opacity: '0.9',
            transform: 'scale(1.1)'
          },
          '80%': {
            opacity: '1',
            transform: 'scale(0.89)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)'
          }
        },
        'slide-in': {
          '0%': { 
            transform: 'translateX(-200%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'nav-pulse': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.9'
          },
        },
        'navbar-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), inset 0 0 30px rgba(59, 130, 246, 0.5)'
          }
        },
        'neon-text': {
          '0%, 100%': {
            textShadow: '0 0 8px rgba(59, 130, 246, 0.6)'
          },
          '50%': {
            textShadow: '0 0 12px rgba(59, 130, 246, 0.8)'
          }
        },
        'neon-line': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.8)'
          },
          '50%': {
            boxShadow: '0 0 10px rgba(59, 130, 246, 1)'
          }
        },
        'neon-icon': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))'
          },
          '50%': {
            filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))'
          }
        },
        'rgb-shift': {
          '0%, 100%': {
            'background-color': 'rgba(239, 68, 68, 0.2)',
            'box-shadow': '0 0 20px rgba(239, 68, 68, 0.3)'
          },
          '33%': {
            'background-color': 'rgba(59, 130, 246, 0.2)',
            'box-shadow': '0 0 20px rgba(59, 130, 246, 0.3)'
          },
          '66%': {
            'background-color': 'rgba(16, 185, 129, 0.2)',
            'box-shadow': '0 0 20px rgba(16, 185, 129, 0.3)'
          }
        },
        'rgb-text': {
          '0%, 100%': {
            'color': 'rgb(239, 68, 68)',
            'text-shadow': '0 0 10px rgba(239, 68, 68, 0.5)'
          },
          '33%': {
            'color': 'rgb(59, 130, 246)',
            'text-shadow': '0 0 10px rgba(59, 130, 246, 0.5)'
          },
          '66%': {
            'color': 'rgb(16, 185, 129)',
            'text-shadow': '0 0 10px rgba(16, 185, 129, 0.5)'
          }
        },
        'rgb-border': {
          '0%, 100%': {
            'border-color': 'rgba(239, 68, 68, 0.3)'
          },
          '33%': {
            'border-color': 'rgba(59, 130, 246, 0.3)'
          },
          '66%': {
            'border-color': 'rgba(16, 185, 129, 0.3)'
          }
        },
        'random-color': {
          '0%, 100%': {
            'background-color': 'rgba(139, 92, 246, 0.2)',
            'box-shadow': '0 0 20px rgba(139, 92, 246, 0.3)'
          },
          '20%': {
            'background-color': 'rgba(236, 72, 153, 0.2)',
            'box-shadow': '0 0 20px rgba(236, 72, 153, 0.3)'
          },
          '40%': {
            'background-color': 'rgba(34, 211, 238, 0.2)',
            'box-shadow': '0 0 20px rgba(34, 211, 238, 0.3)'
          },
          '60%': {
            'background-color': 'rgba(132, 204, 22, 0.2)',
            'box-shadow': '0 0 20px rgba(132, 204, 22, 0.3)'
          },
          '80%': {
            'background-color': 'rgba(249, 115, 22, 0.2)',
            'box-shadow': '0 0 20px rgba(249, 115, 22, 0.3)'
          }
        },
        'random-text': {
          '0%, 100%': {
            'color': 'rgb(139, 92, 246)',
            'text-shadow': '0 0 10px rgba(139, 92, 246, 0.5)'
          },
          '20%': {
            'color': 'rgb(236, 72, 153)',
            'text-shadow': '0 0 10px rgba(236, 72, 153, 0.5)'
          },
          '40%': {
            'color': 'rgb(34, 211, 238)',
            'text-shadow': '0 0 10px rgba(34, 211, 238, 0.5)'
          },
          '60%': {
            'color': 'rgb(132, 204, 22)',
            'text-shadow': '0 0 10px rgba(132, 204, 22, 0.5)'
          },
          '80%': {
            'color': 'rgb(249, 115, 22)',
            'text-shadow': '0 0 10px rgba(249, 115, 22, 0.5)'
          }
        },
        'float-to-cart': {
          '0%': {
            opacity: '1',
            transform: 'scale(1.5) translate(0, 0)',
            filter: 'blur(0px)'
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.2) translate(calc(var(--translate-x) * 0.5), calc(var(--translate-y) * 0.5))',
            filter: 'blur(0px)'
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.8) translate(var(--translate-x), var(--translate-y))',
            filter: 'blur(2px)'
          }
        },
        'pop-in': {
          '0%': { 
            transform: 'scale(0.4)',
            opacity: '0'
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '0.5'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        'slide-left': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'slide-right': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'carouselSlideLeft': {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1'
          },
          '50%': {
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '51%': {
            transform: 'translateX(100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'carouselSlideRight': {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1'
          },
          '50%': {
            transform: 'translateX(100%)',
            opacity: '0'
          },
          '51%': {
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
      },
      boxShadow: {
        'neon': '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.1)',
        'glow': '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff'
      },
      utilities: {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-2000': {
          perspective: '2000px',
        },
        '.preserve-3d': {
          transformStyle: 'preserve-3d',
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(59, 130, 246, 0.5)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(59, 130, 246, 0.7)',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
