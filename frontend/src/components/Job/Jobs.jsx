import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const [searchTerm,setSearchTerm]=useState("");
  const [selectedCategory, setSelectedCategory] = useState('');


  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get(`https://job-recruitment-portal.onrender.com/api/v1/job/getall?search=${searchTerm.length>0?searchTerm:''}&category=${selectedCategory.length>0 && selectedCategory!='All'?selectedCategory:''}`, {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm,selectedCategory]);


  if (!isAuthorized) {
    navigateTo("/");
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  

  let categories=['Frontend Web Development','MERN Stack Development','Mobile App Development',' Artificial Intelligence',' MEAN STACK Development','Data Entry Operator']


  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="search-box">
  <input type="text"  value={searchTerm} placeholder="search..." onChange={(e)=>setSearchTerm(e.target.value)} className="search-input"/>
  <i className="search-icon fas fa-search"></i>
</div>







      <div className="filter-container">
        <label htmlFor="category">Filter by Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>








     
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
