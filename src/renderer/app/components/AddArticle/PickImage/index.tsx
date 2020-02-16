import React from 'react';

import { readFileAsImage } from '~/renderer/app/utils/image';
import { StyledImagePick, ImagePreview, ImageIcon, DeleteIcon } from './style';

interface Props {
  file: File | string;
  onClick: (e: React.MouseEvent) => void;
  onDelete: () => void;
}

export const ImagePick = ({ file, onClick, onDelete }: Props) => {
  const [image, setImage] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      if (file) {
        const data =
          file instanceof File ? await readFileAsImage(file) : file + '.jpg';

        setImage(data);
      }
    })();
  }, [file]);

  const onDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <StyledImagePick onClick={onClick}>
      {file ? (
        <>
          <ImagePreview src={image} />
          <DeleteIcon
            className="article-image-preview-delete"
            onClick={onDeleteClick}
          />
        </>
      ) : (
        <ImageIcon />
      )}
    </StyledImagePick>
  );
};
