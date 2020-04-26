import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Button, DeleteButton } from '~/renderer/components/Button';
import { useStore } from '~/renderer/app/store';
import { IDeleteArticleRes } from '~/interfaces';
import { callApi } from '~/renderer/app/utils/network';
import {
  Background,
  StyledDialog,
  Title,
  DialogButtons,
  ButtonsContainer,
} from './style';

const Buttons = observer(({ onDeleteClick }: { onDeleteClick: () => void }) => {
  const store = useStore();

  return (
    <>
      <ButtonsContainer>
        <Link to={`/edit-article/${store.article.data.label}`}>
          <Button>Edytuj</Button>
        </Link>
        <DeleteButton onClick={onDeleteClick} style={{ marginLeft: 8 }}>
          Usuń
        </DeleteButton>
      </ButtonsContainer>
    </>
  );
});

const Dialog = ({
  toggled,
  onCancel,
  onDelete,
}: {
  toggled: boolean;
  onCancel: () => void;
  onDelete: () => void;
}) => {
  const onBgClick = React.useCallback(() => {
    onCancel();
  }, []);

  const onDialogClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <Background toggled={toggled} onClick={onBgClick}>
      <StyledDialog onClick={onDialogClick}>
        <Title>Czy na pewno usunąć artykuł?</Title>
        <DialogButtons>
          <DeleteButton onClick={onDelete}>Usuń</DeleteButton>
          <Button onClick={onCancel}>Anuluj</Button>
        </DialogButtons>
      </StyledDialog>
    </Background>
  );
};

export default withRouter(({ match, history }) => {
  const [toggled, setToggled] = React.useState(false);

  const onDeleteClick = React.useCallback(() => {
    setToggled(true);
  }, []);

  const onDialogCancel = React.useCallback(() => {
    setToggled(false);
  }, []);

  const onDialogDelete = React.useCallback(() => {
    (async () => {
      const res = await callApi<IDeleteArticleRes>(
        '/article/delete',
        {
          label: match.params.label,
        },
        'post',
      );

      if (res.success) {
        history.push('/news');
      } else {
        console.error(res);
      }
    })();
  }, []);

  return (
    <>
      <Buttons onDeleteClick={onDeleteClick} />
      <Dialog
        toggled={toggled}
        onCancel={onDialogCancel}
        onDelete={onDialogDelete}
      />
    </>
  );
});
