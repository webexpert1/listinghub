import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '../components/CategoryFilter';

describe('CategoryFilter', () => {
  const mockOnSelectCategory = jest.fn();
  const categories = ['Electronics', 'Books', 'Clothing'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the CategoryFilter component with all categories', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="all"
        onSelectCategory={mockOnSelectCategory}
      />
    );

    expect(screen.getByText('Filter by Category')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('highlights the "All" button when "all" is the selected category', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="all"
        onSelectCategory={mockOnSelectCategory}
      />
    );

    const allButton = screen.getByText('All');
    expect(allButton).toHaveClass('bg-blue-600 text-white shadow-md');
  });

  it('highlights the correct category button when a category is selected', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="Books"
        onSelectCategory={mockOnSelectCategory}
      />
    );

    const booksButton = screen.getByText('Books');
    expect(booksButton).toHaveClass('bg-blue-600 text-white shadow-md');
  });

  it('calls onSelectCategory with "all" when the "All" button is clicked', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="Books"
        onSelectCategory={mockOnSelectCategory}
      />
    );

    const allButton = screen.getByText('All');
    fireEvent.click(allButton);

    expect(mockOnSelectCategory).toHaveBeenCalledWith('all');
  });

  it('calls onSelectCategory with the correct category when a category button is clicked', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="all"
        onSelectCategory={mockOnSelectCategory}
      />
    );

    const electronicsButton = screen.getByText('Electronics');
    fireEvent.click(electronicsButton);

    expect(mockOnSelectCategory).toHaveBeenCalledWith('Electronics');
  });
});