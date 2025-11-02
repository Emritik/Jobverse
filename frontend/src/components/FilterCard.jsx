import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Noida"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-10", "10-20", "20+"]
  },
]

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    Location: '',
    Industry: '',
    Salary: ''
  });

  const dispatch = useDispatch();

  // Dispatch updated filters to Redux
  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilters));
  }, [selectedFilters]);

  // When a radio is selected for any filter group
  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: value
    }));
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSelectedFilters({
      Location: '',
      Industry: '',
      Salary: ''
    });
  };

  return (
    <div className='w-full p-3 rounded-md border border-border/50 bg-background/60 backdrop-blur'>
      <div className="flex justify-between items-center">
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
          className='text-xs md:text-sm'
        >
          Clear Filters
        </Button>
      </div>

      <hr className='mt-3 border-border/50' />

      {filterData.map((data, index) => (
        <div key={index} className="mt-4">
          <h1 className='font-bold text-base md:text-lg mb-2'>{data.filterType}</h1>

          <RadioGroup
            value={selectedFilters[data.filterType]}
            onValueChange={(value) => handleFilterChange(data.filterType, value)}
          >
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={idx} className='flex items-center space-x-2 my-2'>
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="border-accent text-accent"
                  />
                  <Label
                    htmlFor={itemId}
                    className="text-foreground text-sm md:text-base"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
