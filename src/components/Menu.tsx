import { menuItems, role } from "@/utils/menuUtils";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="mt-2 text-base">
      {menuItems.map((item, i) => {
        return (
          <div key={`${item.title}.${i}`} className="flex flex-col gap-2">
            <hr />
            <div className="m-0 flex flex-col justify-start">
              {item.items.map((menu, k) => {
                if (menu.visible.includes(role) || menu.visible.includes("*")) {
                  return (
                    <Link
                      href={menu.href}
                      key={`${menu.label}.${k}`}
                      className={`${menu.icon} text-stone-800 bg-slate-50 hover:bg-slate-200 py-[2px] h-7 items-center mb-[3px] rounded-md flex justify-center lg:justify-start`}
                    >
                      <span className="pl-2 hidden lg:block">{menu.label}</span>
                    </Link>
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
