import React from 'react'
import Spinner from './Spinner'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import ProjectCard from './ProjectCard'

export default function Project() {
  const { loading, error, data } = useQuery(GET_PROJECTS)

  if (loading) return <Spinner />
  if (error) return <p>Somethign went wrong</p>

  return (
    <div>
      {data.projects.length > 0 ? (
        <div className="row mt-3">
          {
            data.projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          }
        </div>
      ) : (
        <p>No projects found</p>
      )}
    </div>
  )
}
