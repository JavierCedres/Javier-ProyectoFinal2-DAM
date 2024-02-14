package es.iespuertodelacruz.jmcg.recetasapi.domain.model;

import java.math.BigInteger;

public class Receta {
	private Integer id;

	private String descripcion;

	private Long fechadecreacion;

	private String imagen;

	private int likes;

	private String nombre;

	private String receta;
	
	private Usuario usuario;

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

	public Long getFechadecreacion() {
		return fechadecreacion;
	}

	public void setFechadecreacion(Long fechadecreacion) {
		this.fechadecreacion = fechadecreacion;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
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
	
	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}
