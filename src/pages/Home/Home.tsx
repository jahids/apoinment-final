import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import CreateAppointmentModal from "../../components/CreateAppointmentModal/CreateAppointmentModal";
import { useSelector } from "react-redux";

const Home = () => {
  const data = false;
  const yearList = useSelector((state: any) => state?.appointment?.yearList);
  const monthList = useSelector((state: any) => state?.appointment?.monthList);
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const [selectedYear, setSelectedYear] = useState<string>(
    `${new Date().getUTCFullYear()}`
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getMonth()}`
  );

  if (data) {
    return <Loader />;
  }

  return (
    <div className="p-5">
      <div className="mb-2 flex justify-between">
        <div className="flex">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1 w-48">
              {selectedYear}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {yearList?.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedYear(item);
                  }}
                >
                  <a className={item === selectedYear ? "text-red-600" : ""}>
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
              className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {monthList?.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedMonth(item);
                  }}
                >
                  <a className={item === selectedMonth ? "text-red-600" : ""}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <button
            className="btn m-1"
            onClick={() => {
              setModalStatus(true);
            }}
          >
            Create Appointment
          </button>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={false}
        initialView="dayGridMonth"
      />

      <CreateAppointmentModal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
      />
    </div>
  );
};

export default Home;
