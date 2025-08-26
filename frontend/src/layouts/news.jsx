import React from "react";

const News = () => (
  <div
    className="container-fluid"
    style={{
      minHeight: "80vh",
      position: "relative",
      backgroundImage: "url('../thumb-1920-1042582.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  >
    <div
      className="container-lg justify-content-center"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <div className="row justify-content-center pt-3 pb-3">
        <div className="col-md-8">
          <div className="bg-white rounded-4 shadow-lg p-4">
            <h1 className="text-center mb-3">News</h1>
            <hr className="my-3" />
            <p className="text-center mb-0">Latest updates and announcements</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center pt-3 pb-3">
        <div className="col-md-8">
          <div className="bg-white rounded-4 shadow p-4">
            <h1 className="text-center mb-3">News</h1>
            <hr className="my-3" />
            <p className="text-center mb-0">Latest updates and announcements</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center pt-3 pb-3">
        <div className="col-md-8">
          <div className="bg-white rounded-4 shadow p-4">
            <h1 className="text-center mb-3">News</h1>
            <hr className="my-3" />
            <p className="text-center mb-0">Latest updates and announcements</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default News;