import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { Restaurant } from "@/types/resturantTypes";

const API_END_POINT = "http://localhost:4000/api/v1/restaurant";

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchedRestaurant, setSearchedRestaurant] = useState<any>(null);
  const [appliedFilter, setAppliedFilter] = useState<string[]>([]);

  useEffect(() => {
    if (params.text) {
      searchRestaurant(params.text, searchQuery, appliedFilter);
    }
  }, [params.text, searchQuery, appliedFilter]);

  const searchRestaurant = async (
    searchText: string,
    query: string,
    selectedCuisines: string[]
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("searchQuery", query);
      params.set("selectedCuisines", selectedCuisines.join(","));
      const response = await axios.get(
        `${API_END_POINT}/search/${searchText}?${params.toString()}`
      );
      if (response.data.success) {
        setSearchedRestaurant(response.data);
      } else {
        setSearchedRestaurant({ data: [] });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter: string) => {
    const isAlreadyApplied = appliedFilter.includes(filter);
    const updatedFilters = isAlreadyApplied
      ? appliedFilter.filter((item) => item !== filter)
      : [...appliedFilter, filter];
    setAppliedFilter(updatedFilters);
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          {/* Search Input Field */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              onClick={() =>
                searchRestaurant(params.text!, searchQuery, appliedFilter)
              }
              className="bg-orange hover:bg-hoverOrange"
            >
              Search
            </Button>
          </div>

          {/* Filter Badges */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
            <h1 className="font-medium text-lg">
              ({searchedRestaurant?.data.length}) Search result found
            </h1>
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              {appliedFilter.map((selectedFilter: string, idx: number) => (
                <div key={idx} className="relative inline-flex items-center">
                  <Badge
                    className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
                    variant="outline"
                  >
                    {selectedFilter}
                  </Badge>
                  <X
                    onClick={() => handleFilterChange(selectedFilter)}
                    size={16}
                    className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Restaurant Cards */}
          <div>
            <div className="grid md:grid-cols-3 gap-4">
              {loading ? (
                <SearchPageSkeleton />
              ) : !loading && searchedRestaurant?.data.length === 0 ? (
                <NoResultFound searchText={params.text!} />
              ) : (
                searchedRestaurant?.data.map((restaurant: Restaurant) => (
                  <Card
                    key={restaurant._id}
                    className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="relative">
                      <AspectRatio ratio={16 / 6}>
                        <img
                          src={restaurant.imageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Featured
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {restaurant.restaurantName}
                      </h1>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <p className="text-sm">
                          City:{" "}
                          <span className="font-medium">{restaurant.city}</span>
                        </p>
                      </div>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <Globe size={16} />
                        <p className="text-sm">
                          Country:{" "}
                          <span className="font-medium">
                            {restaurant.country}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {restaurant.cuisines.map(
                          (cuisine: string, idx: number) => (
                            <Badge
                              key={idx}
                              className="font-medium px-2 py-1 rounded-full shadow-sm"
                            >
                              {cuisine}
                            </Badge>
                          )
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                      <Link to={`/restaurant/${restaurant._id}`}>
                        <Button className="bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                          View Menus
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const SearchPageSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden"
        >
          <div className="relative">
            <AspectRatio ratio={16 / 6}>
              <Skeleton className="w-full h-full" />
            </AspectRatio>
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardContent>
          <CardFooter className="p-4 dark:bg-gray-900 flex justify-end">
            <Skeleton className="h-10 w-24 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found for "{searchText}"
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        Please try searching with different keywords.
      </p>
    </div>
  );
};
