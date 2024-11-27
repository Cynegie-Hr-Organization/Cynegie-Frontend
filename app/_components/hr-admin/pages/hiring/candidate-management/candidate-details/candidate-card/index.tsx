import React from 'react';
import Image from 'next/image'

const CandidateCard = () => {
  return (
    <div className="flex flex-col justify-between gap-8 bg-white ">
      {/* Left Section: Profile and Details */}
      <div className="flex items-center">
        {/* Profile Picture */}
        <Image
          src="/image/avatar.png" // Replace with the actual image URL
          alt="Profile"
          width={50}
          height={50}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />

        {/* User Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Precious Henry</h2>
          <p className="text-sm text-gray-500">Senior UX Designer</p>
        </div>
      </div>

      {/* Middle Section: Application Details */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:max-w-[45rem]">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Applied Role</p>
          <p className="text-sm font-semibold text-gray-900">Snr. UX Designer</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Stage</p>
          <p className="text-sm font-semibold text-gray-900">Screening</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-sm font-semibold text-gray-900">Pending</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Attachments</p>
          <p className="text-sm font-semibold text-gray-900">3 Files</p>
        </div>
      </div>


      {/* Right Section: Action Buttons */}
      <div className="flex w-full items-end md:justify-end space-x-4">
        <button
          className=" flex flex-row items-center gap-2 md:w-auto px-6 py-2 border-[#0035C3] border-2 text-sm font-semibold bg-white text-[#0035C3] rounded-lg hover:border-blue-600 cursor-pointer"
        >
          <span>
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clip-rule="evenodd" d="M8.72903 2.83959C7.42728 1.53784 5.31673 1.53785 4.01499 2.83959L3.56871 3.28587C2.9534 3.90118 2.53255 4.82324 2.7726 5.82207C3.14061 7.35333 4.24802 10.1437 7.55052 13.4462C10.853 16.7487 13.6434 17.8561 15.1746 18.2241C16.1735 18.4642 17.0955 18.0433 17.7108 17.428L18.1571 16.9817C19.4589 15.68 19.4589 13.5694 18.1571 12.2677L17.3831 11.4936C16.322 10.4326 14.6828 10.2113 13.3784 10.953L13.2979 10.9988C12.7634 11.3027 12.1493 11.2779 11.7143 10.963C11.3633 10.709 11.0278 10.4416 10.7914 10.2053C10.5551 9.96894 10.2877 9.63345 10.0337 9.28242C9.71886 8.8474 9.69402 8.23333 9.99796 7.6988L10.0437 7.61835C10.7854 6.31394 10.5641 4.67471 9.5031 3.61366L8.72903 2.83959ZM5.1935 4.0181C5.84437 3.36723 6.89965 3.36723 7.55052 4.0181L8.32458 4.79217C8.85511 5.32269 8.96575 6.14231 8.59489 6.79452L8.54915 6.87496C7.96173 7.90801 7.94112 9.23374 8.68352 10.2596C8.95621 10.6364 9.28392 11.0548 9.61291 11.3838C9.94191 11.7128 10.3604 12.0405 10.7372 12.3132C11.763 13.0556 13.0887 13.035 14.1218 12.4476L14.2022 12.4018C14.8544 12.031 15.674 12.1416 16.2045 12.6721L16.9786 13.4462C17.6295 14.0971 17.6295 15.1523 16.9786 15.8032L16.5323 16.2495C16.21 16.5719 15.8546 16.6734 15.5641 16.6036C14.3399 16.3094 11.8204 15.3591 8.72903 12.2677C5.63764 9.17629 4.68733 6.65681 4.39312 5.43261C4.3233 5.14207 4.42484 4.78676 4.74722 4.46438L5.1935 4.0181Z" fill="#0030B1" />
            </svg>

          </span>
          Call


        </button>



        <button className="px-6 py-2 text-base flex flex-row items-center gap-2  font-semibold bg-[#0035C3] text-white rounded-lg hover:bg-blue-600 focus:outline-none">
          <span>
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clip-rule="evenodd" d="M15.8332 18C17.6742 18 19.1666 16.5076 19.1666 14.6667V7.18557C19.1669 7.17283 19.1669 7.16005 19.1666 7.14725V6.33333C19.1666 4.49238 17.6742 3 15.8332 3H4.16656C2.32561 3 0.833229 4.49238 0.833229 6.33333V7.14726C0.832933 7.16005 0.832935 7.17282 0.833229 7.18556V14.6667C0.833229 16.5076 2.32561 18 4.16656 18H15.8332ZM2.4999 14.6667C2.4999 15.5871 3.24609 16.3333 4.16656 16.3333H15.8332C16.7537 16.3333 17.4999 15.5871 17.4999 14.6667V8.39753L11.2379 10.9023C10.4432 11.2202 9.55663 11.2202 8.76193 10.9023L2.4999 8.39753V14.6667ZM10.6189 9.35488L17.4999 6.60247V6.33333C17.4999 5.41286 16.7537 4.66667 15.8332 4.66667H4.16656C3.24609 4.66667 2.4999 5.41286 2.4999 6.33333V6.60247L9.38091 9.35488C9.77826 9.51382 10.2215 9.51382 10.6189 9.35488Z" fill="white" />
            </svg>


          </span>
          Message
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
