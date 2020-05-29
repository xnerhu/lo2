import React from 'react';

import { StyledImageButton, Image, DeleteIcon, StyledPicture } from './style';

const addExt = (src: string, add: boolean) => (ext: string) => {
  if (!add) return src;
  return `${src}.${ext}`;
};

const Picture = ({ src }: { src: string }) => {
  const [webp, jpg] = React.useMemo(() => {
    const isBase64 = src.startsWith('data:');
    const suffix = addExt(src, !isBase64);

    return [suffix('webp'), suffix('jpg')];
  }, [src]);

  return (
    <StyledPicture>
      {<source srcSet={webp} type="image/webp" />}
      <Image src={jpg} draggable={false} />
    </StyledPicture>
  );
};

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
          <Picture src={src} />
          <DeleteIcon className="image-button-delete" onClick={onDeleteClick} />
        </>
      )}
    </StyledImageButton>
  );
};
