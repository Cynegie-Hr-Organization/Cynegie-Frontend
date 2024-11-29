



import { FaLinkedinIn } from "react-icons/fa";

type TeamMemberProps = {
  name: string;
  photo: string | undefined;
  position: string;
  key?: number | string;
};

type LocationProps = {
  key?: number | string;
  name: string;
  flag: string;
  address: string;
  street: string;
  phone: string;
}
const TeamMemberCard = ({ name, photo, position }: TeamMemberProps) => {
  return (
    <div className="w-full p-[2vw] lg:p-4 lg:pb-8 pb-[2vw] bg-white max-w-[40%] lg:max-w-xs rounded-[2vw] lg:rounded-2xl">
      <img src={photo} alt="team member" className="w-full" />
          <h3 className="mt-4 lg:text-lg text-[3vw] font-bold">{name}</h3>
      <div className="relative flex items-end justify-between">
        <div>
          <p className="lg:text-sm text-[2vw] text-gray-400 ">{position}</p>
        </div>

        <div className="p-[1vw] bg-gray-100 rounded-full lg:p-2  h-fit">
          <FaLinkedinIn className="text-gray-400 w-[2vw] max-w-5 "/>
        </div>
        
      </div>
    </div>
  );
};

const LocationCard = ({ name, flag, address, street, phone }: LocationProps) => {
  return (
    <div
      className="w-full p-[2vw] bg-white  max-w-[45%] lg:max-w-xs rounded-[2vw] lg:rounded-2xl border"
    >
      <img src={flag} alt="flag" className="w-[2vw] min-w-3 max-w-5 text-gray-700" />
      <h3 className="mt-1 lg:text-lg text-[3vw] font-bold text-black">{name}</h3>
      <p className="lg:text-sm text-[2vw]">{address}</p>
      <p className="lg:text-sm text-[2vw]">{street}</p>
      <p className="lg:text-sm text-[2vw] mt-2">{phone}</p>
    </div>
  );
};

