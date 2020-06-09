import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import styled from 'styled-components';

import { DefaultScreen } from '../../components/Screen/DefaultScreen';

export const WhatsAppScreen = () => {
  const classes = useStyles();

  const [province, setProvince] = useState("");

  const onHandleProvinceChange = (e) => {
    setProvince(String(e.target.value));
  };

  return (
    <DefaultScreen title="WhatsApp">
      <Container>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Province
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={province}
            onChange={onHandleProvinceChange}
            label="Province"
          >
            <MenuItem value="">
              <em>Select your province...</em>
            </MenuItem>
            <MenuItem value={"ES"}>ES</MenuItem>
            <MenuItem value={"MG"}>MG</MenuItem>
            <MenuItem value={"SP"}>SP</MenuItem>
            <MenuItem value={"RJ"}>RJ</MenuItem>
          </Select>
        </FormControl>
      </Container>
    </DefaultScreen>
  );
};

const Container = styled.div``;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);
