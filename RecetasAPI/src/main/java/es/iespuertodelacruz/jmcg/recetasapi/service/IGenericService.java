package es.iespuertodelacruz.jmcg.recetasapi.service;

import java.util.Optional;

public interface IGenericService<T, E> {
	Iterable<T> findAll();
	Optional<T> findById(E id);
	T save(T element);
	boolean deleteById(E id);
}
