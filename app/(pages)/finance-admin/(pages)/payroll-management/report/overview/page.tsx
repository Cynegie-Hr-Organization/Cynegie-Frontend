"use client"

import AppButton from "@/app/_components/shared/button";
import { useRouter } from "next/navigation";
import PayrollReportOverviewTable from "./table";
import { IoIosArrowBack } from "react-icons/io";
import { DrawerDialog } from "@/components/drawer/modal";
import { DialogTitle } from "@/components/ui/dialog";
import { LuDownload } from "react-icons/lu";
import AppCheckbox from "@/app/_components/shared/checkbox";
import { CgFileDocument } from "react-icons/cg";
import { TbCalendar, TbCalendarCheck } from "react-icons/tb";
import { PiUsersBold } from "react-icons/pi";
import { AppPieChart } from "./piechart";
import { ChartConfig } from "@/components/ui/chart";
import { GoDotFill } from "react-icons/go";
import { BarChartComponent } from "./bar-chart";
import { useEffect, useState } from "react";





const PayrollReportOverview = () => {

    const [chartType, setChartType] = useState("bar");

    const pageCards = [
        {
            icon: <TbCalendar />,
            bgColor: "#EADAFF",
            title: "Payroll Period",
            description: "Sept 1st - 30th, 2024",
        },
        {
            icon: <TbCalendarCheck />,
            bgColor: "#D2F1DE",
            title: "Report Generated On",
            description: "Jul 31st, 2024",
        },
        {
            icon: <CgFileDocument />,
            bgColor: "#DEE3FF",
            title: "Report Type",
            description: "Payroll Summary",
        },
        {
            icon: <PiUsersBold />,
            bgColor: "#DEE3FF",
            title: "Departments Included",
            description: "3",
        }
    ];

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
        xAxis: "Gross Pay",
        pay: 1000,
    }, {
        xAxis: "Tax",
        pay: 1000,
    }, {
        xAxis: "Bonuses",
        pay: 1000,
    }, {
        xAxis: "Deductions",
        pay: 1000,
    }, {
        xAxis: "Deductions",
        pay: 1000
    }];



    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setChartType("pie");
            } else {
                setChartType("bar");
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);



    return (
        <div className="space-y-8">
            <PageHeader
                title="Payroll Report Overview"
                buttonLabel="Download Report"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {pageCards.map((card, index) => (
                    <div className="common-card space-y-5" key={index}>
                        <div className="flex items-center gap-2">
                            {card.icon && <div className="rounded-full p-2" style={{ backgroundColor: card.bgColor }}>{card.icon}</div>}
                            <h3 className="font-roboto lg:text-xs text-sm text-[#848897] font-medium">{card.title}</h3>
                        </div>
                        <p className="font-roboto text-xl font-bold">{card.description}</p>
                    </div>
                ))}
            </div>

            <div className="common-card space-y-6">
                <h3 className="font-roboto text-base font-bold">Payroll Summary</h3>

                {chartType === 'pie' && (
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-[177px]">
                            <AppPieChart
                                innerRadius={52}
                                chartData={[
                                    { task: "gross-pay", value: 2800.00, fill: "#0F973D" },
                                    { task: "bonuses", value: 2800.00, fill: "#335DCF" },
                                    { task: "taxes", value: 2800.00, fill: "#FFAD33" }
                                ]}
                                chartConfig={chartConfig} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ChartDataLabel title="Gross Pay" value='₦2,800.00 (80%)' color="#0035C3" />
                            <ChartDataLabel title="Bonuses" value='₦2,800.00 (80%)' color="#FFAD33" />
                            <ChartDataLabel title="Taxes" value='₦2,800.00 (80%)' color="#0F973D" />
                            <ChartDataLabel title="Deductions" value='₦2,800.00 (80%)' color="#DD900D" />
                            <ChartDataLabel title="Benefits" value='₦2,800.00 (80%)' color="#D42620" />
                            <ChartDataLabel title="Net Pay" value='₦2,800.00 (80%)' color="#D42620" />
                        </div>
                    </div>
                )}


                {chartType === 'bar' && (
                    <div className=" h-[304px] xl:h-[280px] w-full">
                        <BarChartComponent chartData={chartData} chartConfig={chartConfig} />
                    </div>
                )}
            </div>


            <PayrollReportOverviewTable />
        </div>
    )
}


const PageHeader = ({ title, buttonLabel }: {
    title: string,
    buttonLabel: string,
}) => {

    const router = useRouter();

    const handleClick = () => {
        router.back();
    }

    return (
        <div className="space-y-5">
            <button className="flex items-center gap-2 text-gray-500 text-base" onClick={handleClick}>
                <IoIosArrowBack size={24} />
                Back to Payroll Reports
            </button>
            <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-black font-roboto">{title}</h3>
                <DownloadModal trigger={<AppButton label={buttonLabel} className="btn-primary w-full" />} />
            </div>
        </div>
    )
}



const DownloadModal = ({ trigger }: { trigger: React.ReactNode }) => {

    const [filterType, setFileType] = useState({
        pdf: true,
        excel: false
    })


    return (
        <DrawerDialog
            trigger={trigger}
            header={<DialogTitle className="text-lg font-bold text-center">Download Report</DialogTitle>}
            footer={
                <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    <AppButton label="Cancel" className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full" />
                    <AppButton label="Download" className="bg-primary text-white md:w-[150px] w-full border border-primary" leftIcon={<LuDownload />} />
                </div>
            }
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-500 text-center">Select the format you would like to download your report</p>
                <div className="flex items-center justify-center gap-10">
                    <AppCheckbox
                        id="pdf"
                        checked={filterType.pdf}
                        label={"PDF"}
                        name="format"
                        className=""
                        onChange={(e) => { setFileType({ ...filterType, pdf: Boolean(e.target.checked) }) }}
                    />
                    <AppCheckbox
                        id="excel"
                        checked={filterType.excel}
                        label={"Excel"}
                        name="format"
                        className=""
                        onChange={(e) => { setFileType({ ...filterType, excel: Boolean(e.target.checked) }) }}
                    />
                </div>
            </div>
        </DrawerDialog>
    )
}


const ChartDataLabel = ({ title, value, color }: {
    title: string,
    value: string,
    color: string
}) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                <GoDotFill style={{ color }} />
                <p className="font-roboto text-sm font-semibold">{title}</p>
            </div>
            <p className="font-roboto text-[#667185] text-sm font-semibold">{value}</p>
        </div>
    )
}


export default PayrollReportOverview;