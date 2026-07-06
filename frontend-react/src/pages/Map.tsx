import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";

import type { markerService } from "../../../markerService";
import type { Marker as MarkerType } from "../types/Marker";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapPage() {
  const user = JSON.parse(
    localStorage.getItem("meowlyUser") || "null"
  );

  const isAdmin =
    user?.email === "maja.wronowska@interia.pl";

  const [markers, setMarkers] =
    useState<MarkerType[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [selectedType, setSelectedType] =
    useState("all");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [clickedPosition, setClickedPosition] =
    useState<{
      lat: number;
      lng: number;
    } | null>(null);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [type, setType] =
    useState("foundation");

  const [xp, setXp] =
    useState(20);

  useEffect(() => {
    loadMarkers();
  }, []);

  async function loadMarkers() {
    try {
      const data =
        await markerService.getMarkers();

      setMarkers(data);
    } catch (err) {
      console.error(err);
    }
  }

  function MapEvents() {
    useMapEvents({
      click(e) {
        if (!isAdmin) return;

        setClickedPosition({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });

        setModalOpen(true);
      },
    });

    return null;
  }

  async function saveMarker() {
    if (!clickedPosition) return;

    setLoading(true);

    try {
      await markerService.createMarker({
        title,
        description,
        address,
        type: type as any,
        lat: clickedPosition.lat,
        lng: clickedPosition.lng,
        xp,
        active: true,
      });

      await loadMarkers();

      setModalOpen(false);

      setTitle("");
      setDescription("");
      setAddress("");
      setType("foundation");
      setXp(20);

      setClickedPosition(null);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }

  const visibleMarkers = markers.filter((marker) => {
    const matchesType =
      selectedType === "all" ||
      marker.type === selectedType;

    const matchesSearch =
      marker.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      marker.description
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  const [markers, setMarkers] =
    useState<MarkerType[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [selectedType, setSelectedType] =
    useState("all");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [clickedPosition, setClickedPosition] =
    useState<{
      lat: number;
      lng: number;
    } | null>(null);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [type, setType] =
    useState("foundation");

  const [xp, setXp] =
    useState(20);

  useEffect(() => {
    loadMarkers();
  }, []);

  async function loadMarkers() {
    try {
      const data =
        await markerService.getMarkers();

      setMarkers(data);
    } catch (err) {
      console.error(err);
    }
  }

  function MapEvents() {
    useMapEvents({
      click(e) {
        if (!isAdmin) return;

        setClickedPosition({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });

        setModalOpen(true);
      },
    });

    return null;
  }

  async function saveMarker() {
    if (!clickedPosition) return;

    setLoading(true);

    try {
      await markerService.createMarker({
        title,
        description,
        address,
        type: type as any,
        lat: clickedPosition.lat,
        lng: clickedPosition.lng,
        xp,
        active: true,
      });

      await loadMarkers();

      setModalOpen(false);

      setTitle("");
      setDescription("");
      setAddress("");
      setType("foundation");
      setXp(20);

      setClickedPosition(null);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }

  const visibleMarkers = markers.filter((marker) => {
    const matchesType =
      selectedType === "all" ||
      marker.type === selectedType;

    const matchesSearch =
      marker.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      marker.description
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

            <MapContainer
            center={[52.2297, 21.0122]}
            zoom={12}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapEvents />

            {visibleMarkers.map((marker) => (
              <Marker
                key={marker.id}
                position={[marker.lat, marker.lng]}
              >
                <Popup>
                  <div className="w-[260px]">

                    {marker.image && (
                      <img
                        src={marker.image}
                        alt={marker.title}
                        className="mb-4 h-40 w-full rounded-2xl object-cover"
                      />
                    )}

                    <h2 className="text-xl font-black text-slate-900">
                      {marker.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {marker.description}
                    </p>

                    {marker.address && (
                      <p className="mt-3 text-sm font-semibold text-orange-500">
                        📍 {marker.address}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between">

                      <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-black text-orange-600">
                        +{marker.xp} XP
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
                        {marker.type}
                      </span>

                    </div>

                    <Button
                      fullWidth
                      className="mt-5"
                    >
                      Rozpocznij misję
                    </Button>

                    {isAdmin && (
                      <div className="mt-3 flex gap-2">

                        <Button
                          variant="secondary"
                          fullWidth
                        >
                          Edytuj
                        </Button>

                        <Button
                          variant="danger"
                          fullWidth
                          onClick={async () => {
                            if (
                              !confirm(
                                "Usunąć marker?"
                              )
                            )
                              return;

                            await markerService.deleteMarker(
                              marker.id
                            );

                            loadMarkers();
                          }}
                        >
                          Usuń
                        </Button>

                      </div>
                    )}

                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

        </div>

      </div>
            <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setClickedPosition(null);
        }}
        title="Dodaj nowy punkt"
        width="lg"
      >
        <div className="space-y-5">

          <Input
            label="Nazwa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="np. Fundacja Koci Azyl"
          />

          <Input
            label="Adres"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Warszawa..."
          />

          <div>

            <label className="mb-2 block font-black text-slate-800">
              Typ punktu
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-14 w-full rounded-2xl border-2 border-orange-200 px-5 outline-none focus:border-orange-500"
            >

              <option value="foundation">
                Fundacja
              </option>

              <option value="mission">
                Misja
              </option>

              <option value="feeding">
                Punkt dokarmiania
              </option>

              <option value="cat_house">
                Budka
              </option>

              <option value="vet">
                Weterynarz
              </option>

              <option value="event">
                Wydarzenie
              </option>

            </select>

          </div>

          <div>

            <label className="mb-2 block font-black text-slate-800">
              Opis
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full rounded-2xl border-2 border-orange-200 p-5 outline-none focus:border-orange-500"
              placeholder="Opisz to miejsce..."
            />

          </div>

          <Input
            label="XP"
            type="number"
            value={xp}
            onChange={(e) =>
              setXp(Number(e.target.value))
            }
          />

          {clickedPosition && (

            <Card hover={false}>

              <h3 className="text-lg font-black">
                Wybrane współrzędne
              </h3>

              <p className="mt-3 text-slate-600">
                Lat: {clickedPosition.lat.toFixed(6)}
              </p>

              <p className="text-slate-600">
                Lng: {clickedPosition.lng.toFixed(6)}
              </p>

            </Card>

          )}

          <div className="flex gap-4">

            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                setModalOpen(false);
                setClickedPosition(null);
              }}
            >
              Anuluj
            </Button>

            <Button
              fullWidth
              loading={loading}
              onClick={saveMarker}
            >
              Zapisz punkt
            </Button>

          </div>

        </div>

      </Modal>

    </main>
  );
}