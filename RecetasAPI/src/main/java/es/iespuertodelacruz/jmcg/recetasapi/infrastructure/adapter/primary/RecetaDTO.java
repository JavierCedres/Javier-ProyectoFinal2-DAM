package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary;

import java.math.BigInteger;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;

public class RecetaDTO {
	private String descripcion;
	
	private String imagen64;
	
	private String imagenNombre;

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

	public String getImagen64() {
		return imagen64;
	}

	public void setImagen64(String imagen64) {
		this.imagen64 = imagen64;
	}
	
	public String getImagenNombre() {
		return imagenNombre;
	}

	public void setImagenNombre(String imagenNombre) {
		this.imagenNombre = imagenNombre;
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
