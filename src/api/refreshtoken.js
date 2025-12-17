// fetchWithRefresh.js
// export async function fetchWithRefresh(url, options = {}) {
//   const token = localStorage.getItem('token');
//   const headers = {
//     ...options.headers,
//     Authorization: token ? `Bearer ${token}` : '',
//     'Content-Type': 'application/json',
//   };

//   let res = await fetch(url, { ...options, headers, credentials: 'include' });

//   // If token expired
//   if (res.status === 401) {
//     const refreshRes = await fetch('https://grocery-x2ds.onrender.com/auth/refresh', {
//       method: 'POST',
//       credentials: 'include', // send refresh cookie
//     });

//     if (!refreshRes.ok) {
//       throw new Error('Session expired. Please log in again.');
//     }

//     const { token: newToken } = await refreshRes.json();
//     localStorage.setItem('token', newToken);

//     // Retry original request with new token
//     const retryHeaders = {
//       ...options.headers,
//       Authorization: `Bearer ${newToken}`,
//     };

//     res = await fetch(url, { ...options, headers: retryHeaders, credentials: 'include' });
//   }

//   return res;
// }
