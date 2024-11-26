import { FiLogOut } from "react-icons/fi"
import Image from "next/image"
import { RiSearchLine } from "react-icons/ri"
import NavLinks from "./nav-links"
import { IoClose } from "react-icons/io5";

const Sidebar = ({ openMobileMenu, setOpenMobileMenu }: { openMobileMenu: boolean, setOpenMobileMenu: () => void }) => {
	// const [openMobileMenu] = useState<boolean>(false);

	return (
		<div
			className={`${openMobileMenu ? 'flex animate-in' : 'hidden animate-out'} 
        xl:flex bg-white h-dvh z-50 fixed w-[272px] px-4 pt-7 flex-col justify-between transition duration-500`}>

			<div className="space-y-5">
				<IoClose onClick={setOpenMobileMenu} className="block xl:hidden place-self-end" />
				<Image src='/image/logo.png' width={122} height={38} alt="logo" className="hidden xl:block w-[122px] h-[38px]" />

				<div className="border border-[#D0D5DD] w-[240px] flex items-center gap-3 p-2 rounded-[6px] focus-within:border-primary hover:border-primary duration-300 transition">
					<RiSearchLine className="text-2xl" />
					<input
						className="outline-none border-none w-full group-hover:ring ring-primary"
						type="text"
						placeholder="Search Apps"
					/>
				</div>

				<NavLinks />
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