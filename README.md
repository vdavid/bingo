# Bingo game and generator

A bingo game and sheet generator built with Next.js and React.
Features include playable bingo games, printable bingo sheets, wedding cards, and game simulations.

## Features

- **Interactive Bingo game**: Play bingo with animated number calling
- **Bingo sheet generator**: Create customized bingo sheets for multiple players
- **Wedding cards**: Generate food/info cards with dietary information
- **Game simulation**: Run statistical analyses of bingo games

## Getting started

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

### Production deployment

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## Available routes

The application provides the following routes:

| Route | Description |
|-------|-------------|
| `/` | Interactive bingo game with animated spotlight that searches for numbers. Click anywhere or press spacebar to call the next number. |
| `/generator` | Create and print customized bingo sheets for multiple players. Generates sheets with a wedding theme. |
| `/little-wedding-cards` | Generate food/info cards with dietary information (milk-free, gluten-free, sugar-free) for events. |
| `/simulation` | Run statistical analyses of bingo games to see metrics like win rates, distribution, and patterns. |

All routes are static and should work out of the box after running the development or production server.

## Technical details

- Built with Next.js and React
- TypeScript for type safety
- SCSS modules for styling
- Custom seedable random number generator for consistent results