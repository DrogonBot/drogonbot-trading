import { Slide } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from '../../../constants/UI/Colors.constant';
import { TS } from '../../../helpers/LanguageHelper';

const Transition = React.forwardRef(function handleTransition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface IDialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: IDialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

interface IProps {
  alertKey: string;
  title: string;
  content: React.ReactChild;
  showOnClose?: boolean;
  showDontShowAgain?: boolean;
  onClose?: () => void;
}

export const AlertModal = ({
  alertKey,
  title,
  content,
  showOnClose,
  showDontShowAgain,
  onClose,
}: IProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleDontShowAgain = () => {
    setOpen(false);

    window.localStorage.setItem(alertKey, "dont-show");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentWrapper>{content}</DialogContentWrapper>
      </DialogContent>
      <DialogActions>
        {showOnClose && (
          <Button onClick={handleClose} color="primary">
            {TS.string(null, "genericClose")}
          </Button>
        )}

        {showDontShowAgain && (
          <Button onClick={handleDontShowAgain} color="primary">
            {TS.string(null, "genericDontShowAgain")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

const DialogContentWrapper = styled.div`
  p {
    color: ${colors.textGray};
    font-size: 1rem;
  }
`;
