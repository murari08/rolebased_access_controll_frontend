import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ViewerPanel = () => {
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/getpost',{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.status == 200){
        setPosts(res.data)
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert('Access Denied: You do not have permission to view this content.');
      } else {
        setError('Something went wrong. Please try again.',err);
      }
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
  <div className="p-6 bg-gray-100 min-h-screen">
  <h2 className="text-3xl font-bold mb-6 text-gray-800">📄 View Content</h2>
  
  <div className="grid gap-6">
    {posts.map((post, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
      >
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h3>
        <p className="text-gray-700 leading-relaxed">{post.post}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default ViewerPanel;
