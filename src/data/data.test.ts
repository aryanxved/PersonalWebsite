import { experience } from './experience';
import { projects } from './projects';
import { technologies } from './technologies';

const slug = /^[a-z0-9]+(-[a-z0-9]+)*$/;

test.each([
  ['experience', experience.map((e) => e.id)],
  ['projects', projects.map((p) => p.id)],
])('%s ids are unique URL slugs', (_name, ids) => {
  expect(new Set(ids).size).toBe(ids.length);
  ids.forEach((id) => expect(id).toMatch(slug));
});

test('technology names are unique', () => {
  const names = technologies.map((t) => t.name);
  expect(new Set(names).size).toBe(names.length);
});
