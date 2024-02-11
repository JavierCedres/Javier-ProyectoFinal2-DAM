package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.usuario;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;

public class UsuarioEntityMapper {
	public Usuario toDomain(UsuarioEntity usuarioEntity) {
		Usuario usuario = null;
		
		if (usuarioEntity != null) {
			usuario = new Usuario();
			usuario.setId(usuarioEntity.getId());
			usuario.setNombre(usuarioEntity.getNombre());
			usuario.setApellidos(usuarioEntity.getApellidos());
			usuario.setPassword(usuarioEntity.getPassword());
			usuario.setEmail(usuarioEntity.getEmail());
			usuario.setActive(usuarioEntity.getActive());
			usuario.setHash(usuarioEntity.getHash());
			usuario.setRol(usuarioEntity.getRol());
			usuario.setImagen(usuarioEntity.getImagen());
			usuario.setNick(usuarioEntity.getNick());
		}
		
		return usuario;
	}
	
	public UsuarioEntity toPersistence(Usuario usuario) {
		UsuarioEntity usuarioEntity = null;
		
		if (usuario != null) {
			usuarioEntity = new UsuarioEntity();;
			usuarioEntity.setId(usuario.getId());
			usuarioEntity.setNombre(usuario.getNombre());
			usuarioEntity.setApellidos(usuario.getApellidos());
			usuarioEntity.setPassword(usuario.getPassword());
			usuarioEntity.setEmail(usuario.getEmail());
			usuarioEntity.setActive(usuario.getActive());
			usuarioEntity.setHash(usuario.getHash());
			usuarioEntity.setRol(usuario.getRol());
			usuarioEntity.setImagen(usuario.getImagen());
			usuarioEntity.setNick(usuario.getNick());
		}
		
		return usuarioEntity;
	}
}
