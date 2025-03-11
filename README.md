# Bingo Game and Generator

A bingo game and sheet generator built with Next.js and React.
Features include playable bingo games, printable bingo sheets, wedding cards, and game simulations.

## Features

- **Interactive Bingo game**: Play bingo with animated number calling
- **Bingo sheet generator**: Create customized bingo sheets for multiple players
- **Wedding cards**: Generate food/info cards with dietary information
- **Game simulation**: Run statistical analyses of bingo games

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (version 8 or higher) - **Required**: This project uses pnpm exclusively

### Installation

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Production Deployment

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## Available URLs

- **Home** (`/`): Interactive bingo game with animated number calling
- **Generator** (`/generator`): Create printable bingo sheets for multiple players
- **Little Wedding Cards** (`/little-wedding-cards`): Generate food cards with dietary information
- **Simulation** (`/simulation`): Run statistical analyses of bingo games

## Technical details

- Built with Next.js and React
- TypeScript for type safety
- SCSS modules for styling
- Custom seedable random number generator for consistent results