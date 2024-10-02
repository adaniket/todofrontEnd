import ApiRoutes from "@/api/apiRoutes";
import MainLayout from "@/components/Layout/MainLayout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BarLoader from "@/components/Loader/BarLoader";
import ListCard from "./ListCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const DetailsPage = () => {
  const api = new ApiRoutes(import.meta.env.VITE_API_URL);
  const [subTask, setSubTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loadingForSubTask, setLoadingForSubTask] = useState(false);
  const { id } = useParams();
  const { toast } = useToast();

  // Fetch task details
  async function getListData(id) {
    setInitialLoading(true);
    try {
      const response = await api.get("task/single-task", id);
      if (response.status === "success") {
        setSubTask(response.data[0]);
      }
    } catch (error) {
      if (error.response) {
        toast({
          variant: "destructive",
          title: error.response?.message || "An error occurred",
        });
      }
    } finally {
      setInitialLoading(false);
    }
  }

  // Add a new task
  const handleAddTask = async (values) => {
    setLoading(true);
    if (values.taskValue) {
      const payload = {
        taskName: values.taskValue,
        status: "pending",
        listId: id,
      };
      try {
        const response = await api.post("task/add-task", payload);
        if (response.status === "success") {
          setSubTask(response.data);
          toast({
            variant: "success",
            title: "Task added to the list!",
          });
        }
      } catch (error) {
        if (error.response) {
          toast({
            variant: "destructive",
            title: error.response?.data?.message || "Failed to add task",
          });
        }
      } finally {
        setLoading(false);
        form.reset(); // Reset the form after submission
      }
    }
  };

  // delete task
  const handleDeleteTask = async (taskId) => {
    setLoadingForSubTask(true);
    const payload = {
      taskId,
      listId: id,
    };
    try {
      const response = await api.post("task/delete-task", payload);
      if (response.status === "success") {
        setSubTask(response.data);
        toast({
          variant: "success",
          title: "Task deleted!",
        });
      }
    } catch (error) {
      if (error.response) {
        toast({
          variant: "destructive",
          title: error.response?.data?.message || "Failed to delete task",
        });
      }
    } finally {
      setLoadingForSubTask(false);
    }
  };

  // update status of the task

  const handleTaskStatus = async (checked, taskId) => {
    const payload = {
      status: checked ? "completed" : "pending",
      taskId,
      listId: id,
    };
    try {
      const response = await api.post("task/update-task-status", payload);
      if (response.status === "success") {
        setSubTask(response.data);
        toast({
          variant: "success",
          title: "Task status changed!",
        });
      }
    } catch (error) {
      if (error.response) {
        toast({
          variant: "destructive",
          title: error.response?.data?.message || "Failed to update task",
        });
      }
    } finally {
    }
  };
  // Form validation schema
  const formSchema = z.object({
    taskValue: z.string().min(1, "Please write your task."),
  });

  // React Hook Form setup
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskValue: "",
    },
  });

  // Form submission handler
  const onSubmit = (values) => {
    handleAddTask(values);
  };

  useEffect(() => {
    if (id) {
      getListData(id);
    }
  }, [id]);

  return (
    <MainLayout>
      {initialLoading ? (
        <div className="h-[80vh] flex items-center justify-center">
          <BarLoader />
        </div>
      ) : (
        <Card
          className="rounded shadow"
          style={{ backgroundColor: subTask?.styleDetails?.backgroundColor }}
        >
          <CardHeader>
            <CardTitle
              className="text-center"
              style={{ color: subTask?.styleDetails?.color }}
            >
              {subTask?.listName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="taskValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="New task" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="my-3" type="submit" disabled={loading}>
                    {loading ? (
                      <BarLoader height={30} width={40} />
                    ) : (
                      "Add Task"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            <div>
              {loadingForSubTask ? (
                <div className="h-[10vh] my-5 flex justify-center items-center">
                  <BarLoader height={50} width={50} />
                </div>
              ) : (
                <ul>
                  {subTask.taskList?.length > 0 ? (
                    subTask.taskList.map((item, index) => (
                      <ListCard
                        key={index}
                        item={item}
                        subTask={subTask}
                        handleDeleteTask={handleDeleteTask}
                        handleTaskStatus={handleTaskStatus}
                      />
                    ))
                  ) : (
                    <h3
                      className="text-center font-bold"
                      style={{ color: subTask?.styleDetails?.color }}
                    >
                      No tasks added!
                    </h3>
                  )}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </MainLayout>
  );
};

export default DetailsPage;
