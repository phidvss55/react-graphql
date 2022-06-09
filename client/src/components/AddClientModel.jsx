import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { GET_CLIENTS } from '../queries/clientQueries'
import { ADD_CLIENT } from '../mutations/clientMutations'

export default function AddClientModel() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [error, setError] = React.useState('')

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS })
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] }
      })
    }
  })

  const onSubmit = (e) => {
    e.preventDefault();

    if (name && email && phone) {
      setError('')
      addClient(name, email, phone)

      setName('')
      setEmail('')
      setPhone('')
      return;
    }

     setError('Please fill in all fields')
  }

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
              {error ? (<div className="alert alert-danger" role="alert">{error}</div>) : null}
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Name</label>
                  <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Email</label>
                  <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Phone</label>
                  <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="float-right">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary mx-3">Save changes</button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
