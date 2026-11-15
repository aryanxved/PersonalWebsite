import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { featureFlags } from './featureFlags';
import { THEME_STORAGE_KEY } from './theme/ThemeContext';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </MemoryRouter>
  );

beforeEach(() => {
  // Most tests cover the finished site; the flag-off behaviour has its own test.
  featureFlags.projectPopups = true;
  featureFlags.resumeLink = true;
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
});

test('home renders the name and the main cards', () => {
  renderAt('/');
  expect(screen.getAllByText('Aryan Ved').length).toBeGreaterThan(0);
  expect(screen.getByText('RESUME')).toBeInTheDocument();
  expect(screen.getByText('EXPERIENCE')).toBeInTheDocument();
  expect(screen.getByText('PLAYGROUND')).toBeInTheDocument();
});

test('theme toggle is one pressed/unpressed control and is saved', () => {
  renderAt('/');
  const toggle = screen.getByRole('button', { name: 'Dark mode' });
  // jsdom has no matchMedia, so the device fallback is light.
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
  expect(document.documentElement.dataset.theme).toBe('light');

  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-pressed', 'true');
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
});

test('a saved theme wins over the device setting', () => {
  window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
  renderAt('/');
  expect(screen.getByRole('button', { name: 'Dark mode' })).toHaveAttribute('aria-pressed', 'true');
  expect(document.documentElement.dataset.theme).toBe('dark');
});

test('resume rows and projects are real links to their detail pages', () => {
  renderAt('/');
  expect(screen.getByRole('link', { name: /Relay Financial Technologies/ })).toHaveAttribute('href', '/experience/relay');
  expect(screen.getByRole('link', { name: /FlickPick Movie App/ })).toHaveAttribute('href', '/projects/flickpick');
  // External links stay separate from the popup triggers.
  expect(screen.getByRole('link', { name: 'LinkedIn (opens in a new tab)' })).toHaveAttribute('target', '_blank');
});

test('tech pills highlight matching roles and projects and dim the rest', () => {
  renderAt('/');
  const react = screen.getByRole('button', { name: 'React' });
  fireEvent.click(react);
  expect(react).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('link', { name: /Relay Financial Technologies/ })).toHaveClass('is-match');
  expect(screen.getByRole('link', { name: /Royal Bank of Canada/ })).toHaveClass('is-dimmed');
  expect(screen.getByRole('link', { name: /Web Development/ })).toHaveClass('is-match');
  expect(screen.getByRole('link', { name: /FlickPick Movie App/ })).toHaveClass('is-dimmed');

  // Grouped skills cover several tools: SQL matches SQL (Equitable) and SQL Server (RBC).
  fireEvent.click(screen.getByRole('button', { name: 'SQL' }));
  expect(screen.getByRole('link', { name: /Equitable Life of Canada/ })).toHaveClass('is-match');
  expect(screen.getByRole('link', { name: /Royal Bank of Canada/ })).toHaveClass('is-match');
  expect(screen.getByRole('link', { name: /Shoplogix/ })).toHaveClass('is-dimmed');
  expect(screen.getByRole('link', { name: /Relay Financial Technologies/ })).toHaveClass('is-dimmed');
  fireEvent.click(screen.getByRole('button', { name: 'SQL' }));
  fireEvent.click(react);
  expect(react).toHaveAttribute('aria-pressed', 'true');

  // Clicking again clears the filter.
  fireEvent.click(react);
  expect(react).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByRole('link', { name: /Royal Bank of Canada/ })).not.toHaveClass('is-dimmed');
});

test('clicking a resume row opens its detail dialog, and closing returns to home', async () => {
  renderAt('/');
  fireEvent.click(screen.getByRole('link', { name: /Relay Financial Technologies/ }));

  const dialog = await screen.findByRole('dialog', { name: 'Software Engineering Intern (Full Stack)' });
  expect(dialog).toBeInTheDocument();
  // Home stays rendered underneath.
  expect(screen.getByText('RESUME')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(screen.getByText('RESUME')).toBeInTheDocument();
});

test('visiting /experience/<id> directly shows home with the dialog open', async () => {
  renderAt('/experience/relay');
  expect(await screen.findByRole('dialog', { name: 'Software Engineering Intern (Full Stack)' })).toBeInTheDocument();
  expect(screen.getByText('PLAYGROUND')).toBeInTheDocument();
});

test('Escape closes a directly visited dialog', async () => {
  renderAt('/projects/flickpick');
  const dialog = await screen.findByRole('dialog', { name: 'FlickPick Movie App' });
  fireEvent.keyDown(dialog, { key: 'Escape' });
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('prev/next follow the timeline: Previous is older, Next is newer', async () => {
  // Equitable is the most recent role, so it has no Next, and Previous is Relay.
  renderAt('/experience/equitable');
  await screen.findByRole('dialog', { name: 'Intermediate Business Systems Analyst' });
  expect(screen.queryByRole('link', { name: /^Next/ })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('link', { name: /Previous.*Relay Financial Technologies/ }));
  expect(await screen.findByRole('dialog', { name: 'Software Engineering Intern (Full Stack)' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Next.*Equitable Life of Canada/ })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Previous.*Shoplogix/ })).toBeInTheDocument();
});

test('project prev/next keep list order', async () => {
  renderAt('/projects/web-development');
  await screen.findByRole('dialog', { name: 'Web Development' });
  expect(screen.queryByRole('link', { name: /^Previous/ })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Next.*1Point Loyalty Platform/ })).toBeInTheDocument();
});

