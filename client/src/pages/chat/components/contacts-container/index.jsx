import React from "react";
import ProfileInfo from "./components/profile-info";
import NewDM from "./new-dm";

const ContactsContainer = () => {
  return (
    <div className="relative sm:w-[35vw] lg:w-[26vw] xl:w-[22vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-5 pb-8 flex justify-center">
        <Logo />
      </div>
      <div className="flex flex-col gap-y-5 px-5">
        <div className="flex items-center justify-between">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
        <div className="flex items-center justify-betweens">
          <Title text="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex justify-start items-center">
      <svg
        id="logo-38"
        width="70"
        height="24"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          className="ccustom"
          fill="#8338ec"
        ></path>{" "}
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          className="ccompli1"
          fill="#975aed"
        ></path>{" "}
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          className="ccompli2"
          fill="#a16ee8"
        ></path>{" "}
      </svg>
      <span className="text-2xl font-bold ">ChatApp</span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h2 className="uppercase tracking-widest text-neutral-400 font-light text-opacity-90 text-sm">
      {text}
    </h2>
  );
};
