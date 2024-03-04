import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProject, getProject, updateProject } from '../api/projects.api';

function EditProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { projectId } = useParams();

  const navigate = useNavigate();

  const getSingleProject = async () => {
    try {
      const response = await getProject(projectId);

      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(projectId);
      navigate('/projects');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProject();
  }, []);

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const requestBody = { title, description, _id: projectId };

      await updateProject(requestBody);

      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='EditProject'>
      <h3>Edit Project</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor='title'> Title:</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label htmlFor='description'>Description:</label>
        <textarea
          name='description'
          id='description'
          cols='30'
          rows='10'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type='submit'>Edit</button>
      </form>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default EditProject;