export default function Test(){
    return(
        <>
        <form className="grid grid-cols-1">
                    <input type="text" name="firstname" placeholder="Firstname"/>
                    <input type="text" name="surname" placeholder="Surname"/>
                    <input type="text" name="birthday" placeholder="Birthday"/>
                    <input type="text" name="sex" placeholder="Sex" />
                    <input type="text" name="country" placeholder="Country"/>
                    <input type="text" name="id type" placeholder="ID Type"/>
                    <input type="text" name="id number" placeholder="ID Number"/>
                    <input type="text" name="rate" placeholder="Rate" />
                    <input type="text" name="booking id" placeholder="Booking ID"/>
                    <input type="text" name="number of days" placeholder="Stay"/>
                    <input type="text" name="start" placeholder="Checkin date"/>
                    <input type="text" name="end" placeholder="Checkout date"/>
                    <select name="type">
                        <option>Booked</option>
                        <option>Present</option>
                        <option>Left</option>
                        <option>No Show</option>
                    </select>
            </form>
        </>
    )
}