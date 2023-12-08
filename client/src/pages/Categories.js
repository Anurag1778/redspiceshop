import React,{useState,useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import useCategory from '../hooks/useCategory';

const Categories = () => {
  const Categories = useCategory(); // Assuming useCategory returns an array of categories

  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {Categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card">
                <Link to={`/category/${c.slug}`} className="btn btn-danger">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
