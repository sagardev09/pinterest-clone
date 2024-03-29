"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { HiBell, HiChat } from "react-icons/hi";
import { BsFillSave2Fill } from "react-icons/bs";
import { app } from "@/app/FilrebaseConfig";
import { useRouter, usePathname } from "next/navigation";
import logo from "@/public/logo.svg";
import { ChevronDown, Search } from "lucide-react";
import UserSettingModal from "./UserSettingModal";

function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const db = getFirestore(app);
    const [usermodal, setusermodal] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        saveUserInfo();
    }, [session]);

    const saveUserInfo = async () => {
        if (session?.user) {
            await setDoc(doc(db, "user", session.user.email), {
                userName: session.user.name,
                email: session.user.email,
                userImage: session.user.image,
            });
        }
    };

    const onCreateClick = () => {
        if (session) {
            router.push("/pin-builder");
        } else {
            signIn();
        }
    };

    const isActive = (href) => {
        return pathname === href
    };

    return (
        <>
            <div
                className="flex justify-between 
     gap-3 md:gap-2 items-center px-6 py-3 relative h-[7vh] "
            >
                <Image
                    src={logo}
                    alt="logo"
                    width={50}
                    height={50}
                    onClick={() => router.push("/")}
                    className="hover:bg-gray-300 p-2
        rounded-full cursor-pointer"
                />
                <button
                    className={`${isActive("/") ? " bg-red-600 text-white" : "text-black"} p-3 px-6 rounded-full text-[18px] hidden md:block`}
                    onClick={() => router.push("/")}
                >
                    Home
                </button>
                <button
                    className={`${isActive("/explore") ? " bg-red-600 text-white" : "text-black"} p-3 px-6 rounded-full text-[18px] hidden md:block`}
                    onClick={() => router.push("/explore")}
                >
                    Explore
                </button>
                <button
                    className={`${isActive("/pin-builder") ? " bg-red-600 text-white" : "text-black"} p-3 px-6 rounded-full text-[18px] hidden md:block`}
                    onClick={() =>
                        onCreateClick()
                    }
                >
                    Create
                </button>

                <div
                    className="bg-[#e9e9e9] p-2 px-6
         gap-3 items-center rounded-full w-full hidden md:flex"
                >
                    <Search className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent outline-none w-full text-[18px]"
                    />
                </div>
                <div className="flex items-center gap-4">
                    {session?.user ? (
                        <>
                            {" "}
                            <HiBell className="text-[25px] md:text-[35px] text-gray-500 cursor-pointer" />
                            <HiChat className="text-[25px] md:text-[35px] text-gray-500 cursor-pointer" />
                            <BsFillSave2Fill
                                className="text-[25px] md:text-[30px] text-gray-500 cursor-pointer"
                                onClick={() => router.push("/saved")}
                            />
                            <div className="flex items-center gap-2">
                                <Image
                                    src={session.user.image}
                                    onClick={() => router.push("/" + session.user.email)}
                                    alt="user-image"
                                    width={50}
                                    height={50}
                                    className="hover:bg-gray-300 p-2
        rounded-full cursor-pointer h-[80%]"
                                />
                                <div
                                    className="hover:bg-gray-300 p-2
        rounded-full cursor-pointer"
                                >
                                    <ChevronDown
                                        className="h-[20px] w-[20px]"
                                        onClick={() => setusermodal(!usermodal)}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <button
                            className="font-semibold p-2 px-4 rounded-full"
                            onClick={() => signIn()}
                        >
                            Login
                        </button>
                    )}
                </div>
                {
                    <div className="absolute right-0 top-[75px] z-[1000]">
                        {usermodal ? <UserSettingModal /> : null}
                    </div>
                }
            </div>
        </>
    );
}

export default Header;
