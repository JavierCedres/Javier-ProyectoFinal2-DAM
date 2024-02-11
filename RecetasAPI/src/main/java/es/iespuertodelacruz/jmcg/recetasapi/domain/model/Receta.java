package es.iespuertodelacruz.jmcg.recetasapi.domain.model;

import java.math.BigInteger;

public class Receta {
	private Integer id;

	private String autor;

	private Object descripcion;

	private BigInteger fechadecreacion;

	private String imagen;

	private Integer likes;

	private String nombre;

	private Object receta;

	public Receta() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public Object getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(Object descripcion) {
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

	public Object getReceta() {
		return receta;
	}

	public void setReceta(Object receta) {
		this.receta = receta;
	}
}
