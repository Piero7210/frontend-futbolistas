import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";

export default function Detail() {
  // obtenemos el id del futbolista por parametro de la url
  const { idFutbolista } = useParams();
  const [detail, setDetail] = useState<{
    name: string;
    lastname: string;
    birthdate: string;
    features: string;
    position: any;
  }>({ name: "", lastname: "", birthdate: "", features: "", position: "" });

  useEffect(() => {
    fetch(`http://localhost:8080/futbol-api/futbolistas/${idFutbolista}`)
      .then((response) => response.json())
      .then((data) => setDetail(data));
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h2>Nombre: {detail.name}</h2>
        <h2>Apellido: {detail.lastname}</h2>
        <h2>Fecha de nacimiento: {detail.birthdate.slice(0, 10)}</h2>
        <h2>Caracteristicas: {detail.features}</h2>
        <h2>Posicion: {detail.position.namePosicion}</h2>
        <Link to="/home" className={styles.link}>
            Volver a Home
        </Link>
      </div>
    </>
  );
}
