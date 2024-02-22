import "./styles.css";
import { useState, useEffect } from "react";
import { Loader } from "react-feather";
import UserDetails from "./UserDetails";

const App = () => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("loading"); 

  const fetchData = async () => {
    try {
      setStatus("loading");
      const request = await fetch("https://randomuser.me/api/");
      // console.log(request);
      const { results } = await request.json();
      //console.log(results[0]);
      if (request.status === 200) {
        setData(results[0]);
        setStatus("success");
      }
    } catch (e) {
      console.log(e);
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {status === "success" && <UserDetails data={data} fetchData={fetchData}/>}
      {status === "loading" && <Loader />}
      {
        status === "error" && (
          <p>Something went wrong, please try again in a few minutes.</p>
        )
      }
    </div>
  );
};

export default App;