const AboutUs = () => {
  const teamMembers: TeamMemberProps[] = [
    {
      name: "Olufemi Marcus",
      photo: "./image/team/olufemi.png",
      position: "CEO and Co-Founder",
    },
    {
      name: "Gabby Lusaka",
      photo: "./image/team/Gabby.png",
      position: "CTO and Co-Founder",
    },
    {
      name: "Temitope Obalufon",
      photo: "./image/team//temitope.png",
      position: "CEO and Co-Founder",
    },
    {
      name: "Lude Lagun",
      photo: "./image/team/lude.png",
      position: "CEO and Co-Founder",
    },
    {
      name: "Mattew Mgede",
      photo:"./image/team/mattew.png",
      position: "CEO and Co-Founder",
    },
    {
      name: "Omowumi stone",
      photo: "./image/team/omowumi.png",
      position: "CEO and Co-Founder",
    },
  ];

  const EMEALocations = [
    {
      name: "Nigeria",
      flag: "./image/flags/nigeria.svg",
      address: "32 Oral Estate,",
      street: "Lekki Phase 1, Lagos Island",
      phone: "+234 - 8034758532",
    },
    {
      name: "Ghana",
      flag: "./image/flags/ghana.svg",
      address: "32 Oral Estate,",
       street: "Lekki Phase 1, Lagos Island",
        phone: "+234 - 8034758532",
    },
    {
      name: "Belgium",
      flag: "./image/flags/belgium.svg",
      address: "32 Oral Estate,",
       street: "Lekki Phase 1, Lagos Island",
        phone: "+234 - 8034758532",
    },
    {
      name: "France",
      flag: "./image/flags/france.svg" ,
      address: "32 Oral Estate,",
       street: "Lekki Phase 1, Lagos Island",
        phone: "+234 - 8034758532",
    },

    {
      name: "Italy",
      flag: "./image/flags/italy.svg",
      address: "32 Oral Estate,",
       street: "Lekki Phase 1, Lagos Island",
        phone: "+234 - 8034758532",
    },

    {
      name: "Luxembourg",
      flag: "./image/flags/luxemborg.svg" ,
      address: "32 Oral Estate,",
       street: "Lekki Phase 1, Lagos Island",
        phone: "+234 - 8034758532",
    },
  ];

  const americasLocations = [
    {
      name: "Argentina",
      flag: "./image/flags/argentina.svg" ,
      address: "32 Oral Estate,",
       street: "Lekki Phase 1, Lagos Island",
        phone: "+234 - 8034758532",
    },
    {
      name: "Brazil",
      flag: "./image/flags/brazil.svg",
      address: "32 Oral Estate,",
       street: "Lekki Phase 1, Lagos Island",
        phone: "+234 - 8034758532",
    },

    {
      name: "Brazil",
      flag: "./image/flags/brazil.svg",
      address: "32 Oral Estate,",
       street: "Lekki Phase 1, Lagos Island",
        phone: "+234 - 8034758532",
    },
  ];

  return (
    <div>
      <div className={`bg-no-repeat bg-center bg-cover`} style={{backgroundImage: `url(${"@/image/about-bg.png"})`,}}>
        
      <div className="flex justify-center py-40 bg-PersianBlue/80 p-7 ">
        <h1 className="max-w-3xl text-2xl font-bold text-white lg:text-5xl lg:text-center">
          Empowering Your Workforce,
          <span className="inline-block text-CarrotOrange">
            Driving Your Success
          </span>
        </h1>
      </div>
      </div>

      <div className="p-8 pb-20 space-y-8 text-sm font-light text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <img src={"./image/mountain.svg"} alt="mountain svg" className="mx-auto" />
          <h4 className="text-3xl font-bold">Mission</h4>
          <p>
            Our mission is to revolutionize workforce management by providing
            innovative, tailored solutions that empower organizations to
            optimize their human capital, enhance productivity, and achieve
            sustainable growth. We are dedicated to fostering a supportive and
            dynamic work environment where every employee can thrive and
            contribute to the company{"'"}s success.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          <img src={"./image/binoculars.svg"} alt="" className="mx-auto" />
          <h4 className="text-3xl font-bold">Vision</h4>
          <p>
            Our vision is to be the leading provider of workforce management
            solutions globally, recognized for our commitment to excellence,
            innovation, and customer satisfaction. We aim to shape the future of
            work by creating smarter, more efficient, and more inclusive
            workplaces that drive organizational success and employee
            well-being.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          <img src={"./image/corevalues.svg"} alt="" className="mx-auto" />
          <h4 className="text-3xl font-bold">Core Values</h4>
          <p>
            We prioritize innovation and excellence in our solutions, ensuring
            integrity and transparency in all interactions. Our customer-centric
            approach drives us to deliver tailored, impactful results, while
            fostering a collaborative and respectful environment where diverse
            ideas and perspectives are valued.
          </p>
        </div>
      </div>

      <div className="py-10 text-center lg:p-8 rounded-t-3xl lg:py-28 bg-BrightLavender">
        <h2 className="text-2xl font-bold text-center lg:text-4xl">
          Introducing Our Visionary Leaders
        </h2>
        <p className="text-gray-600">
          Meet the force behind the force, the brain of innovation and strategy
        </p>

        <div className="flex flex-wrap justify-center max-w-5xl gap-2 mx-auto mt-10 text-left lg:gap-4">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </div>

      <div className="p-8 bg-gray-100/30">
          <h2 className="text-3xl font-bold text-center">Our Locations around the world</h2>
          <p className="mt-10 text-2xl text-center text-gray-600">Europe, Middle-East, and Africa</p>
          
          <hr className="max-w-lg mx-auto my-6"/>
          <div className="flex flex-wrap justify-center  gap-[2vw] max-w-6xl mx-auto">
            {EMEALocations.map((location, index) => (
              <LocationCard key={index} {...location} />
            ))}
          </div>

          <p className="mt-10 text-2xl text-center text-gray-600">Americas</p>
          
          <hr className="max-w-lg mx-auto my-6"/>

          <div className="flex flex-wrap justify-center gap-[2vw] max-w-6xl w-fit lg:w-full mx-auto">
            {americasLocations.map((location, index) => (
              <LocationCard key={index} {...location} />
            ))}
          </div>
      </div>
    </div>
  );
};

export default AboutUs;
