'use client'

import { FiLogOut } from "react-icons/fi"
import { RiSearchLine } from "react-icons/ri"
import NavLinks from "./nav-links"
import { IoClose } from "react-icons/io5";

const Sidebar = ({ openMobileMenu, setOpenMobileMenu }: { openMobileMenu: boolean, setOpenMobileMenu: () => void }) => {
	return (
		<div
			className={`${openMobileMenu ? 'translate-x-0' : '-translate-x-full'} 
			xl:translate-x-0 transition duration-500 flex bg-white h-dvh z-50 fixed w-[256px] px-3 pt-7 flex-col justify-between`}>

			<div className="space-y-8">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<img src='/image/logo.png' alt="logo" className="w-[122px] h-[38px]" />
						<IoClose size={30} onClick={setOpenMobileMenu} className="block xl:hidden place-self-end" />
					</div>

					<div className="border border-[#D0D5DD] w-full flex items-center gap-x-2 p-2 rounded-[6px] focus-within:border-primary hover:border-primary duration-300 transition">
						<RiSearchLine className="text-xl" />
						<input
							className="outline-none border-none w-full group-hover:ring ring-primary"
							type="text"
							placeholder="Search"
						/>
					</div>

				</div>
				<NavLinks onNavLinkClick={setOpenMobileMenu} isMobile={openMobileMenu} />
			</div>

			<div className="flex items-center justify-between my-6 overflow-hidden">
				<div className="flex items-center gap-3">
					<img
						className="w-10 h-10"
						src="/image/avatar.png"
						alt="avatar"
					/>

					<div className='truncate'>
						<p className="font-sans text-sm font-bold text-Sambucus">
							Alison Eyo
						</p>
						<p className="font-sans text-xs font-normal text-Charcoal">
							alison.e@rayna.ui
						</p>
					</div>
				</div>
				<button onClick={() => { }}>
					<FiLogOut />
				</button>
			</div>
		</div>
	)
}


export default Sidebar;