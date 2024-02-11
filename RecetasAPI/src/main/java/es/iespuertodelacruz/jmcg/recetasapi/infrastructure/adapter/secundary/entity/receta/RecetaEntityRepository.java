package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.receta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecetaEntityRepository extends JpaRepository<RecetaEntity, Integer> {
	
}
