import { Dispatch } from 'redux';
import { auth, firestore, facebookAuthProvider } from '../services/firebaseService';
import {
  setUserSuccess,
  setUserFailure,
  toggleAuthenticating,
  toggleSaving,
} from './actionCreators';
import { BudgeUser, BudgeAvatar } from '../budge-app-env';
import { DocumentSnapshot } from '@firebase/firestore-types';

type VoidFunction = () => void;
let unobserveAuthStateChanged: VoidFunction | null = null;

type UserDocumentSnapshot = DocumentSnapshot & {
  displayName: string;
  avatar: BudgeAvatar;
};

export function observeAuthState() {
  return (dispatch: Dispatch) => {
    // if there is already an unObserve function, then we're already subscribed
    if (!unobserveAuthStateChanged) {
      // auth.onAuthStateChanged returns the unsubscribe function
      unobserveAuthStateChanged = auth.onAuthStateChanged(async user => {
        if (user) {
          const budgeUser = await (firestore.doc(`users/${user.uid}`).get() as Promise<
            UserDocumentSnapshot
          >);

          dispatch(
            setUserSuccess({
              id: user.uid,
              fbDisplayName: user.displayName === null ? 'New User' : user.displayName,
              isNew: !budgeUser.exists,
              displayName: budgeUser.exists ? budgeUser.displayName : user.displayName, // default to fb display name
              avatar: budgeUser.exists ? budgeUser.avatar : null,
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

export function saveUser(user: BudgeUser) {
  return async (dispatch: Dispatch) => {
    dispatch(toggleSaving(true));

    await firestore.doc(`users/${user.id}`).update(user);

    dispatch(toggleSaving(false));
  };
}
