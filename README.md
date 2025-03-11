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

#### Local production build

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

#### Netlify deployment

This project is set up for easy deployment with Netlify:

1. Push your changes to a GitHub repository
2. Connect your repository to Netlify
3. Netlify will automatically detect the Next.js configuration
4. The site will be built and deployed with each push to the main branch

##### Manual deployment

You can also deploy manually using the Netlify CLI:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize a new Netlify site (first time only)
netlify init

# Deploy to Netlify
netlify deploy --prod
```

##### Testing before deployment

Run these commands to verify everything works before deploying:

```bash
# Install dependencies (if not already installed)
pnpm install

# Run tests
pnpm test

# Lint code
pnpm lint

# Build for production
pnpm build
```

The test suite includes:
- Basic verification that the app renders correctly
- Simple tests for core functionality

To run tests:
```bash
pnpm test
```

If you add new features, please also add appropriate tests in the `__tests__` directory.

## Technical details

- Built with Next.js and React
- TypeScript for type safety
- SCSS modules for styling
- Custom seedable random number generator for consistent results