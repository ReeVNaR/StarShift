export const glassButtonClass = `
  bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30
  text-white px-6 py-2 rounded-lg 
  border border-white/10
  transition-all duration-300 
  backdrop-blur-md
  relative
  overflow-hidden
  group
  hover:border-white/30
  hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]
  hover:scale-[1.02]
  hover:bg-gradient-to-r 
  hover:from-violet-500/40 
  hover:via-fuchsia-500/40 
  hover:to-blue-500/40
  active:scale-[0.98]
  before:absolute
  before:inset-0
  before:bg-gradient-to-r
  before:from-transparent
  before:via-white/20
  before:to-transparent
  before:translate-x-[-200%]
  before:hover:translate-x-[200%]
  before:transition-transform
  before:duration-700
  before:ease-in-out
  after:absolute
  after:inset-0
  after:opacity-0
  after:hover:opacity-100
  after:transition-opacity
  after:duration-300
  after:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
  after:from-violet-400/10
  after:via-fuchsia-400/10
  after:to-blue-400/10
  animate-random-color
`;
