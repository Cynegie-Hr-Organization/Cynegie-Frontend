import { getGridLayout } from "@/utils/grid-layout";
import { Grid2 } from "@mui/material";
import Detail from "./detail";
import { DetailGroupProps } from "./types";

const DetailGroup: React.FC<DetailGroupProps> = (props) => {
  const {
    isCard,
    loading,
    details,
    gridLayout,
    spaceBetweenLayout,
    statusMap,
    gridItemSize,
  } = props;

  return (
    <div className={isCard ? "common-card" : ""}>
      {!spaceBetweenLayout && (
        <Grid2 container spacing={3}>
          {details?.map((item, index) => (
            <Grid2
              key={index}
              size={gridItemSize ?? getGridLayout(index, gridLayout)}
            >
              <Detail
                loading={loading}
                name={item.name}
                value={item.value}
                type={item.type}
                statusMap={item.statusMap}
                icon={item.icon}
              />
            </Grid2>
          ))}
        </Grid2>
      )}
      {spaceBetweenLayout && (
        <div className="flex flex-col gap-5">
          {details?.map((item, index) => (
            <Detail
              key={index}
              name={item.name}
              value={item.value}
              spaceBetweenLayout={spaceBetweenLayout}
              type={item.type}
              statusMap={statusMap}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailGroup;
