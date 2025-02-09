"use client";

import AppButton from "@/app/_components/shared/button";
import AppInputText from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import AppTabs from "@/app/_components/shared/tabs";
import { useBankingMutations, useMyTransfers } from "@/app/_core/use-cases/finance/useBanking";
import { AppModal } from "@/components/drawer/modal";
import { ChartConfig } from "@/components/ui/chart";
import { dehydrate, HydrationBoundary, useIsMutating, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { CiBank } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { VscEye } from "react-icons/vsc";
import { BarChartComponent } from "./bar-chart";
import BeneficiaryListing from "./beneficiary-listing";
import TransactionsTable from "./transactions-table";






const chartConfig = {
	grossPay: {
		label: "Gross Pay",
		color: "hsl(var(--chart-1))",
	},
	bonuses: {
		label: "Bonuses",
		color: "hsl(var(--chart-2))",
	},
	taxes: {
		label: "Taxes",
		color: "hsl(var(--chart-2))",
	}
} satisfies ChartConfig



const chartData = [{
	xAxis: "24 Sun",
	pay1: Math.floor(Math.random() * 1001),
	pay2: Math.floor(Math.random() * 1001),
}, {
	xAxis: "17 Sun",
	pay1: Math.floor(Math.random() * 1001),
	pay2: Math.floor(Math.random() * 1001),
}, {
	xAxis: "18 Mon",
	pay1: Math.floor(Math.random() * 1001),
	pay2: Math.floor(Math.random() * 1001),
}, {
	xAxis: "19 Tue",
	pay1: Math.floor(Math.random() * 1001),
	pay2: Math.floor(Math.random() * 1001),
}, {
	xAxis: "20 Wed",
	pay1: Math.floor(Math.random() * 1001),
	pay2: Math.floor(Math.random() * 1001),
}];





const BankingPage = () => {

	const queryClient = useQueryClient();

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense>
				<div className="space-y-4 py-6">
					<PageHeader
						title="Banking"
						button1Label="Transaction History"
						button2Label="Create new Account"
						link1="/finance-admin/banking/transaction-history"
					/>


					<div className="space-y-8">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
							<div className="col-span-1 lg:col-span-3">
								<BankCards />
							</div>

							<div className="col-span-1 lg:col-span-9">
								<FinancialStats />
							</div>
						</div>


						<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
							<div className="col-span-1 lg:col-span-3">
								<TransferForm />
							</div>

							<div className="col-span-1 lg:col-span-9">
								<TransferStatuses />
							</div>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
							<div className="col-span-1 lg:col-span-3">
								<BeneficiaryForm />
							</div>

							<div className="col-span-1 lg:col-span-9">
								<BeneficiaryListing />
							</div>
						</div>
					</div>
				</div>
			</Suspense>
		</HydrationBoundary>
	);
};











const BeneficiaryForm = () => {
	const { addBeneficiary } = useBankingMutations()
	const addBeneficiaryIsMutating = useIsMutating({ mutationKey: ['add-beneficiary'] })
	const isLoading = addBeneficiaryIsMutating > 0

	const [formData, setFormData] = useState({
		accountName: "John Doe",
		accountNumber: "1213456789",
		bankName: "First Bank of Nigeria"
	})


	const handleCreateBeneficiary = () => {
		return addBeneficiary.mutate(formData)
	}


	return (
		<form className="common-card space-y-8 h-full">
			<p className="text-base font-bold text-black">New Beneficiary</p>

			<div className="space-y-6">
				<AppInputText
					label="Beneficiary Alias"
					id="beneficiary-alias"
					type="string"
					placeholder="Enter beneficiary alias"
					onChange={(e) => { setFormData({ ...formData, accountName: e.target.value }) }}
					value={formData.accountName}
				/>

				<AppSelect
					label="Bank Name"
					placeholder="Select bank name"
					listItems={[
						{ label: "Bank 1", value: "bank1" },
						{ label: "Bank 2", value: "bank2" },
						{ label: "Bank 3", value: "bank3" },
					]}
					onChange={(value) => { setFormData({ ...formData, bankName: value }) }}
				/>

				<AppInputText
					label="Account Number"
					id="account-number"
					type="string"
					placeholder="Enter account number"
					onChange={(e) => { setFormData({ ...formData, accountNumber: e.target.value }) }}
					value={formData.accountNumber}
				/>

				<AppInputText
					label="Account Name"
					id="account-name"
					type="string"
					placeholder="Enter account name"
					onChange={(e) => { setFormData({ ...formData, accountName: e.target.value }) }}
					value={formData.accountName}
				/>
			</div>

			<AppButton
				label={"Create Beneficiary"}
				className="btn-primary md:w-full"
				isLoading={isLoading}
				disabled={isLoading}
				onClick={handleCreateBeneficiary}
			/>
		</form>
	)
}


