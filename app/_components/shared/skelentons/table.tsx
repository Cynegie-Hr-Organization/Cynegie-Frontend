import { Skeleton } from "@/components/ui/skeleton"



const TableSkeleton = () => {
  return (
    <div className="-mx-5 overflow-x-auto" >
      <table className='w-full border-collapse'>
        <thead className='bg-[#F7F9FC]'>
          <tr>
            <th className='px-6 py-3 text-left'>
              <Skeleton className="w-4 h-4 rounded-md bg-neutral-400" />
            </th>
            <th className='px-4 py-3 text-left'>
              <Skeleton className="w-24 h-4 rounded-md bg-neutral-400" />
            </th>
            <th className='px-4 py-3 text-left'>
              <Skeleton className="w-24 h-4 rounded-md bg-neutral-400" />
            </th>
            <th className='px-4 py-3 text-left'>
              <Skeleton className="w-32 h-4 rounded-md bg-neutral-400" />
            </th>
            <th className='px-4 py-3 text-left'>
              <Skeleton className="w-24 h-4 rounded-md bg-neutral-400" />
            </th>
            <th className='px-4 py-3 text-left'>
              <Skeleton className="w-20 h-4 rounded-md bg-neutral-400" />
            </th>
            <th className='px-4 py-3 text-left'>
              <Skeleton className="w-10 h-4 rounded-md bg-neutral-400" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, idx) => (
            <tr key={idx} className='border-b border-[#E4E7EC]'>
              <td className='px-6 py-4'><Skeleton className="w-4 h-4 rounded-md bg-neutral-300" /></td>
              <td className='px-4 py-4'><Skeleton className="w-24 h-2 rounded-md bg-neutral-300" /></td>
              <td className='px-4 py-4'><Skeleton className="w-24 h-2 rounded-md bg-neutral-300" /></td>
              <td className='px-4 py-4'><Skeleton className="w-32 h-2 rounded-md bg-neutral-300" /></td>
              <td className='px-4 py-4'><Skeleton className="w-24 h-2 rounded-md bg-neutral-300" /></td>
              <td className='px-4 py-4'><Skeleton className="w-20 h-2 rounded-full bg-neutral-300" /></td>
              <td className='px-4 py-4'><Skeleton className="w-10 h-2 rounded-md bg-neutral-300" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default TableSkeleton