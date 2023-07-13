import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { meetupsData } from "../../util";
import { ModalCustom } from "../../components";
import "./style.css"
export default function EventDetailPage() {
  const [eventDetail, setEventDetail] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isRsvp, setIsRsvp] = useState(false);
  const [isEventPass, setIsEventPassed] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { eventId } = useParams();
  const eventPassed = () => {
    const givenDate = new Date(eventDetail.eventEndTime);
    const currentDate = new Date();
    console.log(givenDate.getTime() < currentDate.getTime());
    return givenDate.getTime() < currentDate.getTime();
  };
  useEffect(() => {
    setEventDetail(meetupsData.meetups.find((i) => i.id === eventId));
    setIsEventPassed(eventPassed());
  }, [eventId]);
  const handleRsvp = () => {
    setIsRsvp(true);
    handleClose();
  };
  const isDisabled = name === "" || email === "";

  const {
    hostedBy,
    title,
    location,
    address,
    eventThumbnail,
    eventTags,
    speakers,
    price,
    additionalInformation,
    eventDescription
  } = eventDetail;
  return (
    <div className="wrapper">
      <div className="left">
        <h1>{title}</h1>
        <div>Hosted by : {hostedBy}</div>
        <img src={eventThumbnail} alt="eventThumbnail" className="image"/>
        <h3>Details :</h3>
        <p>{eventDescription}</p>
        <div>
            <h3>Additional Information:</h3>
            <div><span> dress code </span>:{additionalInformation?.dressCode}</div>
            <div><span> Age Restriction  </span>:{additionalInformation?.ageRestrictions}</div>
        </div>
        <div>
            <h3>Eevent tags :</h3>
            {
                eventTags?.map((i)=>{
                  return <div key={i}>{i}</div>
                })
            }
        </div>
      </div>
      <div className="right">
        <div>
            {speakers?.map((i)=>{
                return <div key={i.name}>
                    <img src={i.image} alt="icon" className="profileIcon"/>
                    <span>{i.name}</span>
                </div>
            })}
        </div>

      {!isEventPass && (
        <button onClick={handleOpen} disabled={isRsvp}>
          {isRsvp ? "AlreadyRSVped" : "RSVP"}
        </button>


      )}
      </div>

      <ModalCustom
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal">
          <input
            type="text"
            placeholder="add your name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="add your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {eventDetail.isPaid && (
            <span>You have to make payment at venue </span>
          )}
          <button onClick={handleRsvp} disabled={isDisabled}>
            RSVP
          </button>
        </div>
      </ModalCustom>
    </div>
  );
}
