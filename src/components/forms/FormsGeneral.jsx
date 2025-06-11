import React from 'react';

const FormsGeneral = () => (
  <div className="row">
    <div className="col-md-8">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">General Form</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">Email address</label>
              <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
            </div>
            <div className="mb-3">
              <label htmlFor="selectExample" className="form-label">Example select</label>
              <select className="form-select" id="selectExample">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="textareaExample" className="form-label">Example textarea</label>
              <textarea className="form-control" id="textareaExample" rows="3"></textarea>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="check1" />
              <label className="form-check-label" htmlFor="check1">Check me out</label>
            </div>
            <div className="mb-3">
              <label className="form-label">Radio options</label>
              <div>
                <input type="radio" className="form-check-input me-1" name="radioOptions" id="radio1" />
                <label className="form-check-label me-3" htmlFor="radio1">Option 1</label>
                <input type="radio" className="form-check-input me-1" name="radioOptions" id="radio2" />
                <label className="form-check-label" htmlFor="radio2">Option 2</label>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Default file input example</label>
              <input className="form-control" type="file" id="formFile" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default FormsGeneral; 