import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Paginate from '../Paginate/Paginate';
import styles from './TableFutbol.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
});

export default function TableFutbol() {
  const classes = useStyles();
  
  const navigate = useNavigate();
  const [futbolistas, setFutbolistas] = useState([]);

  // fetch de los futbolistas
  useEffect(() => {
    fetch('http://localhost:8080/futbol-api/futbolistas')
      .then((response) => response.json())
      .then((data) => setFutbolistas(data));
  }, []);

  // funcion para redireccionar al detalle del futbolista
  const handleClick = (idFutbolista: number) => {
    navigate(`/detail/${idFutbolista}`);
  }

  const [currentPage, setCurrentPage] = useState(1); // pagina que ira cambiando
  const [futbolistaPerPage, setFutbolistaPerPage] = useState(6); // max filas por pag
  const lastFutbol = futbolistaPerPage * currentPage; // indice ultimos renderizados
  const firstDog = lastFutbol - futbolistaPerPage; // indice primeros 6 renderizada
  const currentFutbolista = futbolistas.slice(firstDog, lastFutbol); // los 6 primeros que se renderizan

  // funcion para cambiar de pagina (se envia por props a Paginate)
  const paginate = (number: number) => {
    setCurrentPage(number);
  };

  return (
    <>
      <Paginate 
        futbolistaPerPage={futbolistaPerPage}
        futbolistas={futbolistas?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">Fecha de Nacimiento</TableCell>
              <TableCell align="right">Caracteristicas</TableCell>
              <TableCell align="right">Posicion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mapeo de los futbolistas */}
            {currentFutbolista.map((e: { idFutbolista: number, name: string, lastname: number, birthdate: string, features: string, position: any }) => (
              <TableRow key={e.idFutbolista}>
                <TableCell className={styles.row} onClick={() => handleClick(e.idFutbolista)} component="th" scope="row">{e.idFutbolista}</TableCell>
                <TableCell className={styles.row} onClick={() => handleClick(e.idFutbolista)} align="right">{e.name}</TableCell>
                <TableCell className={styles.row} onClick={() => handleClick(e.idFutbolista)} align="right">{e.lastname}</TableCell>
                {/* Slice para mostrar solo la fecha yyyy-mm-dd */}
                <TableCell align="right">{e.birthdate.slice(0, 10)}</TableCell>
                <TableCell align="right">{e.features}</TableCell>
                <TableCell align="right">{e.position.namePosicion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
