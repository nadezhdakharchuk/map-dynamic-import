import { UPDATE_USER_PROFILE, SET_IS_SIGNED_IN, SIGN_UP_IS_SHOWN } from 'models/actionTypes';
import mockProfile from '__mocks__/mockData/mockProfile';
import config from 'config/localStorageKeys';

describe('AuthorizationProvider', () => {
  let mockDispatch;
  let mockGetItem;
  let mockSetItem;
  let currentProfile;
  let AuthorizationProvider;

  beforeEach(() => {
    jest.resetModules();
    mockDispatch = jest.fn();
    mockGetItem = jest.fn((key, callback) => {
      if (config.currentUserKey === key) {
        callback(null, currentProfile);
      }
    });

    mockSetItem = jest.fn(() => {});

    jest.mock('localforage', () => ({
      getItem: mockGetItem,
      setItem: mockSetItem,
    }));

    AuthorizationProvider = require('./AuthorizationProvider');
  });

  describe('Get user', () => {
    it('should set current profile from storage', async () => {
      // Arrange
      currentProfile = mockProfile;

      const expectedUpdateProfileAction = {
        type: UPDATE_USER_PROFILE,
        payload: currentProfile,
      };

      const expectedSetIsSignedInAction = {
        type: SET_IS_SIGNED_IN,
        payload: true,
      };

      // Act
      await AuthorizationProvider.getUser(mockDispatch);

      // Assert
      expect(mockGetItem.mock.calls[0][0]).toBe(config.currentUserKey);
      expect(mockDispatch).toHaveBeenCalledWith(expectedUpdateProfileAction);
      expect(mockDispatch).toHaveBeenCalledWith(expectedSetIsSignedInAction);
    });

    it('should set isSignedIn to false if storage is empty', async () => {
      // Arrange
      currentProfile = null;

      const expectedSetIsSignedInAction = {
        type: SET_IS_SIGNED_IN,
        payload: false,
      };

      // Act
      await AuthorizationProvider.getUser(mockDispatch);

      // Assert
      expect(mockGetItem.mock.calls[0][0]).toBe(config.currentUserKey);
      expect(mockDispatch).toHaveBeenCalledWith(expectedSetIsSignedInAction);
    });
  });

  describe('conditionMethod', () => {
    it('should return second parameter if condition true', () => {
      // Arrange
      const expectedCondition = 2 < 4;
      const expectedTrueValue = 'true';
      const expectedFalseValue = 'false';

      // Act
      const actualResult = AuthorizationProvider.conditionMethod(
        expectedCondition,
        expectedTrueValue,
        expectedFalseValue,
      );

      // Assert
      expect(actualResult).toBe(expectedTrueValue);
    });

    it('should return third parameter if condition false', () => {
      // Arrange
      const expectedCondition = 2 > 4;
      const expectedTrueValue = 'true';
      const expectedFalseValue = 'false';

      // Act
      const actualResult = AuthorizationProvider.conditionMethod(
        expectedCondition,
        expectedTrueValue,
        expectedFalseValue,
      );

      // Assert
      expect(actualResult).toBe(expectedFalseValue);
    });
  });

  describe('setUserData', () => {
    it('should set user data after sign in success', async () => {
      // Arrange
      const expectedResponseResult = {
        data: {
          profile: mockProfile,
        },
      };
      const closeLoginSection = jest.fn();

      const expectedUpdateUserAction = { type: UPDATE_USER_PROFILE, payload: mockProfile };
      const expectedSetIsSignedInAction = { type: SET_IS_SIGNED_IN, payload: true };

      // Act
      await AuthorizationProvider.setUserData(mockDispatch, expectedResponseResult, closeLoginSection);

      // Assert
      expect(mockDispatch).toHaveBeenCalledWith(expectedUpdateUserAction);
      expect(mockDispatch).toHaveBeenCalledWith(expectedSetIsSignedInAction);
      expect(mockSetItem.mock.calls[0][0]).toBe(config.currentUserKey);
    });

    it('should set user data after sign up success', async () => {
      // Arrange
      const expectedResponseResult = {
        data: {
          profile: mockProfile,
        },
      };
      const expectedIsSignUp = true;
      const closeLoginSection = jest.fn();
      const clearTextFields = jest.fn();
      const expectedLoginType = 'phone';
      const expectedSignUpIsShownAction = { type: SIGN_UP_IS_SHOWN, payload: false };

      const expectedUpdateUserAction = { type: UPDATE_USER_PROFILE, payload: mockProfile };
      const expectedSetIsSignedInAction = { type: SET_IS_SIGNED_IN, payload: true };

      // Act
      await AuthorizationProvider.setUserData(
        mockDispatch,
        expectedResponseResult,
        closeLoginSection,
        expectedIsSignUp,
        clearTextFields,
        expectedLoginType,
      );

      // Assert
      expect(mockDispatch).toHaveBeenCalledWith(expectedUpdateUserAction);
      expect(mockDispatch).toHaveBeenCalledWith(expectedSetIsSignedInAction);
      expect(mockDispatch).toHaveBeenCalledWith(expectedSignUpIsShownAction);
      expect(mockSetItem.mock.calls[1][0]).toBe(config.currentUserKey);
      expect(mockSetItem.mock.calls[0][0]).toBe(config.currentUserLoginInfoKey);
      expect(mockSetItem.mock.calls[0][1]).toBe(expectedLoginType);
    });
  });
});
