import { Tooltip } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import DescriptionIcon from '@material-ui/icons/Description';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import { TS } from '../../../../helpers/LanguageHelper';
import { AppState } from '../../../../store/reducers/index.reducers';
import { IUser } from '../../../../types/User.types';
import { ToolTipText } from '../../../elements/common/layout';

export const CreditsDisplay = () => {
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

  return (
    <Link href={"/posts/advertise"}>
      <Tooltip
        title={
          <ToolTipText>{TS.string("resume", "creditsSubmission")}</ToolTipText>
        }
      >
        <IconButton aria-label="credits">
          <StyledBadge badgeContent={user.credits} color="secondary">
            <DescriptionIcon />
          </StyledBadge>
        </IconButton>
      </Tooltip>
    </Link>
  );
};

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  })
)(Badge);
