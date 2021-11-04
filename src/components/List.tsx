import React, { useState } from "react";
import "./List.sass";
import Input from "./Input";

export interface ListProps {
  id: string;
  items: { name: string }[];
  handleSelect: (value: { name: string }) => void;
  drilldown?: boolean;
  search?: boolean;
  placeholder?: string;
}

const List = ({
  id,
  items,
  handleSelect,
  drilldown,
  search,
  placeholder,
}: ListProps) => {
  const [query, setQuery] = useState<string>("");

  const contains = function (value: string, content: string) {
    return (
      !content || value.toUpperCase().indexOf(content.toUpperCase()) !== -1
    );
  };

  return (
    <div>
      {search && (
        <Input
          value={query}
          placeholder={placeholder || ""}
          handleChange={(value) => setQuery(value)}
        />
      )}
      <div className="list">
        {items &&
          items
            .filter((item) => contains(item.name, query))
            .sort((item1, item2) => item1.name.localeCompare(item2.name))
            .map((item, index) => (
              <button
                key={`${id}_${index}`}
                className="list-button"
                onClick={() => handleSelect(item)}
              >
                <div className="list-button-label">{item.name}</div>
                {drilldown && <div className="list-button-arrow">&nbsp;</div>}
              </button>
            ))}
      </div>
    </div>
  );
};

export default List;
