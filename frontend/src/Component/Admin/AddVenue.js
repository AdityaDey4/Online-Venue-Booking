import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { BestForObject } from '../../config/BestForList';
import { FacilitiesObject } from '../../config/FacilitiesList';
import Select from 'react-select';
import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const AddVenue = ({venue}) => {

    const userRef = useRef();
    const effectRan = useRef(false);
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();

    let [dimg,setDimg]=useState(null);
    const [name, setName] = useState("");

    const [address, setAddress] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [maxPeople, setMaxPeople] = useState();

    const [errMsg, setErrMsg] = useState('');

    const days = BestForObject;
    const [selectedDays, setSelectedDays] = useState([]);
    
    const slots = FacilitiesObject;
    const [selectedSlots, setSelectedSlots] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';

    const [feature, setFeature] = useState();

    useEffect(()=> {

        const getFeature = async ()=> {

            try {
              const response = await axios.get(
                `/feature/${venue._id}`
              );
              console.log(response.data);
              setFeature(response.data); 
            }catch(err) {
              console.error(err); 
            }
          } 
      
          if(venue) {
            getFeature();

            setName(venue.name);
            setAddress(venue.address);
            setPrice(venue.price);
            setDescription(venue.description);
            setMaxPeople(venue.max_people);
            
          };
    }, []);

    useEffect(()=> {
        
        if(effectRan.current === true || process.env.NODE_ENV !=='development') {
            if(feature?.facilities) {
                Object.keys(feature.facilities).map((key)=> {
                    if(feature.facilities[key] && !selectedSlots.includes(key)) selectedSlots.push(key);              
                })
            }
            if(feature?.bestFor) {
                Object.keys(feature.bestFor).map((key)=> {
                    if(feature.bestFor[key] && !selectedDays.includes(key)) selectedDays.push(key);              
                })
            }
            if(feature?.venue_id) {
                console.log(feature.venue_id);
            }
        }

        return ()=> {
            effectRan.current = true;
        }
    }, [feature])

    useEffect(()=> {
        userRef.current.focus();
    }, []);

    useEffect(()=> {
        setErrMsg('');
    }, [name, address, price, description, maxPeople, selectedDays, selectedSlots]);


    const handleDayChange = (e)=> {
        setSelectedDays(Array.isArray(e) ? e.map(x=> x.value) : []);
    }

    const handleSlotChange = (e)=> {
        setSelectedSlots(Array.isArray(e) ? e.map(x=> x.value) : []);
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {

            const bestForOb = {
                "Bachelor Party" : selectedDays.includes("Bachelor Party"),
                "Wedding Party" : selectedDays.includes("Wedding Party"),
                "Anniversary" : selectedDays.includes("Anniversary"),
                "Photo Shoot" : selectedDays.includes("Photo Shoot"),
                "Video Shoot" : selectedDays.includes("Video Shoot"),
                "Farewell Party" : selectedDays.includes("Farewell Party"),
                "Small Gathering" : selectedDays.includes("Small Gathering")
            }
            const facilitiesOb = {
                "DJ" : selectedSlots.includes("DJ"),
                "Wi-fi" : selectedSlots.includes("Wi-fi"),
                "Catering" : selectedSlots.includes("Catering"),
                "Smoking Area" : selectedSlots.includes("Smoking Area"),
                "Power Backup" : selectedSlots.includes("Power Backup"),
                "Nightlife" : selectedSlots.includes("Nightlife"),
                "Drinking Bar" : selectedSlots.includes("Drinking Bar")
            }

            if(!venue) { // add new venue
                var fd=new FormData();
                fd.append("price",price);
                fd.append("name",name);
                fd.append("description", description);
                fd.append("address", address);
                fd.append("max_people", maxPeople);
                fd.append("vo_email", auth.email);
                fd.append('dimg',dimg);
                console.log(dimg);

                const response1 = await axiosPrivate.post(
                    '/venue', fd,
                    {headers:{"Content-Type" : "multipart/form-data"}}
                );

                console.log(response1.data);

                // 409 : change the name as name is already present
                // 401 : login again

                const response2 = await axiosPrivate.post(
                    '/feature',
                    JSON.stringify({
                        "venue_id" : response1.data.id,
                        "facilities" : facilitiesOb,
                        "bestFor" : bestForOb,
                        "vo_email" : auth.email
                    })
                )
            } else { // update venue
                console.log(venue._id);

                const response1 = await axiosPrivate.put(
                    '/venue',
                    JSON.stringify({
                        "id" : venue._id,
                        "price" : price,
                        "description" : description,
                        "address" : address,
                        "max_people" : maxPeople
                    })
                )
                const response2 = await axiosPrivate.post(
                    '/feature',
                    JSON.stringify({
                        "venue_id" : venue._id,
                        "facilities" : facilitiesOb,
                        "bestFor" : bestForOb
                    })
                )
            }


            setName('');
            setAddress('');
            setDescription('');

            setPrice('');
            setMaxPeople('');
            
            setSelectedDays([]);
            setSelectedSlots([]);

            navigate('/', {replace : true});
        }catch(err) {
            if (!err?.response) {
                setErrMsg("No Server Responce");
            }  else {
                setErrMsg(err.message);
            }
        }
    }

  return (

    <div className='add-doctor-form'>
        <div className='doctor-mid-window'>
            <p
                className={errMsg ? "errMsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <form className='add-doctor-info'>

                {
                    venue
                        ?<img style={{alignSelf : 'center'}}
                        className="imgs"
                        src={"http://localhost:3500/v_img/" + venue.image}
                      />
                        : <div>
                            <label>Image : *</label>
                        <p><input onChange={(ev)=>{
                            console.log(ev.target.files)
                            setDimg(ev.target.files[0]);
                        }} type="file" className="form-control" /></p>
                        </div>
                }

                <label htmlFor='name'>Name : </label>
                <input
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    disabled={venue ? true : false}
                />

                <label htmlFor='address'>Address : </label>
                <textarea
                    type="text"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    required
                />

                <label htmlFor='price'>Price : </label>
                <input
                    type="number"
                    id="price"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    required
                />

                <label htmlFor='description'>Description : </label>
                <textarea
                    type="text"
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                />

                <label htmlFor='max_people'>Maximum People :</label>
                <input
                    type="number"
                    id="max_people"
                    onChange={(e) => setMaxPeople(e.target.value)}
                    value={maxPeople}
                    required
                />
            </form>
        </div>

        <div className='doctor-low-window'>
            <label htmlFor="days">Best For : </label>
            <Select
                id='days'
                isMulti
                placeholder="Select Options"
                isClearable
                options={days}
                value={days.filter(day => selectedDays.includes(day.value))}
                onChange={handleDayChange}
            />

            <label htmlFor="slots">Facilities : * </label>
            <Select
                id='slots'
                isMulti
                placeholder="Select Options"
                isClearable
                options={slots}
                value={slots.filter(slot => selectedSlots.includes(slot.value))}
                onChange={handleSlotChange}
            />
        </div>

        
        <button 
            id='add-doctor-bt'
            onClick={handleSubmit}
            disabled={
                !name || !address || !price || !maxPeople || !description ? true : false
            }
        >Add</button>
    </div>
  )
}

export default AddVenue