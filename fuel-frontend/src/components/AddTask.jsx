import { useState } from 'react';
import { addTask } from '../api/projects.api';

function AddTask({ projectId, getSingleProject }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const requestBody = { title, description, projectId };
      await addTask(requestBody);
      setTitle('');
      setDescription('');
      //"Refreshes" the page by going to the API and grabbing the updated information
      getSingleProject();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='AddTask'>
      <h3>Add new Task</h3>

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
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default AddTask;