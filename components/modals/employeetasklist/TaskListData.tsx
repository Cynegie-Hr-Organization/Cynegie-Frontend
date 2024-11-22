import React, { ReactNode } from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CiCalendarDate } from 'react-icons/ci';
import { Input } from '@/components/ui/input';
import { IoMdTime } from 'react-icons/io';

interface Data {
  id: number;
  header: string;
  dropdown: React.ReactNode;
  details: React.ReactNode;
  description: string;
  activities: {
    image?: React.ReactNode;
    textarea?: React.ReactNode;
  };
  activity: {
    image?: ReactNode;
    name?: ReactNode;
    time?: ReactNode;
    description?: ReactNode;
  };
}

interface Detials {
  id: number;
  heading: string;
  title?: React.ReactNode;
}

const detailsAccordion: Detials[] = [
  {
    id: 1,
    heading: 'APP NAME',
    title: 'Slack',
  },
  {
    id: 2,
    heading: 'ASSIGNED TO',
    title: (
      <Image
        fill
        src=''
        alt={'Group of people'}
        className={'object-fit'}
      />
    ),
  },
  {
    id: 3,
    heading: 'CREATED',
    title: (
      <span className={'flex items-center gap-1.5 font-semibold'}>
        <CiCalendarDate size={'20px'} />
        Nov 10,2021
      </span>
    ),
  },
  {
    id: 4,
    heading: 'LABEL',
    title: (
      <ul className={'list-disc text-[#38BDF8]'}>
        <li>Development</li>
      </ul>
    ),
  },
  {
    id: 5,
    heading: 'DUE DATE',
    title: (
      <span className={'flex items-center gap-1.5 font-semibold'}>
        <CiCalendarDate size={'20px'} />
        Nov 20,2021
      </span>
    ),
  },
];

export const TaskListData: Data[] = [
  {
    id: 1,
    header: 'WorkStation',
    dropdown: (
      <Select>
        <SelectTrigger
          className={'bg-black text-white border-none w-[25%] lg:w-[15%]'}
        >
          <SelectValue placeholder={'To Do'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="todo">Todo</SelectItem>
            <SelectItem value="in progress">In progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
    details: (
      <Accordion type={'single'} collapsible>
        <AccordionItem value={'item-1'}>
          <AccordionTrigger className={'flex'}>Details</AccordionTrigger>
          <AccordionContent
            className={
              'flex flex-wrap items-center justify-between gap-5 lg:flex-nowrap'
            }
          >
            {detailsAccordion.map((items) => (
              <div key={items.id}>
                <h1 className={'text-[#94A3B8] mb-5'}>{items.heading}</h1>
                <p className={'font-semibold'}>{items.title}</p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    description:
      'Analytics delivers actionable, industry-ready initiatives each time a business complete their full account. Phasellus vitae amet amet, mauris faucibus at sit. Pellentesque rhoncus adipiscing a enim, quis tortor, non etiam. Eget faucibus mattis consequat dui imperdiet scelerisque. Lorem placerat blandit ut lobortis volutpat convallis libero. Sed imperdiet dignissim ipsum quam.',
    activities: {
      image: (
        <Image
          width={40}
          height={40}
          src='/image/persons/person-2.png'
          alt={'Linda'}
          className={'object-cover'}
        />
      ),
      textarea: (
        <>
          <Input placeholder={'Add a comment'} />
          <p className={'mt-2.5'}>
            Pro tip:{' '}
            <span className={'text-[#64748B]'}>
              press <strong className={'text-black'}>M</strong> to comment
            </span>
          </p>
        </>
      ),
    },
    activity: {
      image: (
        <Image
          width={40}
          height={40}
          src='/image/persons/person-2.png'
          alt={'Linda'}
          className={'object-cover'}
        />
      ),
      name: (
        <div className={'flex items-center gap-3.5 leading-loose'}>
          <h1 className={'font-semibold'}>Andre Voleavaou</h1>
          <span className={'flex items-center text-[#94A3B8]'}>
            <IoMdTime size={'20px'} />
            10 hours ago
          </span>
        </div>
      ),
      description: (
        <p className={'text-[#64748B]'}>
          Almost there <span className={'text-[#2563EB]'}>@Angela</span>, can
          you see the comments in Figma now!
        </p>
      ),
    },
  },
];
