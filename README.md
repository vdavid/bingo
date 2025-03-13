# Bingo game and generator

A bingo game and sheet generator built with Next.js and React.
Features include playable bingo games, printable bingo sheets, wedding cards, and game simulations.

I made this for my wedding. It was a fun game. The design is sh*t but I only had about an hour for this,
plus it was projected in a bright room so it was hard to see the details anyway.

## Features

- **Interactive bingo game**: Play bingo with animated number calling
- **Bingo sheet generator**: Create customized bingo sheets for multiple players
- **Wedding cards**: Generate food/info cards with dietary information
- **Game simulation**: Run statistical analyses of bingo games

## Getting started

### Prerequisites

- Node.js (version 22+)
- pnpm (version 10+)

## Development and deployment

This project is set up for easy deployment with Netlify:

1. `pnpm install` - Install dependencies (if not already installed)
2. `pnpm lint` - Lint code
3. `pnpm test` - Run tests
4. `pnpm dev` - Start the development server and verify everything works
5. `pnpm build && pnpm start` - Build and start the production server
6. Push changes to a GitHub repository. Netlify will auto-update.

If you add new features, please also add appropriate tests in the `__tests__` directory.

## Technical details

- Built with Next.js and React
- TypeScript for type safety
- SCSS modules for styling
- Custom seedable random number generator for consistent results