// axios jazz
import axios, { AxiosResponse, AxiosError } from "axios";

// constants
import { BASE_URL, API_KEY, CDN_URL } from "./constants";

// types
export interface Breed {
  weight: {
    imperial: string;
    metric: string;
  };
  id: string;
  name: string;
  temperament: string;
  origin: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  supressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
  image: {
    url: string;
  };
}

/**
 * Retrieves the URL of a random cat image
 * @returns {Promise<string>}
 * @function
 * @example
 * import { getRandomImage } from "kitty-js";
 * const randImg = await getRandomImage();
 */
export const randomImage = async (): Promise<string> => {
  return axios
    .get(`${BASE_URL}images/search`)
    .then((res: AxiosResponse<any, any>) => res.data[0].url)
    .catch((err: AxiosError<any, any>) => console.error(err));
};

/**
 * Get a list of cat breeds and its corresponding information, sorted alphabetically.
 * @param {number} limit The array limit (5 will result in a response consisting of 5 cat breeds)
 * @returns {Promise<Breed[]>}
 * @example
 * import { catBreeds } from "kitty-js";
 * const catBreeds: Breed[] = await catBreeds(5); // default value: 30
 */
export const catBreeds = async (limit: number = 30): Promise<Breed[]> => {
  return axios
    .get<Breed[]>(`${BASE_URL}breeds?limit=${limit}`, {
      headers: {
        "X-API-Key": API_KEY,
      },
    })
    .then((res: AxiosResponse<any, any>) => res.data);
};

/**
 * Search for cat breeds by name.
 * @param {string} query The name, or part of the name of the breed to find. Eg: sib for Siberian. Returns an empty array if empty.
 * @returns {Promise<Breed>}
 * @example
 * import { catBreed } from "kitty-js";
 * const norwegianForest: Breed[] = await catBreed("norweg"); // default value: ""
 */
export const catBreed = async (query: string = ""): Promise<Breed[]> => {
  return axios
    .get<Breed[]>(`${BASE_URL}breeds/search?q=${query}`, {
      headers: {
        "X-API-Key": API_KEY,
      },
    })
    .then((res: AxiosResponse<any, any>) => {
      if (res.data[0]) {
        return res.data[0];
      } else {
        throw new Error("No such breed found!");
      }
    });
};

/**
 * Get the description of a cat breed
 * @param {string} query The name, or part of the name of the breed to find. Eg: sib for Siberian.
 * @returns {Promise<string>}
 * @example
 * import { catBreedDescription } from "kitty-js";
 * const siameseDesc: string = await catBreedDescription("siam");
 */
export const catBreedDescription = async (query: string): Promise<string> => {
  return axios
    .get<Breed[]>(`${BASE_URL}breeds/search?q=${query}`, {
      headers: {
        "X-API-Key": API_KEY,
      },
    })
    .then((res: AxiosResponse<any, any>) => {
      if (res.data[0]) {
        return res.data[0].description;
      } else {
        throw new Error("No such breed found!");
      }
    });
};

/**
 * Get the URL for an image of a cat breed.
 * @param {string} query The name, or part of the name of the breed to find. Eg: sib for Siberian.
 * @returns {Promise<string>}
 * @example
 * import { catBreedImage } from "kitty-js";
 * const britShortHairImg: string = catBreedImage("britishshortha");
 */
export const catBreedImage = async (query: string): Promise<string> => {
  return axios
    .get<Breed[]>(`${BASE_URL}breeds/search?q=${query}`, {
      headers: {
        "X-API-Key": API_KEY,
      },
    })
    .then((res: AxiosResponse<Breed[], any>) => {
      if (res.data[0]) {
        return `${CDN_URL}${res.data[0].reference_image_id}.jpg`;
      } else {
        throw new Error("No such breed found!");
      }
    });
};

/**
 * Get how child-friendly a cat is. (On a scale of 1 to 5)
 * @param {string} query The name, or part of the name of the breed to find. Eg: sib for Siberian.
 * @returns {Promise<number>}
 * @example
 * import { catBreedChildFriendliness } from "kitty-js"
 * const maineCoonChildFriendliness = catBreedChildFriendliness("main");
 */
export const catBreedChildFriendliness = async (
  query: string
): Promise<number> => {
  return axios
    .get<Breed[]>(`${BASE_URL}breeds/search?q=${query}`, {
      headers: {
        "X-API-Key": API_KEY,
      },
    })
    .then((res: AxiosResponse<Breed[], any>) => {
      if (res.data[0]) {
        return res.data[0].child_friendly;
      } else {
        throw new Error("No such breed found!");
      }
    });
};

/**
 * Get the life-span of the cat breed in years.
 * @param {string} query The name, or part of the name of the breed to find. Eg: sib for Siberian.
 * @returns {Promise<string>}
 * @example
 * import { breedLifeSpan } from "kitty-js";
 * const lifeSpanOfBengal: string = breedLifeSpan("bengal");
 */
export const breedLifeSpan = async (query: string): Promise<string> => {
  return axios
    .get<Breed[]>(`${BASE_URL}breeds/search?q=${query}`, {
      headers: {
        "X-API-Key": API_KEY,
      },
    })
    .then((res: AxiosResponse<Breed[], any>) => {
      if (res.data[0]) {
        return res.data[0].life_span;
      } else {
        throw new Error("No such breed found!");
      }
    });
};

/**
 * Get the temperament of a cat breed.
 * @param {string} query The name, or part of the name of the breed to find. Eg: sib for Siberian.
 * @returns {Promise<string>}
 * @example
 * import { breedTemperament } from "kitty-js";
 * const temp: string = breedTemperament("norweg");
 */
export const breedTemperament = async (query: string): Promise<string> => {
  return axios
    .get<Breed[]>(`${BASE_URL}breeds/search?q=${query}`, {
      headers: {
        "X-API-Key": API_KEY,
      },
    })
    .then((res: AxiosResponse<Breed[], any>) => {
      if (res.data[0]) {
        return res.data[0].temperament;
      } else {
        throw new Error("No such breed found!");
      }
    });
};

/**
 * Get the intelligence of a cat breed. (On a scale of 1 to 5, 5 being the "more intelligent")
 * @param {string} query The name, or part of the name of the breed to find. Eg: sib for Siberian.
 * @returns {Promise<number>}
 * @example
 * import { breedIntelligence } from "kitty-js";
 * const exoticShorthairIntelligence: number = breedIntelligence("exotic");
 */
export const breedIntelligence = async (query: string): Promise<number> => {
  return axios
    .get<Breed[]>(`${BASE_URL}breeds/search?q=${query}`, {
      headers: {
        "X-API-Key": API_KEY,
      },
    })
    .then((res: AxiosResponse<Breed[], any>) => {
      if (res.data[0]) {
        return res.data[0].intelligence;
      } else {
        throw new Error("No such breed found!");
      }
    });
};

/**
 * Get the affection of a cat breed. (On a scale of 1-5)
 * @param {string} query The name, or part of the name of the breed to find. Eg: sib for Siberian.
 * @returns {Promise<number>}
 * @example
 * import { breedAffection } from "kitty-js";
 * const siameseAffection: number = breedIntelligence("siam");
 */
export const breedAffection = async (query: string): Promise<number> => {
  return axios
    .get<Breed[]>(`${BASE_URL}breeds/search?q=${query}`, {
      headers: {
        "X-API-Key": API_KEY,
      },
    })
    .then((res: AxiosResponse<Breed[], any>) => {
      if (res.data[0]) {
        return res.data[0].affection_level;
      } else {
        throw new Error("No such breed found!");
      }
    });
};
