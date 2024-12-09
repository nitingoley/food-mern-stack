import { Label } from "@radix-ui/react-menubar";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useRestaurantStore } from "@/store/useRestaurantStore";

export type FilterOptionState = {
  id: string;
  label: string;
};

const filterOptions: FilterOptionState[] = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "biryani", label: "Biryani" },
  { id: "momos", label: "Momos" },
];

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } =
    useRestaurantStore();

  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value);
  };

  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisine</h1>
        <Button variant={"link"} onClick={resetAppliedFilter}>
          Reset
        </Button>
      </div>
      {filterOptions.map((option) => (
        <div className="flex items-center space-x-2 my-2" key={option.id}>
          <Checkbox
            key={option.id}
            checked={appliedFilter.includes(option.label)}
            onClick={() => appliedFilterHandler(option.label)}
          />

          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;