test('an unknown detail id falls back to home', async () => {
  renderAt('/experience/not-a-real-job');
  expect(await screen.findByText('RESUME')).toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('home has one h1, an intro and the education list', () => {
  renderAt('/');
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Aryan Ved');
  expect(screen.getByRole('region', { name: 'Introduction' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Relay Financial Technologies/ })).toHaveTextContent('Software Engineering Intern (Full Stack)');
  expect(screen.getByRole('link', { name: /University of Waterloo/ })).toHaveAttribute('href', '/education/waterloo');
  expect(screen.getByRole('link', { name: /Georgia Institute of Technology/ })).toHaveAttribute('href', '/education/georgia-tech');
  expect(screen.getByText('SciTech North Regional Program')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Georgia Institute of Technology/ })).toHaveTextContent('Incoming');
});

test('typing effect shows the full text statically when reduced motion is preferred', () => {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
  try {
    renderAt('/');
    expect(screen.getByText(/develop a loyalty program 🎁, make a temperature sensing glove 🧤/)).toBeInTheDocument();
    expect(document.querySelector('.typing-cursor')).toBeNull();
  } finally {
    window.matchMedia = original;
  }
});

test('education pills open a popup; Previous is the older school, Next the newer', async () => {
  renderAt('/');
  fireEvent.click(screen.getByRole('link', { name: /University of Waterloo/ }));
  expect(await screen.findByRole('dialog', { name: 'University of Waterloo' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Next.*Georgia Tech/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Initiatives' })).toBeInTheDocument();
  expect(screen.getByText('Vice-President of Technology @ UW FinTech')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Courses' })).toBeInTheDocument();
  expect(screen.getByText('Machine Learning')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('link', { name: /Previous.*SciTech North/ }));
  expect(await screen.findByRole('dialog', { name: 'SciTech North Regional Program' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('the photo shows the role', () => {
  renderAt('/');
  expect(screen.getByRole('region', { name: 'Introduction' })).toHaveTextContent('Intermediate Business Systems Analyst');
});

test('the brand glow follows the mouse on experience popups and fades on leave', async () => {
  renderAt('/experience/relay');
  await screen.findByRole('dialog', { name: 'Software Engineering Intern (Full Stack)' });
  const sheet = document.querySelector('.detail-paper') as HTMLElement;
  const glow = document.querySelector('.detail-follow-glow') as HTMLElement;
  sheet.getBoundingClientRect = () => ({ left: 100, top: 50, width: 400, height: 200 } as DOMRect);

  // jsdom has no PointerEvent, so send a MouseEvent (which carries coordinates) as 'pointermove'.
  act(() => {
    sheet.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, clientX: 300, clientY: 150 }));
  });
  expect(glow).toHaveClass('is-active');
  await waitFor(() => expect(glow.style.transform).toBe('translate3d(200.0px, 100.0px, 0)'));

  fireEvent.pointerLeave(sheet);
  expect(glow).not.toHaveClass('is-active');
});

test('project popups have no cursor glow', async () => {
  renderAt('/projects/flickpick');
  await screen.findByRole('dialog', { name: 'FlickPick Movie App' });
  expect(document.querySelector('.detail-follow-glow')).toBeNull();
});

test('with project popups switched off, Playground tiles are not clickable', () => {
  featureFlags.projectPopups = false;
  renderAt('/projects/flickpick');
  expect(screen.getByText('FlickPick Movie App')).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /FlickPick Movie App/ })).not.toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  // Experience rows still open their popups.
  expect(screen.getByRole('link', { name: /Relay Financial Technologies/ })).toHaveAttribute('href', '/experience/relay');
});

test('the resume file link follows its flag', () => {
  const { unmount } = renderAt('/');
  expect(screen.getByRole('link', { name: 'Resume (opens in a new tab)' })).toHaveAttribute('target', '_blank');
  unmount();

  featureFlags.resumeLink = false;
  renderAt('/');
  expect(screen.queryByRole('link', { name: 'Resume (opens in a new tab)' })).not.toBeInTheDocument();
  expect(screen.getByText('RESUME')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'LinkedIn (opens in a new tab)' })).toBeInTheDocument();
});

test('an experience popup names the team above its highlights', async () => {
  renderAt('/experience/equitable');
  const dialog = await screen.findByRole('dialog', { name: 'Intermediate Business Systems Analyst' });
  expect(dialog).toHaveTextContent('📊 Enterprise Content Management Team, Data Platforms');
});

test('the photo card links to LinkedIn and GitHub', () => {
  renderAt('/');
  expect(screen.getByRole('link', { name: 'LinkedIn profile (opens in a new tab)' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/aryanved'
  );
  expect(screen.getByRole('link', { name: 'GitHub profile (opens in a new tab)' })).toHaveAttribute(
    'href',
    'https://github.com/aryanxved'
  );
  expect(screen.queryByText(/TODO: your email address/)).not.toBeInTheDocument();
});
