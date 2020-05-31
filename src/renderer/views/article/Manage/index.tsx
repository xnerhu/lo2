import React from 'react';
import { useParams } from 'react-router';

import { Button, DeleteButton } from '~/renderer/components/Button';
import { Dialog } from '~/renderer/components/Dialog';
import { deleteArticle } from '~/renderer/utils/article-editor';
import { Container } from './style';

export default () => {
  const { label } = useParams();
  const [dialogVisible, toggleDialog] = React.useState(false);

  const showDialog = React.useCallback(() => {
    toggleDialog(true);
  }, []);

  const hideDialog = React.useCallback(() => {
    toggleDialog(false);
  }, []);

  const onDelete = React.useCallback(async () => {
    let canceled = false;

    (async () => {
      const data = await deleteArticle(label);

      if (!canceled && data.success) {
        window.location.href = '/blog';
      }
    })();

    return () => (canceled = true);
  }, [label]);

  return (
    <>
      <Container>
        <Button to={`/cms/article/${label}`}>Edytuj</Button>
        <DeleteButton onClick={showDialog}>Usuń</DeleteButton>
      </Container>
      <Dialog
        visible={dialogVisible}
        onCancel={hideDialog}
        onSubmit={onDelete}
        submitBtnText="Usuń"
        title="Czy na pewno usunąć artykuł?"
      />
    </>
  );
};
