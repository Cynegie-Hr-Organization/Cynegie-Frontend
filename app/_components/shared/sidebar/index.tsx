import { Logo } from "@/public/image"
import { FiLogOut } from "react-icons/fi"
import Image from "next/image"
import { RiSearchLine } from "react-icons/ri"
import NavLinks from "./nav-links"
import { useState } from "react"

const Sidebar = () => {
	const [openMobileMenu] = useState<boolean>(false);

	return (
		<div
			className={`${openMobileMenu ? 'flex animate-slideIn' : 'hidden animate-slideOut'} 
        xl:flex bg-white h-dvh z-50 fixed w-[272px] px-4 pt-7 flex-col justify-between`}>

			<div className="space-y-5">
				<Image src={Logo} width={122} height={38} alt="logo" className="w-[122px] h-[38px]" />

				<div className="border border-[#D0D5DD] w-[240px] flex items-center gap-3 p-2 rounded-[6px] focus-within:border-primary hover:border-primary duration-300 transition">
					<RiSearchLine />
					<input
						className="outline-none border-none w-full group-hover:ring ring-primary"
						type="text"
						placeholder="Search Apps"
					/>
				</div>

				<div>
					<NavLinks />
				</div>
			</div>

			<div className="flex items-center justify-between my-6 overflow-hidden">
				<div className="flex items-center gap-3">
					<Image
						width={40}
						height={40}
						className="w-[40px] h-[40px]"
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