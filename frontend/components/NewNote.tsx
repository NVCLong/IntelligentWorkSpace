import React from "react";
import { FiFolderPlus } from "react-icons/fi";
import {createFolder, createNote, createRootFolder} from "../lib/apiCall";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
} from "@nextui-org/react";

export const NewNote = (userId:any) => {
    const [noteContent, setNoteContent] = React.useState("");
    const [noteTitle, setNoteTitle] = React.useState("");

    const handleInputTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNoteTitle(e.target.value);
    }

    const handleInputContent = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNoteContent(e.target.value);
    }
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSubmit =async () => {
        const request = {
            title: noteTitle,
            content : noteContent
        }
        console.log("create note")
        const response = await createNote(userId.userId,request)
        console.log(response)
    };

    return (
      <div className="mt-24 ml-5">
        <Button
          className="flex items-center px-4 py-2 text-gray-600 bg-white border rounded-full shadow-md cursor-pointer hoverScale"
          color="primary"
          onPress={onOpen}
        >
          <FiFolderPlus size={24} />
          <span className="font-semibold md:block">New note</span>
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create new note
                </ModalHeader>

                <ModalBody>
                  <Input
                    autoFocus
                    value={noteTitle}
                    onChange={handleInputTitle}
                    placeholder="Enter note title"
                    variant="underlined"
                  />
                  <Input

                    value={noteContent}
                    onChange={handleInputContent}
                    placeholder="Enter note content"
                    variant="bordered"
                  />
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={(e) => {
                      handleSubmit();
                      onClose();
                      window.location.reload();
                    }}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
};