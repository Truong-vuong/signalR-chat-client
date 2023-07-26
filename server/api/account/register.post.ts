export default defineEventHandler(async (event) => {
    const baseURL = process.env.BASE_URL;
    let body = await readBody(event);
    const headers = {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`,
        'Content-Type': 'application/json',
      };
    try {
      const data = await $fetch(`${baseURL}/api/Auth/register`, {
        method: 'POST',
        body,
        headers,
      });
      console.log(body)
      return data;
    } catch (e) {
      console.error(e);
      return { message: 'Error' };
    }
  });
  