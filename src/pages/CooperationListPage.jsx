import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog, DialogHeader, DialogBody, DialogFooter, Button,
} from '@material-tailwind/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { removeCooperation } from '../features/countrySlice';

export default function CooperationList() {
  const { cooperation } = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleOpen = (country) => {
    setSelectedCountry(country);
    setOpen(!open);
  };

  const handleRemove = () => {
    if (selectedCountry) {
      dispatch(removeCooperation(selectedCountry));
      setOpen(false);
      setSelectedCountry(null);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white">
            Countries that have
            {' '}
            <span className="text-blue-600">collaborated</span>
            {' '}
            with you
          </h1>
          <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
            List of countries that have established cooperation with you.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-5xl">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {cooperation.length === 0 ? (
              <p className="col-span-3 text-center text-gray-800 dark:text-neutral-400">
                No cooperating countries yet.
              </p>
            ) : (
              cooperation.map((country) => (
                <div
                  key={country.cca3}
                  className="group relative block overflow-hidden rounded-lg"
                >
                  <img
                    className="size-40 w-full rounded-lg bg-gray-100 object-cover dark:bg-neutral-800"
                    src={country.flag}
                    alt={`${country.name} flag`}
                  />
                  <div className="absolute bottom-1 end-1 opacity-0 transition group-hover:opacity-100">
                    <div
                      className="flex cursor-pointer items-center gap-x-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-gray-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                      onClick={() => handleOpen(country)}
                    >
                      <TrashIcon className="size-4 text-gray-800 dark:text-neutral-200" />
                      <span className="text-xs">Remove</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Confirm Removal</DialogHeader>
            <DialogBody divider>
              {selectedCountry ? (
                <p>
                  Are you sure you want to remove
                  {selectedCountry.name}
                  {' '}
                  from cooperation?
                </p>
              ) : (
                <p>No country selected.</p>
              )}
            </DialogBody>
            <DialogFooter>
              <Button variant="text" color="red" onClick={() => setOpen(false)} className="mr-1">
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green" onClick={handleRemove}>
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>

          <div className="mt-6 text-center">
            <Button onClick={() => navigate('/')} color="blue" className="px-4 py-2">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
