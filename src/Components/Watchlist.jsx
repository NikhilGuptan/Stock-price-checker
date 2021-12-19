
import React,{useState,useEffect} from "react";
import jsonObject from "../data.json";
import "./watchlist.css";
import {nanoid} from "nanoid"

let allData = jsonObject.allData;
let dataWithId = [];

for(let i=0; i<allData.length; i++){
    let a = [];
    let splitData = allData[i][0].split("::");
    let id = nanoid();
    a.push(id,splitData[0],allData[i][1],allData[i][2]);
    dataWithId.push(a)
}

let sample = [
    
]

function Watchlist(){
    const [mainData,setMainData] = useState(dataWithId)
    const [watchListData,setWatchListData] = useState([]);
    const [searchedData,setSearchedData] = useState([]);
    const [flag,setFlag] = useState(true);
    const [search,setSearch] = useState("");

    useEffect(()=>{
        // console.log(mainData);
        if(search===""){
            setFlag(true);
        }else{
            setFlag(false);
        }

        const filteredData = mainData.filter(data =>{
            return data[1].toLowerCase().includes(search.toLowerCase())
        }
        );
        // console.log(filteredData);
          setSearchedData(filteredData);

    },[search])

    const checkDataInWatchlist = (id)=>{
        for(let i=0; i<watchListData.length; i++){
            console.log(watchListData[i][0]);
            if(watchListData[i][0][0]===id){
                return false;
            }
        }
        return true;
    }

    const handleAdd = (id)=>{
        let flag = false;
        const data = mainData.filter((e)=>{
           if(e[0]===id && checkDataInWatchlist(id)===true){
            // if(e[0]===id){    
                flag = true;
               return e;
           }
        })
        if(flag===true){
            setWatchListData([...watchListData,data])
            alert("Stock added In the Watchlist")
            return;
        }else{
            alert("Stock is already Present in the Watchlist")
            return
        }
    }

    const handleDelete = (id)=>{
        const data = watchListData.filter((e)=>{
            if(id!==e[0][0]){
                return e[0];
            }
        })
        setWatchListData(data)
        alert("Deleting from the Watchlist")
    }

    return(
        <div>
            <div className="search-div">
                <input type="text" value={search}  onChange={(e)=>{
                    setSearch(e.target.value)
                    // console.log(search);
                }} className="search-bar" placeholder="Search Stocks..." />
            </div>
            {flag ? 
        watchListData.length<=0 ? <div className="noDataInWatchlist"><h1>No Data In Watchlist</h1></div> : <>
        <div className="watchlist-main-div">
            <div className="user-info">
                    <h2>Nikhil Gupta</h2>
                <div>
                    <img src={`./edit.png`} className="icon" alt="Edit" />
                    <img src={`./delete.png`} alt="delete"  className="icon"/>
                </div>
            </div>
            <hr className="lineBreak"/>
        {watchListData.map(e=>{
            return(
                <div key={e[0][0]}>
                <div className="watchlist-main-div-child">
                    <div>
                        <h2 style={{color:((e[0][2]-e[0][3])/e[0][3])<0 ? "rgb(234,107,69)":"rgb(41,197,193)"}}>{e[0][1]}</h2>
                        <p style={{color:"rgb(145,145,145)"}}>NSE</p>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <img src={`./delete.png`} alt="delete" onClick={()=>{
                            handleDelete(e[0][0])
                        }} className="deleteButton"  style={{width:"40px",marginRight:"10px"}}/>
                        <div style={{textAlign:"right"}}>
                            <h3 style={{color:((e[0][2]-e[0][3])/e[0][3])<0 ? "rgb(234,107,69)":"rgb(41,197,193)"}}>{e[0][2]}</h3>
                            <p>{((e[0][2]-e[0][3])/e[0][3]).toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
                <hr className="lineBreak"/>
                </div>
            )
        })}
        </div>
    </>: 
        searchedData<=0 ? <div className="noDataInWatchlist"><h1>No Match Found</h1></div> : <>
        <div className="searchList-main-div">
        {searchedData.map(e=>{
            return(
                <div key={e[0]}>
                <div  className="searchList-main-div-child">
                    <div>
                        <h3 style={{color:((e[2]-e[3])/e[3])<0 ? "rgb(234,107,69)":"rgb(41,197,193)"}}>{e[1]}</h3>
                        <p style={{color:"rgb(145,145,145)"}}>NSE</p>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <img src={`./add.png`} className="addButton" onClick={()=>{
                            handleAdd(e[0])
                        }} alt="delete" />
                        <div style={{textAlign:"right"}}>
                            <h4 style={{color:((e[2]-e[3])/e[3])<0 ? "rgb(234,107,69)":"rgb(41,197,193)"}}>{e[2]}</h4>
                            <p>{((e[2]-e[3])/e[3]).toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
                <hr className="lineBreak"/>
                </div>
            )
        })}
        </div>
    </>
        }
        </div>
    )
}

export default Watchlist;