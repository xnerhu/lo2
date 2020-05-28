import React from 'react';

import { StyledImageButton, Image, DeleteIcon } from './style';

interface Props {
  src: string;
  onClick?: () => void;
  onDelete?: () => void;
}

export const ImageButton = ({ src, onClick, onDelete }: Props) => {
  const onDeleteClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onDelete) onDelete();
    },
    [onDelete],
  );

  return (
    <StyledImageButton onClick={onClick} hasImage={!!src}>
      {src && (
        <>
          <Image src={src} draggable={false} />
          <DeleteIcon className="image-button-delete" onClick={onDeleteClick} />
        </>
      )}
    </StyledImageButton>
  );
};
