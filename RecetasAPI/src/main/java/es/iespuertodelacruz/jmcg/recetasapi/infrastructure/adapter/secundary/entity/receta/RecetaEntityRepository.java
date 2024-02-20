package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.receta;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecetaEntityRepository extends JpaRepository<RecetaEntity, Integer> {
	
	@Modifying
    @Query(value = "UPDATE recetas SET descripcion = :nuevaDescripcion, nombre = :nuevoNombre, imagen = :nuevaImagen, receta = :nuevaReceta WHERE id = :id", nativeQuery = true)
    public void updateNativo(@Param("id") Integer id, @Param("nuevaDescripcion") String nuevaDescripcion, @Param("nuevoNombre") String nuevoNombre, @Param("nuevaImagen") String nuevaImagen, @Param("nuevaReceta") String nuevaReceta);

	@Query(value = "SELECT * FROM recetas WHERE id_autor=:id_autor", nativeQuery = true)
	public List<RecetaEntity> findAllByAutor(@Param("id_autor") Integer id_autor);
}
