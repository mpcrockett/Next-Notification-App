import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NotificationForm from './notificationForm.tsx';
import useProviders from '../../utils/hooks/useProviders';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

jest.mock('../../utils/hooks/useProviders', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('NotificationForm', () => {
  const mockProviders = [
    { id: 1, name: 'Therapist One' },
    { id: 2, name: 'Therapist Two' },
  ];

  beforeEach(() => {
    (useProviders).mockReturnValue(mockProviders);
    jest.clearAllMocks();
  });

  it('renders the form with all fields', () => {
    render(<NotificationForm />);
    expect(screen.getByText('Appointment Time')).toBeInTheDocument();
    expect(screen.getByText('Therapist')).toBeInTheDocument();
    expect(screen.getByText('Select a Room')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('allows user interaction and submits the form', async () => {
    render(<NotificationForm />);

    const [apptTimeSelect, therapistSelect] = screen.getAllByRole('combobox');

    fireEvent.change(apptTimeSelect, { target: { value: '09:15' } });

    fireEvent.change(therapistSelect, { target: { value: '1' } });

    fireEvent.click(screen.getByLabelText('1'));

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/notifications/notification',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String),
        })
      );
    });
  });

  it('shows submitting state and resets the form after submit', async () => {
    render(<NotificationForm />);

    const [apptTimeSelect, therapistSelect] = screen.getAllByRole('combobox');

    fireEvent.change(apptTimeSelect, { target: { value: '07:00' } });
    fireEvent.change(therapistSelect, { target: { value: '2' } });

    fireEvent.click(screen.getByLabelText('2'));

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Submitting...');

    await waitFor(() => expect(submitButton).toHaveTextContent('Submit'));
  });
});