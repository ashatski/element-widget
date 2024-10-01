import React, { FC, useCallback } from "react";
import { FixedSizeList as ReactWindowList } from "react-window";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal";
import { DialogElement } from "./DialogElement";
import SelectedElementsDisplay from "./SelectedElementsDisplay";
import { useElementsSelection } from "./useElementSelection";

interface ElementWidgetProps {
  maxSelection?: number;
}

const ElementWidget: FC<ElementWidgetProps> = ({ maxSelection = 3 }) => {
  const {
    selectedElements,
    filteredElements,
    filter,
    onToggleElement,
    onChangeSearchTerm,
    onChangeFilter,
    resetSelection,
    saveInitialSelection,
    isLoading,
    error,
  } = useElementsSelection(maxSelection);

  const { isOpen, openModal, closeModal } = useModal();

  const handleCancel = useCallback(() => {
    resetSelection();
    closeModal();
  }, [resetSelection, closeModal]);

  const handleChangeClick = useCallback(() => {
    saveInitialSelection();
    openModal();
  }, [saveInitialSelection, openModal]);

  const renderRow = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const element = filteredElements[index];
      const isSelected = selectedElements.some((e) => e.id === element.id);
      const isDisabled = selectedElements.length >= maxSelection && !isSelected;

      return (
        <div style={style}>
          <DialogElement
            element={element}
            isSelected={isSelected}
            isDisabled={isDisabled}
            onToggle={() => onToggleElement(element)}
          />
        </div>
      );
    },
    [filteredElements, selectedElements, maxSelection, onToggleElement]
  );

  return (
    <WidgetContainer>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : error ? (
        <ErrorMessage>Error: {(error as Error).message}</ErrorMessage>
      ) : (
        <>
          {isOpen && (
            <Modal isOpen={isOpen} onClose={handleCancel}>
              <h3>Select items</h3>
              <SearchFilterContainer>
                <SearchInput
                  type="text"
                  placeholder="Search"
                  onChange={onChangeSearchTerm}
                />
                <FilterSelect value={filter} onChange={onChangeFilter}>
                  <option value="">No filter</option>
                  <option value=">10">&gt;10</option>
                  <option value=">100">&gt;100</option>
                  <option value=">200">&gt;200</option>
                </FilterSelect>
              </SearchFilterContainer>
              <StyledList
                height={300}
                itemCount={filteredElements.length}
                itemSize={35}
                width="100%"
              >
                {renderRow}
              </StyledList>
              <SelectedElementsDisplay
                selectedElements={selectedElements}
                onToggleElement={onToggleElement}
              />
              <ButtonContainer>
                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                <SaveButton onClick={closeModal}>Save</SaveButton>
              </ButtonContainer>
            </Modal>
          )}

          <h2>Select items</h2>
          <p>You currently have {selectedElements.length} selected items.</p>
          {selectedElements.length > 0 && (
            <SelectedElementsDisplay
              selectedElements={selectedElements}
              onToggleElement={onToggleElement}
            />
          )}
          <ChangeButton onClick={handleChangeClick}>
            Change my choice
          </ChangeButton>
        </>
      )}
    </WidgetContainer>
  );
};

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #f44336;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FilterSelect = styled.select`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StyledList = styled(ReactWindowList)`
  max-height: 300px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow-y: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
`;

const ChangeButton = styled.button`
  align-self: end;
  padding: 10px 15px;
  background-color: #6e75eb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const SaveButton = styled(Button)`
  background-color: #6e75eb;
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #d32f2f;
  }
`;

export default ElementWidget;
