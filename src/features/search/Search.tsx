import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  chooseVehicle,
  fetchManufacturers,
  fetchModels,
  fetchVehicle,
  fetchVehicles,
  selectManufacturers,
  selectModels,
  selectSelectedVehicle,
  selectVehicles,
} from "./searchSlice";
import "./Search.sass";
import { Manufacturer, Model, Vehicle } from "./searchAPI";

const VIEW_MANUFACTURER = "VIEW_MANUFACTURER";
const VIEW_MODEL = "VIEW_MODEL";
const VIEW_VEHICLE = "VIEW_VEHICLE";

const SEARCH_MODE_HSN_TSN = "SEARCH_MODE_HSN_TSN";
const SEARCH_MODE_MANUFACTURER_MODEL = "SEARCH_MODE_MANUFACTURER_MODEL";

export function Search() {
  const manufacturers = useAppSelector(selectManufacturers);
  const models = useAppSelector(selectModels);
  const vehicles = useAppSelector(selectVehicles);
  const selectedVehicle = useAppSelector(selectSelectedVehicle);

  const [searchMode, setSearchMode] = useState<string>(SEARCH_MODE_HSN_TSN);
  const [viewMode, setViewMode] = useState<string>(VIEW_MANUFACTURER);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [manufacturerQuery, setManufacturerQuery] = useState<string>("");
  const [modelQuery, setModelQuery] = useState<string>("");
  const [vehicleQuery, setVehicleQuery] = useState<string>("");
  const [hsn, setHsn] = useState<string>("");
  const [tsn, setTsn] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (manufacturers?.length === 0) {
      dispatch(fetchManufacturers());
    }
  });

  const onSelectManufacturer = function (manufacturer: Manufacturer) {
    setSelectedManufacturer(manufacturer?.name);
    setSelectedModel("");
    dispatch(fetchModels({ manufacturerName: manufacturer?.name }));
    setViewMode(VIEW_MODEL);
  };

  const onSelectModel = function (model: Model) {
    setSelectedModel(model?.name);
    dispatch(
      fetchVehicles({
        manufacturerName: selectedManufacturer,
        modelName: model?.name,
      })
    );
    setViewMode(VIEW_VEHICLE);
  };

  const onSelectVehicle = function (value: Vehicle) {
    dispatch(chooseVehicle(value));
  };

  useEffect(() => {
    const searchVehicle = function () {
      if (hsn.length === 4 && tsn.length === 3) {
        dispatch(
          fetchVehicle({
            hsn,
            tsn,
          })
        );
      }
    };
    searchVehicle();
  }, [dispatch, hsn, tsn]);

  const onChangeHsn = function (value: string) {
    setHsn(value);
  };

  const onChangeTsn = function (value: string) {
    setTsn(value);
  };

  const onSelectSearchMode = function (
    mode: "SEARCH_MODE_HSN_TSN" | "SEARCH_MODE_MANUFACTURER_MODEL"
  ) {
    setSearchMode(mode);
  };

  const goBack = function () {
    setManufacturerQuery("");
    setModelQuery("");
    setVehicleQuery("");
    setViewMode(viewMode === VIEW_VEHICLE ? VIEW_MODEL : VIEW_MANUFACTURER);
  };

  const contains = function (value: string, query: string) {
    return !query || value.toUpperCase().indexOf(query.toUpperCase()) !== -1;
  };

  const renderCard = (vehicle: Vehicle) => {
    return (
      <div className="card">
        <div className="manufacturer-logo">
          <img
            src={`./manufacturers/${selectedVehicle?.manufacturerLogo}.svg`}
            alt="Oops..."
          />
        </div>
        <div className="details">
          <div>{vehicle.manufacturer}</div>
          <div className="name">{vehicle.name}</div>
          <div className="type">{`${vehicle.body} • ${vehicle.fuel}`}</div>
          <div className="power">{`${vehicle.enginePowerInKW} KW / ${vehicle.enginePowerInHP} PS`}</div>
          <div className="hsn-tsn">{`HSN/TSN: ${vehicle.hsn}/${vehicle.tsn}`}</div>
        </div>
      </div>
    );
  };

  const renderManufacturerList = () => {
    return (
      <div>
        <div className="row-input">
          <input
            className="input"
            value={manufacturerQuery}
            placeholder="Manufacturer"
            onChange={(e) => setManufacturerQuery(e.target.value)}
          />
          <span className="x-button" onClick={() => setManufacturerQuery("")}>
            &nbsp;
          </span>
        </div>
        <div className="column">
          {manufacturers &&
            manufacturers
              .filter((item) => contains(item.name, manufacturerQuery))
              .sort((e1, e2) => e1.name.localeCompare(e2.name))
              .map((item, index) => (
                <button
                  key={`manufacturer_${index}`}
                  className="button"
                  onClick={() => onSelectManufacturer(item)}
                >
                  <div className="label">{item.name}</div>
                  <div className="arrow-forward">&nbsp;</div>
                </button>
              ))}
        </div>
      </div>
    );
  };

  const renderModelList = () => {
    return (
      <div>
        <div className="row-input">
          <input
            className="input"
            value={modelQuery}
            placeholder="Model"
            onChange={(e) => setModelQuery(e.target.value)}
          />
          <span className="x-button" onClick={() => setModelQuery("")}>
            &nbsp;
          </span>
        </div>
        <div className="column">
          {models &&
            models
              .filter((item) => contains(item.name, modelQuery))
              .sort((e1, e2) => e1.name.localeCompare(e2.name))
              .map((item, index) => (
                <button
                  key={`model_${index}`}
                  className="button"
                  onClick={() => onSelectModel(item)}
                >
                  <div className="label">{item.name}</div>
                  <div className="arrow-forward">&nbsp;</div>
                </button>
              ))}
        </div>
      </div>
    );
  };

  const renderVehicleList = () => {
    return (
      <div>
        <div className="row-input">
          <input
            className="input"
            value={vehicleQuery}
            placeholder="Vehicle"
            onChange={(e) => setVehicleQuery(e.target.value)}
          />
          <span className="x-button" onClick={() => setVehicleQuery("")}>
            &nbsp;
          </span>
        </div>
        <div className="column">
          {vehicles &&
            vehicles
              .filter((item) => contains(item.name, vehicleQuery))
              .sort((e1, e2) => e1.name.localeCompare(e2.name))
              .map((item, index) => (
                <button
                  key={`vehicle_${index}`}
                  className="button"
                  onClick={() => onSelectVehicle(item)}
                >
                  <div className="label">{item.name}</div>
                </button>
              ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {selectedVehicle && renderCard(selectedVehicle)}
      <div className="row">
        <button
          className={
            searchMode === SEARCH_MODE_HSN_TSN ? "button active" : "button"
          }
          onClick={() => onSelectSearchMode(SEARCH_MODE_HSN_TSN)}
        >
          <div className="label">HSN / TSN</div>
        </button>
        <button
          className={
            searchMode === SEARCH_MODE_MANUFACTURER_MODEL
              ? "button active"
              : "button"
          }
          onClick={() => onSelectSearchMode(SEARCH_MODE_MANUFACTURER_MODEL)}
        >
          <div className="label">MANUFACTURER / MODEL</div>
        </button>
      </div>
      {searchMode === SEARCH_MODE_HSN_TSN && (
        <div className="row">
          <input
            className="input"
            value={hsn}
            placeholder="HSN"
            maxLength={4}
            onChange={(e) => onChangeHsn(e.target.value)}
          />
          <input
            className="input"
            value={tsn}
            placeholder="TSN"
            maxLength={3}
            onChange={(e) => onChangeTsn(e.target.value)}
          />
          <span className="x-button" onClick={() => setHsn("")}>
            &nbsp;
          </span>
          <span className="x-button" onClick={() => setTsn("")}>
            &nbsp;
          </span>
        </div>
      )}
      {searchMode === SEARCH_MODE_MANUFACTURER_MODEL && (
        <div>
          {viewMode === VIEW_MANUFACTURER && renderManufacturerList()}
          {viewMode === VIEW_MODEL && renderModelList()}
          {viewMode === VIEW_VEHICLE && renderVehicleList()}
          {viewMode !== VIEW_MANUFACTURER && (
            <div>
              <button className="button link" onClick={() => goBack()}>
                <div className="arrow-back">&nbsp;</div>
                <div className="label">Back</div>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
