import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSearch, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons';
export const NavBar = () => {
    return (
        <div className="h-[3rem] w-[100%] px-20 flex justify-between bg-white items-center">
            <div className='flex gap-x-10'>
                <a href="#"><img src="https://cdn-static.screener.in/img/logo-black.f44abb4998d1.svg" alt="Logo" 
                    style={{ width: '161px', height: '25px' }}/>
                </a>
                <a href="#" style={{ color: '#606F7B'}} className="pt-[5px] text-sm tracking-wider">FEED</a>
                <a href="#" style={{ color: '#606F7B' }} className="pt-[5px] text-sm tracking-wider">SCREENS</a>
                <a href="#" style={{ color: '#606F7B' }} className="pt-[5px] text-sm tracking-wider">TOOLS</a>
            </div>
            <div className='flex gap-x-2 justify-between'>
                <div className='flex gap-x-6 justify-between items-center border border-slate-400 rounded-md mr- h-8 px-2'>
                    <FontAwesomeIcon icon={faSearch} size="sm" color="#333" />
                    <input
                        type="text"
                        placeholder="Search for a company"
                        style={{ outline: 'none' }}
                    />
                </div>
                <div className='flex gap-x-4 border border-slate-400 rounded-md items-center w-32 justify-center    cursor-pointer'>
                    <FontAwesomeIcon icon={faUser} className="text-purple-900 text-lg" />
                    <div>Garvit</div>
                    <FontAwesomeIcon icon={faCaretDown} className="text-lg" />
                </div>
            </div>
        </div>
    )
}