const TransferStatuses = () => {
	const { data } = useMyTransfers({});


	type TransferStatusType = 'PENDING' | 'APPROVED' | 'FAILED' | 'LISTING';
	const [status, setStatus] = useState<TransferStatusType>('PENDING');
	const tabs = [
		{ label: 'Pending Transfers', onClick: () => setStatus('PENDING') },
		{ label: 'Approved Transfers', onClick: () => setStatus('APPROVED'), },
		{ label: 'Failed Transfers', onClick: () => setStatus('FAILED'), },
		{ label: 'Transfer Listing', onClick: () => setStatus('LISTING'), },
	]
	return (

		<div className="common-card w-full space-y-6">
			<div className="w-full overflow-x-scroll no-scrollbar">
				<AppTabs
					tabs={tabs}
					className=""
					tabHorizontalPadding="px-7"
				/>
			</div>
			{(status === 'PENDING' || status === 'APPROVED' || status === 'FAILED' || status === 'LISTING') && <TransactionsTable />}
		</div>
	)
}

const TransferForm = () => {
	const { initiateTransfer } = useBankingMutations()
	const initiateTransferIsMutating = useIsMutating({ mutationKey: ['initiate-transfer'] })
	const isLoading = initiateTransferIsMutating > 0
	const [formData, setFormData] = useState({
		beneficiary: "Jane Doe",
		accountName: "John Doe",
		accountNumber: "1234567890",
		bankName: "First Bank",
		sourceBank: "Access Bank",
		amount: 5000
	})

	const handleTransfer = () => {
		initiateTransfer.mutate(formData)
	}


	return (
		<form className="common-card space-y-7">
			<p className="text-base font-bold text-black">New Transfer</p>

			<div className="space-y-4">
				<AppSelect
					label="Source Bank"
					placeholder="Select a Source bank"
					listItems={[
						{ label: "Bank 1", value: "bank1" },
						{ label: "Bank 2", value: "bank2" },
						{ label: "Bank 3", value: "bank3" },
					]}
					onChange={(value) => { setFormData({ ...formData, sourceBank: value }) }}
				/>
				<AppSelect
					label="Beneficiary"
					placeholder="Select a Beneficiary"
					listItems={[
						{ label: 'beneficiary 1', value: 'bene1' },
						{ label: 'beneficiary 2', value: 'bene2' },
						{ label: 'beneficiary 3', value: 'bene3' },
					]}
					onChange={(value) => { setFormData({ ...formData, beneficiary: value }) }}
				/>

				<AppInputText
					label="Amount"
					id="amount"
					type="number"
					placeholder="Enter amount"
					onChange={(e) => {
						const numericValue = e.target.value.replace(/\D/g, '');
						setFormData({ ...formData, amount: parseInt(numericValue) })
					}}
					value={formData.amount}
				/>

				<AppInputText
					label="Account Number"
					id="account-number"
					type="string"
					placeholder="Enter account number"
					onChange={(e) => {
						const numericValue = e.target.value.replace(/\D/g, '');
						setFormData({ ...formData, accountNumber: numericValue })
					}}
					value={formData.accountNumber}
				/>

				<AppSelect
					label="Bank Name"
					placeholder="Select bank name"
					listItems={[
						{ label: "Bank 1", value: "bank1" },
						{ label: "Bank 2", value: "bank2" },
						{ label: "Bank 3", value: "bank3" },
					]}
					onChange={(value) => { setFormData({ ...formData, bankName: value }) }}
				/>
			</div>

			<AppButton
				label={"Initiate Transfer"}
				disabled={isLoading}
				isLoading={isLoading}
				className="btn-primary md:w-full"
				onClick={handleTransfer}
			/>
		</form>
	)
}

