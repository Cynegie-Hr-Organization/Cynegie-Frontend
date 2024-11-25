import Appbutton from "@/app/_components/shared/buttons";
import NewHireList from "./new-hire-list";

const TemplatePage = () => {
  return (
    <div>
      <div className=' flex items-center justify-between mb-11'>
        <div>
          <h3 className='text-[18px] font-semibold'>Onboarding Templates</h3>
          <p className='text-sm'>Create and use templates</p>
        </div>
        <Appbutton buttonText='Create New Template' className='bg-primary hidden md:block' />
      </div>
      <NewHireList />
    </div>
  );
};

export default TemplatePage;
