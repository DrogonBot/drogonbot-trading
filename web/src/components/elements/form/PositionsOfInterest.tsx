import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';

import { TS } from '../../../helpers/LanguageHelper';

/* eslint-disable no-use-before-define */
interface IProps {
  jobRoles: string[];
  value: string[];
  onChange: (values: any) => any;
}

export const PositionsOfInterest = ({ jobRoles, onChange, value }: IProps) => {
  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={jobRoles}
      value={value || []}
      onChange={(event, values) => onChange(values)}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          variant="standard"
          label={TS.string("resume", "resumeJobRoles")}
          placeholder={TS.string("resume", "resumeTypeJobRoles")}
        />
      )}
    />
  );
};
