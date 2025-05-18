import React from 'react'
import './custom.css'; //

const Js1 = ({cred ,cred2,cred3}) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Link</a>
        </li>
       
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>


<div className="buttons">
    <div className="btn-group  position-absolute" role="group" aria-label="Basic mixed styles example">
    <button type="button" className="btn btn-danger mx-2 rounded-3" onClick={cred}>Red</button>
      <button type="button" className="btn btn-warning mx-2 rounded-3" onClick={cred3}>Yellow</button>
      <button type="button" className="btn btn-success mx-2 rounded-3" onClick={cred2}>Green</button>
    </div>
  </div>

    </div>



  )
}

export default Js1
