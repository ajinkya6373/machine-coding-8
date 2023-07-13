import { useEffect, useState } from "react";
import {meetupsData} from "../../util"
import "./style.css"
import { useNavigate } from "react-router-dom/dist";


export default function HomePage() {
    const [searchQuery,setSearchQuery] = useState("")
    const meetups = meetupsData.meetups;
    const [sortBy,setSortBy] = useState("Both");
    const [sortedMeetUps, setSortedMeetUps] = useState(meetups);
    const navigate = useNavigate();
    const sortMeetups =(meetups,setSortBy)=>{
        switch (setSortBy) {
            case "Offline":
                return meetups.filter((i)=>i.eventType ==="Offline")
            
            case "Online":{
                return meetups.filter((i)=> i.eventType ==='Online');
            }
            case "Both":{
                return meetupsData.meetups
            }
            default:
                return meetupsData.meetups
        }
    }

    const filterByTitleTag =(meetups,searchQuery)=>{
        if(searchQuery.length>0){
            const lowercaseSearchQuery = searchQuery.toLowerCase();
            return meetups.filter((meetup) => {
              const lowercaseTitle = meetup.title.toLowerCase();
              const lowercaseTags = meetup.eventTags.map((tag) => tag.toLowerCase());
          
              return lowercaseTitle.includes(lowercaseSearchQuery) || lowercaseTags.includes(lowercaseSearchQuery);
            });
        }else{
            return meetups;
        }
    }
        useEffect(()=>{
         const  res =sortMeetups(meetups,sortBy)
            const res2 = filterByTitleTag(res,searchQuery)
         setSortedMeetUps(res2)
        },[sortBy,searchQuery])
  return (
    <div>
        <div className="">
            <h1>Meet up</h1>
            <input type="text" placeholder="search " onChange={(e)=>setSearchQuery(e.target.value)}/>
        </div>
        {
            <div>
                <select name="" id="" onChange={(e)=>setSortBy(e.target.value)}>
                    <option value="Both">both</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                </select>
            </div>
        }
        <div className="cardContainer">
        {
            sortedMeetUps?.map((i)=>{
                return <div key={i.id} className="card" onClick={()=>navigate(`/event-detail/${i.id}`)}>
                    <img src={i.eventThumbnail} alt="eventThumbnail" />
                    <span>{i.title}</span>
                    <span>{i.eventType}</span>
                </div>
            })
        }
        </div>
    </div>
  )
}
