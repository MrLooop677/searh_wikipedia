import axios from "axios";
import { useEffect, useState,useRef } from "react";
import style from "./index.css";
import useCustomeHookes from "./useCustomeHooks";
 function App() {
  const [term,setTerm]=useState("wikipedia")
  const [debounceSearch,setdebounceSearch]=useState(term)
  const [result,setResult]=useState([])
  const prevState=useCustomeHookes(term)
  // useEffect(() => {
  //   const setTime=setInterval(() => {
  //     setdebounceSearch(term)

  //   }, 1000);
  //   return (()=>{
  //     clearInterval(setTime)
  //   })
    
  // },[term])

  useEffect(()=>{

     const Search=async () =>{ 
    const respond = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        list: 'search',
        origin: '*',
        format: 'json',
        srsearch: term,
      },
    });
    // console.log(debounceSearch)
    // console.log(respond.data.query.search)
    setResult(respond.data.query.search)
    console.log(result)
   

  } 
   
  if (!result.length) {
    Search();
  } else if (term !== prevState) {
    const debounceSearch = setTimeout(() => {
      if (term) {
        
        Search();
      }
    }, 2000);

    return () => {
      clearTimeout(debounceSearch);
    };
  }

  },[term,prevState,result.length])


  const FetchData=result.map((res)=>{
    return(
        
        <tr key={res.pageid}>
          <th scope='row'>{res.pageid}</th>
          <td>{res.title}</td>
          <td dangerouslySetInnerHTML={{"__html":res.snippet}} />
        </tr>                  
  )  
  }) 

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='my-3'>
            <label htmlFor='exampleFormControlInput1' className='form-label Title_Search'>
              Search Input
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              onChange={(e)=>setTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Desc</th>
              </tr>
            </thead>
            <tbody>{FetchData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default App





document.onkeyup = function(e) {
  // 83 is the keycode for S
  if (e.ctrlKey && e.which == 83) {
    //Ctrl+S Pressed!
    console.log("save")
  }
};



//*********************Test Axios ********************************************* */ 
// import axios from "axios";
// import React from "react";

// const baseURL = "https://jsonplaceholder.typicode.com/posts";

// export default function App() {
//   const [post, setPost] = React.useState(null);

//   React.useEffect(() => {
//     axios.get(`${baseURL}/1`).then((response) => {
//       setPost(response.data);
//       console.log(response);

//     });
//   }, []);

//   function createPost() {
//     axios
//       .post(`${baseURL}`, {
//         title: "Hello World!",
//         body: "This is a new post.",
//         Name:"eslam"
//       })
//       .then((response) => {
//         setPost(response.data);
//         console.log(response);
//       });
//   }

//   if (!post) return "No post!"

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.body}</p>
//       <button onClick={createPost}>Create Post</button>
//     </div>
//   );
// }

//*********************Test Axios ********************************************* */ 
