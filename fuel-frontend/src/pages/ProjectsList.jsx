import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects } from '../api/projects.api';

function ProjectsList() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await getAllProjects();
      //console.log(response);
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className='ProjectList'>
      <h1>Projects</h1>

      {/*  {projects.map(project => (
        <p key={project.id}>
          <div></div>
          {project.title}
        </p>
      ))} */}

      {projects.map(project => {
        return (
          <div key={project._id} className='ProjectCard card'>
            <Link to={`/projects/${project._id}`}>
              <h3>{project.title}</h3>
              {project.imgUrl && <img src={project.imgUrl} width={100} />}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectsList;