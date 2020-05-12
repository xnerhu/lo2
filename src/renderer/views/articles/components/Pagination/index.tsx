import React from 'react';
import { withRouter } from 'react-router';

import { PrimaryButton } from '~/renderer/components/Button';
import { IRouterProps } from '~/renderer/interfaces';
import { ICON_CHEVRON } from '~/renderer/constants/icons';
import { StyledPagination } from './style';

interface Props {
  nextPage?: boolean;
}

export const Pagination = withRouter(
  ({ nextPage, match }: IRouterProps<Props>) => {
    const category = match.params.category || 'all';
    const page = parseInt(match.params.page ?? 1);

    return (
      <StyledPagination>
        <PrimaryButton
          to={`/articles/${category}/${page - 1}`}
          icon={ICON_CHEVRON}
          iconRotation={180}
          disabled={page <= 1}
        >
          Nowsze
        </PrimaryButton>
        <PrimaryButton
          to={`/articles/${category}/${page + 1}`}
          icon={ICON_CHEVRON}
          iconOnRight
          disabled={!nextPage}
          style={{ marginLeft: 12 }}
        >
          Starsze
        </PrimaryButton>
      </StyledPagination>
    );
  },
);
