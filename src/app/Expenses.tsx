import React, { ChangeEvent, useState } from 'react';
import UserMenu from './UserMenu';
import { getExpenses } from './backend';
import { ExpensesInterface } from './types';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getMonthAsString } from '../helpers';

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

const months = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
};

const formatCurrency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function Expenses() {
  const classes = useStyles();
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState(getMonthAsString(currentMonth));
  const [expenses, setExpenses] = useState<ExpensesInterface[]>([]);
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    getExpenses(year, month).then(setExpenses);
  }, [year, month]);

  const totalExpenses = expenses
    .map((obj) => obj.valor)
    .reduce((acc, curr) => acc + curr, 0);

  const totalCategories = expenses.reduce((obj, expense) => {
    const category = expense.categoria;
    const amount = expense.valor;

    if (!obj[category]) {
      obj[category] = 0;
    }

    obj[category] += amount;

    return obj;
  }, {});

  const handleChangeMonth = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void => {
    setMonth(getMonthAsString(event.target.value as number));
  };

  const handleChangeYear = (event: any): void => {
    setYear(event.target.value);
  };

  return (
    <div>
      <Container>
        <UserMenu />
        <Box display='flex' alignItems='center'>
          <Box flex='1'>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Month</InputLabel>
              <Select
                id='month'
                onChange={handleChangeMonth}
                className={classes.selectEmpty}
              >
                {Object.keys(months).map((key, index) => (
                  <MenuItem key={index} value={key}>
                    {months[key]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-helper-label'>Year</InputLabel>
              <Select
                className={classes.selectEmpty}
                onChange={handleChangeYear}
              >
                <MenuItem value='2019'>2019</MenuItem>
                <MenuItem value='2020'>2020</MenuItem>
                <MenuItem value='2021'>2021</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <p>
              Despesas totais:{' '}
              <strong>{formatCurrency.format(totalExpenses)}</strong>
            </p>
          </Box>
        </Box>

        <Tabs value={tab} onChange={(event, newTab) => setTab(newTab)}>
          <Tab label='Resumo'></Tab>
          <Tab label='Detalhes'></Tab>
        </Tabs>
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

        <Box>
          <Paper className={classes.root}>
            <TableContainer>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Despesa</TableCell>
                    <TableCell align='left'>Categoria</TableCell>
                    <TableCell align='left'>Dia</TableCell>
                    <TableCell align='left'>Valor (R$)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {expenses.map((expense, index) => (
                    <TableRow hover role='checkbox' key={index} tabIndex={-1}>
                      <TableCell>{expense.descricao}</TableCell>
                      <TableCell>{expense.categoria}</TableCell>
                      <TableCell>{expense.dia}</TableCell>
                      <TableCell>
                        {formatCurrency.format(expense.valor)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}
