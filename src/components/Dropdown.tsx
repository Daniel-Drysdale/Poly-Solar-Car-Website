import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  onSelect: (value: string) => void;
}

const Dropdown = ({ onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "absolute", top: "15px", left: "1%" }}>
      <div className="dropdown" ref={dropdownRef}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img style={{ width: "25px" }} src="/src/assets/DropDownMenu.png" />
        </button>
        {isOpen && (
          <ul className="dropdown-menu show dropdown-menu-lg-end">
            <li>
              <button
                className="dropdown-item"
                onClick={() => onSelect("data")}
              >
                Data Display
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => onSelect("charts")}
              >
                Charts
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => onSelect("map")}>
                Map
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
