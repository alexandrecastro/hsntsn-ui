import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectManufacturers,
  selectModels,
  selectVehicles,
  loadManufacturers,
  loadModels,
  loadVehicles,
  loadVehicle,
} from "./vehicleSlice";
import styles from "./Vehicle.module.css";
import { Manufacturer, Model } from "../../app/domain";

export function Vehicle() {
  const manufacturers = useAppSelector(selectManufacturers);
  const models = useAppSelector(selectModels);
  const vehicles = useAppSelector(selectVehicles);

  const dispatch = useAppDispatch();

  const [selectedManufacturer, setSelectedManufacturer] = useState<
    Manufacturer
  >();
  const [selectedModel, setSelectedModel] = useState<Model>();
  const [selectedVehicle, setSelectedVehicle] = useState();

  useEffect(() => {
    dispatch(loadManufacturers());
  }, []);

  return (
    <div>
      <div>
        {selectedManufacturer?.name} • {selectedModel?.name} • {selectedVehicle}
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          {manufacturers.map((manufacturer) => (
            <button
              className={
                selectedManufacturer === manufacturer
                  ? styles.button + " " + styles.selected
                  : styles.button
              }
              aria-label={manufacturer.name}
              onClick={() => {
                setSelectedManufacturer(manufacturer);
                dispatch(loadModels(manufacturer.name));
              }}
            >
              {manufacturer.name}
            </button>
          ))}
        </div>
        <div className={styles.column}>
          {models.map((model) => (
            <button
              className={
                selectedModel === model
                  ? styles.button + " " + styles.selected
                  : styles.button
              }
              aria-label={model.name}
              onClick={() => {
                setSelectedModel(model);
                dispatch(
                  loadVehicles({
                    manufacturerName: selectedManufacturer?.name || "",
                    modelName: model.name || "",
                  })
                );
              }}
            >
              {model.name}
            </button>
          ))}
        </div>
        <div className={styles.column}>
          {vehicles.map((vehicle) => (
            <button
              className={styles.button}
              aria-label={vehicle.name}
              onClick={() => dispatch(loadVehicle(vehicle))}
            >
              {vehicle.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
