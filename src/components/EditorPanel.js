import axios from 'axios';
import React, { useState } from 'react';

const EditorPanel = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState({
    title:'',
    post:''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    try{
         const res = await axios.post('http://localhost:5000/api/addpost',content,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if(res.status == 200){
       setMessage('Post submitted successfully!');
    setContent({
        title:'',
        post:''
    })
    }
    }catch(err){
        if (err.response && err.response.status === 403) {
        alert('Access Denied: You do not have permission to view this content.');
      } else {
        setError('Something went wrong. Please try again.',err);
      }
    }
    e.preventDefault();
    // Call your API to save the post
   
    
  };

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md max-w-3xl mx-auto min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Content Management</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => setContent((prev)=>({
                ...prev,
                title: e.target.value
            }))}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Content</label>
          <textarea
            value={content.post}
            onChange={(e) => setContent((prev)=>({
                ...prev,
                post: e.target.value
            }))}
            className="w-full p-3 border border-gray-300 rounded h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Post
        </button>
      </form>

      {message && (
        <p className="mt-6 text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
};

export default EditorPanel;
