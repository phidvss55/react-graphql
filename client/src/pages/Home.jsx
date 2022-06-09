import React from 'react'
import Client from "../components/Client";
import AddClientModel from "../components/AddClientModel";
import Project from "../components/Project";
import AddProjectModal from '../components/AddProjectModal';

export default function Home() {
  return (
    <div>
      <div className="d-flex gap-3 mb-4">
        <AddClientModel />
        <AddProjectModal /> 
      </div>
      <Project />
      <hr />
      <Client />
    </div>
  )
}
