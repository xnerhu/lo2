import React from 'react';
import { withRouter } from 'react-router';

import { IRouterProps } from '~/renderer/app/interfaces';
import { PrimaryButton } from '~/renderer/components/Button';
import { CHEVRON_ICON } from '~/renderer/constants/icons';
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
          to={`/news/${category}/${page - 1}`}
          icon={CHEVRON_ICON}
          iconRotation={180}
          disabled={page <= 1}
        >
          Starsze
        </PrimaryButton>
        <PrimaryButton
          to={`/news/${category}/${page + 1}`}
          icon={CHEVRON_ICON}
          disabled={!nextPage}
          iconOnRight
        >
          Nowsze
        </PrimaryButton>
      </StyledPagination>
    );
  },
);
