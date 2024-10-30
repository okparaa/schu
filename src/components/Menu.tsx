import { menuItems } from "@/utils/menuUtils";

const Menu = () => {
  return (
    <div className="mt-2 text-base">
      {menuItems.map((item, i) => {
        return (
          <div key={`${item.title}.${i}`} className="flex flex-col gap-2">
            <hr />
            <ul className="m-0 flex flex-col justify-start">
              {item.items.map((menu, k) => {
                return (
                  <li
                    key={`${menu.label}.${k}`}
                    className={`${menu.icon} flex justify-center items-center lg:justify-start gap-3 text-lg text-stone-800 py-[6px] lg:py-[4px]`}
                  >
                    <span className="hidden lg:block text-base">
                      {menu.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
