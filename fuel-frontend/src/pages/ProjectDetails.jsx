import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddTask from '../components/AddTask';
import { getProject } from '../api/projects.api';

function ProjectDetails() {
  const [project, setProject] = useState(null);

  const { projectId } = useParams();

  const getSingleProject = async () => {
    try {
      const response = await getProject(projectId);
      console.log(response.data);
      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProject();
  }, []);

  return (
    <div className='ProjectDetails'>
      <AddTask projectId={projectId} getSingleProject={getSingleProject} />

      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      {project &&
        project.tasks &&
        project.tasks.map(task => (
          <li className='TaskCard card' key={task._id}>
            <h3>{task.title}</h3>
            <h4>Description:</h4>
            <p>{task.description}</p>
          </li>
        ))}

      {project && (
        <Link to={`/projects/edit/${project._id}`}>
          <button>Edit</button>
        </Link>
      )}

      <Link to='/projects'>
        <button>Back to projects</button>
      </Link>
    </div>
  );
}

export default ProjectDetails;