const FinancialStats = () => {
	return (

		<div className="common-card space-y-4">
			<h3 className="text-xl font-bold text-black">Financial Statistics</h3>

			<div className=" h-[304px] xl:h-[250px] w-full">
				<BarChartComponent
					chartConfig={chartConfig}
					chartData={chartData}
				/>
			</div>
		</div>
	)
}

const BankCards = () => {
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const cards = [
		<BankingCard key="card1" />,
		<BankingCard key="card2" />,
		<BankingCard key="card3" />
	];

	const handlePrevCard = () => {
		setCurrentCardIndex((prevIndex) =>
			prevIndex > 0 ? prevIndex - 1 : cards.length - 1
		);
	};

	const handleNextCard = () => {
		setCurrentCardIndex((prevIndex) =>
			prevIndex < cards.length - 1 ? prevIndex + 1 : 0
		);
	};

	return (
		<div className="relative h-[336px] w-full overflow-hidden bg-red-500">
			<div className="absolute z-10 h-full w-full justify-between flex items-center px-2">
				<button
					onClick={handlePrevCard}
					className="rounded-full bg-white/30 text-white p-2 hover:bg-white/50 transition-all"
				>
					<IoIosArrowBack size={20} />
				</button>
				<button
					onClick={handleNextCard}
					className="rounded-full bg-white/30 text-white p-2 hover:bg-white/50 transition-all"
				>
					<IoIosArrowForward size={20} />
				</button>
			</div>

			<div
				className="absolute flex transition-transform duration-500 ease-in-out"
				style={{
					transform: `translateX(-${currentCardIndex * 100}%)`,
					width: `${cards.length * 100}%`
				}}
			>
				{cards.map((card, index) => (
					<div
						key={index}
						className="w-full flex-shrink-0"
					>
						{card}
					</div>
				))}
			</div>
		</div>
	)
}

