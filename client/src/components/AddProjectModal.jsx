import React from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import { GET_CLIENTS } from '../queries/clientQueries'
import { ADD_PROJECT } from '../mutations/projectMutation'

export default function AddProjectModal() {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [clientId, setClientId] = React.useState('')
  const [status, setStatus] = React.useState('NEW')
  const [errorMsg, setErrorMsg] = React.useState('')

  const { loading, data } = useQuery(GET_CLIENTS)

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS })
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] }
      })
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name && description && status) {
      setErrorMsg('')
      addProject(name, description, status, clientId)

      setName('')
      setDescription('')
      setStatus('NEW')
      setClientId('');
      return;
    }

    setErrorMsg('Please fill in all fields')
  }

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddProjectModal">
        <div className="d-flex align-items-center">
          <FaList className="icon"/>
          <div>Add Project</div>
        </div>
      </button>
      <div className="modal fade" id="AddProjectModal" tabIndex="-1" aria-labelledby="AddProjectModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddProjectModalLabel">Modal title</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {errorMsg ? (<div className="alert alert-danger" role="alert">{errorMsg}</div>) : null}
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Name</label>
                  <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Description</label>
                  <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Status</label>
                  <select className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="NEW">New</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label">Client</label>
                  <select className="form-control" id="clientId" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                      <option disabled value="">Select Client</option>
                    {loading ? (<option>Loading...</option>) : data.clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
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
