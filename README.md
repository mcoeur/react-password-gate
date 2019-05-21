# react-password-gate

[![npm package][npm-badge]][npm]

react-password-gate is a quick and dirty solution to add _basic-auth like_ password protection to your react project.

## Installation

```bash
npm install react-password-gate
```

## Usage

Update your main render to wrap your app with the `PasswordGate` component :

```javascript
import PasswordGate from "react-password-gate";

const accessList = [
  "test:$2a$10$A/1QDqi8DeNBeavrPXKSUOoNWDd75Qp0CwxoRGVZ3/nJQeT1vs9kO",
  "user1:$2a$10$xF9XbrsoNhT8m37Y6DkwteçkgHlpT6m6zbY5e9yNg1fzPicqVn1ntG"
];

ReactDOM.render(
  <PasswordGate accessList={accessList}>
    <App />
  </PasswordGate>,
  document.getElementById("root")
);
```

`accessList` is a `.htpasswd` syntax compliant array of credentials.  
Each line follows this syntax : `{username}:{bcryptPasswordHash}`

When not authenticated, it renders the following form :

!["Screenshot"](https://github.com/mcoeur/react-password-gate/blob/master/screenshot.png?raw=true "Screenshot")

## The Good :thumbsup:

**Super easy to use**  
No need to get access to the web server to enable basic authentication.  
No database needed

## The Bad :thumbsdown:

**Security level : meh/10.**  
All password hash are public and your credentials will be stored **in cleartext** on local storage.

## Todo

- Handle bad credentials
- Pass a custom form component as props

[npm-badge]: https://img.shields.io/npm/v/react-password-gate.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-password-gate
