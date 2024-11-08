import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
export const NavBar = () => {
  return (
    <div className="h-[3rem] w-[100%] px-6 md:px-20 flex justify-between bg-white items-center border-b md:border-none">
      <div className="flex gap-x-10">
        <a href="#" className="w-[150px] h-[25px] md:w-[161px] md:h-[25px]">
          <img
            src="https://cdn-static.screener.in/img/logo-black.f44abb4998d1.svg"
            alt="Logo"
          />
        </a>
        <a
          href="#"
          style={{ color: "#606F7B" }}
          className="pt-[5px] text-sm tracking-wider hidden md:block"
        >
          FEED
        </a>
        <a
          href="#"
          style={{ color: "#606F7B" }}
          className="pt-[5px] text-sm tracking-wider hidden md:block"
        >
          SCREENS
        </a>
        <a
          href="#"
          style={{ color: "#606F7B" }}
          className="pt-[5px] text-sm tracking-wider flex gap-x-2 items-center hidden md:block md:flex"
        >
          <div>TOOLS</div>
          <FontAwesomeIcon icon={faCaretDown} className="text-sm" />
        </a>
      </div>
      <div className="flex gap-x-2 justify-between">
        <div className="flex gap-x-6 justify-between items-center border border-slate-400 rounded-md mr- h-8 px-2 hidden md:block md:flex ">
          <FontAwesomeIcon icon={faSearch} size="sm" color="#333" />
          <input
            type="text"
            placeholder="Search for a company"
            style={{ outline: "none" }}
            className="placeholder:text-gray-500 placeholder:text-sm w-40 "
          />
        </div>
        <div className="flex gap-x-1 border border-slate-400 rounded-full w-10 p-2 justify-center  cursor-pointer items-center md:w-32 md:rounded-md md:p-0">
          <FontAwesomeIcon icon={faUser} className="text-purple-900 text-sm " />
          <div className="text-sm hidden md:block">Garvit</div>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="text-sm hidden md:block"
          />
        </div>
      </div>
    </div>
  );
};
