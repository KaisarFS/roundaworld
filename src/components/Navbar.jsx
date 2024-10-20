import React from 'react';
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import { NAV_MENU } from './NavMenu';

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpen(false),
    );
  }, []);

  return (
    <MTNavbar
      shadow={false}
      fullWidth
      className="sticky top-0 z-[1001] border-0"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <Typography color="blue-gray" className="text-lg font-bold">
            RoundaWorld
          </Typography>
        </Link>
        <ul className="ml-10 hidden items-center gap-8 lg:flex">
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem key={name} href={href}>
              <Icon className="size-5" />
              {name}
            </NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="text">Sign In</Button>
          <a href="#" target="_blank">
            <Button color="gray">Explore</Button>
          </a>
        </div>
        <IconButton
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="size-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="size-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            {NAV_MENU.map(({ name, icon: Icon }) => (
              <NavItem key={name}>
                <Icon className="size-5" />
                {name}
              </NavItem>
            ))}
          </ul>
          <div className="mb-4 mt-6 flex items-center gap-2">
            <Button variant="text">Sign In</Button>
            <a href="#" target="_blank">
              <Button color="gray">blocks</Button>
            </a>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}
