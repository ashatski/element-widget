import { FC } from "react";
import styled from "styled-components";
import { IElementItem } from "./useElementSelection";

interface DialogElementProps {
  element: IElementItem;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: () => void;
}

export const DialogElement: FC<DialogElementProps> = ({
  element,
  isSelected,
  isDisabled,
  onToggle,
}) => (
  <ElementItem>
    <CheckboxContainer disabled={isDisabled}>
      <HiddenCheckbox
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        disabled={isDisabled}
        aria-label={`Select ${element.name}`}
      />
      <StyledCheckbox checked={isSelected} />
      <span>{element.name}</span>
    </CheckboxContainer>
  </ElementItem>
);

const ElementItem = styled.div`
  padding: 0 8px 4px 8px;
  transition: opacity 0.2s;
`;

const CheckboxContainer = styled.label<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.disabled ? "#616161" : "#010101")};
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: inherit;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  height: 20px;
  width: 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.checked ? "#2196F3" : "#eee")};
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.checked ? "#2196F3" : "#ccc")};
  }

  &:after {
    content: "";
    display: ${(props) => (props.checked ? "block" : "none")};
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
