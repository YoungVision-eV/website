// Skip Husky install in production and CI
if (
  process.env.NODE_ENV === 'production' ||
  process.env.CI === 'true' ||
  process.env.VERCEL === '1'
) {
  process.exit(0);
}
const husky = (await import('husky')).default;
console.log(husky());
