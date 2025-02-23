"use client";
import DetailGroup from "@/app/_components/shared/detail-group";
import Page from "@/app/_components/shared/page";
import SectionCardContainer from "@/app/_components/shared/section-with-cards/container";
import TabFormat from "@/app/_components/shared/tab-format";
import { route } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { getEmployee } from "../../../../payroll-management/pages/benefits-management/api";

const tabContainerStyle = "common-card flex flex-col gap-12";

const HrAdminEmployeeManagementViewEmployee = () => {
  const router = useRouter();
  const { slug } = useParams();

  const { data: employeeData } = useQuery({
    queryKey: ["employee", slug],
    queryFn: () => getEmployee(typeof slug === "string" ? slug : ""),
  });

  const loading = employeeData ? false : true;

  return (
    <Page
      backText="Back to Employees"
      onBackTextClick={() =>
        router.push(route.hrAdmin.employeeManagement.directory.home)
      }
      title="View Employee Details"
    >
      <TabFormat
        tabs={[
          {
            name: "Personal Information",
            component: (
              <div className={tabContainerStyle}>
                <SectionCardContainer title="Bio Details">
                  <DetailGroup
                    gridLayout="3-columns"
                    loading={loading}
                    details={[
                      {
                        name: "First Name",
                        value: employeeData?.personalInfo?.firstName,
                      },
                      {
                        name: "Middle Name",
                        value: employeeData?.personalInfo.middleName ?? "-",
                      },
                      {
                        name: "Last Name",
                        value: employeeData?.personalInfo.lastName,
                      },
                      {
                        name: "Email Address",
                        value: employeeData?.personalInfo.email,
                      },
                      {
                        name: "Phone Number",
                        value: employeeData?.personalInfo.phoneNumber,
                      },
                      {
                        name: "Date of Birth",
                        value: dayjs(
                          employeeData?.personalInfo.dateOfBirth,
                        ).format("DD-MMM-YYYY"),
                      },
                      {
                        name: "Country",
                        value: employeeData?.personalInfo.country,
                      },
                      {
                        name: "Street Address",
                        value: employeeData?.personalInfo.streetAddress,
                      },
                      { name: "City", value: employeeData?.personalInfo.city },
                      {
                        name: "State",
                        value: employeeData?.personalInfo.dateOfBirth,
                      },
                      {
                        name: "Postal Code",
                        value: employeeData?.personalInfo.postalCode,
                      },
                      {
                        name: "Nationality",
                        value: employeeData?.personalInfo.nationality,
                      },
                      {
                        name: "Marital Status",
                        value: `${employeeData?.personalInfo.maritalStatus
                          .slice(0, 1)
                          .toUpperCase()}${employeeData?.personalInfo.maritalStatus.slice(
                          1,
                        )}`,
                      },
                      {
                        name: "ID Upload",
                        value: employeeData?.personalInfo.idUpload ?? "N/A",
                        type: "document",
                      },
                      {
                        name: "Passport",
                        value: employeeData?.personalInfo.passport ?? "N/A",
                        type: "document",
                      },
                    ]}
                  />
                </SectionCardContainer>
                <SectionCardContainer title="Next of Kin Details">
                  <DetailGroup
                    gridLayout="3-columns"
                    loading={loading}
                    details={[
                      {
                        name: "First Name",
                        value: employeeData?.nextOfKin[0].fName,
                      },
                      {
                        name: "Last Name",
                        value: employeeData?.nextOfKin[0].lName,
                      },
                      {
                        name: "Gender",
                        value: `${employeeData?.nextOfKin[0].gender
                          .slice(0, 1)
                          .toUpperCase()}${employeeData?.nextOfKin[0].gender.slice(
                          1,
                        )}`,
                      },
                      {
                        name: "Email Address",
                        value: employeeData?.nextOfKin[0].nextemail,
                      },
                      {
                        name: "Phone Number",
                        value: employeeData?.nextOfKin[0].nextPhoneNumber,
                      },
                      {
                        name: "Relationship",
                        value: `${employeeData?.nextOfKin[0].relationship
                          .slice(0, 1)
                          .toUpperCase()}${employeeData?.nextOfKin[0].relationship.slice(
                          1,
                        )}`,
                      },
                    ]}
                  />
                </SectionCardContainer>
              </div>
            ),
          },
          {
            name: "Employment Information",
            component: (
              <div className={tabContainerStyle}>
                <SectionCardContainer title="Employment Information">
                  <DetailGroup
                    gridLayout="3-columns"
                    loading={loading}
                    details={[
                      {
                        name: "Job Title",
                        value: employeeData?.employmentInformation.jobTitle,
                      },
                      {
                        name: "Department",
                        value: "-", //TODO: Notify backend to change department response from string to object
                      },
                      {
                        name: "Manager/Supervisor",
                        value: employeeData?.employmentInformation.manager,
                      },
                      {
                        name: "Employment",
                        value:
                          employeeData?.employmentInformation.employmentType,
                      },
                      {
                        name: "Employment Status",
                        value:
                          employeeData?.employmentInformation.employmentStatus,
                      },
                      {
                        name: "Hire Date",
                        value: dayjs(
                          employeeData?.employmentInformation.hireDate,
                        ).format("DD-MMM-YYYY"),
                      },
                      {
                        name: "Work Location",
                        value: employeeData?.employmentInformation.workLocation,
                      },
                      {
                        name: "Work Schedule",
                        value: employeeData?.employmentInformation.workSchedule,
                      },
                      { name: "Employee ID", value: "CYN0345678" },
                      {
                        name: "Probabtion Period",
                        value:
                          employeeData?.employmentInformation.probationPeriod,
                      },
                      {
                        name: "Contract End Date",
                        value: dayjs(
                          employeeData?.employmentInformation.contractEndDate,
                        ).format("DD-MMM-YYYY"),
                      },
                      {
                        name: "Work Email",
                        value: employeeData?.employmentInformation.workEmail,
                      },
                      { name: "Work Phone Number", value: "-" }, //TODO: Add Work Phone Number
                      {
                        name: "Job Description",
                        value:
                          employeeData?.employmentInformation.jobDescription,
                        type: "document",
                      },
                    ]}
                  />
                </SectionCardContainer>
              </div>
            ),
          },
          {
            name: "Compensation",
            component: (
              <div className={tabContainerStyle}>
                <SectionCardContainer title="Compensation">
                  <DetailGroup
                    gridLayout="3-columns"
                    loading={loading}
                    details={[
                      {
                        name: "Base Salary",
                        value: employeeData?.compensation.baseSalary.toString(),
                      },
                      {
                        name: "Salary Frequency",
                        value: employeeData?.compensation.salaryFrequency,
                      },
                      {
                        name: "Bonus Structure",
                        value: employeeData?.compensation.bonusStructure,
                      },
                      {
                        name: "Commission",
                        value: employeeData?.compensation.commission.toString(),
                      },
                      // { name: "Employment Status", value: "Active" },
                      {
                        name: "Stock Options",
                        value:
                          typeof employeeData?.compensation.stockOptions ===
                          "string"
                            ? employeeData?.compensation.stockOptions
                            : "-",
                      },
                      {
                        name: "Effective Date of Compensation",
                        value: dayjs(
                          employeeData?.compensation
                            .effectiveDateOfCompensation,
                        ).format("DD-MMM-YYYY"),
                      },
                      {
                        name: "Pay Grade/Level",
                        value: employeeData?.compensation.payGrade,
                      },
                      {
                        name: "Employee ID",
                        value: "CYN0345678",
                      },
                      {
                        name: "Payment Method",
                        value: employeeData?.compensation.paymentMethod,
                      },
                      {
                        name: "Bank Account Name",
                        value: employeeData?.compensation.bankName,
                      },
                      {
                        name: "Bank Account Number",
                        value: employeeData?.compensation.bankAccountNo,
                      },
                      {
                        name: "Routing Number",
                        value: employeeData?.compensation.routingNo,
                      },
                      {
                        name: "Tax Filing Status",
                        value: employeeData?.compensation.taxFilingStatus,
                      },
                      {
                        name: "Tax Identification Number",
                        value:
                          employeeData?.compensation.taxIdentificationNumber,
                      },
                      {
                        name: "Overtime",
                        value: employeeData?.compensation.overtime,
                      },
                    ]}
                  />
                </SectionCardContainer>
                <SectionCardContainer title="Allowances">
                  <DetailGroup
                    gridLayout="3-columns"
                    loading={loading}
                    details={employeeData?.compensation.allowance.map(
                      (allowance) => ({
                        name: allowance.allowanceName,
                        value: allowance.allowanceAmount.toString(),
                      }),
                    )}
                  />
                </SectionCardContainer>
                <SectionCardContainer title="Deductions">
                  <DetailGroup
                    gridLayout="3-columns"
                    details={employeeData?.compensation.deduction.map(
                      (deduction) => ({
                        name: deduction.deductionName,
                        value: deduction.deductionAmount.toString(),
                      }),
                    )}
                  />
                </SectionCardContainer>
              </div>
            ),
          },
          {
            name: "Documents",
            component: (
              <div className={tabContainerStyle}>
                <SectionCardContainer title="Documents">
                  <DetailGroup
                    gridLayout="3-columns"
                    loading={loading}
                    details={employeeData?.documents.map((document) => ({
                      name: document.documentName,
                      value: document.documentUrl,
                      type: "document",
                      loading: loading,
                    }))}
                  />
                </SectionCardContainer>
              </div>
            ),
          },
          {
            name: "Equipments & Access",
            component: (
              <div className={tabContainerStyle}>
                <SectionCardContainer title="Employee Equipment">
                  <DetailGroup
                    gridLayout="3-columns"
                    loading={loading}
                    details={employeeData?.accessRights[0].devices.map(
                      (device, index) => ({
                        name: `Device ${index + 1}`,
                        value: device.deviceName,
                      }),
                    )}
                  />
                </SectionCardContainer>
                <SectionCardContainer title="Employee Access">
                  <DetailGroup
                    gridLayout="3-columns"
                    loading={loading}
                    details={employeeData?.accessRights[0].permissions.map(
                      (permission) => ({
                        name: permission.tool,
                        value: permission.id,
                      }),
                    )}
                  />
                </SectionCardContainer>
              </div>
            ),
          },
        ]}
      />
    </Page>
  );
};

export default HrAdminEmployeeManagementViewEmployee;
