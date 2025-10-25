import axios from "axios";
import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  CalendarDays,
  MapPinned,
  Phone,
  LockKeyhole,
} from "lucide-react";

import Loader from "./components/Loader";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeField, setActiveField] = useState("name"); // 👈 which icon is selected

  const getData = async () => {
    setLoading(true);
    const res = await axios.get("https://randomuser.me/api/");
    setUsers(res.data.results);
    setActiveField("name"); // reset when new user is generated
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="bg-slate-950 text-white w-full h-screen flex items-center justify-center">
      {users.map((user, index) => {
        // 💡 Define data fields dynamically
        const dataMap = {
          name: `${user.name.title} ${user.name.first} ${user.name.last}`,
          email: user.email,
          dob: new Date(user.dob.date).toLocaleDateString(),
          location: `${user.location.city}, ${user.location.country}`,
          phone: user.phone,
          password: user.login.password,
        };

        const labelMap = {
          name: "Hi, my name is",
          email: "Hi, my email is",
          dob: "Hi, my birthday is",
          location: "Hi, my address is",
          phone: "Hi, my phone number is",
          password: "Hi, my password is",
        };

        return (
          <div
            key={index}
            className="w-fit h-fit bg-slate-950 rounded-2xl drop-shadow-2xl drop-shadow-purple-600/20 p-10 border border-purple-600/20 flex gap-6 flex-col items-center justify-center transition-all duration-300"
          >
            {/* Profile Image */}
            <div className="drop-shadow-2xl drop-shadow-purple-500/20 w-32 h-32 rounded-full overflow-hidden bg-linear-to-b to-blue-600 from-purple-600 p-1 select-none">
              <img
                className="w-full h-full rounded-full object-cover"
                src={user.picture.large}
                alt="user"
              />
            </div>

            {/* Dynamic text */}
            <div className="text-center transition-all duration-200">
              <p className="text-slate-300 text-lg font-medium">{labelMap[activeField]}</p>
              <h1 className="text-2xl font-bold tracking-wide mt-1">
                {dataMap[activeField]}
              </h1>
            </div>

            {/* Icons Section */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setActiveField("name")}
                className={`p-3 rounded-full transition-all duration-200 ${
                  activeField === "name"
                    ? "bg-purple-600 scale-110"
                    : "hover:bg-purple-600/30"
                }`}
              >
                <UserRound />
              </button>

              <button
                onClick={() => setActiveField("email")}
                className={`p-3 rounded-full transition-all duration-200 ${
                  activeField === "email"
                    ? "bg-purple-600 scale-110"
                    : "hover:bg-purple-600/30"
                }`}
              >
                <Mail />
              </button>

              <button
                onClick={() => setActiveField("dob")}
                className={`p-3 rounded-full transition-all duration-200 ${
                  activeField === "dob"
                    ? "bg-purple-600 scale-110"
                    : "hover:bg-purple-600/30"
                }`}
              >
                <CalendarDays />
              </button>

              <button
                onClick={() => setActiveField("location")}
                className={`p-3 rounded-full transition-all duration-200 ${
                  activeField === "location"
                    ? "bg-purple-600 scale-110"
                    : "hover:bg-purple-600/30"
                }`}
              >
                <MapPinned />
              </button>

              <button
                onClick={() => setActiveField("phone")}
                className={`p-3 rounded-full transition-all duration-200 ${
                  activeField === "phone"
                    ? "bg-purple-600 scale-110"
                    : "hover:bg-purple-600/30"
                }`}
              >
                <Phone />
              </button>

              <button
                onClick={() => setActiveField("password")}
                className={`p-3 rounded-full transition-all duration-200 ${
                  activeField === "password"
                    ? "bg-purple-600 scale-110"
                    : "hover:bg-purple-600/30"
                }`}
              >
                <LockKeyhole />
              </button>
            </div>

            {/* Button */}
            <div className="btn mt-4">
              {loading ? (
                <Loader />
              ) : (
                <button
                  onClick={getData}
                  className="bg-linear-to-r from-blue-600 to-purple-600 rounded-full px-6 py-2 font-medium shadow-lg hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer drop-shadow-2xl drop-shadow-purple-600/50"
                >
                  Generate New User
                </button>
              )}
            </div>
          </div>
        );
      })}
    </main>
  );
}
