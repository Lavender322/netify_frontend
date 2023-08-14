import axios from 'axios';

const BACKEND_URL = 'https://netify.iqust.top';

export async function authenticateUser(state, code) {
  let body = {state, code};
  const response = await axios({
    method: 'POST',
    url: BACKEND_URL + '/linkedin/login',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(body)
  });

  return response.data.data.jwt;
};

export async function fetchUserInfo(token) {
  const response = await axios({
    method: 'POST',
    url: BACKEND_URL + '/user/getUserInfo',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  return response.data.data;
};

export async function fetchTags() {
  const response = await axios({
    method: 'GET',
    url: BACKEND_URL + '/tags/getTags'
  });

  return response.data.data;
};

export function setTags(userTags, token) {
  let body = {userTags};
  return axios({
    method: 'POST',
    url: BACKEND_URL + '/user/setUserInfo',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: JSON.stringify(body)
  });
};

export async function fetchOverallEventStatus(token) {
  const response = await axios({
    method: 'GET',
    url: BACKEND_URL + '/event/get_overall_event_status',
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  return response.data.data;
};

export async function fetchEventFilters(token) {
  const response = await axios({
    method: 'GET',
    url: BACKEND_URL + '/event/get_event_filter',
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  return response.data.data;
};

export async function fetchEventList(gradeFilters, industryFilters, groupFilters, token) {
  let body = {
    experienceTypeList: gradeFilters,
    sectorTypeList: industryFilters,
    meetingTypeList: groupFilters,
  };
  
  const response = await axios({
    method: 'POST',
    url: BACKEND_URL + '/event/list',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: JSON.stringify(body)
  });

  return response.data.data;
};
