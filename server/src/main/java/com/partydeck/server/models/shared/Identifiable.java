package com.partydeck.server.models.shared;

/**
 * An interface that ensures the object has a unique key
 * @param <K> the type of the unique key
 */
public interface Identifiable<K> {

    boolean is(K id);

    K getId();

}
