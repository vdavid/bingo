import React from 'react'
import { render, screen } from '@testing-library/react'
const HomePage = require('../../pages/index').default;
require('@testing-library/jest-dom');

// Mock Next.js components
jest.mock('next/link', () => {
  const React = require('react');
  return ({ children, href }: { children: React.ReactNode, href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock next/head to make the title test work
jest.mock('next/head', () => {
  const React = require('react');
  return ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };
});

// Mock the SCSS module
jest.mock('../../modules/bingo/index.module.scss', () => ({
  links: 'links-mock',
  linkCard: 'link-card-mock',
}));

describe('Home Page', () => {
  it('renders without throwing a 404 error', () => {
    render(<HomePage />);
    
    // Check if page title is present
    expect(screen.getByText('Bingo games and utilities')).toBeInTheDocument();
    
    // Check if main content text is present
    expect(screen.getByText(/Welcome to the bingo application/i)).toBeInTheDocument();
  });
});