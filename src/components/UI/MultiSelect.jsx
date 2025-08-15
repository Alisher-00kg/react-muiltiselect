import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { Icons } from "../../assets";

export const Multiselect = ({
  options,
  selectedOptions,
  onSelectionChange,
  placeholder,
  loading = false,
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const toggleOption = useCallback(
    (value) => {
      if (selectedOptions.includes(value)) {
        onSelectionChange(selectedOptions.filter((v) => v !== value));
      } else {
        onSelectionChange([...selectedOptions, value]);
      }
      setSearch("");
    },
    [selectedOptions, onSelectionChange]
  );

  const removeOption = useCallback(
    (value) => {
      onSelectionChange(selectedOptions.filter((v) => v !== value));
    },
    [selectedOptions, onSelectionChange]
  );

  const clearAll = useCallback(() => {
    onSelectionChange([]);
    setSearch("");
  }, [onSelectionChange]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter") {
      if (filteredOptions.length > 0) toggleOption(filteredOptions[0].value);
    }
  };

  return (
    <Wrapper ref={containerRef}>
      {selectedOptions.length > 0 && (
        <ClearAllBtn onClick={clearAll}>Clear all</ClearAllBtn>
      )}
      <InputsContainer>
        {selectedOptions.map((val) => {
          const item = options.find((o) => o.value === val);
          return (
            <InputChip key={val}>
              <span>{item?.label}</span>
              <RemoveBtn onClick={() => removeOption(val)}>
                <Icons.DeleteX />
              </RemoveBtn>
            </InputChip>
          );
        })}
      </InputsContainer>
      <DropdownBox onClick={() => setOpen(true)}>
        <Input
          type="text"
          placeholder={placeholder || "Choose..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {search && (
          <ClearSearchBtn onClick={() => setSearch("")}>
            <Icons.DeleteX />
          </ClearSearchBtn>
        )}
        <ChevronIcon open={open}>
          <Icons.ArrowDown />
        </ChevronIcon>
      </DropdownBox>

      {open && (
        <OptionsList>
          {loading ? (
            <NoResults>Loading . . .</NoResults>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <Option
                key={opt.value}
                selected={selectedOptions.includes(opt.value)}
                onClick={() => toggleOption(opt.value)}
              >
                {opt.label}
              </Option>
            ))
          ) : (
            <NoResults>No results (- _ -)</NoResults>
          )}
        </OptionsList>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 280px;
  position: relative;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputsContainer = styled.div`
  max-height: 280px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`;

const InputChip = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 10px;
  background: #fdfdfd;
  font-size: 14px;
`;

const RemoveBtn = styled.button`
  margin-left: 6px;
  border: none;
  background: none;
  cursor: pointer;
  color: #d33;
  display: flex;
  align-items: center;
`;

const DropdownBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
`;

const ChevronIcon = styled.div`
  margin-left: 6px;
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease;
  display: flex;
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  width: 100%;
  max-height: 260px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  list-style: none;
  z-index: 10;
`;

const Option = styled.li`
  padding: 8px;
  cursor: pointer;
  background: ${({ selected }) => (selected ? "#f0f8ff" : "transparent")};
  &:hover {
    background: #f5f5f5;
  }
`;

const NoResults = styled.li`
  padding: 8px;
  color: #aaa;
  font-size: 14px;
`;

const ClearAllBtn = styled.button`
  font-size: 14px;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
`;

const ClearSearchBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #999;
  display: flex;
  align-items: center;
`;
