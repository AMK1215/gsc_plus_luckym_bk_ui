import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="float-end d-none d-sm-inline">Anything you want</div>
      <strong>
        Copyright &copy; 2014-{new Date().getFullYear()}&nbsp;
        <a href="https://adminlte.io" className="text-decoration-none">AdminLTE.io</a>.
      </strong>
      All rights reserved.
    </footer>
  );
};

export default Footer; 