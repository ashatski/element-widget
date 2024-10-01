import { FC } from "react";
import styled from "styled-components";
import { SelectedElement } from "./SelectedElement";
import { IElementItem } from "./useElementSelection";

interface SelectedElementsDisplayProps {
  selectedElements: IElementItem[];
  onToggleElement: (element: IElementItem) => void;
}

const SelectedElementsDisplay: FC<SelectedElementsDisplayProps> = ({
  selectedElements,
  onToggleElement,
}) => (
  <SelectedElementsContainer>
    {selectedElements.map((element) => (
      <SelectedElement
        key={element.id}
        element={element}
        onRemove={() => onToggleElement(element)}
      />
    ))}
  </SelectedElementsContainer>
);

const SelectedElementsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
  background-color: transparent;
`;

export default SelectedElementsDisplay;
