const EmptyTable = ({ message = 'No records found', colSpan = 8 }: { message: string, colSpan?: number }) => {
  return (
    <tr>
      <td colSpan={colSpan} className='px-4 py-4 p-3'>
        <div className="h-full w-full border-2 border-dashed p-3 rounded-lg">
          <p className='text-sm text-center text-neutral-500 font-semibold'>{message}</p>
        </div>
      </td>
    </tr>
  )
}

export default EmptyTable;