/* eslint-disable */
// to logout a user from website
async function logout() {
    let result = await fetch('/logout', {
        method: 'POST',
    });
    if (result.ok) {
        console.log(await result.json());
        window.location.href = '/login';
    }
}
