"use client";
import React from "react";
import { Card, CardFooter } from "@nextui-org/card";
import {getFile} from "@/lib/apiCall";
import {Image} from "@nextui-org/react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {deletePermanently} from "@/lib/apiCall";



interface File {
  id: string;
  file_name: string;
  file_url: string;
  size: number;
  isDeleted: boolean;
}

interface FileListProps {
  files: File[];
}

// @ts-ignore
const FileList: React.FC<FileListProps> = ({ files }) => {
  const userId = localStorage.getItem("userId")
  const storageId = localStorage.getItem("storageID")

  const handleDelete = async (fileId:number, storageId:number, userId:number) => {
     const data = await deletePermanently(fileId, storageId, userId);
     console.log(data)
  };

  const handleDownload = async (fileId: string,fileName:string) => {
    try {
      const fileData = await getFile(fileId, fileName, userId);

      // @ts-ignore
      const url = window.URL.createObjectURL(fileData);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    }catch (e){
      throw  e
    }
  }

  return (
    <div className="relative flex flex-col justify-center py-6 overflow-hidden sm:py-12">
      <div className="w-full max-w-screen-xl px-4 mx-auto">
        <div className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {files.map((file) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <ContextMenuContent className="w-64 bg-slate-200 ">
                  <ContextMenuItem
                    className="hover:bg-slate-600 "
                    onClick={() => {
                      handleDownload(file.id, file.file_name);
                    }}
                  >
                    <ContextMenuLabel className="hover:text-white">
                      Download
                    </ContextMenuLabel>
                  </ContextMenuItem>
                  <ContextMenuItem
                    className="hover:bg-slate-600 "
                    onClick={() => {
                      // @ts-ignore
                      handleDelete(file.id, storageId, userId);
                      // window.location.reload();
                    }}
                  >
                    <ContextMenuLabel className="hover:text-white">
                      Delete permanently
                    </ContextMenuLabel>
                  </ContextMenuItem>
                </ContextMenuContent>

                <Card
                  isFooterBlurred={true}
                  isHoverable={true} radius="lg"
                  className="border-none hoverScale"
                >
                  {file.file_name.split(".")[1].toLowerCase() === "png" ? (
                    <Image
                      alt="image file icon"
                      className=""
                      src="/imageIcon.png"
                      width={300}
                      height={300}
                    />
                  ) : file.file_name.split(".")[1].toLowerCase() === "txt" ? (
                    <Image
                      alt="image file icon"
                      className=""
                      src="/txtIcon.png"
                      width={300}
                      height={300}
                    />
                  ) : file.file_name.split(".")[1].toLowerCase() === "docx" ? (
                    <Image
                      alt="image file icon"
                      className=""
                      src="/docxIcon.png"
                      width={300}
                      height={300}
                    />
                  ) : (
                    <div className="{/* Styles for unknown file type */}">
                      Unsupported File Type
                    </div>
                  )}
                  <CardFooter className="flexCenter  before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-md rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-large ml-1 z-10">
                    <h4 className="text-white truncate font-regular text-small">
                      {file.file_name}
                    </h4>
                  </CardFooter>
                </Card>
              </ContextMenuTrigger>
            </ContextMenu>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileList;