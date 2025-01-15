import { useEffect, useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoMenu } from 'react-icons/io5';
import { Avatar } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getUserDetails } from '@/utils/getUserDetails';
import RecentActivities from '../../it-admin/pages/it-admin/recent-activities';
import { rolesMap } from '@/types/form';
import { AppSelect } from '../select';
import { PiBell } from 'react-icons/pi';

const reverseRolesMap: Record<string, string> = Object.entries(rolesMap).reduce(
  (acc: Record<string, string>, [role, path]) => {
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path; // Remove leading slash for consistency
    acc[normalizedPath] = role;
    return acc;
  },
  {}
);



const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const [userName, setUserName] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [currentRole, setCurrentRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        if (userDetails) {
          setUserName(userDetails.name);
          setRoles(userDetails.roles || []);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();

    // Set current date
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    setCurrentDate(date.toLocaleDateString('en-US', options));
  }, []);

  useEffect(() => {
    // Extract the first segment of the pathname
    const path = pathname.split('/').filter(Boolean)[0]; // Split and remove empty segments
    const roleFromPath = reverseRolesMap[path];
    
    if (roleFromPath) {
      setCurrentRole(roleFromPath);
    } else {
      console.warn(`No role found for pathname segment: ${path}`);
    }
  }, [pathname]);

  const handleRoleChange = (role: string) => {
    setCurrentRole(role);

    // Navigate directly to the role's respective dashboard path
    const redirectPath = rolesMap[role];
    if (redirectPath) {
      router.push(redirectPath);
    } else {
      console.error('No valid redirect path found for this role');
    }
  };

  const handleNotificationClick = () => {
    setIsPopupVisible((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between p-5 md:border-b md:border-DreamyCloud md:bg-white">
      <div className="items-center hidden gap-3 xl:flex">
        <div>
          {loading ? (
            <ProfileSkeleton />
          ) : (
            <div className="flex items-center gap-2">
              <Avatar className="w-[40px] h-[40px]" src="" alt="avatar" />
              <div className="space-y-1">
                <p className="font-sans text-lg font-bold text-Sambucus">
                  Welcome, {userName || 'User'} 👋
                </p>
                {currentDate && (
                  <p className="font-sans text-xs font-normal text-Charcoal">
                    It’s {currentDate}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="items-center justify-between hidden gap-5 xl:flex">
        <AppSelect
          listItems={roles.map((role) => ({ label: role, value: role }))}
          onChange={(value) => handleRoleChange(value)}
          placeholder={currentRole || 'Select a role'}
        />

        <PiBell strokeWidth={3} size={25} onClick={handleNotificationClick} />
      </div>

      <h3 className="xl:hidden font-semibold text-lg">Overview</h3>

      <div className="z-50 flex items-center gap-5 xl:hidden">
        <PiBell size={25} onClick={handleNotificationClick} />
        <IoMenu size={28} onClick={onMenuClick} />
      </div>

      {isPopupVisible && (
        <div className="absolute z-50 bg-white max-w-xs w-full top-16 right-5">
          <RecentActivities recentAlerts={[]} isLoading={false} />
        </div>
      )}
    </div>
  );
};

const ProfileSkeleton = () => {
  return (
    <div className='flex gap-x-2 items-center'>
      <Skeleton width={40} height={40} circle className='my-0' />
      <div className=''>
        <Skeleton width={200} height={16} className='mt-2' />
        <Skeleton width={200} height={12} className='my-0' />
      </div>
    </div>
  );
};

export default Header;
