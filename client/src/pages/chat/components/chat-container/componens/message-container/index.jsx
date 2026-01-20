import apiClient from "@/lib/api-client";
import { useAppStore } from "@/store";
import { GET_ALL_MESSAGES_ROUTES } from "@/utils/constants";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { HOST } from "@/utils/constants";
import { HiDocumentText } from "react-icons/hi2";
import { formatFileSize } from "@/lib/utils";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
    setSelectedChatMessages,
  } = useAppStore();
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTES,
          { id: selectedChatData._id },
          { withCredentials: true },
        );
        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages.length]);

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpeg|jpg|gif|png|bmp|tiff|tif|svg|webp|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={message._id}>
          {showDate && (
            <div className="text-center text-gray-500 font-semibold text-sm my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const downloadFile = async (url, name) => {
    const response = await apiClient.get(`${HOST}/${url}`, {
      responseType: "blob",
    });
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
  };

  const renderDMMessages = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff] text-white"
              : " bg-gray-500/50 text-white/80"
          } inline-block py-1.5 px-2.5 rounded-full my-1 wrap-break-word`}
        >
          {message.content}
        </div>
      )}
      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-white/20 text-white max-w-[50%]"
              : "bg-gray-500/50 text-white/80"
          } inline-block my-1 rounded-[18px] wrap-break-word`}
        >
          {checkIfImage(message.file.url) ? (
            <div
              className="relative cursor-pointer group"
              onClick={() => {
                setShowImage(true);
                setImage({ url: message.file.url, name: message.file.name });
              }}
            >
              <img
                className="object-cover rounded-[18px]"
                src={`${HOST}/${message.file.url}`}
                height={300}
                width={300}
              />
              <div className="absolute inset-0 rounded-[18px] bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          ) : (
            <div
              className="flex items-center justify-center gap-2.5 cursor-pointer p-2 px-3"
              onClick={() => downloadFile(message.file.url, message.file.name)}
            >
              <span className="text-white text-md bg-black/20 rounded-full p-2">
                <HiDocumentText />
              </span>
              <div className="flex flex-col items-start justify-center">
                <span className="whitespace-nowrap text-[15px] font-semibold">
                  {message.file.name}
                </span>{" "}
                <span className="text-xs text-gray-200/50">
                  {formatFileSize(message.file.size)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="text-xs text-gray-500 font-semibold">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 px-8 w-full">
      {renderMessages()}
      <div ref={scrollRef} />
      {showImage && (
        <div className="fixed inset-0 z-1000 flex items-start justify-center overflow-hidden">
          <img
            src={`${HOST}/${image.url}`}
            className="absolute inset-0 h-full w-full object-cover scale-110 blur-xl"
            alt=""
          />

          <div className="absolute inset-0 bg-black/60" />

          <img
            src={`${HOST}/${image.url}`}
            className="relative z-10 top-3 max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
            alt=""
          />

          <div className="fixed top-3 right-6 z-20 flex gap-2">
            <button
              className="bg-black/40 p-1.5 text-2xl rounded-full hover:bg-white/5 transition-all cursor-pointer"
              onClick={() => downloadFile(image.url, image.name)}
            >
              <IoMdArrowRoundDown />
            </button>

            <button
              className="bg-black/40 p-1.5 text-2xl rounded-full hover:bg-white/5 transition-all cursor-pointer"
              onClick={() => {
                setShowImage(false);
                setImage(null);
              }}
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
