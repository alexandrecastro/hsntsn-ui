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
import Card from "../../components/Card";
import Input from "../../components/Input";
import List from "../../components/List";
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
  const [hsn, setHsn] = useState<string>("");
  const [tsn, setTsn] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (manufacturers?.length === 0) {
      dispatch(fetchManufacturers());
    }
  });

  const onSelectManufacturer = function (
    manufacturer: Manufacturer | { name: string }
  ) {
    setSelectedManufacturer(manufacturer?.name);
    dispatch(fetchModels({ manufacturerName: manufacturer?.name }));
    setViewMode(VIEW_MODEL);
  };

  const onSelectModel = function (model: Model | { name: string }) {
    dispatch(
      fetchVehicles({
        manufacturerName: selectedManufacturer,
        modelName: model?.name,
      })
    );
    setViewMode(VIEW_VEHICLE);
  };

  const onSelectVehicle = function (value: Vehicle | any) {
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
    setViewMode(viewMode === VIEW_VEHICLE ? VIEW_MODEL : VIEW_MANUFACTURER);
  };

  return (
    <div className="container">
      {false && <div className="loading" />}
      {selectedVehicle && <Card vehicle={selectedVehicle} />}
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
          <Input
            value={hsn}
            placeholder="HSN"
            handleChange={onChangeHsn}
            maxLength={4}
          />
          <Input
            value={tsn}
            placeholder="TSN"
            handleChange={onChangeTsn}
            maxLength={3}
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
          {viewMode === VIEW_MANUFACTURER && (
            <List
              id="manufacturer"
              items={manufacturers}
              handleSelect={onSelectManufacturer}
              drilldown={true}
              search={true}
              placeholder="Manufacturer"
            />
          )}
          {viewMode === VIEW_MODEL && (
            <List
              id="model"
              items={models}
              handleSelect={onSelectModel}
              drilldown={true}
              search={true}
              placeholder="Model"
            />
          )}
          {viewMode === VIEW_VEHICLE && (
            <List
              id="vehicle"
              items={vehicles}
              handleSelect={onSelectVehicle}
              drilldown={false}
              search={true}
              placeholder="Vehicle"
            />
          )}
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
