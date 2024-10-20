import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Typography } from '@material-tailwind/react';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import L from 'leaflet';
import { fetchCountryDetail, addCooperation } from '../features/countrySlice';
import 'leaflet/dist/leaflet.css';
import Footer from '../components/Footer';

export default function CountryDetail() {
  const { countryCode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    countryDetail, detailStatus, detailError, cooperation,
  } = useSelector(
    (state) => state.countries,
  );
  const desktopMapRef = useRef(null);
  const mobileMapRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCountryDetail(countryCode));
  }, [countryCode, dispatch]);

  const initializeMap = (mapId, lat, lng, mapRef) => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    const DefaultIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const map = L.map(mapId).setView([lat, lng], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([lat, lng], { icon: DefaultIcon })
      .addTo(map)
      .bindPopup(`${countryDetail.name.common}`)
      .openPopup();

    mapRef.current = map;
  };

  useEffect(() => {
    if (countryDetail && countryDetail.latlng) {
      initializeMap(
        'desktop-map',
        countryDetail.latlng[0],
        countryDetail.latlng[1],
        desktopMapRef,
      );

      initializeMap(
        'mobile-map',
        countryDetail.latlng[0],
        countryDetail.latlng[1],
        mobileMapRef,
      );
    }
  }, [countryDetail]);

  if (detailStatus === 'loading') {
    return (
      <div className="custom-loader flex w-1/2 items-center justify-center" />
    );
  }

  if (detailStatus === 'failed') {
    return (
      <div>
        Error:
        {detailError}
      </div>
    );
  }

  if (!countryDetail) {
    return <div>No details available</div>;
  }

  const isInCooperation = cooperation.some((c) => c.cca3 === countryCode);

  const handleCooperation = () => {
    if (isInCooperation) return;

    const success = Math.random() > 0.5;
    if (success) {
      dispatch(addCooperation(countryDetail));
      alert(
        `${countryDetail.name.common} has successfully entered into cooperation!`,
      );
      navigate('/cooperation');
    } else {
      alert(
        `Failed to establish cooperation with ${countryDetail.name.common}. Try again!`,
      );
    }
  };

  const {
    name,
    flags,
    population,
    capital,
    currencies,
    languages,
    region,
    coatOfArms,
  } = countryDetail;

  const countryDescription = `
  The country you are viewing is ${name.common}.
  ${flags.alt ? flags.alt : ''}
  The languages spoken in ${name.common} are ${Object.values(languages).join(
  ', ',
)}.
  The official currency of ${name.common} is ${
  Object.values(currencies)[0].name
} (${Object.values(currencies)[0].symbol}).
  Is ${name.common} an independent country? ${
  countryDetail.independent ? 'Yes' : 'No'
}.
  The capital city of ${name.common} is ${
  capital ? capital[0] : 'not available'
}.
  The population of ${
  name.common
} is approximately ${population.toLocaleString()}.
  `;

  return (
    <>
      <div className="relative hidden h-[500px] md:block">
        <div
          id="desktop-map"
          className="hidden sm:absolute sm:inset-0 sm:block"
          style={{
            height: '100%',
            width: '100%',
          }}
        />
        <div
          className="container mx-auto h-[22rem] translate-y-0 px-8 sm:translate-y-96 lg:px-48"
          style={{ position: 'relative', zIndex: 1000 }}
        >
          <img
            width={1024}
            height={1024}
            alt="avatar"
            src={flags.svg}
            className="h-48 w-64 rounded-xl"
          />
          <div className="mt-16 flex justify-between">
            <Typography variant="h5" className="text-3xl">
              {name.common}
            </Typography>
            <Button
              onClick={handleCooperation}
              color="gray"
              disabled={isInCooperation}
            >
              {isInCooperation
                ? 'Already in Cooperation'
                : 'Establish Cooperation'}
            </Button>
          </div>
          <div className="flex items-center gap-6">
            <div className="mt-3 flex items-center gap-2">
              <Typography className="font-bold !text-gray-900">
                {population.toLocaleString()}
              </Typography>
              <Typography className="font-normal !text-gray-500">
                Population
              </Typography>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Typography className="font-bold !text-gray-900">
                {Object.values(languages).join(', ')}
              </Typography>
              <Typography className="font-normal !text-gray-500">
                Languages
              </Typography>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Typography className="font-bold !text-gray-900">
                {region}
              </Typography>
              <Typography className="font-normal !text-gray-500">
                Region
              </Typography>
            </div>
          </div>
          <Typography variant="lead" className="mt-8 text-lg text-gray-800">
            {countryDescription}
          </Typography>

          {coatOfArms.svg || coatOfArms.png ? (
            <>
              <div className="mt-10 flex justify-center">
                <img
                  src={coatOfArms.svg ? coatOfArms.svg : coatOfArms.png}
                  alt={coatOfArms.alt ? coatOfArms.alt : ''}
                  className="w-52"
                />
              </div>
              <p className="mt-4 text-center font-bold italic">
                {name.official}
                {' '}
                coat of arms
              </p>
            </>
          ) : (
            <Typography className="mt-4 text-center italic">
              No coat of arms available
            </Typography>
          )}
          <div className="mt-16">
            <Footer />
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="container mx-auto translate-y-0 px-8">
          <img
            width={1024}
            height={1024}
            alt="avatar"
            src={flags.svg}
            className="mx-auto w-8/12 rounded-xl"
          />
          <div className="mt-8 flex justify-between">
            <Typography variant="h5" className="text-3xl">
              {name.common}
            </Typography>
          </div>
          <div className="grid">
            <div className="mt-3 grid grid-rows-2">
              <Typography className="font-bold !text-gray-900">
                {population.toLocaleString()}
              </Typography>
              <Typography className="font-normal !text-gray-500">
                Population
              </Typography>
            </div>
            <div className="mt-3 grid grid-rows-2">
              <Typography className="font-bold !text-gray-900">
                {Object.values(languages).join(', ')}
              </Typography>
              <Typography className="font-normal !text-gray-500">
                Languages
              </Typography>
            </div>
            <div className="mt-3 grid grid-rows-2">
              <Typography className="font-bold !text-gray-900">
                {region}
              </Typography>
              <Typography className="font-normal !text-gray-500">
                Region
              </Typography>
            </div>
            <Button
              className="mt-4"
              onClick={handleCooperation}
              color="gray"
              disabled={isInCooperation}
            >
              {isInCooperation
                ? 'Already in Cooperation'
                : 'Establish Cooperation'}
            </Button>
          </div>
          <Typography variant="lead" className="mt-8 text-lg text-gray-800">
            {countryDescription}
          </Typography>

          {coatOfArms.svg || coatOfArms.png ? (
            <>
              <div className="mt-10 flex justify-center">
                <img
                  src={coatOfArms.svg ? coatOfArms.svg : coatOfArms.png}
                  alt={coatOfArms.alt ? coatOfArms.alt : ''}
                  className="w-52"
                />
              </div>
              <p className="mt-4 text-center font-bold italic">
                {name.official}
                {' '}
                coat of arms
              </p>
            </>
          ) : (
            <Typography className="mt-4 text-center italic">
              No coat of arms available
            </Typography>
          )}

          <div id="mobile-map" className="my-8 block h-[300px] w-full" />
        </div>
        <Footer />
      </div>
    </>
  );
}
