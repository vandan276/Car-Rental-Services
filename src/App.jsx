import React, { useMemo, useReducer, useState } from 'react';
import {
  Mountain,
  Compass,
  Car,
  Sparkles,
  MapPin,
  Clock,
  Users,
  Calendar,
  Phone,
  Mail,
  Send,
  ShieldCheck,
  Plus,
  Trash2,
  X,
  LogOut,
  LayoutDashboard,
  Briefcase,
  CarFront,
  CheckCircle2,
  ArrowRight,
  Star,
  Hotel,
  UserRound,
  Menu,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Seed data                                                                 */
/* -------------------------------------------------------------------------- */

const SEED_TOURS = [
  {
    id: 't-001',
    title: 'Saharan Dunes Expedition',
    destination: 'Merzouga, Morocco',
    duration: '6 days / 5 nights',
    price: 1480,
    description:
      'Trace the amber crests of Erg Chebbi by camel at dawn, sleep beneath constellations in a private Berber camp, and recover with mint tea in a kasbah lit by lanterns.',
    highlights: [
      'Private camel caravan at sunrise',
      'Luxury desert camp with full board',
      'Atlas Mountains scenic drive',
      'Traditional Berber music evening',
    ],
  },
  {
    id: 't-002',
    title: 'Pine Coast Editorial Drive',
    destination: 'Big Sur, California',
    duration: '4 days / 3 nights',
    price: 2150,
    description:
      'A slow, considered route along the Pacific Coast Highway with curated stops at hidden coves, cliffside spas, and a private redwood dinner under string lights.',
    highlights: [
      'Cliffside boutique stays',
      'Private redwood forest dinner',
      'Curated artisan studio visits',
      'Sunset photography session',
    ],
  },
  {
    id: 't-003',
    title: 'Tuscan Vineyard Atelier',
    destination: 'Val d\u2019Orcia, Italy',
    duration: '7 days / 6 nights',
    price: 3290,
    description:
      'Live like a Tuscan for a week: villa with a cypress-lined drive, mornings in family vineyards, pasta lessons in a 14th-century farmhouse, and unhurried afternoons.',
    highlights: [
      'Private villa with infinity pool',
      'Sommelier-led vineyard tastings',
      'Hands-on pasta and bread atelier',
      'Vintage Fiat tour of hill towns',
    ],
  },
];

const SEED_CARS = [
  {
    id: 'c-001',
    name: 'Range Rover Velar',
    type: 'Luxury SUV',
    seats: 5,
    pricePerDay: 220,
    available: true,
  },
  {
    id: 'c-002',
    name: 'Mercedes V-Class',
    type: 'Executive Van',
    seats: 7,
    pricePerDay: 285,
    available: true,
  },
  {
    id: 'c-003',
    name: 'Fiat 500 Vintage',
    type: 'Convertible',
    seats: 4,
    pricePerDay: 95,
    available: false,
  },
];

/* -------------------------------------------------------------------------- */
/*  Reducers                                                                  */
/* -------------------------------------------------------------------------- */

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_TOUR':
      return { ...state, tours: [action.payload, ...state.tours] };
    case 'DELETE_TOUR':
      return { ...state, tours: state.tours.filter((t) => t.id !== action.id) };
    case 'ADD_CAR':
      return { ...state, cars: [action.payload, ...state.cars] };
    case 'DELETE_CAR':
      return { ...state, cars: state.cars.filter((c) => c.id !== action.id) };
    default:
      return state;
  }
}

const uid = (prefix) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

/* -------------------------------------------------------------------------- */
/*  Small UI primitives                                                       */
/* -------------------------------------------------------------------------- */

function SectionHeading({ eyebrow, title, lead, align = 'left' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sand-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold leading-tight text-forest-900 md:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-forest-700/80">{lead}</p>}
    </div>
  );
}

