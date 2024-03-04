import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProject, upload } from '../api/projects.api';

function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState()

  const navigate = useNavigate();

  const handleImage = ({target}) => {
    // our image is going to be in the files array, first position
    setImage(target.files[0])
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const requestBody = { title, description };

      if (image) {
        // create a form type that is able to handle images -> multi-part form data:
        const uploadData = new FormData()
        uploadData.append('file', image)

        const response = await upload(uploadData)
        console.log(response.data)

        requestBody.imgUrl = response.data.imgUrl
      }

      await addProject(requestBody);

      navigate('/projects');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='CreateProject'>
      <h3>Add Project</h3>

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

        <label>Image</label>
        <input
        type="file"
        onChange={handleImage} />

        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default CreateProject;