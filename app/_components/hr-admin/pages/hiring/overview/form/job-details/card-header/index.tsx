// components/JobCard.js
import Image from "next/image";

export default function JobCardHeader() {
  return (
    <div className="font-sans w-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src="/profile-pic.svg" // Replace with your logo URL
          alt="Company Logo"
          height={70}
          width={70}
          className=" object-cover rounded-md"
        />
        <div className="flex-1">
          <div className="bg-blue-100 text-blue-600 text-sm font-medium px-2 py-1 rounded-full inline-block">
            Marketing
          </div>
          <h2 className="text-lg font-semibold mt-2">Product Manager</h2>
          <p className="text-gray-500 text-sm">Full Time</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.99964 4.58343C7.92857 4.58343 6.24964 6.26236 6.24964 8.33343C6.24964 10.4045 7.92857 12.0834 9.99964 12.0834C12.0707 12.0834 13.7496 10.4045 13.7496 8.33343C13.7496 6.26236 12.0707 4.58343 9.99964 4.58343ZM7.91631 8.33343C7.91631 7.18283 8.84905 6.25009 9.99964 6.25009C11.1502 6.25009 12.083 7.18283 12.083 8.33343C12.083 9.48402 11.1502 10.4168 9.99964 10.4168C8.84905 10.4168 7.91631 9.48402 7.91631 8.33343Z"
            fill="#101928"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.50734 2.99342C8.62211 1.58357 11.3772 1.58357 13.4919 2.99342C16.351 4.89947 17.1537 8.74594 15.2956 11.6364L12.1026 16.6032C11.1185 18.134 8.88078 18.134 7.89669 16.6032L4.70372 11.6364C2.84558 8.74594 3.64826 4.89947 6.50734 2.99342ZM7.43184 4.38017C8.98677 3.34355 11.0125 3.34355 12.5674 4.38017C14.6696 5.78164 15.2598 8.60985 13.8936 10.7351L10.7006 15.702C10.3726 16.2122 9.62669 16.2122 9.29866 15.702L6.10569 10.7351C4.73944 8.60985 5.32963 5.78164 7.43184 4.38017Z"
            fill="#101928"
          />
        </svg>
        <p>Lagos, NG.</p>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-4 gap-4 text-sm text-gray-600   pt-4">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-gray-400">Job Type</p>
          <p>Full Time</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-gray-400">Date Created</p>
          <p>Oct 5, 2024</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-gray-400">Number of Applications</p>
          <p>20</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium  text-gray-400">Status</p>
          <div className="bg-[#FEF6E7] w-fit text-[#865503] text-sm font-semibold px-2 py-[1px] rounded-full inline-block">
            Open
          </div>
        </div>
      </div>
    </div>
  );
}
