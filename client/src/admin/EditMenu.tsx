import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { Loader2 } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: any;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [errors, setErrors] = useState<Partial<MenuFormSchema>>({});
  // const loading = false;
  const { editMenu, loading } = useMenuStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "Number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<MenuFormSchema>);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());

      if (input.image) {
        formData.append("image", input.image);
      }
      await editMenu(selectedMenu._id, formData);
    } catch (error) {

    }
  };

  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || "",
      image: undefined,
    });
  }, [selectedMenu]);

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Enter menu name ..."
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
            {errors && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Enter menu description ..."
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
            {errors && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div>
            <Label>Price ₹</Label>
            <Input
              type="number"
              placeholder="Enter price ..."
              name="price"
              value={input.price}
              onChange={changeEventHandler}
            />
            {errors && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div>
            <Label>Upload Menu Image</Label>
            <Input
              type="file"
              name="image"
              onChange={(e) =>
                setInput({ ...input, image: e.target.files?.[0] || undefined })
              }
            />{" "}
            {errors.image && typeof errors.image === "string" && (
              <span className="text-red-500 text-sm">{errors.image}</span>
            )}
          </div>
          <DialogFooter className="my-3">
            {loading ? (
              <Button disabled className="bg-red-500 w-full hover:bg-red-600">
                <Loader2 className="mr-2 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button className="bg-red-500 w-full hover:bg-red-600">
                Submit
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
