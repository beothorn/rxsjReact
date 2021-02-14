import { render, screen } from '@testing-library/react'
import LikedCounter from './LikedCounter'

test('renders LikedCounter happy day', () => {
  render(<LikedCounter count="42"/>)
  expect(screen.getByText("42 liked tweet")).toBeInTheDocument()
  render(<LikedCounter count="43"/>)
  expect(screen.getByText("43 liked tweet")).toBeInTheDocument()
});
