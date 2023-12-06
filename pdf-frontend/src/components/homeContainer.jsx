import { useState } from "react";
import "./homeContainer.scss";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";


const HomeContainer = () => {
  const [files, setFiles] = useState("");

  // const checkList=new Array(200,false);
  const navigate = useNavigate();

  const local = "http://localhost:5000";
  const server="https://pdf-server-hsv9.onrender.com";

  async function Post(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", "file_data");

    data.set("file", files[0]);

    // const values = [...data.entries()];
  
    console.log("files", files);
    const arr = files[0].name.split(".");
  
    if (arr[1] !== "pdf") {
      console.log("NOT PDF format");
      alert("Upload new file");
    } else {
      const response = await fetch(server + "/file", {
        method: "POST",
        body: data,
      });
      localStorage.setItem('name',files[0].name)
      
      console.log("response", response);
      navigate("/file");
    }
  }
  return (
    <>
    
    <Navbar/>
    <div className="homeContainer">
      <h2>Upload your file</h2>

      <form onSubmit={Post}>
        <input type="file" onChange={(ev) => setFiles(ev.target.files)}></input>
        <button type="submit">Submit </button>
      </form>

      <div></div>
    </div>
    </>
  );
};

export default HomeContainer;
