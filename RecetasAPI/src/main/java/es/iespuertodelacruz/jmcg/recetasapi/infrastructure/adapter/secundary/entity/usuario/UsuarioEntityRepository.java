package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioEntityRepository extends JpaRepository<UsuarioEntity, Integer> {
	
	@Query("SELECT u from UsuarioEntity u where u.nombre=:nombre")
	public UsuarioEntity findByName(@Param("nombre") String nombre);
	
	@Query("SELECT u from UsuarioEntity u where u.email=:email")
	public UsuarioEntity findByEmail(@Param("email") String email);
	
	@Query("SELECT u from UsuarioEntity u where u.nick=:nick")
	public UsuarioEntity findByNick(@Param("nick") String nick);
}
