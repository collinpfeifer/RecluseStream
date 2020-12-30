import React, { useEffect, useRef } from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

const GoogleAuth = ({signIn, signOut, isSignedIn}) => {
  const auth = useRef(null);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '770056473330-mbuqtlpne2orqa11ap89e5k85pcikane.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
            auth.current = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.current.isSignedIn.get());
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    if(isSignedIn) signIn(auth.current.currentUser.get().getId())
    else signOut()
  }

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button onClick={() => auth.current.signOut()} className='ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={() => auth.current.signIn()} className='ui red google button'>
          <i className='google icon' />
          Sign In with Google
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
