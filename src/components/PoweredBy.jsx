import { Typography } from '@material-tailwind/react';

const data = [
  'grosirone',
  'google',
  'ipsumone',
  'ipsumtwo',
  'ipsumthree',
  'ipsumfour',
  'ipsumfive',
];

export default function PoweredBy() {
  return (
    <section className="px-8 pb-20">
      <div className="container mx-auto text-center">
        <Typography variant="h6" color="blue-gray" className="mb-8">
          Powered by
        </Typography>
        <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <ul className="animate-infinite-scroll flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
            {data.map((logo, key) => (
              <li key={key}>
                <img
                  className="w-40"
                  src={`/logos/logo-${logo}.svg`}
                  alt={logo}
                />
              </li>
            ))}

          </ul>
          <ul
            className="animate-infinite-scroll flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
            aria-hidden="true"
          >
            {data.map((logo, key) => (
              <li key={key}>
                <img
                  className="w-40"
                  src={`/logos/logo-${logo}.svg`}
                  alt={logo}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
