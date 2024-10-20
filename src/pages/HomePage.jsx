import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { fetchCountries } from '../features/countrySlice';
import ProjectCard from '../components/ProjectCard';

export default function Countries() {
  const dispatch = useDispatch();
  const { countries, status, error } = useSelector((state) => state.countries);

  const [active, setActive] = useState(1);
  const countriesPerPage = 8;
  const totalPages = Math.ceil(countries.length / countriesPerPage);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  const startIndex = (active - 1) * countriesPerPage;
  const currentCountries = countries.slice(
    startIndex,
    startIndex + countriesPerPage,
  );

  const next = () => {
    if (active < totalPages) {
      setActive(active + 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (active <= 3) {
      pageNumbers.push(1, 2, 3, 4, '...', totalPages);
    } else if (active > totalPages - 3) {
      pageNumbers.push(
        1,
        '...',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pageNumbers.push(
        1,
        '...',
        active - 1,
        active,
        active + 1,
        '...',
        totalPages,
      );
    }

    return pageNumbers;
  };

  const getItemProps = (index) => ({
    variant: active === index ? 'filled' : 'text',
    color: 'gray',
    onClick: () => setActive(index),
    className: 'rounded-full',
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  return (
    <section className="px-8 py-4 md:py-28">
      <div className="container mx-auto mb-20 text-start">
        <Typography id="countries" variant="h2" color="blue-gray" className="mb-4">
          All Countries
        </Typography>
        <Typography
          variant="lead"
          className="w-full text-justify font-normal !text-gray-500 md:text-start lg:w-8/12"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
          nesciunt eaque laboriosam ipsam dignissimos ex impedit accusamus odit!
          Alias quae hic laboriosam repudiandae eveniet numquam eum nisi
          voluptas quaerat necessitatibus.
        </Typography>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4">
        {currentCountries.map((props, idx) => (
          <ProjectCard key={idx} {...props} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex flex-col items-center gap-4">
        {/* Desktop */}
        <div className="mt-10 hidden items-center justify-center gap-4 sm:flex">
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            onClick={prev}
            disabled={active === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="size-4" />
            {' '}
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {getPageNumbers().map((page, index) => (typeof page === 'number' ? (
              <IconButton key={index} {...getItemProps(page)}>
                {page}
              </IconButton>
            ) : (
              <span key={index} className="text-gray-500">
                ...
              </span>
            )))}
          </div>

          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            onClick={next}
            disabled={active === totalPages}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className="size-4" />
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex flex-col items-center gap-4 sm:hidden">
          {/* Page Numbers (top row) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {getPageNumbers().map((page, index) => (typeof page === 'number' ? (
              <IconButton key={index} {...getItemProps(page)}>
                {page}
              </IconButton>
            ) : (
              <span key={index} className="text-gray-500">
                ...
              </span>
            )))}
          </div>

          {/* Navigation buttons (bottom row) */}
          <div className="flex w-full justify-between gap-4">
            <Button
              variant="text"
              className="flex items-center gap-2 rounded-full"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="size-4" />
              {' '}
              Previous
            </Button>
            <Button
              variant="text"
              className="flex items-center gap-2 rounded-full"
              onClick={next}
              disabled={active === totalPages}
            >
              Next
              <ArrowRightIcon strokeWidth={2} className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
