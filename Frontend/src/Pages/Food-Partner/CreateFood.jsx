import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CreateFood = () => {
  const [foodData, setFoodData] = useState({
    name: '',
    description: '',
    video: null
  })
    
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFoodData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    setFoodData(prev => ({
      ...prev,
      video: file
    }))
  }

  const handleRemoveVideo = () => {
    setFoodData(prev => ({
      ...prev,
      video: null
    }))
    // Clear the file input
    const fileInput = document.getElementById('video')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, description, video } = foodData
    const formData = new FormData();
    formData.append('name',name)
    formData.append('description', description)
    formData.append('video', video)
    
    const response = await axios.post('http://localhost:3000/api/food', formData, {
      withCredentials: true,
    })
    console.log("Food created: ", response.data)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-orange-500 via-red-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Create Food Item</h1>
          <p className="mt-2 text-sm text-gray-600 text-center">Add a new food item to your menu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Food Name Input */}
          <div>
            <label htmlFor="name" 
             className="block text-sm font-medium text-gray-700 mb-2">
              Food Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={foodData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
              placeholder="Enter food name"
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={foodData.description}
              onChange={handleInputChange}
              required
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200 resize-none"
              placeholder="Describe your food item"
            />
          </div>

          {/* Video Input */}
          <div>
            <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-2">
              Food Video
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-red-400 border-dashed rounded-md hover:border-red-400 transition duration-200">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 40 40"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v16a4 4 0 004 4h16a4 4 0 004-4V12a4 4 0 00-4-4zM16 19l6-6m0 0l6 6m-6-6v12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="video"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 "
                  >
                    <span>Upload a video</span>
                    <input
                      id="video"
                      name="video"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">MP4 up to 50MB</p>
              </div>
            </div>
            {foodData.video && (
              <div className="mt-4">
                <p className="text-sm font-bold text-green-600 mb-2">
                  Selected: {foodData.video.name}
                </p>
                <div className="relative">
                  <video
                    controls
                    className="w-full max-h-48 rounded-md border border-gray-300"
                    src={URL.createObjectURL(foodData.video)}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition duration-200"
                    title="Remove video"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-500
              "
            >
              Create Food Item
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFood
