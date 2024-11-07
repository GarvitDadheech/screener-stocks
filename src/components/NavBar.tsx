import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSearch, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons';

export const NavBar = () => {
  return (
    <div className="bg-white w-full px-4 py-3 md:h-12 md:px-20 flex justify-between items-center">
      <div className="flex items-center gap-x-4 md:gap-x-10">
        <a href="#" className="block">
          <img
            src="https://cdn-static.screener.in/img/logo-black.f44abb4998d1.svg"
            alt="Logo"
            className="w-28 md:w-auto"
          />
        </a>
        <div className="hidden md:flex gap-x-6 items-center">
          <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
            FEED
          </a>
          <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
            SCREENS
          </a>
          <a href="#" className="text-sm text-gray-700 hover:text-gray-900 flex items-center gap-x-2">
            <span>TOOLS</span>
            <FontAwesomeIcon icon={faCaretDown} className="text-sm" />
          </a>
        </div>
      </div>
      <div className="flex items-center gap-x-4 md:gap-x-6">
        <div className="hidden md:flex items-center border border-gray-400 rounded-md px-2 h-8">
          <FontAwesomeIcon icon={faSearch} size="sm" className="text-gray-600" />
          <input
            type="text"
            placeholder="Search for a company"
            className="outline-none text-sm text-gray-500 placeholder:text-gray-500 w-40"
          />
        </div>
        <div className="flex items-center border border-gray-400 rounded-md px-2 py-1 cursor-pointer">
          <FontAwesomeIcon icon={faUser} className="text-purple-900 text-sm" />
          <span className="text-sm text-gray-700 ml-2">Garvit</span>
          <FontAwesomeIcon icon={faCaretDown} className="text-sm text-gray-700 ml-2" />
        </div>
      </div>
    </div>
  );
};

