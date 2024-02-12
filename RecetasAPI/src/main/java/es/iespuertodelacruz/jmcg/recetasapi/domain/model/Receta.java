package es.iespuertodelacruz.jmcg.recetasapi.domain.model;

import java.math.BigInteger;

public class Receta {
	private Integer id;

	private String descripcion;

	private BigInteger fechadecreacion;

	private String imagen;

	private int likes;

	private String nombre;

	private String receta;

	public Receta() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public BigInteger getFechadecreacion() {
		return fechadecreacion;
	}

	public void setFechadecreacion(BigInteger fechadecreacion) {
		this.fechadecreacion = fechadecreacion;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public Integer getLikes() {
		return likes;
	}

	public void setLikes(Integer likes) {
		this.likes = likes;
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
}
