import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import CreateAppointmentModal from "../../components/CreateAppointmentModal/CreateAppointmentModal";
import { useDispatch, useSelector } from "react-redux";
import { storeAppointmentData } from "../../Redux/apoinmentslice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = (): JSX.Element => {
  const isLoading = false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const yearList = useSelector((state: any) => state?.appointment?.yearList);
  const monthList = useSelector((state: any) => state?.appointment?.monthList);
  const appointmentList = useSelector(
    (state: any) => state?.appointment?.appointmentList
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedYear, setSelectedYear] = useState<string>(
    `${new Date().getUTCFullYear()}`
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getMonth() + 1}`
  );

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/events`);
      dispatch(storeAppointmentData(response.data));
    } catch (error) {
      console.log("fetchData error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container p-5 bg-gray-100">
      <div className="mb-2 flex justify-between">
        <div className="flex">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1 w-48">
              {selectedYear}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-10 menu p-2 shadow bg-white rounded-box w-52"
            >
              {yearList?.map((item: string) => (
                <li
                  key={item}
                  onClick={() => {
                    navigate(`/year/${item}/month/${selectedMonth}`);
                  }}
                >
                  <a className={item === selectedYear ? "text-blue-600" : ""}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="dropdown">
            <label tabIndex={1} className="btn m-1 w-48">
              {selectedMonth}
            </label>
            <ul
              tabIndex={1}
              className="dropdown-content z-10 menu p-2 shadow bg-white rounded-box w-52"
            >
              {monthList?.map((item: string) => (
                <li
                  key={item}
                  onClick={() => {
                    navigate(`/year/${selectedYear}/month/${item}`);
                  }}
                >
                  <a className={item === selectedMonth ? "text-blue-600" : ""}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <button
            className="btn m-1 bg-blue-500 text-white"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Create Appointment
          </button>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={appointmentList}
      />

      <CreateAppointmentModal
        modalStatus={isModalOpen}
        setModalStatus={setIsModalOpen}
      />
    </div>
  );
};

export default Home;
