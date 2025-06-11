import React from 'react';

const UIElements = () => (
  <div className="row">
    <div className="col-md-6">
      <div className="card mb-4">
        <div className="card-header"><h3 className="card-title">Alerts</h3></div>
        <div className="card-body">
          <div className="alert alert-success" role="alert">A simple success alert—check it out!</div>
          <div className="alert alert-danger" role="alert">A simple danger alert—check it out!</div>
          <div className="alert alert-warning" role="alert">A simple warning alert—check it out!</div>
          <div className="alert alert-info" role="alert">A simple info alert—check it out!</div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header"><h3 className="card-title">Badges</h3></div>
        <div className="card-body">
          <h5>Example heading <span className="badge bg-secondary">New</span></h5>
          <button type="button" className="btn btn-primary">
            Notifications <span className="badge bg-light text-dark">4</span>
          </button>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header"><h3 className="card-title">Progress Bars</h3></div>
        <div className="card-body">
          <div className="progress mb-2">
            <div className="progress-bar" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
          </div>
          <div className="progress mb-2">
            <div className="progress-bar bg-success" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>
          </div>
          <div className="progress mb-2">
            <div className="progress-bar bg-info" role="progressbar" style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
          </div>
          <div className="progress mb-2">
            <div className="progress-bar bg-danger" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">100%</div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="card mb-4">
        <div className="card-header"><h3 className="card-title">Buttons</h3></div>
        <div className="card-body">
          <button type="button" className="btn btn-primary me-2">Primary</button>
          <button type="button" className="btn btn-secondary me-2">Secondary</button>
          <button type="button" className="btn btn-success me-2">Success</button>
          <button type="button" className="btn btn-danger me-2">Danger</button>
          <button type="button" className="btn btn-warning me-2">Warning</button>
          <button type="button" className="btn btn-info me-2">Info</button>
          <button type="button" className="btn btn-light me-2">Light</button>
          <button type="button" className="btn btn-dark">Dark</button>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header"><h3 className="card-title">Callout</h3></div>
        <div className="card-body">
          <div className="callout callout-info">
            <h5>Info Callout!</h5>
            <p>This is an info callout styled with AdminLTE.</p>
          </div>
          <div className="callout callout-warning">
            <h5>Warning Callout!</h5>
            <p>This is a warning callout styled with AdminLTE.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UIElements; 