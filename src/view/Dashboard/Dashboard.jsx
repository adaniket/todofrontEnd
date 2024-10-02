import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HexColorPicker } from "react-colorful";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import userData from "@/store/user";
import ApiRoutes from "@/api/apiRoutes";
const Dashboard = () => {
  const api = new ApiRoutes("http://localhost:4000/api");
  const [colorValue, setColorValue] = useState("#aabbcc");
  const [colorValueText, setColorValueText] = useState("#000");
  const [listName, setListName] = useState("");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data } = userData();

  const addTask = async (payload) => {
    try {
      const res = await api.post("task/create-list", payload);
      if (res.status === "success") {
        toast({
          variant: "success",
          title: "List Created check in list page!",
        });
      }
    } catch (error) {
      toast({
        variant: "destrctive",
        title: error,
      });
    }
  };

  const handleModal = () => {
    setOpen(!open);
  };
  const handleSubmitList = () => {
    if (!listName) {
      toast({
        variant: "destructive",
        title: "Please add list name first!",
      });
    } else {
      const styleDetails = {
        backgroundColor: colorValue,
        color: colorValueText,
      };
      const listData = {
        listName,
        styleDetails,
        userId: data.id,
      };
      addTask(listData);
      setListName("");
      setColorValue("#aabbcc");
      setColorValueText("#000");
      setOpen(false);
    }
  };
  return (
    <MainLayout>
      <div
        className=" flex justify-center items-center"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <Dialog open={open} onOpenChange={handleModal}>
          <DialogTrigger asChild onClick={handleModal}>
            <Button>
              Create <span className="text-green-300 font-bold">To</span>
              <span className="font-bold text-orange-200">Do</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gray-300">
            <DialogHeader className="my-4">
              <div className="flex gap-1 justify-center">
                <span className="font-bold">To</span>
                <span className="font-bold">Do</span>
              </div>
            </DialogHeader>

            <div>
              <Input
                id="name"
                name="listName"
                className="col-span-3"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="List Name"
              />
            </div>
            <div className="my-3 flex flex-col items-center gap-2">
              <Label className="text-1xl">Pick colors </Label>
              <Tabs defaultValue="bg" className="w-full text-center">
                <TabsList>
                  <TabsTrigger value="bg">Background</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                </TabsList>
                <TabsContent value="bg">
                  <div className="flex flex-col items-center">
                    <HexColorPicker
                      color={colorValue}
                      onChange={setColorValue}
                    />
                    <p>{colorValue}</p>
                  </div>
                </TabsContent>
                <TabsContent value="text">
                  <div className="flex flex-col items-center">
                    <HexColorPicker
                      color={colorValueText}
                      onChange={setColorValueText}
                    />
                    <p>{colorValueText}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmitList}>
                Save List
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
