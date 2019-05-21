import React, { Component } from "react";
import { render } from "react-dom";

import PasswordGate from "../../src";

class Demo extends Component {
  render() {
    return (
      <PasswordGate
        accessList={[
          "test:$2a$10$A/1QDqi8DeNBeavrPXKSUOoNWDd75Qp0CwxoRGVZ3/nJQeT1vs9kO"
        ]}
      >
        <div>Your password protected app here</div>
      </PasswordGate>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
