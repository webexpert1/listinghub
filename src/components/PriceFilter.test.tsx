import { render, screen, fireEvent } from '@testing-library/react';
import PriceFilter from '../components/PriceFilter';

describe('PriceFilter', () => {
  const mockOnApplyFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the PriceFilter component with inputs and buttons', () => {
    render(<PriceFilter onApplyFilter={mockOnApplyFilter} />);

    expect(screen.getByLabelText('Min Price (NGN)')).toBeInTheDocument();
    expect(screen.getByLabelText('Max Price (NGN)')).toBeInTheDocument();
    expect(screen.getByText('Apply')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('updates the minimum price input value', () => {
    render(<PriceFilter onApplyFilter={mockOnApplyFilter} />);

    const minPriceInput = screen.getByLabelText('Min Price (NGN)');
    fireEvent.change(minPriceInput, { target: { value: '100' } });

    expect(minPriceInput).toHaveValue(100);
  });

  it('updates the maximum price input value', () => {
    render(<PriceFilter onApplyFilter={mockOnApplyFilter} />);

    const maxPriceInput = screen.getByLabelText('Max Price (NGN)');
    fireEvent.change(maxPriceInput, { target: { value: '500' } });

    expect(maxPriceInput).toHaveValue(500);
  });

  it('calls onApplyFilter with correct values when Apply button is clicked', () => {
    render(<PriceFilter onApplyFilter={mockOnApplyFilter} />);

    const minPriceInput = screen.getByLabelText('Min Price (NGN)');
    const maxPriceInput = screen.getByLabelText('Max Price (NGN)');
    const applyButton = screen.getByText('Apply');

    fireEvent.change(minPriceInput, { target: { value: '100' } });
    fireEvent.change(maxPriceInput, { target: { value: '500' } });
    fireEvent.click(applyButton);

    expect(mockOnApplyFilter).toHaveBeenCalledWith(100, 500);
  });

  it('calls onApplyFilter with undefined values when Clear button is clicked', () => {
    render(<PriceFilter onApplyFilter={mockOnApplyFilter} />);

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    expect(mockOnApplyFilter).toHaveBeenCalledWith(undefined, undefined);
  });

  it('resets input values when Clear button is clicked', () => {
    render(<PriceFilter onApplyFilter={mockOnApplyFilter} />);

    const minPriceInput = screen.getByLabelText('Min Price (NGN)');
    const maxPriceInput = screen.getByLabelText('Max Price (NGN)');
    const clearButton = screen.getByText('Clear');

    fireEvent.change(minPriceInput, { target: { value: '100' } });
    fireEvent.change(maxPriceInput, { target: { value: '500' } });
    fireEvent.click(clearButton);

    expect(minPriceInput).toHaveValue(null);
    expect(maxPriceInput).toHaveValue(null);
  });
}); 