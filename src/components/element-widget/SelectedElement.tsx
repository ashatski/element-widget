import { FC } from "react";
import styled from "styled-components";
import { IElementItem } from "./useElementSelection";

interface SelectedElementProps {
  element: IElementItem;
  onRemove: () => void;
}

export const SelectedElement: FC<SelectedElementProps> = ({
  element,
  onRemove,
}) => (
  <StyledSelectedElement>
    {element.name}
    <RemoveButton onClick={onRemove} aria-label={`Remove ${element.name}`}>
      ×
    </RemoveButton>
  </StyledSelectedElement>
);

const StyledSelectedElement = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 20px;
  background-color: #e0e0e0;
  border-radius: 20px;
  font-size: 14px;
`;

const RemoveButton = styled.button`
  margin-left: 5px;
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
  cursor: pointer;
`;
