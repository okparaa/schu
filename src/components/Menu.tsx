"use client";
import { menuItems, role } from "@/utils/menuUtils";
import Link from "next/link";
import { useState } from "react";

const Menu = () => {
  const [openSub, setOpenSub] = useState<{ [key: string]: boolean }>({});

  const toggleSub = (title: string) => {
    setOpenSub((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="mt-2 text-base">
      {menuItems.map((item, i) => {
        return (
          <div key={`${item.title}.${i}`} className="flex flex-col gap-2">
            <hr className="my-2 bg-blue-200 p-[0.5px]" />
            <div className="m-0 flex flex-col justify-start">
              {item.items.map((menu, k) => {
                if (menu.visible.includes(role) || menu.visible.includes("*")) {
                  return (
                    <div key={k}>
                      {menu.sub ? (
                        <span
                          key={`${menu.label}.${k}`}
                          className={`${menu.icon} text-stone-800 hover:bg-blue-50 py-[2px] h-8 items-center mb-[6px] rounded-md flex justify-center w-full cursor-pointer`}
                          onClick={() => {
                            toggleSub(menu.label);
                          }}
                        >
                          <div className="flex-1 justify-between items-center flex">
                            <span className="pl-2 hidden lg:block">
                              {menu.label}
                            </span>
                            <i
                              className={
                                openSub[menu.label]
                                  ? "icon-up-open text-xs"
                                  : "icon-down-open text-xs"
                              }
                            ></i>
                          </div>
                        </span>
                      ) : (
                        <Link
                          href={menu.href}
                          key={`${menu.label}.${k}`}
                          className={`${menu.icon} text-stone-800 hover:bg-blue-50 py-[2px] h-8 items-center mb-[6px] rounded-md flex justify-center w-full text-lg`}
                        >
                          <div className="flex-1 justify-between items-center flex">
                            <span className="pl-2 hidden lg:block text-base">
                              {menu.label}
                            </span>
                          </div>
                        </Link>
                      )}

                      {openSub[menu.label] &&
                        menu.items?.map((drpdwn, idx) => {
                          if (
                            drpdwn.visible.includes(role) ||
                            drpdwn.visible.includes("*")
                          ) {
                            return (
                              <Link
                                href={drpdwn.href}
                                key={idx}
                                className="flex items-center gap-2 px-2 py-1 my-1 text-sm hover:bg-blue-50 rounded-md pl-6"
                              >
                                <i
                                  className={`${drpdwn.icon} w-6 text-center`}
                                />
                                <span className="hidden lg:block">
                                  {drpdwn.label}
                                </span>
                              </Link>
                            );
                          }
                        })}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
