import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { Input, InputGroup } from "rsuite";

const SearchField: React.FC<{
  value?: string;
  getSearchQuery?: (arg: string) => void;
  setValue?: Dispatch<SetStateAction<string | number | undefined>>;
}> = ({ getSearchQuery }) => {
  return (
    <InputGroup>
      <InputGroup.Addon style={{ backgroundColor: "transparent" }}>
        <Image
          src="/icons/search-2.svg"
          alt=""
          width={18}
          height={18}
          style={{ margin: "-15px 0px -15px 0px" }}
        />
      </InputGroup.Addon>
      <Input
        style={{ paddingLeft: "0px", height: "30px" }}
        placeholder="Search here..."
        onChange={(newValue) => getSearchQuery?.(newValue)}
      />
    </InputGroup>
  );
};

export default SearchField;
