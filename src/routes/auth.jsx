import React from 'react';
import LogSign from '../component/Authentication/log_sign';

const Auth = (props) => {
  return (
    <div>
      {/* Authentication {props.pgnum} */}
      <LogSign pgnum={props.pgnum }/>
    </div>
  );
}

export default Auth;
