import { experience } from './experience';
import { projects } from './projects';
import { technologies, usesSkill } from './technologies';

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

test('grouped skills match the tools they cover', () => {
  expect(usesSkill(['SQL Server'], 'SQL')).toBe(true);
  expect(usesSkill(['PostgreSQL'], 'SQL')).toBe(false);
  expect(usesSkill(['AWS Lambda'], 'AWS')).toBe(true);
  expect(usesSkill(['Copilot'], 'GitHub Copilot')).toBe(true);
  expect(usesSkill(['React Native'], 'React')).toBe(false);
  expect(usesSkill(['C#'], 'C#')).toBe(true);
});

test('every skill chip matches at least one role or project, except known gaps', async () => {
  const { experience } = await import('./experience');
  const { projects } = await import('./projects');
  const stacks = [...experience, ...projects].map((entry) => entry.stack);
  const unmatched = technologies
    .map((tech) => tech.name)
    .filter((name) => !stacks.some((stack) => usesSkill(stack, name)));
  // JavaScript and Kotlin are on the site but not in any resume point yet.
  expect(unmatched.sort()).toEqual(['JavaScript', 'Kotlin']);
});

test('every skill has exactly one kind of logo', () => {
  technologies.forEach((tech) => {
    const kinds = [tech.image, tech.brand, tech.glyph].filter(Boolean);
    expect([tech.name, kinds.length]).toEqual([tech.name, 1]);
  });
});
