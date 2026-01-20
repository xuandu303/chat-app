import { useAppStore } from "@/store";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor, formatLastMessageTime } from "@/lib/utils";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
    userInfo,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div>
      {contacts?.map((contact) => (
        <div
          key={contact._id}
          className={`pl-2 py-2 transition-all duration-300 rounded-lg cursor-pointer ${selectedChatData && selectedChatData._id === contact._id ? "bg-gray-500/20" : "hover:bg-gray-500/40"}`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-2 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="w-11.5 h-11.5 rounded-full overflow-hidden">
                {contact.image ? (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="object-cover rounded-full w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`${getColor(contact.color)} uppercase h-11.5 w-11.5 text-lg border-1px flex items-center justify-center rounded-full`}
                  >
                    {contact.firstName
                      ? contact.firstName.split("").shift()
                      : contact.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            )}
            {isChannel && (
              <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
            {isChannel ? (
              <span className="font-semibold">{contact.firstName}</span>
            ) : (
              <div className="flex flex-col items-start justify-center gap-0">
                <span className="font-semibold">{`${contact.firstName} ${contact.lastName}`}</span>
                <div className="flex items-center justify-start gap-0.5 text-sm text-white/40 ">
                  <span className="truncate max-w-40">
                    {contact.lastMessageSenderId === userInfo.id
                      ? contact.lastMessageType === "text"
                        ? `You: ${contact.lastMessage}`
                        : "You sent an attachment"
                      : contact.lastMessageType === "text"
                        ? contact.lastMessage
                        : `${contact.firstName} sent an attachment`}
                  </span>
                  <span>·</span>
                  <span className="">
                    {formatLastMessageTime(contact.lastMessageTime)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
