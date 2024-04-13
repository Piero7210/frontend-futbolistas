import styles from "./Paginate.module.css";

export default function Paginate({
  futbolistaPerPage,
  futbolistas,
  paginate,
  currentPage,
}: {
  futbolistaPerPage: number;
  futbolistas: number;
  paginate: (num: number) => void;
  currentPage: number;
}) {
    
  const pageNum = [];
  //cantidad de elementos totales, dividido limite de elementos por pagina
  for (let i = 1; i <= Math.ceil(futbolistas / futbolistaPerPage); i++) {
    // se crea un array con la cantidad de paginas
    pageNum.push(i);
  }

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <div>
          <button
            className={styles.boton}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            {"<"}
          </button>
        </div>
        {/* iteramos sobre la cantidad de paginas */}
        {pageNum.map((num) => (
          <div key={num}>
            <button className={styles.boton} onClick={() => paginate(num)}>
              {num}
            </button>
          </div>
        ))}
        <div>
          <button
            className={styles.boton}
            disabled={currentPage === pageNum.length}
            onClick={() => paginate(currentPage + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
