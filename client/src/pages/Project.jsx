import React from 'react'
import Spinner from '../components/Spinner'
import {useQuery} from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import { Link, useParams } from 'react-router-dom';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }
  })

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong</p>

  return (
    <div>
      { !loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</Link>
          <h2 className="text-center">{data.project.name}</h2>
          <p className="text-center">{data.project.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead"><b>{data.project.status}</b></p>

          <ClientInfo client={data.project.client} />

          {/* <div className="d-flex justify-content-center mt-5">
            <Link to={`/projects/${data.project.id}/edit`} className="btn btn-light btn-sm">Edit</Link>
          </div> */}

          <EditProjectForm project={data.project} />

          <DeleteProjectButton id={data.project.id} />
        </div>
      )}
    </div>
  )
}
