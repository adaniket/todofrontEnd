import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdDelete, MdPending } from "react-icons/md";
import { FormControl, FormField, FormItem, Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const ListCard = ({ item, subTask, handleDeleteTask, handleTaskStatus }) => {
  const form = useForm({
    defaultValues: {
      status: item.status === "completed", // Set true if status is completed
    },
  });

  // Handle checkbox state changes
  const handleCheckboxChange = (checked) => {
    // Update the form state
    form.setValue("status", checked);

    // Trigger external task status handler
    handleTaskStatus(checked, item._id);
  };

  return (
    <li>
      <Card className="my-3 bg-neutral-500 bg-opacity-30 backdrop-blur-sm rounded-lg">
        <CardContent className="py-2 px-3 flex items-center justify-between">
          <div
            className="flex items-center flex-none"
            style={{ flexBasis: "80%" }}
          >
            <Form {...form}>
              <form>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={handleCheckboxChange}
                      style={{
                        position: "relative",
                        top: "2px",
                        borderColor: subTask.styleDetails.color,
                      }}
                    />
                  )}
                />
              </form>
            </Form>
            <h4
              className="mx-2 inline-block text-lg"
              style={{ color: subTask.styleDetails.color }}
            >
              {item.taskName}
            </h4>
          </div>
          <div
            className="flex items-center gap-2 flex-none"
            style={{ flexBasis: "10%" }}
          >
            {form.getValues("status") ? (
              <IoCheckmarkDoneCircle
                className="text-xl"
                style={{ color: subTask.styleDetails.color }}
              />
            ) : (
              <MdPending
                className="text-xl"
                style={{ color: subTask.styleDetails.color }}
              />
            )}
            <MdDelete
              className="text-xl"
              onClick={() => handleDeleteTask(item._id)}
              style={{ color: subTask.styleDetails.color }}
            />
          </div>
        </CardContent>
      </Card>
    </li>
  );
};

export default ListCard;
