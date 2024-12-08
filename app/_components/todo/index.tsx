import { Avatar, Stack } from "@mui/material";


const Todo = () => {
  return (
    <Stack
      gap={3}
      className="flex border border-[#E4E7EC] rounded-xl p-[15px]"
    >
      <div className="flex justify-between items-center">
        <div className="flex relative h-max">
          <div className="w-1 bg-red-500 rounded-full mr-2"></div>
          <div className="flex-grow font-semibold text-xs text-[#1B1B1B] space-y-2">
            <div>App usability testing with Maze</div>
            <div className="text-[10px] text-[#909090]">On Slack</div>
          </div>
        </div>

        <span className="text-[10px] text-green-500 font-semibold border border-green-500 rounded-md px-2 py-1">
          on track
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between w-full items-end">
          <div className="flex-grow text-[10px] text-[#909090]">
            Not started yet
          </div>
          <div>
            <div className="flex">
              {[
                "/image/persons/person-1.png",
                "/image/persons/person-2.png",
                "/image/persons/person-1.png",
              ].map((imageSrc, index) => (
                <Avatar
                  key={index}
                  src={imageSrc}
                  sx={{ ml: "-4px", width: "24.71px", height: "24.71px" }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <span
            className="bg-green-500 h-full block rounded-full"
            style={{ width: "40%" }}
          ></span>
        </div>
      </div>
      <div className="flex">
        <div className="flex-grow">
          <span className="font-normal text-[10px] text-[#909090]">
            Due:
          </span>{" "}
          <span className="font-semibold text-[#1B1B1B] text-[11px]">
            January 21st, 2024
          </span>
        </div>
        <Stack direction="row" alignItems="center" gap={1}>
          <div className="text-sm flex items-center gap-1 bg-[#F0F0F0] rounded-lg px-2 py-1">
            <p>Research</p>
          </div>
        </Stack>
      </div>
    </Stack>
  );
};

export default Todo;
