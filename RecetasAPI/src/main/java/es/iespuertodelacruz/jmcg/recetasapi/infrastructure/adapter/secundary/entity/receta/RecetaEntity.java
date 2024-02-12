package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.receta;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigInteger;
import java.util.List;

import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.usuario.UsuarioEntity;


/**
 * The persistent class for the recetas database table.
 * 
 */
@Entity
@Table(name="recetas")
@NamedQuery(name="Receta.findAll", query="SELECT r FROM RecetaEntity r")
public class RecetaEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	private String descripcion;

	private BigInteger fechadecreacion;

	private String imagen;

	private int likes;

	private String nombre;

	private String receta;

	//bi-directional many-to-many association to Usuario
	@ManyToMany(fetch= FetchType.EAGER)
	@JoinTable(
		name="favoritos"
		, joinColumns={
			@JoinColumn(name="id_receta")
			}
		, inverseJoinColumns={
			@JoinColumn(name="id_usuario")
			}
		)
	private List<UsuarioEntity> usuarios;

	//bi-directional many-to-one association to Usuario
	@ManyToOne
	@JoinColumn(name="id_autor")
	private UsuarioEntity usuario;

	public RecetaEntity() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescripcion() {
		return this.descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public BigInteger getFechadecreacion() {
		return this.fechadecreacion;
	}

	public void setFechadecreacion(BigInteger fechadecreacion) {
		this.fechadecreacion = fechadecreacion;
	}

	public String getImagen() {
		return this.imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public int getLikes() {
		return this.likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getReceta() {
		return this.receta;
	}

	public void setReceta(String receta) {
		this.receta = receta;
	}

	public List<UsuarioEntity> getUsuarios() {
		return this.usuarios;
	}

	public void setUsuarios(List<UsuarioEntity> usuarios) {
		this.usuarios = usuarios;
	}

	public UsuarioEntity getUsuario() {
		return this.usuario;
	}

	public void setUsuario(UsuarioEntity usuario) {
		this.usuario = usuario;
	}

}