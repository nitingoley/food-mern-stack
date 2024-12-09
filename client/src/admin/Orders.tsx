import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";

const Orders = () => {
  return (
    <div className="max-w-6xl mt-auto py-10 px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
        Orders Overviews
      </h1>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start bg-white text-gray-800 dark:text-white shadow-sm border sm:items-center rounded-xl p-6 sm:p-8 border-gray-200 dark:border-gray-700">
          <div className="flex-1 mb-6 sm:mb-0">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Lorem
            </h1>
            <p className="text-gray-600  dark:text-gray-400 mt-2">
              Address :{" "}
              <span className="font-semibold">Bareilly,Uttar Pradesh</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Totol Amount : <span className="font-semibold">420</span>
            </p>
          </div>
          {/* order status  */}
          <div className="w-full sm:w-1/3">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
              Order Status 
            </Label> 
        
            <Select>
                <SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                ["Pending" , "Confirmed" , "Preparing", "OutForDelivery" , "Delivered"].map((status:string, index:number)=>(
                                    <SelectItem key={index} value={status.toLowerCase()}>{status}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </SelectTrigger>
            </Select>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