const BankingCard = ({ className, ...props }: { className?: string }) => {
	const [isHidden, setIsHidden] = useState(false);

	return (
		<div className={` w-full ${className}`} {...props}>
			<div
				className=" overflow-clip
            relative after:content-['']
             after:absolute after:-top-36
              after:-right-28 after:bg-[#7FA8FF1A]/10
               after:rounded-full after:h-[320px]
                after:w-[310px] before:content-[''] before:animate-entrance before:delay-100

                 before:absolute before:-top-1/2 
                  before:bg-[#86ADFF1A]/10
                  before:rounded-full before:h-[390px]
                   before:w-[390px] after:animate-entrance

                   space-y-4 bg-primary text-white
                    blue-card-decoration w-full h-[336px]
                     rounded-2xl px-4 md:px-5 py-5 md:py-8
                     ">
				<div className="flex flex-col justify-between h-full">
					<div className="space-y-2">
						<CiBank size={33.33} strokeWidth={0.9} />
						<div className="flex gap-2 items-center">
							<p className="text-3xl font-bold">{isHidden ? '******' : '₦34,886,000'}</p>
							<button onClick={() => setIsHidden(!isHidden)} >
								<VscEye size={23} />
							</button>
						</div>
					</div>

					<div className="text-sm space-y-2">
						<p className="font-semibold text-base">4748394843</p>
						<p>MoniePoint</p>
						<p>Lukman Gbolahan Brume</p>
					</div>
				</div>
			</div>
		</div>
	)
}

const PageHeader = ({ title, button1Label, button2Label, link1 }: {
	title: string,
	button1Label: string,
	button2Label: string,
	link1: string,
}) => {
	const router = useRouter();
	const handleBtn1Click = () => router.push(link1)
	return (
		<div className="flex justify-between items-center">
			<h3 className="text-xl font-bold text-black font-roboto">{title}</h3>


			<div className="flex items-center gap-4">
				<AppButton onClick={handleBtn1Click} label={button1Label} className="btn-secondary w-full hidden md:block" />
				<CreateAccountModal trigger={
					<button className="btn-primary hidden md:block px-[12.33px] py-[9px] w-[230px] rounded-lg text-sm font-bold border border-primary">
						{button2Label}
					</button>
				} />
			</div>
		</div>
	)
}



const CreateAccountModal: React.FC<{ trigger: React.ReactNode }> = ({ trigger }) => {
	const [isOpenModal, setIsOpenModal] = useState(false)
	const { createBankAccount } = useBankingMutations();
	const isMutating = useIsMutating();


	const [formData, setFormData] = useState({
		accountName: "",
		businessType: "",
		currency: "",
		companyEmail: "",
		companyRegistrationNumber: "",
		companyAddress: "",
		secondaryContact: '',
		transactionPin: '',
		// companyName: "Food Network",
		// companyPhoneNumber: "0022142345",
	});

	const handleSubmit = () => {
		createBankAccount.mutate(formData, {
			onSuccess: () => {
				setIsOpenModal(false)
			},
			onError: (error) => {
				console.log(error)
			}
		});
	};



	return (
		<AppModal
			open={isOpenModal}
			setOpen={setIsOpenModal}
			trigger={trigger}
			header={
				<span className="flex flex-col gap-y-1">
					<span className="font-roboto text-xl font-bold">New Account</span>
					<span className="font-roboto text-sm font-normal text-gray-500">Add details</span>
				</span>
			}
			footer={
				<div className="flex items-center justify-center gap-4">
					<AppButton label="Cancel" className="btn-secondary w-[296px]" />
					<AppButton
						label="Add"
						disabled={isMutating > 0}
						isLoading={isMutating > 0}
						className="btn-primary w-[296px]"
						onClick={handleSubmit} />
				</div>
			}>

			<form>
				<div className="space-y-6">
					<AppInputText
						label="Account Name"
						placeholder="Enter account name"
						onChange={(e) => { setFormData({ ...formData, accountName: e.target.value }) }}
						value={formData.accountName}
						id={"account-name"}
						requiredField
						type={"text"}
					/>
					<AppSelect
						label="Currency"
						placeholder={"Enter currency"}
						value={formData.currency}
						onChange={(value) => { setFormData({ ...formData, currency: value }) }}
						requiredField
						listItems={
							[
								{ label: "NGN", value: "ngn" },
								{ label: "AUS", value: "aus" }
							]
						}
					/>
					{/* <AppInputText
						label="Company Name"
						placeholder="Enter company name"
						onChange={(e) => { setFormData({ ...formData, companyName: e.target.value }) }}
						value={formData.companyName}
						id={"company-name"}
						requiredField
						type={"text"}
					/> */}
					<AppInputText
						label="Business Type"
						placeholder="Enter business type"
						onChange={(e) => { setFormData({ ...formData, businessType: e.target.value }) }}
						value={formData.businessType}
						id={"business-type"}
						requiredField
						type={"text"}
					/>
					<AppInputText
						label="Company Email"
						placeholder="Enter company email"
						onChange={(e) => { setFormData({ ...formData, companyEmail: e.target.value }) }}
						value={formData.companyEmail}
						id={"company-email"}
						requiredField
						type={"email"}
					/>
					{/* <AppInputText
						label="Company Phone Number"
						placeholder="Enter company phone number"
						onChange={(e) => { setFormData({ ...formData, companyPhoneNumber: e.target.value }) }}
						value={formData.companyPhoneNumber}
						id={"company-phone-number"}
						requiredField
						type={"text"}
					/> */}
					<AppInputText
						label="Company Registration Number"
						placeholder="Enter company registration number"
						onChange={(e) => { setFormData({ ...formData, companyRegistrationNumber: e.target.value }) }}
						value={formData.companyRegistrationNumber}
						id={"company-registration-number"}
						requiredField
						type={"text"}
					/>
					<AppInputText
						label="Company Address"
						placeholder="Enter company address"
						onChange={(e) => { setFormData({ ...formData, companyAddress: e.target.value }) }}
						value={formData.companyAddress}
						id={"company-address"}
						requiredField
						type={"text"}
					/>
					<AppInputText
						label="Secondary Contact"
						placeholder="Enter secondary contact"
						onChange={(e) => { setFormData({ ...formData, secondaryContact: e.target.value }) }}
						value={formData.secondaryContact}
						id={"secondary-contact"}
						type={"text"}
					/>
					<AppInputText
						label="Transaction Pin"
						placeholder="Enter transaction pin"
						onChange={(e) => { setFormData({ ...formData, transactionPin: e.target.value }) }}
						value={formData.transactionPin}
						id={"transaction-pin"}
						requiredField
						type={"text"}
					/>
				</div>
			</form>
		</AppModal>
	)
}

export default BankingPage;
