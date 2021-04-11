import "./App.css";
import FirebaseApp from "./Firebase";
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import React from "react";

enum UserStatus {
  Loading,
  LoggedIn,
  NotLoggedIn,
}

class AuthContainer extends React.Component<{}, { userStatus: UserStatus }> {
  constructor(props: any) {
    super(props);
    this.state = { userStatus: UserStatus.Loading };
    this.loggedIn = this.loggedIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      let newStatus;
      if (user) {
        newStatus = UserStatus.LoggedIn;
      } else {
        newStatus = UserStatus.NotLoggedIn;
      }

      this.setState({
        userStatus: newStatus,
      });
    });
  }

  loggedIn(): boolean {
    this.setState({
      userStatus: UserStatus.LoggedIn,
    });
    return false;
  }

  logOut(): boolean {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          userStatus: UserStatus.NotLoggedIn,
        });
      })
      .catch((error) => {
        // TODO(aryann): Implement an error boundary.
        console.log(error);
      });
    return false;
  }

  render() {
    let body;
    switch (this.state.userStatus) {
      case UserStatus.Loading:
        body = <p>Loading...</p>;
        break;
      case UserStatus.LoggedIn:
        body = (
          <p>
            You are logged in. <button onClick={this.logOut}>Sign out</button>.
          </p>
        );
        break;
      case UserStatus.NotLoggedIn:
        body = <LogIn loggedIn={this.loggedIn} />;
        break;
    }

    return (
      <div>
        <header>
          <h1>Yet Another To-Do App</h1>
        </header>
        {body}
      </div>
    );
  }
}

class LogIn extends React.Component<{ loggedIn: () => boolean }, {}> {
  componentDidMount() {
    let ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(FirebaseApp.auth());

    ui.start("#login-choices", {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],

      callbacks: {
        signInSuccessWithAuthResult: this.props.loggedIn,
      },
    });
  }

  render() {
    return <div id="login-choices"></div>;
  }
}

function App() {
  return <AuthContainer />;
}

export default App;
