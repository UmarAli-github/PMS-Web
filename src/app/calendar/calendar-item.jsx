"use client"

import { useState } from "react"

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CalendarItem(){

    const [selected, setSelected] = useState(false);

    //form values
    const [firstname, setFirstname] = useState(null);
    const [surname, setSurname] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [sex, setSex] = useState(null);
    const [country, setCountry] = useState(null);
    const [idType, setIdType] =  useState(null);
    const [idNumber, setIdNumber] = useState(null);
    const [rate, setRate] = useState(null);
    const [bookingId, setBookingId] = useState(null);
    const [stay, setStay] = useState(null);
    const [status, setStatus] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    const selectHandler = () => {

        setSelected(prevState => !prevState);
    }

    return (
        <>{selected?
        (
        <div className="z-50 bg-gray-100 px-36 py-2 border border-gray-500 text-base text-center">
        <div className="flex justify-center gap-16">
        <label htmlFor="title" className="text-lg font-bold"> Details </label>
        <button className="text-sm" onClick={selectHandler}>x</button>
        </div>                
        <form className="grid grid-cols-1 my-2 gap-1 text-left text-xs"> 
            {/* grid-cols-2 creates two columns, gap-x for horizontal spacing, gap-y for vertical */}
            <div className="flex justify-center gap-2">
            <label htmlFor="firstname" >Firstname</label>
            <input value={firstname} onChange={e => setFirstname(e.target.value)} type="text" id="firstname" name="firstname" placeholder="Firstname" className="border p-1" />
            </div>
            <div className="flex justify-center gap-4">
            <label htmlFor="surname" >Surname</label>
            <input value={surname} onChange={e => setSurname(e.target.value)} type="text" id="surname" name="surname" placeholder="Surname" className="border p-1" />
            </div>
            <div className="flex justify-center gap-6">       
            <label htmlFor="birthday" >Birthday</label>
            <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}        
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                id="birthday" 
                name="birthday" 
                className="border p-1" />
            </div>
            <div className="flex justify-center gap-12">
            <label htmlFor="type" >Sex</label>
            <select value={sex} onChange={val => setSex(val)} id="type" name="type" className="border px-6">
            <option value="male" >Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
            <option value="nothing">Prefer not to say</option>
            </select>
            </div>
            <div className="flex justify-center gap-6">
            <label htmlFor="country" >Country</label>
            <input value={country} onChange={e => setCountry(e.target.value)} type="text" id="country" name="country" placeholder="Country" className="border p-1" />
            </div>
            <div className="flex justify-center gap-10">       
            <label htmlFor="id_type" >ID Type</label>
            <input value={idType} onChange={e => setIdType(e.target.value)} type="text" id="id_type" name="id_type" placeholder="ID Type" className="border p-1" />
            </div>
            <div className="flex justify-center gap-6">       
            <label htmlFor="id_number" >ID Number</label>
            <input value={idNumber} onChange={e => setIdNumber(e.target.value)} type="text" id="id_number" name="id_number" placeholder="ID Number" className="border p-1" />
            </div>
            <div className="flex justify-center gap-10">
            <label htmlFor="rate" >Rate</label>
            <input value={rate} onChange={val => setRate(val)} type="number" id="rate" name="rate" placeholder="Rate" className="border p-1" />
            </div>
            <div className="flex justify-center gap-6">
            <label htmlFor="booking_id" >Booking ID</label>
            <input value={bookingId} onChange={e => setBookingId(e.target.value)} type="text" id="booking_id" name="booking_id" placeholder="Booking ID" className="border p-1" />
            </div>
            <div className="flex justify-center gap-10">
            <label htmlFor="number_of_days" >Stay</label>
            <input type="text" id="number_of_days" name="number_of_days" placeholder="Stay" className="border p-1" />
            </div>
            <div className="flex justify-center gap-6">
            <label htmlFor="start" >Checkin date</label>
            <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}        
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                id="check_in" 
                name="check_in_date" 
                className="border p-1" />
            </div>
            <div className="flex justify-center gap-4">
            <label htmlFor="end" >Checkout date</label>
            <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}        
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                id="check_out" 
                name="check_out_date" 
                className="border p-1" />
            </div>
            <div className="flex justify-center gap-8">
            <label htmlFor="type" >Status</label>
            <select value={status} onChange={val => setStatus(val)} id="type" name="type" className="border px-10">
            <option>Booked</option>
            <option>Present</option>
            <option>Left</option>
            <option>No Show</option>
            </select>
            </div>
            <div className="flex justify-around">
            <button className="bg-white px-8 rounded-sm text-center">Submit</button>
            </div>
        </form>
</div>

      )
        :
        ((<button onClick={selectHandler} className="bg-gray-100 p-4 border border-gray-500 text-xs text-center"></button>))
        }
        </>
    )
}