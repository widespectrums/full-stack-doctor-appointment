import {useContext, useEffect} from 'react';
import {DoctorContext} from "../../context/DoctorContext.jsx";

const DoctorDashboard = () => {
    const {dToken, dashData, setDashData, getDashData} = useContext(DoctorContext)
    useEffect(() => {
        if(dToken){
            getDashData()
        }
    }, [dToken])
    return (
        <div>

        </div>
    );
};

export default DoctorDashboard;