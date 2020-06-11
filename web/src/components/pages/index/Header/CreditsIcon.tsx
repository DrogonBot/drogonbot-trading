import { Tooltip } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import DescriptionIcon from '@material-ui/icons/Description';
import React from 'react';

import { TS } from '../../../../helpers/LanguageHelper';
import { ToolTipText } from '../../../elements/common/layout';

export const CreditsIcon = () => {
  return (
    <Tooltip
      title={
        <ToolTipText>{TS.string("resume", "creditsSubmission")}</ToolTipText>
      }
    >
      <IconButton aria-label="credits">
        <StyledBadge badgeContent={4} color="secondary">
          <DescriptionIcon />
        </StyledBadge>
      </IconButton>
    </Tooltip>
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
