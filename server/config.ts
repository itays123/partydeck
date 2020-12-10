export const PORT = Number(Deno.env.get('PORT') || 8000);
export const CONSOLE = Boolean(Deno.env.get('CONSOLE') !== 'false');
