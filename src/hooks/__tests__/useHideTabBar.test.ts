import { renderHook } from '@testing-library/react';
import { useHideTabBar } from '../useHideTabBar';
import { useNavigation } from '@react-navigation/native';

// Mock the navigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('useHideTabBar', () => {
  const mockSetOptions = jest.fn();
  const mockGetParent = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock implementation
    mockGetParent.mockReturnValue({
      setOptions: mockSetOptions,
    });
    
    (useNavigation as jest.Mock).mockReturnValue({
      getParent: mockGetParent,
    });
  });

  it('should hide tab bar when mounted', () => {
    renderHook(() => useHideTabBar());

    expect(mockGetParent).toHaveBeenCalled();
    expect(mockSetOptions).toHaveBeenCalledWith({
      tabBarStyle: { display: 'none' },
    });
  });

  it('should restore tab bar when unmounted', () => {
    const { unmount } = renderHook(() => useHideTabBar());
    
    unmount();

    expect(mockSetOptions).toHaveBeenCalledWith({
      tabBarStyle: expect.any(Object),
    });
  });

  it('should not call setOptions if parent navigation is not available', () => {
    mockGetParent.mockReturnValue(null);
    
    renderHook(() => useHideTabBar());

    expect(mockGetParent).toHaveBeenCalled();
    expect(mockSetOptions).not.toHaveBeenCalled();
  });
}); 