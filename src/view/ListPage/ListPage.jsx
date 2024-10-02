import MainLayout from "@/components/Layout/MainLayout";
import React, { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";
import InlineSVG from "react-inlinesvg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import ApiRoutes from "@/api/apiRoutes";
import userData from "@/store/user";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import BarLoader from "@/components/Loader/BarLoader";
import { MdDelete } from "react-icons/md";

const ListPage = () => {
  const api = new ApiRoutes(import.meta.env.VITE_API_URL);
  const [loading, setLoading] = useState();
  const [listData, setListData] = useState([]);

  const { data } = userData();
  const { toast } = useToast();
  const navigate = useNavigate();

  async function getList(userId) {
    setLoading(true);
    try {
      const response = await api.getList(userId);
      if (response.status == "success") {
        setListData(response.data);
      }
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast({
          variant: "destructive",
          title: `${error.response?.message}`,
        });
      }
      return null;
    }
  }

  const handleNavigate = (id) => {
    const listDataById = listData.find((item) => item._id === id);
    navigate(`/list-page/details/${id}`, {
      state: { key: JSON.stringify(listDataById) },
    });
  };

  useEffect(() => {
    if (data.id) {
      getList(data.id);
    }
  }, [data.id]);

  const handleDelete = async (listId) => {
    const payload = {
      listId,
    };
    try {
      const response = await api.post("task/delete-list", payload);
      if (response.status == "success") {
        toast({
          variant: "success",
          title: `List is deleted!`,
        });
        setListData(response.data);
      } else {
        toast({
          variant: "destructive",
          title: `There is server problem!`,
        });
      }
    } catch (error) {
      if (error.response) {
        toast({
          variant: "destructive",
          title: `${error.response?.message}`,
        });
      }
      return null;
    }
  };

  return (
    <MainLayout>
      {loading ? (
        <div className="h-[80vh] flex items-center justify-center">
          <BarLoader />
        </div>
      ) : (
        <div class="grid grid-cols-2 gap-2">
          {listData?.map((item, index) => {
            const avatarSvg = createAvatar(bottts, {
              seed: item.name + String(index), // Generate a unique avatar for each user based on their name
            });
            return (
              <div key={item._id} className="relative">
                <div onClick={() => handleNavigate(item._id)}>
                  <Card
                    className="border-neutral-500/50 bg-neutral-800/20 rounded shadow "
                    style={{
                      backgroundColor: item?.styleDetails?.backgroundColor,
                    }}
                  >
                    <CardHeader>
                      <CardTitle
                        className="text-center text-white"
                        style={{ color: item?.styleDetails?.color }}
                      >
                        {item.listName}
                      </CardTitle>
                      <div
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "8px",
                          fontSize: "16px",
                          color: "red",
                        }}
                      >
                        <MdDelete
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item._id);
                          }}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="avatar-holder">
                        <InlineSVG src={avatarSvg.toDataUri()} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </MainLayout>
  );
};

export default ListPage;
