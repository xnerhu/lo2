import React from 'react';
import { useParams } from 'react-router';

import { Button, DeleteButton } from '~/renderer/components/Button';
import { Dialog } from '~/renderer/components/Dialog';
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

  const onDelete = React.useCallback(() => {}, [label]);

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
