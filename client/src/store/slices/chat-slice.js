export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessagesContacts: [],

  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),

  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),

  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),

  setDirectMessagesContacts: (directMessagesContacts) =>
    set({ directMessagesContacts }),

  closeChat: () =>
    set({
      selectedChatType: undefined,
      selectedChatData: undefined,
      selectedChatMessages: [],
    }),

  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;

    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
  updateContactLastMessage: (message) => {
    const { directMessagesContacts, userInfo } = get();

    const contactId =
      message.sender._id === userInfo.id
        ? message.recipient._id
        : message.sender._id;

    let updatedContacts;
    const existingContact = directMessagesContacts.find(
      (c) => c._id === contactId,
    );
    if (existingContact) {
      updatedContacts = directMessagesContacts.map((c) =>
        c._id === contactId
          ? {
              ...c,
              lastMessage: message.content,
              lastMessageTime: message.timestamp,
            }
          : c,
      );
    } else {
      const newContact =
        message.sender._id === userInfo.id ? message.recipient : message.sender;

      updatedContacts = [
        {
          ...newContact,
          lastMessage: message.content,
          lastMessageTime: message.timestamp,
        },
        ...directMessagesContacts,
      ];
    }
    updatedContacts.sort(
      (a, b) =>
        new Date(b.lastMessageTime || 0) - new Date(a.lastMessageTime || 0),
    );

    set({ directMessagesContacts: updatedContacts });
  },
});
