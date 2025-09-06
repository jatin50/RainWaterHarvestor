// API service functions for backend communication

import { API_BASE_URL, ENDPOINTS } from '../utils/constants';

// Base API configuration
const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Helper function to make API requests
const makeRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...API_CONFIG,
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication APIs
export const authAPI = {
  login: async (credentials) => {
    return makeRequest(ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  register: async (userData) => {
    return makeRequest(ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  logout: async () => {
    return makeRequest(ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
    });
  }
};

// Feasibility Assessment APIs
export const feasibilityAPI = {
  assess: async (assessmentData) => {
    return makeRequest(ENDPOINTS.FEASIBILITY.ASSESS, {
      method: 'POST',
      body: JSON.stringify(assessmentData),
    });
  },
  
  getHistory: async (userId) => {
    return makeRequest(`${ENDPOINTS.FEASIBILITY.HISTORY}?userId=${userId}`);
  }
};

// Water Quality APIs
export const waterQualityAPI = {
  predict: async (qualityData) => {
    return makeRequest(ENDPOINTS.WATER_QUALITY.PREDICT, {
      method: 'POST',
      body: JSON.stringify(qualityData),
    });
  },
  
  analyze: async (sampleData) => {
    return makeRequest(ENDPOINTS.WATER_QUALITY.ANALYZE, {
      method: 'POST',
      body: JSON.stringify(sampleData),
    });
  }
};

// Aquifer Information APIs
export const aquiferAPI = {
  getInfo: async (location) => {
    return makeRequest(`${ENDPOINTS.AQUIFER.INFO}?location=${encodeURIComponent(location)}`);
  },
  
  search: async (searchParams) => {
    const queryString = new URLSearchParams(searchParams).toString();
    return makeRequest(`${ENDPOINTS.AQUIFER.SEARCH}?${queryString}`);
  }
};

// Rainfall Data APIs
export const rainfallAPI = {
  getData: async (location, year) => {
    return makeRequest(`${ENDPOINTS.RAINFALL.DATA}?location=${encodeURIComponent(location)}&year=${year}`);
  },
  
  getStats: async (location) => {
    return makeRequest(`${ENDPOINTS.RAINFALL.STATS}?location=${encodeURIComponent(location)}`);
  }
};

// Structure Suggestion APIs
export const structureAPI = {
  getSuggestions: async (siteData) => {
    return makeRequest(ENDPOINTS.STRUCTURES.SUGGEST, {
      method: 'POST',
      body: JSON.stringify(siteData),
    });
  },
  
  getTypes: async () => {
    return makeRequest(ENDPOINTS.STRUCTURES.TYPES);
  }
};

// Cost Analysis APIs
export const costAnalysisAPI = {
  calculate: async (projectData) => {
    return makeRequest(ENDPOINTS.COST_ANALYSIS.CALCULATE, {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },
  
  getTemplates: async () => {
    return makeRequest(ENDPOINTS.COST_ANALYSIS.TEMPLATES);
  }
};

// Utility function for file uploads (if needed)
export const uploadFile = async (file, endpoint) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
};

// Mock data for development (when backend is not available)
export const mockAPI = {
  feasibilityAssess: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          feasibilityScore: Math.floor(Math.random() * 40) + 60,
          waterPotential: data.roofArea * 0.8 * 500,
          recommendation: 'Highly Recommended',
          details: {
            catchmentArea: data.roofArea,
            annualRainfall: 800,
            collectionEfficiency: 0.8
          }
        });
      }, 1000);
    });
  },
  
  waterQualityPredict: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const toxicityLevel = Math.random() > 0.7 ? 'High' : 'Low';
        resolve({
          toxicityLevel,
          qualityScore: toxicityLevel === 'Low' ? 85 : 45,
          drinkable: toxicityLevel === 'Low',
          parameters: {
            ph: data.ph,
            tds: data.tds,
            turbidity: data.turbidity
          }
        });
      }, 1000);
    });
  }
};