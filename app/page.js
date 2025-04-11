"use client"
import React, { useState, useEffect } from 'react'
import { FiCalendar, FiCheckCircle, FiClock, FiList, FiPlus, FiTrash2, FiArrowRight } from 'react-icons/fi'

const Page = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [taskTime, setTaskTime] = useState("")
  const [taskType, setTaskType] = useState("Web Design")
  const [allTasks, setAllTasks] = useState([])
  const [activeProject, setActiveProject] = useState("Cohort courses")

  // Initialize with some sample tasks
  useEffect(() => {
    if (allTasks.length === 0) {
      setAllTasks([
        { id: 1, title: "Copywriting internal pages", desc: "", status: "todo", type: "Copywriting", dueDate: "Aug 28", assignees: [1, 2, 3], comments: 3, attachments: 0 },
        { id: 2, title: "Creating a user map", desc: "", status: "progress", type: "Web Design", dueDate: "Aug 19", assignees: [1, 2], comments: 4, attachments: 1 },
        { id: 3, title: "Project Research", desc: "", status: "done", type: "Research", dueDate: "Aug 19", assignees: [1, 2, 3], comments: 1, attachments: 1 }
      ])
    }
  }, [])

  const taskTypes = ["Research", "Copywriting", "Web Design"]

  const formatDate = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const d = new Date(date)
    return `${months[d.getMonth()]} ${d.getDate()}`
  }

  const addTask = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert("Please enter a task title")
      return
    }
    
    const newTask = {
      id: Date.now(), 
      title,
      desc,
      status: "todo",
      type: taskType,
      dueDate: taskTime ? formatDate(new Date(taskTime)) : formatDate(new Date()),
      assignees: [1],
      comments: 0,
      attachments: 0
    }
    
    setAllTasks([...allTasks, newTask])
    setTitle("")
    setDesc("")
    setTaskTime("")
  }

  const deleteTask = (taskId) => {
    const updatedTasks = allTasks.filter(task => task.id !== taskId)
    setAllTasks(updatedTasks)
  }

  const getTasksByStatus = (status) => {
    return allTasks.filter(task => task.status === status)
  }

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = allTasks.map(task => 
      task.id === taskId ? {...task, status: newStatus} : task
    )
    setAllTasks(updatedTasks)
  }

  // Fake user data
  const users = [
    { id: 1, color: "bg-orange-400", name: "Alex" },
    { id: 2, color: "bg-blue-400", name: "Ben" },
    { id: 3, color: "bg-green-400", name: "Charlie" },
  ]

  const TaskCard = ({ task }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-3 border-l-4 hover:shadow-md transition-all duration-200" 
           style={{borderLeftColor: 
            task.type === "Research" ? "#3b82f6" : 
            task.type === "Copywriting" ? "#10b981" : 
            "#8b5cf6"}}>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => moveTask(task.id, task.status === "todo" ? "progress" : task.status === "progress" ? "done" : "todo")}
              className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50"
              title={task.status === "todo" ? "Move to Progress" : task.status === "progress" ? "Move to Done" : "Move to Todo"}
            >
              <FiArrowRight />
            </button>
            <button 
              onClick={() => deleteTask(task.id)} 
              className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
              title="Delete task"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
        {task.desc && <p className="text-gray-600 mt-1">{task.desc}</p>}
        <div className="mt-3 flex justify-between items-center">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            task.type === "Research" ? "bg-blue-100 text-blue-800" :
            task.type === "Copywriting" ? "bg-green-100 text-green-800" :
            "bg-purple-100 text-purple-800"
          }`}>
            {task.type}
          </span>
          <span className="text-sm text-gray-500 flex items-center"><FiCalendar className="mr-1" />{task.dueDate}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <div className="flex -space-x-2">
            {task.assignees.map(id => (
              <div key={id} className={`w-7 h-7 rounded-full ${users.find(u => u.id === id)?.color || 'bg-gray-400'} flex items-center justify-center text-white text-xs border-2 border-white`} title={users.find(u => u.id === id)?.name}>
                {id}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            {task.comments > 0 && <span className="mr-2">💬 {task.comments}</span>}
            {task.attachments > 0 && <span>📎 {task.attachments}</span>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section completely removed */}
      
      <div className="container mx-auto p-4">
        {/* Title Only */}
        <h1 className="text-2xl font-bold mb-6 text-indigo-700">{activeProject} Task Manager</h1>
        
        {/* Stylish Task creation form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-indigo-100">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center"><FiPlus className="mr-2" /> Add New Task</h2>
          <form onSubmit={addTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                placeholder="What needs to be done?"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                value={desc} 
                onChange={(e) => setDesc(e.target.value)} 
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                placeholder="Add details about this task..."
                rows="3"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiCalendar className="mr-1 text-indigo-500" /> Due Date
                </label>
                <input 
                  type="date" 
                  value={taskTime} 
                  onChange={(e) => setTaskTime(e.target.value)} 
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiList className="mr-1 text-indigo-500" /> Type
                </label>
                <select 
                  value={taskType} 
                  onChange={(e) => setTaskType(e.target.value)} 
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                >
                  {taskTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <FiPlus className="mr-2" /> Add Task
            </button>
          </form>
        </div>
        
        {/* Task lists */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
              To Do ({getTasksByStatus('todo').length})
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg min-h-[200px]">
              {getTasksByStatus('todo').length > 0 ? (
                getTasksByStatus('todo').map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FiClock className="mx-auto text-3xl mb-2" />
                  <p>No tasks yet</p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
              In Progress ({getTasksByStatus('progress').length})
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg min-h-[200px]">
              {getTasksByStatus('progress').length > 0 ? (
                getTasksByStatus('progress').map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FiClock className="mx-auto text-3xl mb-2" />
                  <p>No tasks in progress</p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
              Done ({getTasksByStatus('done').length})
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg min-h-[200px]">
              {getTasksByStatus('done').length > 0 ? (
                getTasksByStatus('done').map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FiCheckCircle className="mx-auto text-3xl mb-2" />
                  <p>No completed tasks</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
