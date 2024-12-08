import React from "react";

const ProfileDetails = () => {
  return (
    <div className="bg-white ">
      {/* About Section */}
      <section className="mb-6">
        <h1 className="text-lg font-semibold mb-2">About</h1>
        <p className="text-sm text-gray-900">
          “Empathy-driven and innovation-focused, I’m a UX Designer dedicated to
          crafting user experience that not only meet but exceed expectations.
          With passion for creating intuitive and human-centered designs, I’m
          shaping the future of user experience, one solution at a time…”
        </p>
      </section>

      {/* Experience Section */}
      <section>
        <h1 className="text-lg font-semibold mb-4">Experience</h1>

        {/* Experience Item 1 */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full mr-2">
              ✓
            </span>
            <h2 className="text-sm font-medium text-gray-900">
              Senior UI/UX Designer - Google Certified
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-1">
            September 2022 - November 2024
          </p>
          <p className="text-sm text-gray-900">
            Have worked on numerous real-life projects with complex concepts
            into visually appealing products.
          </p>
        </div>

        {/* Experience Item 2 */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full mr-2">
              ✓
            </span>
            <h2 className="text-sm font-medium text-gray-900">
              Senior UI/UX Designer - IBM
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-1">
            September 2022 - November 2024
          </p>
          <p className="text-sm text-gray-900">
            I had the opportunity to work with “IBM” for a few years, where I
            specialize in conducting UX Research for complex and challenging
            projects. During my time there, I developed a strong expertise in
            uncovering user insights and informing design decisions to drive
            business success.
          </p>
        </div>
      </section>

      {/* Attached File Section */}
      <section>
        <h1 className="text-lg font-semibold mb-2">Attached File</h1>
        <a
          href="#"
          className="inline-flex p-1 rounded-full px-2 items-center bg-[#E6EBF9] text-blue-600 hover:underline"
        >
          File .PDF
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </a>
      </section>
    </div>
  );
};

export default ProfileDetails;
