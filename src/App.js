import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as GetCatAction from "./Middlewarex/action/cat.action";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [idopen, setIdopen] = useState("");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [noData, setNoData] = useState(false);
  const [filterName, setFilterName] = useState("");

  const dispatch = useDispatch();
  const cat = useSelector((state) => state.cat);
  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const handleScroll = async () => {
  //   if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
  //     infiniteScroll();
  //   }
  // };

  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setLoading(true);
      infiniteScroll();
    }
  };

  useEffect(() => {
    dispatch(
      GetCatAction.GetCat({
        limit: limit,
        // page: pageNumber
      })
    );
  }, []);

  useEffect(() => {
    if (cat.data.length > 0) {
      setLoading(false);
    }
    console.log(cat);
  }, [cat]);

  function infiniteScroll(params) {
    setLimit(limit + 10);
  }

  useEffect(() => {
    dispatch(GetCatAction.GetCat({ limit: limit }));
  }, [limit]);

  return (
    <>
      <div className="container">
        <h1>CAT LIST</h1>
        <input type="text" onChange={(e) => setFilterName(e.target.value)}></input>

        <div className="mt-5">
          <div className="row">
            {cat.data
              .filter((item) => item.name.toLowerCase().includes(filterName.toLowerCase()))
              .map((item, i) => (
                <div className="col-md-12" key={i}>
                  <Button
                    onClick={() => {
                      setOpen(!open);
                      setIdopen(item.id);
                    }}
                    aria-expanded={open}
                  >
                    {item.name}
                  </Button>
                  <div style={{ minHeight: "150px" }}>
                    <Collapse in={idopen === item.id ? open : false} dimension={"width"}>
                      <div id={item.id}>
                        <Card body style={{ width: "400px" }}>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">{item.id}</Card.Subtitle>
                          <Card.Text>{item.description}</Card.Text>
                          <Card.Text>Temperament : {item.temperament}</Card.Text>
                          <Card.Link href={item.vcahospitals_url}>Vcahospitals</Card.Link>
                          <Card.Link href={item.wikipedia_url}>Wikipedia</Card.Link>
                        </Card>
                      </div>
                    </Collapse>
                  </div>
                </div>
              ))}
            {loading && <div>Loading...</div>}
            {noData ? <div>no data anymore ... </div> : ""}
          </div>
        </div>
      </div>
    </>
  );
}
