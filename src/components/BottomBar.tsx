import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning, faComputer, faHeart, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export const BottomBar = () => {
  return (
    <footer className="bg-white text-sm py-4 pb-8 px-10 md:px-24 flex flex-col md:flex-row items-center justify-between h-auto mt-24 w-full">
      <div className="flex flex-col items-center  md:items-start text-center md:text-left space-y-4 mt-10">
        <a href="https://www.screener.in/">
            <img src="https://cdn-static.screener.in/img/logo-black.f44abb4998d1.svg" alt="Logo" 
            style={{ width: '150px', height: '22px',marginLeft:'-6px' }}/>
        </a>
        <span className='text-xl'>Stock analysis and screening tool</span>
        <div className='flex flex-col items-center text-center md:text-left md:items-start text-[13px]'>
            <span className='text-gray-500'>Mittal Analytics Private Ltd © 2009-2024</span>
            <span className='text-gray-500'>Made with <FontAwesomeIcon icon={faHeart} className='text-red-600'/> by Garvit Dadheech.</span>
            <span className='text-gray-500 mt-4'>Data provided by C-MOTS Internet Technologies Pvt Ltd</span>
            <a href="https://www.screener.in/" className="mt-4 underline">Terms & Privacy.</a>
        </div>
      </div>
        <div className='flex mr-20 gap-x-16'>
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 md:ml-16">
        <span className="font-semibold text-gray-900 mb-2">Product</span>
        <a href="https://www.screener.in/" className="hover:text-indigo-500 text-[12.5px] text-gray-500">Premium</a>
        <a href="https://www.screener.in/" className="hover:text-indigo-500 text-[12.5px] text-gray-500">What's new?</a>
        <a href="https://www.screener.in/" className="hover:text-indigo-500 text-[12.5px] text-gray-500">Learn</a>
        <button className="flex items-center border border-blue-500 text-indigo-500 tracking-wider py-1 px-3 rounded-lg">
          <FontAwesomeIcon icon={faBoltLightning} className='mr-3 text-xs'/> INSTALL
        </button>
      </div>

      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 md:ml-16">
        <span className="font-semibold text-gray-900 mb-2">Team</span>
        <a href="https://www.screener.in/" className="hover:text-indigo-500 text-[12.5px] text-gray-500">About us</a>
        <a href="https://www.screener.in/" className="hover:text-indigo-500 text-[12.5px] text-gray-500">Support</a>
      </div>

      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 md:ml-16">
        <span className="font-semibold text-gray-900 mb-2">Theme</span>
        <a href="https://www.screener.in/" className="hover:text-indigo-500 text-[12.5px] text-gray-500"><FontAwesomeIcon icon={faSun} className='mr-3 text-xs'/>Light</a>
        <a href="https://www.screener.in/" className="hover:text-indigo-500 text-[12.5px] text-gray-500"><FontAwesomeIcon icon={faMoon} className='mr-3 text-xs'/>Dark</a>
        <a href="https://www.screener.in/" className="hover:text-indigo-500 text-[12.5px] text-gray-500"><FontAwesomeIcon icon={faComputer} className='mr-3 text-xs'/>Auto</a>
      </div>
      </div>
    </footer>
  );
};