function Field({ label, error, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest-700">
        {label}
      </span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-forest-700/60">{hint}</span>}
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

const inputCls =
  'w-full rounded-md border border-forest-700/15 bg-cream-50 px-3 py-2.5 text-sm text-forest-900 placeholder:text-forest-700/40 focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-600/20 transition';

const adminInputCls =
  'w-full rounded-md border border-white/10 bg-forest-900/40 px-3 py-2.5 text-sm text-cream-50 placeholder:text-cream-50/40 focus:border-sand-300 focus:outline-none focus:ring-2 focus:ring-sand-300/30 transition';

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

function Nav({ active, onNavigate, onOpenAdmin }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: 'tours', label: 'Tours' },
    { id: 'cars', label: 'Cars' },
    { id: 'custom', label: 'Custom Package' },
    { id: 'contact', label: 'Contact' },
  ];

  const go = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-forest-700/10 bg-cream-50/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2 text-forest-900"
          aria-label="Sahara and Pine — home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-forest-700 text-cream-50">
            <Mountain size={18} strokeWidth={2.2} />
          </span>
          <span className="font-serif text-xl font-semibold leading-none">
            Sahara <span className="italic text-sand-500">&amp;</span> Pine
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`text-sm font-medium tracking-wide transition ${
                active === l.id
                  ? 'text-forest-700'
                  : 'text-forest-900/70 hover:text-forest-700'
              }`}
            >
              {l.label}
              {active === l.id && (
                <span className="mx-auto mt-1 block h-px w-6 bg-sand-500" />
              )}
            </button>
          ))}
          <button
            onClick={onOpenAdmin}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-700/50 transition hover:text-forest-700"
          >
            Admin
          </button>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md border border-forest-700/15 text-forest-700 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-forest-700/10 bg-cream-50 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-3">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="py-2 text-left text-sm font-medium text-forest-900"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenAdmin();
                setOpen(false);
              }}
              className="py-2 text-left text-xs font-semibold uppercase tracking-[0.2em] text-forest-700/60"
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero({ onExplore }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #f5e9cf 0%, #ead7b3 35%, #b4946a 60%, #4a6a52 80%, #22382a 100%)',
      }}
    >
      {/* Sun */}
      <div
        aria-hidden
        className="absolute left-1/2 top-24 h-56 w-56 -translate-x-1/2 rounded-full opacity-90 blur-2xl md:top-32 md:h-72 md:w-72"
        style={{
          background:
            'radial-gradient(circle, #fff3d6 0%, #f0c98a 40%, rgba(240,201,138,0) 70%)',
        }}
      />
      {/* Mountain layer back */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-32 h-56 md:h-72"
        style={{
          background: '#3a5742',
          clipPath:
            'polygon(0% 100%, 0% 65%, 12% 40%, 22% 55%, 35% 25%, 48% 50%, 60% 30%, 75% 55%, 88% 35%, 100% 60%, 100% 100%)',
          opacity: 0.85,
        }}
      />
      {/* Mountain layer front */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-20 h-44 md:h-56"
        style={{
          background: '#22382a',
          clipPath:
            'polygon(0% 100%, 0% 70%, 8% 55%, 20% 70%, 32% 45%, 45% 65%, 58% 50%, 72% 70%, 84% 55%, 100% 75%, 100% 100%)',
        }}
      />
      {/* Foreground sand */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            'linear-gradient(180deg, rgba(34,56,42,0.4) 0%, #c9a26a 35%, #b4946a 100%)',
        }}
      />
      {/* Grain texture */}
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start px-6 pb-44 pt-24 md:pb-56 md:pt-36">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-cream-50/40 bg-cream-50/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-cream-50 backdrop-blur">
          <Sparkles size={12} /> Curated since 2014
        </span>
        <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.05] text-cream-50 drop-shadow-sm md:text-7xl">
          Sahara <span className="italic font-normal text-sand-200">&amp;</span> Pine
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-xl italic leading-snug text-cream-50/95 md:text-2xl">
          Slow journeys, considered detail, and quietly extraordinary places.
        </p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream-50/90 md:text-base">
          A boutique studio crafting private tours and curated rentals across the dunes,
          coastlines, and pine valleys of three continents.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={onExplore}
            className="group inline-flex items-center gap-2 rounded-full bg-cream-50 px-6 py-3 text-sm font-semibold tracking-wide text-forest-900 shadow-lift transition hover:-translate-y-0.5 hover:bg-cream-100"
          >
            Explore Packages
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
          <button
            onClick={() => document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-cream-50/50 bg-transparent px-6 py-3 text-sm font-semibold tracking-wide text-cream-50 transition hover:bg-cream-50/10"
          >
            Browse Cars
          </button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Image-placeholder helpers (CSS-only "scenic" thumbnails)                  */
/* -------------------------------------------------------------------------- */

const TOUR_GRADIENTS = [
  'linear-gradient(135deg, #f0c98a 0%, #c9a26a 45%, #4a6a52 100%)',
  'linear-gradient(135deg, #d4e0d6 0%, #4a6a52 55%, #22382a 100%)',
  'linear-gradient(135deg, #f5e9cf 0%, #b4946a 50%, #2f4a37 100%)',
  'linear-gradient(135deg, #ead7b3 0%, #9c6f3a 50%, #22382a 100%)',
];

function TourThumb({ index }) {
  return (
    <div
      className="relative h-48 w-full overflow-hidden rounded-t-2xl"
      style={{ background: TOUR_GRADIENTS[index % TOUR_GRADIENTS.length] }}
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-6 h-20 w-20 -translate-x-1/2 rounded-full opacity-80 blur-md"
        style={{ background: 'radial-gradient(circle, #fff3d6, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-20"
        style={{
          background: '#22382a',
          clipPath:
            'polygon(0% 100%, 0% 60%, 18% 40%, 32% 60%, 50% 30%, 68% 55%, 82% 35%, 100% 60%, 100% 100%)',
          opacity: 0.9,
        }}
      />
    </div>
  );
}

const CAR_GRADIENTS = [
  'linear-gradient(135deg, #22382a 0%, #4a6a52 60%, #c9a26a 100%)',
  'linear-gradient(135deg, #b4946a 0%, #9c6f3a 60%, #22382a 100%)',
  'linear-gradient(135deg, #d4e0d6 0%, #b4946a 70%, #2f4a37 100%)',
  'linear-gradient(135deg, #ead7b3 0%, #4a6a52 80%)',
];

function CarThumb({ index }) {
  return (
    <div
      className="relative h-36 w-full overflow-hidden rounded-t-2xl"
      style={{ background: CAR_GRADIENTS[index % CAR_GRADIENTS.length] }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-10"
        style={{ background: 'rgba(0,0,0,0.25)' }}
      />
      <Car
        size={64}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-cream-50 drop-shadow"
        strokeWidth={1.4}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tours section                                                             */
/* -------------------------------------------------------------------------- */

function ToursSection({ tours, onCustomize }) {
  return (
    <section id="tours" className="section-fade scroll-mt-24 bg-cream-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Signature Tours"
            title="Itineraries with intention."
            lead="Each of our packages is built around a single feeling — quiet, awe, joy, calm. Pick a starting point and we'll tailor the rest."
          />
          <button
            onClick={onCustomize}
            className="hidden items-center gap-2 self-start rounded-full border border-forest-700/20 px-5 py-2.5 text-sm font-semibold text-forest-700 transition hover:bg-forest-700 hover:text-cream-50 md:inline-flex"
          >
            <Compass size={16} /> Build your own
          </button>
        </div>

        {tours.length === 0 ? (
          <EmptyState
            icon={<Briefcase size={28} />}
            title="No tours yet"
            body="The studio is curating new itineraries. Check back soon."
          />
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((t, i) => (
              <article
                key={t.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <TourThumb index={i} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sand-500">
                    <MapPin size={12} /> {t.destination}
                  </div>
                  <h3 className="mb-2 text-2xl font-semibold leading-tight text-forest-900">
                    {t.title}
                  </h3>
                  <div className="mb-4 flex items-center gap-4 text-xs text-forest-700/70">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={13} /> {t.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Star size={13} className="fill-sand-300 text-sand-300" /> Editor's pick
                    </span>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-forest-700/80">
                    {t.description}
                  </p>
                  {t.highlights?.length > 0 && (
                    <ul className="mb-6 space-y-1.5">
                      {t.highlights.slice(0, 4).map((h, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-forest-900/85"
                        >
                          <CheckCircle2
                            size={15}
                            className="mt-0.5 shrink-0 text-forest-600"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto flex items-end justify-between border-t border-forest-700/10 pt-5">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-forest-700/60">
                        From
                      </p>
                      <p className="font-serif text-2xl font-semibold text-forest-900">
                        ${Number(t.price).toLocaleString()}
                        <span className="ml-1 text-xs font-sans font-normal text-forest-700/60">
                          per person
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={onCustomize}
                      className="inline-flex items-center gap-1.5 rounded-full bg-forest-700 px-4 py-2 text-xs font-semibold text-cream-50 transition hover:bg-forest-600"
                    >
                      Tailor
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Cars section                                                              */
/* -------------------------------------------------------------------------- */

function CarsSection({ cars }) {
  return (
    <section
      id="cars"
      className="section-fade scroll-mt-24 bg-cream-100 py-24"
      style={{
        backgroundImage:
          'radial-gradient(1200px 400px at 50% -10%, rgba(74,106,82,0.12), transparent 60%)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Car Rentals"
          title="A small, considered fleet."
          lead="Every vehicle is hand-selected, professionally detailed, and delivered to your door — keys placed, tank full, route loaded."
        />

        {cars.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              icon={<CarFront size={28} />}
              title="No cars listed"
              body="The fleet is being prepared for the season."
            />
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((c, i) => (
              <article
                key={c.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <CarThumb index={i} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-sand-500">
                        {c.type}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold leading-tight text-forest-900">
                        {c.name}
                      </h3>
                    </div>
                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                        c.available
                          ? 'bg-forest-100 text-forest-700'
                          : 'bg-sand-100 text-sand-500'
                      }`}
                    >
                      {c.available ? 'Available' : 'Booked'}
                    </span>
                  </div>
                  <div className="mb-5 flex items-center gap-4 text-sm text-forest-700/80">
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} /> {c.seats} seats
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck size={14} /> Insured
                    </span>
                  </div>
                  <div className="mt-auto flex items-end justify-between border-t border-forest-700/10 pt-5">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-forest-700/60">
                        Per day
                      </p>
                      <p className="font-serif text-2xl font-semibold text-forest-900">
                        ${Number(c.pricePerDay).toLocaleString()}
                      </p>
                    </div>
                    <button
                      disabled={!c.available}
                      onClick={() =>
                        document
                          .getElementById('contact')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                        c.available
                          ? 'bg-forest-700 text-cream-50 hover:bg-forest-600'
                          : 'cursor-not-allowed bg-forest-700/10 text-forest-700/50'
                      }`}
                    >
                      {c.available ? 'Reserve' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Custom Package Builder                                                    */
/* -------------------------------------------------------------------------- */

const DESTINATION_OPTIONS = [
  { value: '', label: 'Select a destination' },
  { value: 'desert', label: 'Desert escape', basePerPersonDay: 220 },
  { value: 'coast', label: 'Coastal drive', basePerPersonDay: 280 },
  { value: 'mountain', label: 'Mountain retreat', basePerPersonDay: 245 },
  { value: 'vineyard', label: 'Vineyard country', basePerPersonDay: 320 },
  { value: 'city', label: 'City &amp; culture', basePerPersonDay: 200 },
];

const ADDONS = [
  { id: 'hotel', label: '5-star hotel suite', perDay: 180, icon: Hotel },
  { id: 'guide', label: 'Private guide', perDay: 120, icon: UserRound },
  { id: 'car', label: 'Chauffeured car', perDay: 150, icon: Car },
];

function daysBetween(start, end) {
  if (!start || !end) return 0;
  const a = new Date(start);
  const b = new Date(end);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function CustomPackageBuilder() {
  const initial = {
    name: '',
    email: '',
    destination: '',
    startDate: '',
    endDate: '',
    groupSize: 2,
    addons: { hotel: true, guide: false, car: false },
    notes: '',
  };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const days = daysBetween(form.startDate, form.endDate);

  const estimate = useMemo(() => {
    const dest = DESTINATION_OPTIONS.find((d) => d.value === form.destination);
    if (!dest || !dest.basePerPersonDay || !days || !form.groupSize) return 0;
    const base = dest.basePerPersonDay * Number(form.groupSize) * days;
    const addons = ADDONS.reduce(
      (sum, a) => (form.addons[a.id] ? sum + a.perDay * days : sum),
      0
    );
    return base + addons;
  }, [form, days]);

  function update(patch) {
    setForm((f) => ({ ...f, ...patch }));
  }

  function toggleAddon(id) {
    setForm((f) => ({ ...f, addons: { ...f.addons, [id]: !f.addons[id] } }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Please share your name.';
    if (!form.email.trim()) e.email = 'An email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'That email looks off — please check.';
    if (!form.destination) e.destination = 'Pick a destination type.';
    if (!form.startDate) e.startDate = 'Start date is required.';
    if (!form.endDate) e.endDate = 'End date is required.';
    if (form.startDate && form.endDate && days <= 0)
      e.endDate = 'End date must be after the start date.';
    if (!form.groupSize || Number(form.groupSize) < 1)
      e.groupSize = 'At least one traveler.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted({
      ref: `SP-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      total: estimate,
      days,
      ...form,
    });
  }

  function reset() {
    setForm(initial);
    setErrors({});
    setSubmitted(null);
  }

  return (
    <section
      id="custom"
      className="section-fade scroll-mt-24 bg-forest-900 py-24 text-cream-50"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sand-300">
              Custom Package
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
              Build a journey, <span className="italic text-sand-200">just for you.</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-cream-50/80">
              Tell us where you're drawn, when you can go, and how you like to travel. Our
              studio responds within 24 hours with a personalized proposal, photographs of
              suggested stays, and a refined estimate.
            </p>
            <div className="mt-8 space-y-4 border-t border-cream-50/15 pt-8">
              {[
                { icon: Sparkles, text: 'Hand-built itineraries, no templates.' },
                { icon: ShieldCheck, text: 'Fully insured private transfers.' },
                { icon: Compass, text: '24/7 concierge while you travel.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-cream-50/85">
                  <item.icon size={18} className="mt-0.5 text-sand-300" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="rounded-2xl border border-cream-50/15 bg-cream-50/5 p-8 backdrop-blur-sm">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-sand-300 text-forest-900">
                    <CheckCircle2 size={26} />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold">
                      Quote requested.
                    </h3>
                    <p className="text-sm text-cream-50/70">
                      Reference {submitted.ref} — we'll be in touch shortly.
                    </p>
                  </div>
                </div>
                <dl className="grid grid-cols-1 gap-4 border-y border-cream-50/15 py-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-cream-50/55">
                      Traveler
                    </dt>
                    <dd className="mt-1 text-sm">{submitted.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-cream-50/55">
                      Email
                    </dt>
                    <dd className="mt-1 text-sm">{submitted.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-cream-50/55">
                      Destination
                    </dt>
                    <dd className="mt-1 text-sm capitalize">{submitted.destination}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-cream-50/55">
                      Dates
                    </dt>
                    <dd className="mt-1 text-sm">
                      {submitted.startDate} &mdash; {submitted.endDate} ({submitted.days} days)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-cream-50/55">
                      Travelers
                    </dt>
                    <dd className="mt-1 text-sm">{submitted.groupSize}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-cream-50/55">
                      Add-ons
                    </dt>
                    <dd className="mt-1 text-sm">
                      {ADDONS.filter((a) => submitted.addons[a.id])
                        .map((a) => a.label)
                        .join(', ') || 'None'}
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-cream-50/55">
                      Estimated total
                    </p>
                    <p className="font-serif text-3xl font-semibold text-sand-200">
                      ${submitted.total.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-5 py-2.5 text-sm font-semibold text-forest-900 transition hover:bg-cream-100"
                  >
                    Plan another
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-cream-50/15 bg-cream-50/5 p-6 backdrop-blur-sm sm:p-8"
                noValidate
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Your name" error={errors.name}>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update({ name: e.target.value })}
                      placeholder="Jane Doe"
                      className={adminInputCls}
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update({ email: e.target.value })}
                      placeholder="jane@studio.com"
                      className={adminInputCls}
                    />
                  </Field>
                  <Field label="Destination type" error={errors.destination}>
                    <select
                      value={form.destination}
                      onChange={(e) => update({ destination: e.target.value })}
                      className={adminInputCls}
                    >
                      {DESTINATION_OPTIONS.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label.replace('&amp;', '&')}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Group size" error={errors.groupSize}>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={form.groupSize}
                      onChange={(e) => update({ groupSize: e.target.value })}
                      className={adminInputCls}
                    />
                  </Field>
                  <Field label="Start date" error={errors.startDate}>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => update({ startDate: e.target.value })}
                      className={adminInputCls}
                    />
                  </Field>
                  <Field
                    label="End date"
                    error={errors.endDate}
                    hint={days > 0 ? `${days} day${days === 1 ? '' : 's'} of travel` : ''}
                  >
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => update({ endDate: e.target.value })}
                      className={adminInputCls}
                    />
                  </Field>
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-cream-50/70">
                    Add-ons
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {ADDONS.map((a) => {
                      const Icon = a.icon;
                      const active = form.addons[a.id];
                      return (
                        <button
                          type="button"
                          key={a.id}
                          onClick={() => toggleAddon(a.id)}
                          className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                            active
                              ? 'border-sand-300 bg-sand-300/15 text-cream-50'
                              : 'border-cream-50/15 bg-forest-900/30 text-cream-50/80 hover:border-cream-50/30'
                          }`}
                        >
                          <Icon size={18} className="mt-0.5 text-sand-200" />
                          <div>
                            <p className="font-semibold">{a.label}</p>
                            <p className="text-xs text-cream-50/60">
                              +${a.perDay} / day
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <Field label="Notes (optional)">
                    <textarea
                      rows="3"
                      value={form.notes}
                      onChange={(e) => update({ notes: e.target.value })}
                      placeholder="Anniversary trip, dietary needs, pace preferences..."
                      className={adminInputCls}
                    />
                  </Field>
                </div>

                <div className="mt-6 flex flex-col items-stretch gap-4 border-t border-cream-50/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-cream-50/55">
                      Live estimate
                    </p>
                    <p className="font-serif text-3xl font-semibold text-sand-200">
                      ${estimate.toLocaleString()}
                    </p>
                    <p className="text-xs text-cream-50/55">
                      Based on selections — final quote within 24 hours.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-sand-300 px-6 py-3 text-sm font-semibold text-forest-900 transition hover:bg-sand-200"
                  >
                    Request quote
                    <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact / About                                                           */
/* -------------------------------------------------------------------------- */

function ContactSection() {
  return (
    <section id="contact" className="section-fade scroll-mt-24 bg-cream-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About / Contact"
              title="A small studio, on call."
              lead="Sahara &amp; Pine is a four-person travel studio working with private clients across Europe, North Africa, and the Americas. We answer every message personally."
            />
            <div className="mt-8 space-y-5">
              <a
                href="mailto:hello@saharaandpine.studio"
                className="flex items-start gap-4 rounded-xl border border-forest-700/10 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-700 text-cream-50">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sand-500">
                    Email
                  </p>
                  <p className="mt-0.5 font-serif text-lg text-forest-900">
                    hello@saharaandpine.studio
                  </p>
                </div>
              </a>
              <a
                href="tel:+15555550110"
                className="flex items-start gap-4 rounded-xl border border-forest-700/10 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-700 text-cream-50">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sand-500">
                    Concierge
                  </p>
                  <p className="mt-0.5 font-serif text-lg text-forest-900">
                    +1 (555) 555-0110
                  </p>
                </div>
              </a>
              <div className="flex items-start gap-4 rounded-xl border border-forest-700/10 bg-white p-5 shadow-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-700 text-cream-50">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sand-500">
                    Studio
                  </p>
                  <p className="mt-0.5 font-serif text-lg text-forest-900">
                    21 Cypress Lane, Carmel-by-the-Sea, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [data, setData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    const next = {};
    if (!data.name.trim()) next.name = 'Please share your name.';
    if (!data.email.trim()) next.email = 'An email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = 'That email looks off.';
    if (!data.message.trim()) next.message = 'A short note helps us prepare.';
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      setData({ name: '', email: '', message: '' });
    }
  }

  return (
    <div className="rounded-2xl border border-forest-700/10 bg-white p-6 shadow-card sm:p-8">
      {sent ? (
        <div className="flex h-full flex-col items-center justify-center py-12 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-forest-100 text-forest-700">
            <CheckCircle2 size={28} />
          </span>
          <h3 className="mt-5 font-serif text-2xl font-semibold text-forest-900">
            Message received.
          </h3>
          <p className="mt-2 max-w-sm text-sm text-forest-700/75">
            A studio member will be in touch within one business day. Until then, light
            a candle and dream a little.
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-700 px-5 py-2.5 text-sm font-semibold text-cream-50 hover:bg-forest-600"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <h3 className="font-serif text-2xl font-semibold text-forest-900">
            Write to the studio
          </h3>
          <p className="mt-1.5 text-sm text-forest-700/70">
            Tell us a little about your trip. We answer everything personally.
          </p>
          <div className="mt-6 space-y-4">
            <Field label="Name" error={errors.name}>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className={inputCls}
                placeholder="Jane Doe"
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className={inputCls}
                placeholder="jane@studio.com"
              />
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea
                rows="4"
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                className={inputCls}
                placeholder="We'd love a quiet week somewhere green..."
              />
            </Field>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-700 px-5 py-3 text-sm font-semibold text-cream-50 transition hover:bg-forest-600"
          >
            Send message
            <Send size={15} />
          </button>
        </form>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer({ onAdminClick }) {
  return (
    <footer className="bg-forest-900 py-14 text-cream-50/85">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sand-300 text-forest-900">
              <Mountain size={18} strokeWidth={2.2} />
            </span>
            <span className="font-serif text-xl font-semibold text-cream-50">
              Sahara <span className="italic text-sand-200">&amp;</span> Pine
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream-50/70">
            A boutique tour &amp; rental studio for travelers who notice the small things.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-300">
            Studio
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>About</li>
            <li>Journal</li>
            <li>Press</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-300">
            Travel
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Tour packages</li>
            <li>Car rentals</li>
            <li>Custom journeys</li>
            <li>Concierge</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-300">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>hello@saharaandpine.studio</li>
            <li>+1 (555) 555-0110</li>
            <li>Carmel-by-the-Sea, CA</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-cream-50/10 px-6 pt-6 text-xs text-cream-50/55 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Sahara &amp; Pine Studio. All rights reserved.</p>
        <button
          onClick={onAdminClick}
          className="text-cream-50/40 transition hover:text-sand-200"
          aria-label="Admin login"
        >
          Admin Login
        </button>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Empty state                                                               */
/* -------------------------------------------------------------------------- */

function EmptyState({ icon, title, body }) {
  return (
    <div className="rounded-2xl border border-dashed border-forest-700/20 bg-white/50 p-12 text-center">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-cream-100 text-forest-700">
        {icon}
      </div>
      <h4 className="font-serif text-xl text-forest-900">{title}</h4>
      <p className="mt-1 text-sm text-forest-700/70">{body}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Admin Panel                                                               */
/* -------------------------------------------------------------------------- */

const ADMIN_PASSWORD = 'admin123';

function AdminGate({ open, onClose, onAuthed }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  function submit(e) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setPw('');
      setError('');
      onAuthed();
    } else {
      setError('Incorrect password.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-forest-900/75 backdrop-blur-sm px-6">
      <div className="w-full max-w-sm rounded-2xl border border-forest-700/15 bg-cream-50 p-8 shadow-lift">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-serif text-2xl font-semibold text-forest-900">
            Admin login
          </h3>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-forest-700/70 hover:bg-forest-700/10"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <p className="mb-5 text-sm text-forest-700/70">
          Studio access only. Enter the owner password to manage tours and the fleet.
        </p>
        <form onSubmit={submit} noValidate>
          <Field label="Password" error={error}>
            <input
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className={inputCls}
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            />
          </Field>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-700 px-5 py-3 text-sm font-semibold text-cream-50 transition hover:bg-forest-600"
          >
            Enter dashboard
          </button>
          <p className="mt-3 text-center text-[11px] text-forest-700/50">
            Hint: <span className="font-mono">admin123</span>
          </p>
        </form>
      </div>
    </div>
  );
}

function AdminPanel({ open, onClose, state, dispatch }) {
  const [tab, setTab] = useState('tours');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-forest-900/30 backdrop-blur-sm">
      <div className="ml-auto flex h-full w-full max-w-6xl bg-cream-50 shadow-lift section-fade">
        {/* Sidebar */}
        <aside className="hidden w-60 flex-col bg-forest-900 p-6 text-cream-50 sm:flex">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sand-300 text-forest-900">
              <LayoutDashboard size={18} />
            </span>
            <div>
              <p className="font-serif text-base font-semibold leading-tight">
                Studio Console
              </p>
              <p className="text-[10px] uppercase tracking-widest text-cream-50/55">
                Owner access
              </p>
            </div>
          </div>
          <nav className="mt-10 flex flex-col gap-1">
            {[
              { id: 'tours', label: 'Tour packages', icon: Briefcase },
              { id: 'cars', label: 'Vehicle fleet', icon: CarFront },
            ].map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? 'bg-cream-50/10 text-cream-50'
                      : 'text-cream-50/65 hover:bg-cream-50/5 hover:text-cream-50'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-auto border-t border-cream-50/10 pt-5">
            <div className="mb-3 rounded-lg bg-cream-50/5 p-3 text-xs text-cream-50/70">
              <p>
                <span className="font-semibold text-cream-50">{state.tours.length}</span>{' '}
                tour{state.tours.length === 1 ? '' : 's'} live
              </p>
              <p>
                <span className="font-semibold text-cream-50">{state.cars.length}</span>{' '}
                car{state.cars.length === 1 ? '' : 's'} listed
              </p>
            </div>
            <button
              onClick={onClose}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-cream-50/15 px-3 py-2 text-xs font-semibold text-cream-50/80 hover:bg-cream-50/5"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center justify-between border-b border-forest-700/10 px-6 py-4 sm:px-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-500">
                Dashboard
              </p>
              <h2 className="font-serif text-xl text-forest-900 sm:text-2xl">
                {tab === 'tours' ? 'Manage tour packages' : 'Manage vehicle fleet'}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden gap-1 rounded-full bg-forest-700/5 p-1 sm:flex">
                <button
                  onClick={() => setTab('tours')}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    tab === 'tours'
                      ? 'bg-forest-700 text-cream-50'
                      : 'text-forest-700/70'
                  }`}
                >
                  Tours
                </button>
                <button
                  onClick={() => setTab('cars')}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    tab === 'cars'
                      ? 'bg-forest-700 text-cream-50'
                      : 'text-forest-700/70'
                  }`}
                >
                  Cars
                </button>
              </div>
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full text-forest-700/70 hover:bg-forest-700/10"
                aria-label="Close admin"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
            {tab === 'tours' ? (
              <ManageTours state={state} dispatch={dispatch} />
            ) : (
              <ManageCars state={state} dispatch={dispatch} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Manage Tours --------------------------------------------------------- */

function ManageTours({ state, dispatch }) {
  const initial = {
    title: '',
    destination: '',
    duration: '',
    price: '',
    description: '',
    highlightsRaw: '',
  };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required.';
    if (!form.destination.trim()) e.destination = 'Destination is required.';
    if (!form.duration.trim()) e.duration = 'Duration is required.';
    if (!form.price || Number(form.price) <= 0) e.price = 'A positive price is required.';
    if (!form.description.trim()) e.description = 'A short description is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    const highlights = form.highlightsRaw
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    dispatch({
      type: 'ADD_TOUR',
      payload: {
        id: uid('t'),
        title: form.title.trim(),
        destination: form.destination.trim(),
        duration: form.duration.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        highlights,
      },
    });
    setForm(initial);
    setErrors({});
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <form
        onSubmit={submit}
        noValidate
        className="rounded-2xl border border-forest-700/10 bg-white p-6 shadow-card lg:col-span-2"
      >
        <h3 className="font-serif text-xl font-semibold text-forest-900">
          Add a new tour
        </h3>
        <p className="mt-1 text-sm text-forest-700/70">
          New itineraries appear instantly on the public site.
        </p>
        <div className="mt-5 space-y-4">
          <Field label="Title" error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputCls}
              placeholder="Atlas Sunrise Trek"
            />
          </Field>
          <Field label="Destination" error={errors.destination}>
            <input
              type="text"
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              className={inputCls}
              placeholder="High Atlas, Morocco"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Duration" error={errors.duration}>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className={inputCls}
                placeholder="5 days / 4 nights"
              />
            </Field>
            <Field label="Price (USD)" error={errors.price}>
              <input
                type="number"
                min="0"
                step="50"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={inputCls}
                placeholder="1450"
              />
            </Field>
          </div>
          <Field label="Description" error={errors.description}>
            <textarea
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={inputCls}
              placeholder="A short editorial summary of the trip..."
            />
          </Field>
          <Field
            label="Highlights"
            hint="One per line. Up to four show on the card."
          >
            <textarea
              rows="4"
              value={form.highlightsRaw}
              onChange={(e) => setForm({ ...form, highlightsRaw: e.target.value })}
              className={inputCls}
              placeholder={'Private camel caravan\nLuxury desert camp\nBerber music evening'}
            />
          </Field>
        </div>
        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-700 px-5 py-3 text-sm font-semibold text-cream-50 transition hover:bg-forest-600"
        >
          <Plus size={16} /> Publish tour
        </button>
      </form>

      <div className="lg:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-forest-900">
            Live tours ({state.tours.length})
          </h3>
        </div>
        {state.tours.length === 0 ? (
          <EmptyState
            icon={<Briefcase size={26} />}
            title="No tours yet"
            body="Add your first itinerary using the form."
          />
        ) : (
          <ul className="space-y-3">
            {state.tours.map((t) => (
              <li
                key={t.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-forest-700/10 bg-white p-5 shadow-card"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-sand-500">
                    {t.destination}
                  </p>
                  <p className="mt-0.5 truncate font-serif text-lg font-semibold text-forest-900">
                    {t.title}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-forest-700/70">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} /> {t.duration}
                    </span>
                    <span>${Number(t.price).toLocaleString()} / person</span>
                    <span>{t.highlights?.length || 0} highlights</span>
                  </div>
                </div>
                <button
                  onClick={() => dispatch({ type: 'DELETE_TOUR', id: t.id })}
                  className="grid h-9 w-9 place-items-center rounded-full text-forest-700/60 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${t.title}`}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ---- Manage Cars ---------------------------------------------------------- */

function ManageCars({ state, dispatch }) {
  const initial = {
    name: '',
    type: '',
    seats: '',
    pricePerDay: '',
    available: true,
  };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Car name is required.';
    if (!form.type.trim()) e.type = 'Type is required.';
    if (!form.seats || Number(form.seats) < 1) e.seats = 'Seats must be at least 1.';
    if (!form.pricePerDay || Number(form.pricePerDay) <= 0)
      e.pricePerDay = 'A positive daily price is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    dispatch({
      type: 'ADD_CAR',
      payload: {
        id: uid('c'),
        name: form.name.trim(),
        type: form.type.trim(),
        seats: Number(form.seats),
        pricePerDay: Number(form.pricePerDay),
        available: !!form.available,
      },
    });
    setForm(initial);
    setErrors({});
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <form
        onSubmit={submit}
        noValidate
        className="rounded-2xl border border-forest-700/10 bg-white p-6 shadow-card lg:col-span-2"
      >
        <h3 className="font-serif text-xl font-semibold text-forest-900">
          Add a new car
        </h3>
        <p className="mt-1 text-sm text-forest-700/70">
          Vehicles appear in the public fleet right away.
        </p>
        <div className="mt-5 space-y-4">
          <Field label="Car name" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputCls}
              placeholder="Land Rover Defender"
            />
          </Field>
          <Field label="Type" error={errors.type}>
            <input
              type="text"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className={inputCls}
              placeholder="Luxury SUV"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Seats" error={errors.seats}>
              <input
                type="number"
                min="1"
                max="20"
                value={form.seats}
                onChange={(e) => setForm({ ...form, seats: e.target.value })}
                className={inputCls}
                placeholder="5"
              />
            </Field>
            <Field label="Price / day (USD)" error={errors.pricePerDay}>
              <input
                type="number"
                min="0"
                step="10"
                value={form.pricePerDay}
                onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
                className={inputCls}
                placeholder="220"
              />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm text-forest-900">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => setForm({ ...form, available: e.target.checked })}
              className="h-4 w-4 rounded border-forest-700/30 text-forest-700 focus:ring-forest-600"
            />
            Available for booking
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-700 px-5 py-3 text-sm font-semibold text-cream-50 transition hover:bg-forest-600"
        >
          <Plus size={16} /> Publish car
        </button>
      </form>

      <div className="lg:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-forest-900">
            Live fleet ({state.cars.length})
          </h3>
        </div>
        {state.cars.length === 0 ? (
          <EmptyState
            icon={<CarFront size={26} />}
            title="No cars yet"
            body="Add your first vehicle using the form."
          />
        ) : (
          <ul className="space-y-3">
            {state.cars.map((c) => (
              <li
                key={c.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-forest-700/10 bg-white p-5 shadow-card"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-sand-500">
                      {c.type}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                        c.available
                          ? 'bg-forest-100 text-forest-700'
                          : 'bg-sand-100 text-sand-500'
                      }`}
                    >
                      {c.available ? 'Available' : 'Booked'}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate font-serif text-lg font-semibold text-forest-900">
                    {c.name}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-forest-700/70">
                    <span className="inline-flex items-center gap-1">
                      <Users size={12} /> {c.seats} seats
                    </span>
                    <span>${Number(c.pricePerDay).toLocaleString()} / day</span>
                  </div>
                </div>
                <button
                  onClick={() => dispatch({ type: 'DELETE_CAR', id: c.id })}
                  className="grid h-9 w-9 place-items-center rounded-full text-forest-700/60 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${c.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Root App                                                                  */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [state, dispatch] = useReducer(inventoryReducer, {
    tours: SEED_TOURS,
    cars: SEED_CARS,
  });
  const [active, setActive] = useState('home');
  const [adminGate, setAdminGate] = useState(false);
  const [adminAuthed, setAdminAuthed] = useState(false);

  function navigate(id) {
    setActive(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function openAdmin() {
    if (adminAuthed) return; // already in
    setAdminGate(true);
  }

  function onAuthed() {
    setAdminGate(false);
    setAdminAuthed(true);
  }

  function closeAdmin() {
    setAdminAuthed(false);
  }

  return (
    <div className="min-h-screen bg-cream-50 font-sans text-ink">
      <Nav
        active={active}
        onNavigate={navigate}
        onOpenAdmin={openAdmin}
      />
      <Hero onExplore={() => navigate('tours')} />
      <ToursSection
        tours={state.tours}
        onCustomize={() => navigate('custom')}
      />
      <CarsSection cars={state.cars} />
      <CustomPackageBuilder />
      <ContactSection />
      <Footer onAdminClick={openAdmin} />

      <AdminGate
        open={adminGate}
        onClose={() => setAdminGate(false)}
        onAuthed={onAuthed}
      />
      <AdminPanel
        open={adminAuthed}
        onClose={closeAdmin}
        state={state}
        dispatch={dispatch}
      />
    </div>
  );
}
