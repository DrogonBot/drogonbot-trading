import { Tooltip } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import StarsIcon from '@material-ui/icons/Stars';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { APIHelper } from '../../../../helpers/APIHelper';
import { ToolTipText } from '../../../elements/common/layout';

export const CreditsDisplay = () => {
  const [unpaidCredits, setUnpaidCredits] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const response = await APIHelper.request("GET", "/credit", null, true);

      const { unpaidCredits } = response.data;

      setUnpaidCredits(unpaidCredits);
    })();
  }, []);

  return (
    <Link href={"/user/payments"}>
      <Tooltip title={<ToolTipText>Divulgue e Ganhe Dinheiro</ToolTipText>}>
        <IconButton aria-label="credits">
          <StyledBadge badgeContent={unpaidCredits} color="secondary">
            <StarsIcon />
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
