import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carousel from "../components/Carousel";
export default function Home() {

  const [Category, setCategory] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [Search, setSearch] = useState('');
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json();
    setfoodItem(response[0]);
    setCategory(response[1]);
    // console.log(response[0], response[1]);
  }
  useEffect(() => {
    loadData();
  }, [])
  return (

    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !imposrtant" }}>

          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-centre">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={Search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://images.unsplash.com/photo-1630748663402-ef49332b3fc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=881&q=80" style={{ filter: "brightness(40%)" }} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpY2tlbiUyMHRpa2thfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60r" style={{ filter: "brightness(40%)" }} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" style={{ filter: "brightness(40%)" }}
                className="d-block w-100" alt="..." />
            </div>

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="Container m-3">
        {
          Category !== []
            ? Category.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== []
                    ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(Search.toLowerCase())))
                      .map(filterItems => {
                        return (
                          <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                            <Card
                              foodItem={filterItems}
                              // foodName={filterItems.name}
                              options={filterItems.options[0]}
                            // Image={filterItems.img}
                            // Description={filterItems.description}
                            >
                            </Card>
                          </div>
                        )
                      }
                      ) : <div> No such data found</div>}
                </div>

              )
            })
            : ""
        }

      </div>
      <div>
        <Footer />
      </div>
    </div >
  );
}
