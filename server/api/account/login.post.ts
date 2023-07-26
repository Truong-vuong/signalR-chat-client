export default defineEventHandler(async (event) => {
    const baseURL = process.env.BASE_URL;
    let body = await readBody(event);
    const headers = {
        'Content-Type': 'application/json',
      };
    try {
      const data = await $fetch(`${baseURL}/api/Auth/login`, {
        method: 'POST',
        body,
        headers,
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  });
  