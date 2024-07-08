import React, { createContext, useContext, useState } from 'react';

const PetsContext = createContext();

export const usePets = () => {
    return useContext(PetsContext);
};

export const PetsProvider = ({ children }) => {
    const [shouldUpdate, setShouldUpdate] = useState(false);

    const triggerUpdate = () => {
        setShouldUpdate((prev) => !prev);
    };

    return (
        <PetsContext.Provider value={{ shouldUpdate, triggerUpdate }}>
            {children}
        </PetsContext.Provider>
    );
};