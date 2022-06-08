import React from 'react'
import { FaUser } from 'react-icons/fa'

export default function AddClientModel() {
  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddClientModal">
        <div className="d-flex align-items-center">
          <FaUser className="icon"/>
          <div>Add Client</div>
        </div>
      </button>
      <div className="modal fade" id="AddClientModal" tabIndex="-1" aria-labelledby="AddClientModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddClientModalLabel">Modal title</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
