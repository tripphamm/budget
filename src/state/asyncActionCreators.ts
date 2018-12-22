import { Dispatch } from 'redux';
import { auth, firestore, facebookAuthProvider } from '../services/firebaseService';
import {
  setUserSuccess,
  setUserFailure,
  saveUserSuccess,
  saveUserFailure,
  toggleAuthenticating,
  toggleSaving,
} from './actionCreators';
import { UserDocument, BudgeState } from '../budge-app-env';

type VoidFunction = () => void;
let unobserveAuthStateChanged: VoidFunction | null = null;

export function observeAuthState() {
  return (dispatch: Dispatch) => {
    // if there is already an unObserve function, then we're already subscribed
    if (!unobserveAuthStateChanged) {
      // auth.onAuthStateChanged returns the unsubscribe function
      unobserveAuthStateChanged = auth.onAuthStateChanged(async firebaseUser => {
        if (firebaseUser) {
          const userDocumentSnapshot = await firestore.doc(`users/${firebaseUser.uid}`).get();

          const userDocument = userDocumentSnapshot.exists
            ? (userDocumentSnapshot.data() as UserDocument)
            : null;

          dispatch(
            setUserSuccess({
              id: firebaseUser.uid,
              persistedDisplayName: userDocument ? userDocument.displayName : null,
              persistedAvatar: userDocument ? userDocument.avatar : null,
              persistedTheme: userDocument ? userDocument.theme : null,

              // default to firebase display name
              displayName: userDocument ? userDocument.displayName : firebaseUser.displayName,
              avatar: userDocument ? userDocument.avatar : null,
              theme: userDocument ? userDocument.theme : null,
            }),
          );
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

export function saveUser() {
  return async (dispatch: Dispatch, getState: () => BudgeState) => {
    dispatch(toggleSaving(true));

    try {
      const stateSnapshot = getState();
      const { user } = stateSnapshot;

      if (user === null) {
        throw new Error('null `user` may not be saved');
      }

      const userDocument = {
        displayName: user.displayName,
        avatar: user.avatar,
        theme: user.theme,
      };

      await firestore.doc(`users/${user.id}`).set(userDocument);

      dispatch(saveUserSuccess(userDocument));
    } catch (error) {
      dispatch(saveUserFailure(error));
    }

    dispatch(toggleSaving(false));
  };
}
