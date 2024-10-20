import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ name, flags, cca3 }) {
  return (
    <Link to={`/country/${cca3}`}>
      <Card color="transparent" shadow={false}>
        <CardHeader floated={false} className="mx-0 mb-6 mt-0 h-48">
          <img
            src={flags?.png ? flags.png : 'fallback-image-url.png'}
            alt={name.common}
            className="size-full object-cover"
          />
        </CardHeader>
        <CardBody className="p-0">
          <a
            href="https://www.lipsum.com/"
            className="text-blue-gray-900 transition-colors hover:text-gray-800"
          >
            <Typography variant="h5" className="mb-2">
              {name.common}
            </Typography>
          </a>
          {/* <Typography className="mb-6 font-normal !text-gray-500">
          {name.common}
        </Typography> */}
          {/* <Button color="gray" size="sm">
          see details
        </Button> */}
          <Button color="gray" size="sm">
            see details
          </Button>
        </CardBody>
      </Card>
    </Link>
  );
}
