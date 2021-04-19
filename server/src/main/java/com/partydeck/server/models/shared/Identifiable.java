package com.partydeck.server.models.shared;

/**
 * An interface that ensures the object has a unique key
 * @param <K> the type of the unique key
 */
public interface Identifiable<K> {

    /**
     * Checks if a given id is identical to the identifiable object id
     * @param id the id to compare to
     * @return true if the two values match
     */
    boolean is(K id);

    /**
     * Returns the id of the object
     * @return the object id
     */
    K getId();

}
