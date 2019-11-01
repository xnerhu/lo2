import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';

export const StyledIcon = styled.div`
  ${({ size, useMask }: { size: number, useMask: boolean }) => css`
    ${centerIcon(size, useMask)};
  `}
`;
