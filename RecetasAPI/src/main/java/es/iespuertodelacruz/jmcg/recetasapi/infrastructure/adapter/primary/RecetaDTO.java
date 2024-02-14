package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary;

import java.math.BigInteger;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;

public class RecetaDTO {
	private String descripcion;
	
	private String imagen;

	private String nombre;

	private String receta;
	
	private Integer idUsuario;

	public RecetaDTO() {
		super();
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getReceta() {
		return receta;
	}

	public void setReceta(String receta) {
		this.receta = receta;
	}
	
	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}
}
