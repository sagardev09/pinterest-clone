// SavedPinsContext.js
"use client"
import React, { createContext, useContext, useState } from 'react';

const SavedPinsContext = createContext();

export const SavedPinsProvider = ({ children }) => {

    const [savedPins, setSavedPins] = useState([]);

    const addSavedPin = (pin) => {
        setSavedPins((prevSavedPins) => [...prevSavedPins, pin]);
        console.log(savedPins);
    };

    const removeSavedPin = (pinId) => {
        setSavedPins((prevSavedPins) => prevSavedPins.filter((pin) => pin.id !== pinId))
    }



    return (
        <SavedPinsContext.Provider value={{ savedPins, addSavedPin, removeSavedPin }}>
            {children}
        </SavedPinsContext.Provider>
    );
};

export const useSavedPins = () => {
    return useContext(SavedPinsContext);
};
