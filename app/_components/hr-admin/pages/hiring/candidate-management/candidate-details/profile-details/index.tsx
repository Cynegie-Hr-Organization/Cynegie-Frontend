interface ProfileDetailsProps {
  about: string;
  experiences: string;
  attachedFile: string;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  about,
  experiences,
  attachedFile,
}) => {
  return (
    <div className="bg-white ">
      {/* About Section */}
      <section className="mb-6">
        <h1 className="text-lg font-semibold mb-2">About</h1>
        <p className="text-sm text-gray-900">{about}</p>
      </section>

      {/* Experience Section */}
      <section className="mb-6">
        <h1 className="text-lg font-semibold mb-2">Experience</h1>
        <p className="text-sm text-gray-900">{experiences}</p>
      </section>

      {/* Attached File Section */}
      <section>
        <h1 className="text-lg font-semibold mb-2">Attached File</h1>
        <a
          href={attachedFile}
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
