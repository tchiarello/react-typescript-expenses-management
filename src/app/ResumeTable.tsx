import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginRight: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    marginTop: 50,
  },
}));

export default function ResumeTable() {
  const classes = useStyles();

  return (
    <Box>
      <Paper className={classes.root}>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Categoria</TableCell>
                <TableCell align='left'>Valor (R$)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(totalCategories).map((key, index) => (
                <TableRow hover role='checkbox' key={index} tabIndex={-1}>
                  <TableCell>{key}</TableCell>
                  <TableCell>
                    {formatCurrency.format(totalCategories[key])}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
