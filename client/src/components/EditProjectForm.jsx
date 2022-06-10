import React from 'react'
import { useMutation } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import { UPDATE_PROJECT } from '../mutations/projectMutation'

export default function EditProjectForm({ project }) {
  const [name, setName] = React.useState(project.name)
  const [description, setDescription] = React.useState(project.description)
  const [status, setStatus] = React.useState('')

  if (project.status) {
    let status = project.status.toUpperCase().replace(' ', '_')
    setStatus(status)
  }

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
  })

  const onSubmit = (e) => {
    e.preventDefault()

    if (name && description && status) {
      updateProject(name, description, status)
      
      setName('')
      setDescription('')
      setStatus('NEW')
    };
  };

  return (
    <div className='mt-5'>
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Description</label>
          <textarea
            className='form-control'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Status</label>
          <select
            id='status'
            className='form-select'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='NEW'>Not Started</option>
            <option value='IN_PROGRESS'>In Progress</option>
            <option value='COMPLETED'>Completed</option>
          </select>
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}
