
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
    [1,
        "ASIANPAINT::NSE",
        3143.65,
        3144.3
    ],
    [2,
        "NIFTY BANK::NSE",
        35590.5,
        35617.55
    ],
    [3,
        "BAJAJHLDNG::NSE",
        5037.8,
        4940.35
    ],
    [4,
        "CIPLA::NSE",
        971.3,
        965
    ],
    [5,
        "DABUR::NSE",
        594.95,
        598
    ],
    [6,
        "M&M::NSE",
        835.5,
        850.8
    ]
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

    // extra code for refrance
    

    // {priceChange.toFixed(2)}%

    // (data[1] - data[2]) / data[2])

    return(
        <div>
            <div className="search-div">
                <input type="text" value={search}  onChange={(e)=>{
                    setSearch(e.target.value)
                    // console.log(search);
                }} className="search-bar" placeholder="Search Stocks..." />
            </div>
            {flag ? 
        <>
            <div className="watchlist-main-div">
                <div className="user-info">
                    <h2>Nikhil Gupta</h2>
                    <div>
                        <img src={`./edit.png`} className="icon" alt="Edit" />
                        <img src={`./delete.png`} alt="delete"  className="icon"/>
                    </div>
                </div>
                <hr className="lineBreak"/>
            {sample.map(e=>{
                return(
                    <div key={e[2]}>
                    <div className="watchlist-main-div-child">
                        <div>
                            <h2 style={{color:((e[2]-e[3])/e[3])<0 ? "rgb(234,107,69)":"rgb(41,197,193)"}}>{e[1]}</h2>
                            <p style={{color:"rgb(145,145,145)"}}>NSE</p>
                        </div>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <img src={`./delete.png`} alt="delete"  style={{width:"40px",marginRight:"10px"}}/>
                            <div style={{textAlign:"right"}}>
                                <h3 style={{color:((e[2]-e[3])/e[3])<0 ? "rgb(234,107,69)":"rgb(41,197,193)"}}>{e[2]}</h3>
                                <p>{((e[2]-e[3])/e[3]).toFixed(2)}%</p>
                            </div>
                        </div>
                    </div>
                    <hr className="lineBreak"/>
                    </div>
                )
            })}
            </div>
        </>: 
        <>
            <div className="searchList-main-div">
            {searchedData.map(e=>{
                return(
                    <div key={e[0]}>
                    <div  className="searchList-main-div-child">
                        <div>
                            <h3 style={{color:((e[2]-e[3])/e[3])<0 ? "rgb(234,107,69)":"rgb(41,197,193)"}}>{e[1]}</h3>
                            <p style={{color:"rgb(145,145,145)"}}>NSE</p>
                        </div>
                        <div style={{textAlign:"right"}}>
                            <h4 style={{color:((e[2]-e[3])/e[3])<0 ? "rgb(234,107,69)":"rgb(41,197,193)"}}>{e[2]}</h4>
                            <p>{((e[2]-e[3])/e[3]).toFixed(2)}%</p>
                        </div>
                    </div>
                    <hr className="lineBreak"/>
                    </div>
                )
            })}
            </div>
        </>}
        </div>
    )
}

export default Watchlist;