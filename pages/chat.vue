<template>
    <main class="flex flex-col item-center w-full h-screen">
      <section
        class="bg-blue-2 shadow-box shadow-10 flex justify-center item-center p-5"
        :style="{ height: 'calc(100% - 50px)' }"
      >
        <!-- <div
          v-if="!isOpenChatBox"
          class="flex flex-col space-y-4 bg-blue-1 shadow-box shadow-10 p-10 rounded-xl items-center"
        >
          <label class="font-bold text-2xl text-blue-500 mt-10"
            >Please enter your name to start chatting</label
          >
          <q-input
            v-model="name"
            label="User Name"
            color="blue-5"
            class="w-full"
            background="blue-5"
          />
          <q-btn @click="beginChat" color="blue-5">Accept</q-btn>
        </div> -->
        <div>
          <div
            class="chatbox w-[500px] h-[600px] overflow-y-scroll bg-blue-1 p-1 rounded-xl items-center border border-white"
          >
            <div id="messBox" ref="messBox"></div>
          </div>
          <div class="flex w-full">
            <q-input v-model="mess" label="Type a new message" class="w-full" />
            <q-btn @click="handleSend" color="cyan-8">Send</q-btn>
          </div>
        </div>
      </section>
    </main>
  </template>
  
  <script setup lang="ts">
  import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
  

  const mess = ref("");
  const isOpenChatBox = ref(false);
  const messBox = ref(null);
  const customerInfor = useCustomerInfor();


  const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:28592/chathub")
    .configureLogging(LogLevel.Information)
    .build();
  
  const startChat = async () => {
    try {
      await connection.start();
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = () => sessionStorage.getItem("user");
  const beginChat = async () => {
    if (customerInfor.value?.username) {
      sessionStorage.setItem("user", customerInfor.value?.username);
      isOpenChatBox.value = true;
  
      if (!customerInfor.value?.username) return;
      try {
        const message = `${customerInfor.value?.username} joined`;
        await connection.invoke("BeginChat", customerInfor.value?.username, message);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSend = async () => {
    const user = getUser();
    if (!user) return;
    if (mess.value) {
      await sendMessage(user, `${user}: ${mess.value}`);
      mess.value = "";
    }
  };
  const sendMessage = async (user: string, message: string) => {
    try {
      await connection.invoke("SendMessage", user, message);
    } catch (error) {
      console.log(error);
    }
  };
  const receiveMessage = async () => {
    const currentUser = await getUser();
    if (!currentUser) return;
    try {
      await connection.on("ReceiveMessage", (user, message) => {
        const messageClass = currentUser === user ? "send" : "received";
        appendMessage(message, messageClass);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const appendMessage = (message: string, messageClass: string) => {
    const messagContainer = document.getElementById("messBox");
    const messageBox = document.createElement("div");
    const messageContent = document.createElement("div");
  
    messageBox.classList.add("msg-box");
    messageBox.classList.add(messageClass);
    messageContent.innerHTML = message;
    messageBox?.appendChild(messageContent);
    messagContainer?.appendChild(messageBox);
    const lastElement = messagContainer?.lastElementChild;
    lastElement?.scrollIntoView({ behavior: "smooth", block: "end" });
  };
  
  onMounted(async () => {
    await startChat();
    await beginChat();
    await receiveMessage();
  });
  </script>
  
  <style>
  .send {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 6px;
  }
  .send div {
    background-color: aqua;
    padding: 6px 10px;
    border-radius: 10px;
    max-width: 90%;
    line-break: anywhere;
  }
  
  .received {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 6px;
  }
  .received div {
    background-color: beige;
    padding: 6px 10px;
    border-radius: 10px;
    max-width: 90%;
    line-break: anywhere;
  }
  
  .chatbox::-webkit-scrollbar {
    width: 3px;
  }
  
  /* Track */
  .chatbox::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  
  /* Handle */
  .chatbox::-webkit-scrollbar-thumb {
    background: aquamarine;
    border-radius: 10px;
  }
  
  /* Handle on hover */
  .chatbox::-webkit-scrollbar-thumb:hover {
    background: aqua;
  }
  </style>
  