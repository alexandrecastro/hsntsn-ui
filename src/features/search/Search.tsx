import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  chooseVehicle,
  fetchManufacturers,
  fetchModels,
  fetchVehicles,
  selectManufacturers,
  selectModels,
  selectVehicles,
} from "./searchSlice";
import styles from "./Search.module.css";
import { Manufacturer, Model, Vehicle } from "./searchAPI";

const VIEW_MANUFACTURER = "VIEW_MANUFACTURER";
const VIEW_MODEL = "VIEW_MODEL";
const VIEW_VEHICLE = "VIEW_VEHICLE";

export function Search() {
  const manufacturers = useAppSelector(selectManufacturers);
  const models = useAppSelector(selectModels);
  const vehicles = useAppSelector(selectVehicles);

  const [viewMode, setViewMode] = useState<string>(VIEW_MANUFACTURER);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (manufacturers?.length === 0) {
      dispatch(fetchManufacturers());
    }
  });

  const onSelectManufacturer = function (manufacturer: Manufacturer) {
    setSelectedManufacturer(manufacturer?.name);
    setSelectedModel("");
    setSelectedVehicle("");
    dispatch(fetchModels({ manufacturerName: manufacturer?.name }));
    setViewMode(VIEW_MODEL);
  };

  const onSelectModel = function (model: Model) {
    setSelectedModel(model?.name);
    setSelectedVehicle("");
    dispatch(
      fetchVehicles({
        manufacturerName: selectedManufacturer,
        modelName: model?.name,
      })
    );
    setViewMode(VIEW_VEHICLE);
  };

  const onSelectVehicle = function (vehicle: Vehicle) {
    setSelectedVehicle(vehicle?.name);
    dispatch(chooseVehicle(vehicle));
  };

  const goBack = function () {
    setViewMode(viewMode === VIEW_VEHICLE ? VIEW_MODEL : VIEW_MANUFACTURER);
  };

  const vehicle = `${selectedManufacturer}${
    selectedModel ? " • " + selectedModel : ""
  }${selectedVehicle ? " • " + selectedVehicle : ""}`;

  return (
    <div className={styles.container}>
      <div className={styles.card}>{vehicle}</div>
      {viewMode !== VIEW_MANUFACTURER && (
        <div className={styles.column}>
          <button className={styles.button} onClick={() => goBack()}>
            <div className={styles.arrowBack}></div>
            <div className={styles.label}>Back</div>
          </button>
        </div>
      )}
      {viewMode === VIEW_MANUFACTURER && (
        <div className={styles.column}>
          {manufacturers &&
            manufacturers.map((manufacturer, index) => (
              <button
                key={index}
                className={styles.button}
                onClick={() => onSelectManufacturer(manufacturer)}
              >
                <div className={styles.label}>{manufacturer.name}</div>
                <div className={styles.arrowForward}></div>
              </button>
            ))}
        </div>
      )}
      {viewMode === VIEW_MODEL && (
        <div className={styles.column}>
          {models &&
            models.map((model, index) => (
              <button
                key={index}
                className={styles.button}
                onClick={() => onSelectModel(model)}
              >
                <div className={styles.label}>{model.name}</div>
                <div className={styles.arrowForward}></div>
              </button>
            ))}
        </div>
      )}
      {viewMode === VIEW_VEHICLE && (
        <div className={styles.column}>
          {vehicles &&
            vehicles.map((vehicle, index) => (
              <button
                key={index}
                className={styles.button}
                onClick={() => onSelectVehicle(vehicle)}
              >
                <div className={styles.label}>{vehicle.name}</div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
