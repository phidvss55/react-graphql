import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash} from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_PROJECT } from '../mutations/projectMutation'
import { GET_PROJECTS } from '../queries/projectQueries'

export default function DeleteProjectButton({ id }) {
  const navigate = useNavigate()

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    onCompleted: () => {
      navigate('/')
    },
    refetchQueries: [{ query: GET_PROJECTS }]
  })

  return (
    <div>
      <div className="d-flex-mt-5 ms-auto">
        <button className="btn btn-danger m-2" onClick={deleteProject}>
          <FaTrash className="icon" /> Delete Project
        </button>
      </div>
    </div>
  )
}
