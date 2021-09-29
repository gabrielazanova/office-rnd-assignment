import axios from 'axios'
import { resolve } from './resolve.js'

var baseURL = 'https://staging.officernd.com/api/v1/organizations/assignment-demo'
var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODM5MzJiZTU5YmU1MjcwNGMzMGZhOSIsImlhdCI6MTYwNTg3NTc5OCwiZXhwIjoxNjM3NDExNzk4fQ.U83_KnUAkPoI65NPwGyET_4HNiF4Lvd7pl6RLHhWSFM'

export async function getMembers() {
    return await resolve(axios.get(baseURL + '/members', {
        headers: { 'Authorization': token }
    }).then(res => res.data));
}

export async function getOffices() {
    return await resolve(axios.get(baseURL + '/offices', {
        headers: { 'Authorization': token }
    }).then(res => res.data));
}

export async function getTeams() {
    return await resolve(axios.get(baseURL + '/teams', {
        headers: { 'Authorization': token }
    }).then(res => res.data));
}

export async function addMember(name, email, image, createdAt, team, startDate, office) {
    return await resolve(axios.post(baseURL + '/members', {
        headers: { 'Authorization': token },
        body: {
            "name": name,
            "email": email,
            "image": image,
            "createdAt": createdAt,
            "team": team,
            "startDate": startDate,
            "office": office
        }
    }).then(res => res.data));
}

export async function deleteMember(id) {
    return await resolve(axios.delete(baseURL + '/members/' + id, {
        headers: { 'Authorization': token }
    }).then(res => res.data));
}
