import { Dispatch } from 'redux';
import { auth, firestore, facebookAuthProvider } from '../../services/firebaseService';
import { setUserSuccess, setUserFailure, saveUserSuccess, saveUserFailure } from './actionCreators';
import { toggleAuthenticating, toggleSaving } from '../shared/actionCreators';
import { UserDocument } from '../../budge-app-env';
import { BudgeState } from '../rootState';

type VoidFunction = () => void;
let unobserveAuthStateChanged: VoidFunction | null = null;

export function observeAuthState() {
  return (dispatch: Dispatch) => {
    // if there is already an unObserve function, then we're already subscribed
    if (!unobserveAuthStateChanged) {
      // auth.onAuthStateChanged returns the unsubscribe function
      unobserveAuthStateChanged = auth.onAuthStateChanged(async firebaseUser => {
        if (firebaseUser) {
          try {
            const userDocumentSnapshot = await firestore.doc(`users/${firebaseUser.uid}`).get();

            const userDocument = userDocumentSnapshot.exists
              ? (userDocumentSnapshot.data() as UserDocument)
              : null;

            dispatch(
              setUserSuccess({
                id: firebaseUser.uid,
                persistedDisplayName: userDocument ? userDocument.displayName || null : null,
                persistedAvatar: userDocument ? userDocument.avatar || null : null,
                persistedTheme: userDocument ? userDocument.theme || null : null,
                persistedBudget: userDocument ? userDocument.budget || null : null,

                // default to firebase display name
                displayName: userDocument ? userDocument.displayName : firebaseUser.displayName,
                avatar: userDocument ? userDocument.avatar || null : null,
                theme: userDocument ? userDocument.theme || null : null,
                budget: userDocument ? userDocument.budget || null : null,
              }),
            );
          } catch (error) {
            dispatch(setUserFailure(error));
          }
        } else {
          dispatch(setUserSuccess(null));
        }

        dispatch(toggleAuthenticating(false));
      });
    }
  };
}

export function unobserveAuthState() {
  return () => {
    if (unobserveAuthStateChanged !== null) {
      unobserveAuthStateChanged();
      unobserveAuthStateChanged = null;
    }
  };
}

export function logInUserViaFacebook() {
  return async (dispatch: Dispatch) => {
    dispatch(toggleAuthenticating(true));

    try {
      await auth.signInWithPopup(facebookAuthProvider);
      // should trigger onAuthStateChanged in observeAuthState which will toggleAuthenticating(false)
    } catch (error) {
      dispatch(setUserFailure(error));
    }
  };
}

export function logOutUser() {
  return async (dispatch: Dispatch) => {
    dispatch(toggleAuthenticating(true));

    await auth.signOut();
    // should trigger onAuthStateChanged in observeAuthState which will toggleAuthenticating(false)
  };
}

export function saveUser(onSaveComplete?: () => void) {
  return async (dispatch: Dispatch, getState: () => BudgeState) => {
    dispatch(toggleSaving(true));

    try {
      const stateSnapshot = getState();
      const { userState } = stateSnapshot;
      const { user } = userState;

      if (user === null) {
        throw new Error('null `user` may not be saved');
      }

      const userDocument = {
        displayName: user.displayName,
        avatar: user.avatar,
        theme: user.theme,
        budget: user.budget,
      };

      await firestore.doc(`users/${user.id}`).set(userDocument);

      if (typeof onSaveComplete === 'function') {
        onSaveComplete();
      }

      dispatch(saveUserSuccess(userDocument));
    } catch (error) {
      dispatch(saveUserFailure(error));
    }

    dispatch(toggleSaving(false));
  };
}
