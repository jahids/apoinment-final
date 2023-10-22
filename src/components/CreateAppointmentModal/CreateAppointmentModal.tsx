import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GiCancel } from "react-icons/gi";

type AppointmentType = {
  name?: string;
  gender?: string;
  age?: string;
  date: string;
  time: string;

};

const CreateAppointmentModal = ({
  modalStatus = false,
  setModalStatus,
  id
}: {
  modalStatus: boolean;
  id ?: string | number 
  setModalStatus: Dispatch<SetStateAction<boolean>>;
}) => {

  console.log("-->id", id)
  // const [inputFieldData, setInputFieldData] = useState<AppointmentType>();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [specificdata, setspecificdata] = useState([])
  // const onSubmit = (data: AppointmentType | any) => {
  //   console.log(data);
  // };


  useEffect(() => {
   console.log("id found -->", id);
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/events/${id}`);
        console.log('api data come', response)
        setspecificdata(response?.data)
        
      }
    catch (error) {
        console.log(error);
        
      }
    };
    fetchEvents();
  }, [id]);

  useEffect(() => {
    console.log(specificdata)
    // Set default values for the form fields using setValue
    setValue('title', specificdata?.title);
    setValue('gender', specificdata?.gender);
    setValue('time', specificdata?.time);
    setValue('date', specificdata?.date);
    setValue('age', specificdata?.age);
 }, []);

const onSubmit = async (data: any) => {
  console.log(data);
  try {
    const apicall = await axios.post(`http://localhost:8080/events`, data)
    console.log(apicall)
    reset()
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
  console.log(data);

};

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="my_modal_6"
        checked={modalStatus}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <div className="relative">
            <h3 className="font-bold text-center mb-4 uppercase">
              Put Your data
            </h3>
            <button
              className="absolute top-0 right-2"
              onClick={() => {
                setModalStatus(false);
              }}
            >
              <GiCancel size={22} />
            </button>
          </div>
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
          <input
              type="text"
              {...register('title', { required: true })}
              placeholder="Name"
              className="input input-bordered w-full mb-2"
            />
            <div className="w-full mt-1 mb-3 flex justify-start items-center">
              <label className="ms-2">Gender :</label>
              <div className="flex justify-start items-center mx-14">
                <input
                  type="radio"
                  {...register('gender', { required: true })}
                  className="radio radio-primary me-1"
                  id="male"
                  value="male"
                  defaultChecked
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex justify-start items-center">
                <input
                  id="female"
                  type="radio"
                  {...register('gender', { required: true })}
                  value="female"
                  className="radio radio-primary me-1"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <input
              type="number"
              {...register('age', { required: true })}
              placeholder="Age"
              className="input input-bordered w-full mb-2"
            />

            <input
              type="date"
              {...register('date', { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full mb-2"
            />

            <input
              type="time"
              {...register('time', { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full mb-2"
            />

            <button
             type="submit"
              className="btn w-full mb-2"
            >
              Create Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointmentModal;
