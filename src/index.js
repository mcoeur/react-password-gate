import React, { useState } from "react";
import { hashSync, compareSync } from "bcryptjs";

class PasswordGate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessGranted: false
    };
  }
  render() {
    const { accessList, children } = this.props;
    const { accessGranted } = this.state;
    let alreadyHasAccess = false;

    const storedCredentials = localStorage.getItem("credentials");
    if (storedCredentials) {
      const { username, password } = JSON.parse(storedCredentials);
      alreadyHasAccess = hasAccess(username, password, accessList);
    }

    if (!alreadyHasAccess && !accessGranted) {
      return (
        <AuthenticationForm
          accessList={accessList}
          onSuccess={credentials => {
            localStorage.setItem("credentials", JSON.stringify(credentials));
            this.setState({ accessGranted: true });
          }}
        />
      );
    }
    return children;
  }
}

function hasAccess(username, password, accessList) {
  for (let i = 0; i < accessList.length; i++) {
    const [credentialUsername, credentialPassword] = accessList[i].split(":");
    if (
      credentialUsername === username &&
      compareSync(password, credentialPassword)
    ) {
      return true;
    }
  }
  return false;
}

class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { accessList, onSuccess } = this.props;
    if (hasAccess(username, password, accessList)) {
      onSuccess({ username, password });
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Authentication needed</h1>
        <form style={styles.form} action="" onSubmit={this.onSubmit}>
          <label style={styles.label} htmlFor="username">
            username :
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <br />
          <label style={styles.label} htmlFor="password">
            password :
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <br />
          <button style={styles.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const styles = {
  title: {
    fontSize: 18
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    textAlign: "center"
  },
  label: {
    display: "inline-block",
    textAlign: "right",
    padding: "5px 10px"
  },
  button: {
    margin: "20px 0"
  }
};

function generateHash(username, password) {
  return hashSync(password, 10);
}

export default PasswordGate;
export { generateHash };
